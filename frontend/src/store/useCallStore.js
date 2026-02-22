import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

// WebRTC configuration - using public Google STUN servers (no cost, no sign-up)
const ICE_SERVERS = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
    ],
};

export const useCallStore = create((set, get) => ({
    // The user who is calling us (incoming call data)
    incomingCall: null,
    // The user we are currently in a call with
    activeCall: null,
    // WebRTC peer connection
    peerConnection: null,
    // Local audio stream (our mic)
    localStream: null,
    // Remote audio stream (other person's audio)
    remoteStream: null,
    // Whether we are currently placing/in a call
    isCalling: false,
    // Whether the WebRTC connection is fully established
    isCallConnected: false,
    // Duration tracking
    callDuration: 0,
    callTimerInterval: null,
    // Mute state
    isMuted: false,

    // ─── Setters ────────────────────────────────────────────────────────────────
    setIncomingCall: (callData) => set({ incomingCall: callData }),

    // ─── Initiate a call (Caller side) ──────────────────────────────────────────
    initiateCall: async (targetUser) => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        try {
            // 1. Get microphone access
            const localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            set({ localStream });

            // 2. Create WebRTC peer connection
            const pc = new RTCPeerConnection(ICE_SERVERS);
            set({ peerConnection: pc });

            // 3. Add our audio tracks to the connection
            localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

            // 4. When we get remote audio, save it
            pc.ontrack = (event) => {
                set({ remoteStream: event.streams[0] });
            };

            // 5. Send ICE candidates to the callee via socket
            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("webrtc:ice-candidate", {
                        to: targetUser._id,
                        candidate: event.candidate,
                    });
                }
            };

            // 6. Monitor connection state
            pc.onconnectionstatechange = () => {
                if (pc.connectionState === "connected") {
                    set({ isCallConnected: true });
                    get()._startCallTimer();
                }
                if (pc.connectionState === "disconnected" || pc.connectionState === "failed") {
                    get().endCall();
                }
            };

            // 7. Create and send SDP offer
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            socket.emit("call:initiate", {
                to: targetUser._id,
                offer,
                callerName: useAuthStore.getState().authUser.fullName,
                callerPic: useAuthStore.getState().authUser.profilePic,
            });

            set({ activeCall: targetUser, isCalling: true });
            toast("Calling " + targetUser.fullName + "...", { icon: "📞" });
        } catch (err) {
            if (err.name === "NotAllowedError") {
                toast.error("Microphone access denied. Please allow mic permission.");
            } else {
                toast.error("Could not start call: " + err.message);
            }
            get().endCall();
        }
    },

    // ─── Accept an incoming call (Callee side) ──────────────────────────────────
    acceptCall: async () => {
        const { incomingCall } = get();
        const socket = useAuthStore.getState().socket;
        if (!incomingCall || !socket) return;

        try {
            // 1. Get mic access
            const localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            set({ localStream });

            // 2. Create peer connection
            const pc = new RTCPeerConnection(ICE_SERVERS);
            set({ peerConnection: pc });

            // 3. Add our audio
            localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));

            // 4. Receive remote audio
            pc.ontrack = (event) => {
                set({ remoteStream: event.streams[0] });
            };

            // 5. Relay ICE candidates back to caller
            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("webrtc:ice-candidate", {
                        to: incomingCall.callerId,
                        candidate: event.candidate,
                    });
                }
            };

            // 6. Monitor connection state
            pc.onconnectionstatechange = () => {
                if (pc.connectionState === "connected") {
                    set({ isCallConnected: true });
                    get()._startCallTimer();
                }
                if (pc.connectionState === "disconnected" || pc.connectionState === "failed") {
                    get().endCall();
                }
            };

            // 7. Set the caller's offer as remote description
            await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));

            // 8. Create and send answer
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            socket.emit("call:accept", {
                to: incomingCall.callerId,
                answer,
            });

            set({
                activeCall: {
                    _id: incomingCall.callerId,
                    fullName: incomingCall.callerName,
                    profilePic: incomingCall.callerPic,
                },
                isCalling: true,
                incomingCall: null,
            });
        } catch (err) {
            if (err.name === "NotAllowedError") {
                toast.error("Microphone access denied. Please allow mic permission.");
            } else {
                toast.error("Could not accept call: " + err.message);
            }
            get().endCall();
        }
    },

    // ─── Reject an incoming call ─────────────────────────────────────────────────
    rejectCall: () => {
        const { incomingCall } = get();
        const socket = useAuthStore.getState().socket;
        if (incomingCall && socket) {
            socket.emit("call:reject", { to: incomingCall.callerId });
        }
        set({ incomingCall: null });
    },

    // ─── End the active call ─────────────────────────────────────────────────────
    endCall: () => {
        const { activeCall, localStream, peerConnection, callTimerInterval } = get();
        const socket = useAuthStore.getState().socket;

        // Notify the other person
        if (activeCall && socket) {
            socket.emit("call:end", { to: activeCall._id });
        }

        // Stop audio tracks
        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
        }

        // Close peer connection
        if (peerConnection) {
            peerConnection.close();
        }

        // Clear duration timer
        if (callTimerInterval) {
            clearInterval(callTimerInterval);
        }

        set({
            incomingCall: null,
            activeCall: null,
            peerConnection: null,
            localStream: null,
            remoteStream: null,
            isCalling: false,
            isCallConnected: false,
            callDuration: 0,
            callTimerInterval: null,
            isMuted: false,
        });
    },

    // ─── Toggle mute ─────────────────────────────────────────────────────────────
    toggleMute: () => {
        const { localStream, isMuted } = get();
        if (localStream) {
            localStream.getAudioTracks().forEach((track) => {
                track.enabled = isMuted; // flip: if currently muted, enable; if not, disable
            });
            set({ isMuted: !isMuted });
        }
    },

    // ─── Handle incoming WebRTC answer (Caller receives this) ────────────────────
    handleCallAccepted: async (answer) => {
        const { peerConnection } = get();
        if (peerConnection) {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        }
    },

    // ─── Handle incoming ICE candidate ───────────────────────────────────────────
    handleIceCandidate: async (candidate) => {
        const { peerConnection } = get();
        if (peerConnection) {
            try {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (e) {
                console.error("Error adding ICE candidate:", e);
            }
        }
    },

    // ─── Internal: start call duration timer ─────────────────────────────────────
    _startCallTimer: () => {
        const interval = setInterval(() => {
            set((state) => ({ callDuration: state.callDuration + 1 }));
        }, 1000);
        set({ callTimerInterval: interval });
    },

    // ─── Internal: format duration as MM:SS ──────────────────────────────────────
    getFormattedDuration: () => {
        const { callDuration } = get();
        const mins = Math.floor(callDuration / 60).toString().padStart(2, "0");
        const secs = (callDuration % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    },
}));
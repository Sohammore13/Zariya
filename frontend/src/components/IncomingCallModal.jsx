import { Phone, PhoneOff } from "lucide-react";
import { useCallStore } from "../store/useCallStore";
import { useEffect, useRef } from "react";

function IncomingCallModal() {
    const { incomingCall, acceptCall, rejectCall } = useCallStore();
    const ringtoneRef = useRef(null);

    // Auto-reject after 30 seconds if not answered
    useEffect(() => {
        if (!incomingCall) return;
        const timeout = setTimeout(() => rejectCall(), 30000);
        return () => clearTimeout(timeout);
    }, [incomingCall, rejectCall]);

    // Play ringtone (using a simple oscillator via Web Audio API so no file needed)
    useEffect(() => {
        if (!incomingCall) {
            if (ringtoneRef.current) {
                ringtoneRef.current.stop();
                ringtoneRef.current = null;
            }
            return;
        }

        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.frequency.setValueAtTime(440, ctx.currentTime);
            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);

            // Pulse effect: beep on / off every 1.5s
            const pulse = () => {
                gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
                gainNode.gain.setValueAtTime(0, ctx.currentTime + 0.5);
            };
            pulse();
            const intervalId = setInterval(pulse, 1500);
            oscillator.start();
            ringtoneRef.current = { stop: () => { oscillator.stop(); clearInterval(intervalId); ctx.close(); } };
        } catch (_) {
            // Audio not critical — silently ignore
        }

        return () => {
            if (ringtoneRef.current) {
                ringtoneRef.current.stop();
                ringtoneRef.current = null;
            }
        };
    }, [incomingCall]);

    if (!incomingCall) return null;

    return (
        /* Full-screen overlay */
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center gap-5 w-80 relative overflow-hidden">
                {/* Animated ring glow */}
                <div className="absolute inset-0 rounded-3xl border-4 border-emerald-300 opacity-40 animate-ping pointer-events-none" />

                {/* Caller avatar */}
                <div className="relative">
                    <img
                        src={incomingCall.callerPic || "/avatar.png"}
                        alt={incomingCall.callerName}
                        className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-100 shadow-lg"
                    />
                    {/* Pulsing green dot */}
                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
                </div>

                {/* Text */}
                <div className="text-center">
                    <p className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-1">
                        Incoming Voice Call
                    </p>
                    <h2 className="text-xl font-bold text-gray-900">{incomingCall.callerName}</h2>
                </div>

                {/* Action buttons */}
                <div className="flex gap-6 mt-2">
                    {/* Reject */}
                    <button
                        onClick={rejectCall}
                        className="flex flex-col items-center gap-1.5 group"
                    >
                        <span className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 group-hover:bg-red-500 transition-colors duration-200 shadow">
                            <PhoneOff className="w-6 h-6 text-red-500 group-hover:text-white transition-colors" />
                        </span>
                        <span className="text-xs text-gray-500 font-medium">Decline</span>
                    </button>

                    {/* Accept */}
                    <button
                        onClick={acceptCall}
                        className="flex flex-col items-center gap-1.5 group"
                    >
                        <span className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 group-hover:bg-emerald-500 transition-colors duration-200 shadow">
                            <Phone className="w-6 h-6 text-emerald-500 group-hover:text-white transition-colors" />
                        </span>
                        <span className="text-xs text-gray-500 font-medium">Accept</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default IncomingCallModal;

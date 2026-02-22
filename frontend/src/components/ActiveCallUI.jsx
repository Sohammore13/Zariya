import { Mic, MicOff, PhoneOff } from "lucide-react";
import { useCallStore } from "../store/useCallStore";
import { useEffect, useRef } from "react";

function ActiveCallUI() {
    const { activeCall, isCalling, isCallConnected, isMuted, remoteStream, endCall, toggleMute, getFormattedDuration } =
        useCallStore();

    // Hook up remote audio stream to an <audio> element so we can hear the other person
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current && remoteStream) {
            audioRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    if (!isCalling || !activeCall) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slideUp">
            {/* Hidden audio element for remote stream */}
            <audio ref={audioRef} autoPlay playsInline />

            <div className="bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-5 min-w-[300px]">
                {/* Avatar + info */}
                <div className="flex items-center gap-3 flex-1">
                    <div className="relative">
                        <img
                            src={activeCall.profilePic || "/avatar.png"}
                            alt={activeCall.fullName}
                            className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-200"
                        />
                        {/* Green dot when connected, grey when connecting */}
                        <span
                            className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${isCallConnected ? "bg-emerald-400" : "bg-gray-300 animate-pulse"
                                }`}
                        />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">{activeCall.fullName}</p>
                        <p className={`text-xs font-mono ${isCallConnected ? "text-emerald-500" : "text-gray-400"}`}>
                            {isCallConnected ? getFormattedDuration() : "Connecting…"}
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                    {/* Mute toggle */}
                    <button
                        onClick={toggleMute}
                        title={isMuted ? "Unmute" : "Mute"}
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 ${isMuted ? "bg-red-100 text-red-500 hover:bg-red-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>

                    {/* End call */}
                    <button
                        onClick={endCall}
                        title="End call"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 shadow-md"
                    >
                        <PhoneOff className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ActiveCallUI;

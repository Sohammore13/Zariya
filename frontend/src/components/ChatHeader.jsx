import { XIcon, Phone, ArrowLeftIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useCallStore } from "../store/useCallStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { initiateCall } = useCallStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div
      className="flex justify-between items-center bg-white border-b
   border-gray-100 max-h-[72px] px-5 flex-1"
    >
      <div className="flex items-center space-x-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-10 rounded-full">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>

        <div>
          <h3 className="text-gray-900 font-semibold text-sm">{selectedUser.fullName}</h3>
          <p className={`text-xs font-medium ${isOnline ? "text-emerald-500" : "text-gray-400"}`}>
            {isOnline ? "● Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Voice call button — only active when user is online */}
        <button
          onClick={() => initiateCall(selectedUser)}
          disabled={!isOnline}
          title={isOnline ? "Start voice call" : "User is offline"}
          className={`p-1.5 rounded-lg transition-colors ${isOnline
            ? "hover:bg-emerald-50 cursor-pointer"
            : "opacity-40 cursor-not-allowed"
            }`}
        >
          <Phone className="w-4 h-4 text-emerald-500" />
        </button>

        <button onClick={() => setSelectedUser(null)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title="Back">
          {/* Arrow on mobile, X on desktop */}
          <ArrowLeftIcon className="w-5 h-5 text-gray-500 md:hidden" />
          <XIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 hidden md:block" />
        </button>
      </div>
    </div>
  );
}
export default ChatHeader;

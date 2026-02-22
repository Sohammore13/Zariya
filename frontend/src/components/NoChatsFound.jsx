import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
      <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center border border-indigo-100">
        <MessageCircleIcon className="w-7 h-7 text-indigo-500" />
      </div>
      <div>
        <h4 className="text-gray-800 font-semibold text-sm mb-1">No conversations yet</h4>
        <p className="text-gray-400 text-xs px-6">
          Start a new chat by selecting a contact from the contacts tab
        </p>
      </div>
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors font-medium border border-indigo-100"
      >
        Find contacts
      </button>
    </div>
  );
}
export default NoChatsFound;

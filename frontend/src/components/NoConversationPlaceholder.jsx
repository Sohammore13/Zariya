import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="size-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 border border-indigo-100">
        <MessageCircleIcon className="size-10 text-indigo-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a conversation</h3>
      <p className="text-gray-400 max-w-md text-sm">
        Choose a contact from the sidebar to start chatting or continue a previous conversation.
      </p>
    </div>
  );
};

export default NoConversationPlaceholder;

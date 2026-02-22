import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex bg-gray-100 rounded-xl p-1 mx-4 mb-2">
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${activeTab === "chats"
          ? "bg-white text-indigo-600 shadow-sm"
          : "text-gray-500 hover:text-gray-700"
          }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${activeTab === "contacts"
          ? "bg-white text-indigo-600 shadow-sm"
          : "text-gray-500 hover:text-gray-700"
          }`}
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;

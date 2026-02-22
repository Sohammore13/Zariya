import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser, setActiveTab } = useChatStore();

  // Whenever a user is selected (from anywhere), switch sidebar to Chats
  useEffect(() => {
    if (selectedUser) {
      setActiveTab("chats");
    }
  }, [selectedUser]);

  return (
    // On mobile: full screen, no padding. On desktop: centered card with padding.
    <div className="h-[100dvh] w-full flex items-stretch md:items-center justify-center bg-gray-50 md:p-4 overflow-hidden">
      <div className="w-full md:max-w-6xl md:h-[800px] h-full bg-white md:rounded-2xl md:shadow-sm md:border md:border-gray-200 overflow-hidden flex">

        {/* ── SIDEBAR (LEFT PANEL) ────────────────────────────────────────
            Desktop: always visible (w-80)
            Mobile: visible only when NO user is selected          */}
        <div
          className={`
            ${selectedUser ? "hidden" : "flex"} md:flex
            w-full md:w-80 bg-white border-r border-gray-100 flex-col flex-shrink-0
          `}
        >
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* ── CHAT PANEL (RIGHT PANEL) ────────────────────────────────────
            Desktop: always visible (flex-1)
            Mobile: visible only when a user IS selected           */}
        <div
          className={`
            ${selectedUser ? "flex" : "hidden"} md:flex
            flex-1 flex-col bg-gray-50
          `}
        >
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>

      </div>
    </div>
  );
}

export default ChatPage;

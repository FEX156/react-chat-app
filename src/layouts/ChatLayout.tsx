import Sidebar from "#/components/Sidebar";
import ChatRoom from "#/components/ChatRoom";
import NewConversation from "#/components/NewConversation";
import { useState } from "react";
import { useConversations } from "#/hooks/useConversations";
import { useChatSocket } from "#/hooks/useChatSocket";

type ViewState = { type: "chat"; chat: any } | { type: "new" } | null;

export default function ChatLayout() {
  const [view, setView] = useState<ViewState>(null);
  const { conversationList, updateListOnNewMessage } = useConversations();

  const { sendMessage } = useChatSocket((newMsg) => {
    updateListOnNewMessage(newMsg.conversation);
  });

  const isActive = view !== null;

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <div
        className={`${isActive ? "hidden md:flex" : "flex"} w-full md:w-[30%]`}>
        <Sidebar
          chatList={conversationList}
          onSelectChat={(chat: any) => setView({ type: "chat", chat })}
          onAddNewConversation={() => setView({ type: "new" })}
        />
      </div>

      <main className={`${isActive ? "flex" : "hidden md:flex"} flex-1`}>
        {renderMainView(view, setView, updateListOnNewMessage)}
      </main>
    </div>
  );
}

// Helper untuk menjaga return utama tetap bersih
function renderMainView(view: ViewState, setView: any, onCreated: any) {
  if (view?.type === "chat") {
    return <ChatRoom chat={view.chat} onBack={() => setView(null)} />;
  }
  if (view?.type === "new") {
    return (
      <NewConversation
        onBack={() => setView(null)}
        onCreated={(chat) => {
          onCreated(chat);
          setView({ type: "chat", chat });
        }}
      />
    );
  }
  return (
    <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
      Pilih percakapan untuk memulai
    </div>
  );
}

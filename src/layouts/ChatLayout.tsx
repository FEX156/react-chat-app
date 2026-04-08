import Sidebar from "#/components/Sidebar";
import ChatRoom from "#/components/ChatRoom";
import NewConversation from "#/components/NewConversation";
import { useState } from "react";
import { useConversations } from "#/hooks/useConversations";
import { useChatSocket } from "#/hooks/useChatSocket";
import { useChatStore } from "#/store/useChatStore";

type ViewState = { type: "chat"; chat: any } | { type: "new" } | null;
type WSMessage =
  | { type: "join_room"; roomId: string }
  | { type: "leave_room"; roomId: string }
  | { type: "send_message"; roomId: string; content: string };

export default function ChatLayout() {
  const { isLoading } = useConversations();
  const [view, setView] = useState<ViewState>(null);
  const conversationList = useChatStore((state) => state.conversations);
  const { updateListOnNewMessage } = useChatStore();
  const { sendJsonMessage } = useChatSocket();
  const isActive = view !== null;

  console.log(conversationList);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <div
        className={`${isActive ? "hidden md:flex" : "flex"} w-full md:w-[30%]`}>
        <Sidebar
          chatList={conversationList}
          onSelectChat={(chat: any) => setView({ type: "chat", chat })}
          onAddNewConversation={() => setView({ type: "new" })}
          onJoinRoom={(roomId: string) =>
            sendJsonMessage<WSMessage>({ type: "join_room", roomId })
          }
        />
      </div>

      <main className={`${isActive ? "flex" : "hidden md:flex"} flex-1`}>
        {renderMainView(view, setView, updateListOnNewMessage, sendJsonMessage)}
      </main>
    </div>
  );
}

function renderMainView(
  view: ViewState,
  setView: any,
  onCreated: any,
  onLeaveRoom: any,
) {
  if (view?.type === "chat") {
    return (
      <ChatRoom
        chat={view.chat}
        onBack={(roomId: string) => {
          setView(null);
          onLeaveRoom({ type: "leave_room", roomId });
        }}
      />
    );
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

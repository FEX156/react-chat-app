import ArrowLeftStrokeIcon from "./icons/ArrowLeftStrokeIcon";
import { useState } from "react";
import { useAuthStore } from "#/store/authStore";
import { dateFormat, timeFormater } from "#/libs/dateFormater";
import { useChatStore } from "#/store/useChatStore";
import { useGroupedMessages } from "#/hooks/useGroupedMessages";
import { useAutoScroll } from "#/hooks/useAutoScroll";
import { useChatSocket } from "#/hooks/useChatSocket";

export default function ChatRoom({ chat, onBack }: any) {
  const userData = useAuthStore((state) => state.userData);
  const users = useChatStore((state) => state.onlineUsers);
  const [newMessage, setNewMessage] = useState<any>("");
  const { groupedMessages } = useGroupedMessages(chat);
  const [containerRef, bottomRef] = useAutoScroll(groupedMessages);
  const { sendJsonMessage } = useChatSocket();

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = newMessage;
    const tempId = crypto.randomUUID();

    const tempMessage = {
      id: tempId,
      tempId,
      content: message,
      status: "sending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      conversationId: chat.conversationId,
      senderId: userData?.id,
    };

    useChatStore.getState().addMessage(tempMessage);
    setNewMessage("");

    sendJsonMessage({
      type: "send_message",
      roomId: chat.conversationId,
      content: message,
      tempId,
    });
  };

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-[#0f172a]">
      {/* HEADER */}
      <header className="h-16 flex items-center px-4 shadow-md ">
        <button
          onClick={() => onBack(chat.conversationId)}
          className="mr-3 md:hidden p-2 text-white hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full">
          <ArrowLeftStrokeIcon width={32} height={32} />
        </button>

        <div>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
            {chat.username}
          </h2>
          {users.has(chat.id) ? (
            <p className="text-sm text-blue-500 ">online</p>
          ) : (
            <p className="text-sm text-gray-900 dark:text-white">
              Last seen {dateFormat(chat.lastSeen)}
            </p>
          )}
        </div>
      </header>

      {/* MESSAGES */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {groupedMessages.map((group: any, index: number) => (
          <div key={index}>
            {/*  DATE LABEL */}
            <div className="flex justify-center my-2">
              <span className="text-xs bg-gray-300 dark:bg-slate-600 px-3 py-1 rounded-full">
                {group.label}
              </span>
            </div>

            {/* MESSAGES */}
            <div className="space-y-4">
              {group.messages.map((msg: any) => (
                <div key={msg.id} className="flex">
                  <div
                    className={`max-w-[90%] md:max-w-[40%] md:min-w-40 px-4 py-2 rounded-xl text-sm 
                  ${
                    msg.senderId === userData?.id
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-200 dark:bg-slate-700 dark:text-white"
                  }`}>
                    <div>{msg.content}</div>
                    <div className="text-xs text-end">
                      {timeFormater(msg.updatedAt || msg.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-3 border-gray-200 dark:border-slate-700">
        <form onSubmit={handleSendMessage}>
          <div className="flex gap-2">
            <input
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-full 
              bg-gray-100 dark:bg-slate-800
              text-gray-900 dark:text-white
              focus:outline-none"
            />

            <button
              type="submit"
              disabled={!newMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer disabled:opacity-50">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

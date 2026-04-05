import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "#/store/authStore";
import { privateAxios } from "#/libs/axios";
import ArrowLeftStrokeIcon from "./icons/ArrowLeftStrokeIcon";
import { getDateLabel, dateFormat } from "#/libs/dateFormater";

export default function ChatRoom({ chat, onBack }: any) {
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<any>("");
  const userData = useAuthStore.getState().userData;

  const fetchdata = async () => {
    try {
      const response = await privateAxios.get(
        `/messages/${chat.conversationId}`,
      );
      const result = response.data.data;

      result.sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );

      setMessages(result);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = newMessage;

    const tempMessage = {
      id: Date.now(),
      content: message,
      senderId: userData?.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setMessages((prev: any) => [...prev, tempMessage]);
    setNewMessage("");

    try {
      await privateAxios.post("/messages", {
        content: message,
        status: "sent",
        conversationId: chat.conversationId,
        senderId: userData?.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [chat]);

  const groupedMessages = useMemo(() => {
    const groups: Record<string, any[]> = {};

    messages.forEach((msg: any) => {
      const date = new Date(msg.createdAt || msg.updatedAt);
      const label = getDateLabel(date);

      if (!groups[label]) {
        groups[label] = [];
      }

      groups[label].push(msg);
    });

    return Object.entries(groups).map(([label, msgs]) => ({
      label,
      messages: msgs,
    }));
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-[#0f172a]">
      {/* HEADER */}
      <header className="h-16 flex items-center px-4 shadow-md border-gray-200 dark:border-slate-700">
        <button
          onClick={onBack}
          className="mr-3 md:hidden p-2 text-white hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full">
          <ArrowLeftStrokeIcon width={32} height={32} />
        </button>

        <div>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
            {chat.username}
          </h2>
          <p className="text-sm text-gray-900 dark:text-white">
            Last seen at {dateFormat(chat.lastSeen)}
          </p>
        </div>
      </header>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
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
                <div
                  key={msg.id}
                  className={`max-w-[40%] px-4 py-2 rounded-xl text-sm
                  ${
                    msg.senderId === userData?.id
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-200 dark:bg-slate-700 dark:text-white"
                  }`}>
                  <div>{msg.content}</div>
                  <span className="text-xs">
                    {dateFormat(msg.updatedAt || msg.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
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
              className="px-4 py-3 bg-blue-500 text-white rounded-full cursor-pointer">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

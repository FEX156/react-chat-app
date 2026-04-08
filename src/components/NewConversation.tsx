import { useState } from "react";
import { privateAxios } from "#/libs/axios";
import ArrowLeftStrokeIcon from "./icons/ArrowLeftStrokeIcon";

type Props = {
  onBack: () => void;
  onCreated: (chat: any) => void;
};

export default function NewConversation({ onBack, onCreated }: Props) {
  const [partner, setPartner] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (e: any) => {
    e.preventDefault();
    if (!partner || !message) return;

    try {
      const res = await privateAxios.post("/conversations/private", {
        partnerId: partner,
        message,
      });

      const newConversation = res.data.data;

      onCreated(newConversation);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-[#0f172a]">
      {/* HEADER */}
      <header className="h-16 flex  gap-2 items-center px-4 shadow-md">
        {/* BACK BUTTON (mobile only) */}
        <button
          onClick={onBack}
          className=" p-2 text-gray-700 dark:text-gray-200 
          hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full transition">
          <ArrowLeftStrokeIcon width={24} height={24} />
        </button>

        {/* INPUT TO */}
        <div
          className="flex h-10 items-center gap-3 w-full max-w-xl border-b 
            border-gray-300 dark:border-slate-600 focus:border-blue-500">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            To:
          </span>

          <input
            type="text"
            placeholder="Username or ID..."
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
            className="flex-1 bg-transparent 
            text-gray-900 dark:text-white
            focus:outline-none required"
          />
        </div>
      </header>

      {/* EMPTY STATE */}
      <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">
        Start a new conversation
      </div>

      {/* INPUT MESSAGE */}
      <div className="p-3 border-gray-200 dark:border-slate-700">
        <form onSubmit={handleSend}>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full 
            bg-gray-100 dark:bg-slate-800
            text-gray-900 dark:text-white
            focus:outline-none"
            />

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-full 
            hover:bg-blue-600 transition disabled:opacity-50"
              disabled={!partner || !message}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

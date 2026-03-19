import ArrowLeftStrokeIcon from "./icons/ArrowLeftStrokeIcon";

export default function ChatRoom({ chat, onBack }: any) {
  if (!chat) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
        Select a chat
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-[#0f172a]">
      {/* HEADER */}
      <header className="h-16 flex items-center px-4 shadow-md border-gray-200 dark:border-slate-700">
        {/* back button (mobile only) */}
        <button
          onClick={onBack}
          className="mr-3 md:hidden p-2 text-white hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full">
          <ArrowLeftStrokeIcon width={32} height={32} />
        </button>

        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
          {chat.name}
        </h2>
      </header>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((msg, i) => (
          <div
            key={i}
            className={`max-w-[40%] px-4 py-2 rounded-lg text-sm
            ${
              i % 2 === 0
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 dark:bg-slate-700 dark:text-white"
            }`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua {msg}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="p-3 border-gray-200 dark:border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full 
            bg-gray-100 dark:bg-slate-800
            text-gray-900 dark:text-white
            focus:outline-none"
          />

          <button className="px-4 py-3 bg-blue-500 text-white rounded-full">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

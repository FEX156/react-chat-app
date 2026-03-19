import DotsVerticalRoundedIcon from "./icons/DotsVerticalRoundedIcon";
import MessagePlusIcon from "./icons/MessagePlusIcon";

export default function Sidebar({ onSelectChat }: any) {
  return (
    <aside
      className="flex flex-col w-full h-screen border-r 
    bg-white dark:bg-[#0f172a] 
    border-gray-200 dark:border-slate-700">
      {/* HEADER */}
      <header
        className="h-16 flex items-center px-5  
      border-gray-200 dark:border-slate-700">
        <h2 className="font-bold text-2xl mr-auto text-blue-600 dark:text-blue-400">
          ChatApp
        </h2>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full transition text-gray-700 dark:text-gray-200    hover:bg-blue-50 dark:hover:bg-slate-700">
            <MessagePlusIcon />
          </button>

          <button className="p-2 rounded-full transition text-gray-700 dark:text-gray-200    hover:bg-blue-50 dark:hover:bg-slate-700">
            <DotsVerticalRoundedIcon />
          </button>
        </div>
      </header>

      {/* SEARCH */}
      <div
        className="p-3  
      border-gray-200 dark:border-slate-700">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full px-4 py-2 rounded-lg 
          bg-blue-50 dark:bg-slate-800 
          text-gray-900 dark:text-gray-100
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((_, i) => (
          <div
            onClick={() => onSelectChat({ id: i, name: `User ${i}` })}
            key={i}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer transition
            hover:bg-blue-50 dark:hover:bg-slate-700">
            {/* avatar */}
            <div
              className="w-12 h-12 rounded-full 
            bg-blue-200 dark:bg-slate-600 
            flex items-center justify-center 
            text-blue-700 dark:text-white font-semibold">
              U
            </div>
            {/* text */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <h3 className="font-semibold truncate text-gray-900 dark:text-gray-100">
                  Username {i + 1}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  12:00
                </span>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                Last message preview goes here...
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

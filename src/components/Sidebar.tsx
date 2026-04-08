import MessagePlusIcon from "./icons/MessagePlusIcon";
import MenuDropdown from "./MenuDropdown";
import { useAuthStore } from "#/store/authStore";
import { getDateLabel } from "#/libs/dateFormater";

export default function Sidebar({
  onSelectChat,
  chatList,
  onAddNewConversation,
  onJoinRoom,
}: any) {
  const userData = useAuthStore.getState().userData;

  return (
    <aside
      className="flex flex-col w-full h-screen border-r 
    bg-white dark:bg-[#0f172a] 
    border-gray-200 dark:border-slate-700">
      {/* HEADER */}
      <header
        className="h-16 flex items-center px-5  
      border-gray-200 dark:border-slate-700">
        <h2 className="font-bold text-xl mr-auto text-blue-600 dark:text-blue-400">
          Hi {userData?.username}!
        </h2>

        <div className="flex items-center gap-1">
          <span
            onClick={onAddNewConversation}
            className="p-2 rounded-full transition text-gray-700 dark:text-gray-200    hover:bg-blue-50 dark:hover:bg-slate-700">
            <MessagePlusIcon />
          </span>
          <MenuDropdown />
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
      {chatList.length !== 0 ? (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {chatList.map((chat: any) => (
            <div
              onClick={() => {
                onSelectChat({
                  id: chat.userId,
                  username: chat.username,
                  lastSeen: chat.lastSeen,
                  conversationId: chat.conversationId,
                });
                onJoinRoom(chat.conversationId);
              }}
              key={chat.userId}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer transition
            hover:bg-blue-50 dark:hover:bg-slate-700">
              {/* avatar */}
              <div className="w-10 h-10">
                <img
                  src={`https://avatars.laravel.cloud/${chat.username}?vibe=ocean`}
                  alt={chat.username[0]}
                  className="rounded-full"
                />
              </div>
              {/* text */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="font-semibold truncate text-gray-900 dark:text-gray-100">
                    {chat.username}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {getDateLabel(chat.lastMessageSent)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {chat.lastMessage}
                  </p>
                  {/* <span className="text-xs w-4 h-4 text-center rounded-full bg-red-400">
                    1
                  </span> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-gray-900 dark:text-gray-100">No Conversations</h1>
        </div>
      )}
    </aside>
  );
}

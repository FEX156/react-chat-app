import Sidebar from "#/components/Sidebar";
import ChatRoom from "#/components/ChatRoom";
import { useState } from "react";

export default function ChatLayout() {
  const [activeChat, setActiveChat] = useState<any>(null);

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <div
        className={`
        ${activeChat ? "hidden md:flex" : "flex"} 
        w-full md:w-[50%] lg:w-[30%] lg:max-w-105
        `}>
        <Sidebar onSelectChat={setActiveChat} />
      </div>

      {/* CHAT AREA */}
      <div
        className={`
        ${activeChat ? "flex" : "hidden md:flex"} 
        flex-1
        `}>
        <ChatRoom chat={activeChat} onBack={() => setActiveChat(null)} />
      </div>
    </div>
  );
}

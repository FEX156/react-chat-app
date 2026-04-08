import useWebSocket from "react-use-websocket";
import { useAuthStore } from "#/store/authStore";
import { useChatStore } from "#/store/useChatStore";
import type { ChatStore } from "#/store/useChatStore";

const eventMap = {
  new_message: (store: ChatStore, data: any) => {
    store.addMessage(data);
    store.updateConversationLastMessage(data);
  },

  user_online: (store: ChatStore, data: any) => {
    store.updateOnlineUsers({
      type: "add",
      userId: data.userId,
    });
  },

  user_offline: (store: ChatStore, data: any) => {
    store.updateOnlineUsers({
      type: "remove",
      userId: data.userId,
    });
  },

  online_users: (store: ChatStore, data: any) => {
    store.updateOnlineUsers({
      type: "set",
      users: data.users,
    });
  },
} as const;

const handleSocketEvent = (data: any) => {
  const store = useChatStore.getState();

  const handler = eventMap[data.type as keyof typeof eventMap];

  if (!handler) {
    // console.warn("Unknown WS event:", data.type);
    return;
  }

  handler(store, data);
};

export const useChatSocket = () => {
  const token = useAuthStore.getState().accessToken;
  const socketUrl = `ws://127.0.0.1:5000/v1/ws?token=${token}`;

  const { sendJsonMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      // console.log(data);
      handleSocketEvent(data);
    },
    shouldReconnect: () => true,
  });

  return { sendJsonMessage, readyState };
};

import useWebSocket from "react-use-websocket";
import { useAuthStore } from "#/store/authStore";

export const useChatSocket = (onMessageReceived: (msg: any) => void) => {
  const token = useAuthStore.getState().accessToken;
  const socketUrl = `ws://127.0.0.1:5000/v1/ws?token=${token}`;

  const { sendMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      onMessageReceived(data);
    },
    shouldReconnect: () => true,
  });

  return { sendMessage, readyState };
};

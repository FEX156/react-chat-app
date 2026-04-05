import { useState, useEffect } from "react";
import { privateAxios } from "#/libs/axios";

export const useConversations = () => {
  const [conversationList, setConversationList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConversations = async () => {
    try {
      const response = await privateAxios.get("/conversations");
      setConversationList(response.data.data);
    } catch (err: any) {
      console.error(err?.message || "Failed to fetch conversations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const updateListOnNewMessage = (chat: any) => {
    setConversationList((prev) => {
      const filtered = prev.filter(
        (c) => c.conversationId !== chat.conversationId,
      );

      return [chat, ...filtered];
    });
  };

  return { conversationList, updateListOnNewMessage, isLoading };
};

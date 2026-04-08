import { useState, useEffect } from "react";
import { privateAxios } from "#/libs/axios";
import { useChatStore } from "#/store/useChatStore";

export const useConversations = () => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchConversations = async () => {
    try {
      const response = await privateAxios.get("/conversations");
      useChatStore.getState().setConversations(response.data.data);
    } catch (err: any) {
      console.error(err?.message || "Failed to fetch conversations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return { isLoading };
};

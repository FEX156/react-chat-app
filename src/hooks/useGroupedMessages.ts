import { useEffect, useMemo } from "react";
import { privateAxios } from "#/libs/axios";
import { getDateLabel } from "#/libs/dateFormater";
import { useChatStore } from "#/store/useChatStore";

export const useGroupedMessages = (chat: any) => {
  const messages = useChatStore((state) => state.messages);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await privateAxios.get(
          `/messages/${chat.conversationId}`,
        );
        const result = response.data.data;

        result.sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );

        useChatStore.getState().setMessages(result);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchMessages();
  }, [chat]);

  const groupedMessages = useMemo(() => {
    const groups: Record<string, any[]> = {};

    messages.forEach((msg: any) => {
      const date = msg.createdAt || msg.updatedAt;
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

  return {
    groupedMessages,
  };
};

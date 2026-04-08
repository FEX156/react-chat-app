import { create } from "zustand";

type Conversation = {
  username: string;
  userId: string;
  lastSeen: string | Date;
  lastMessage: string;
  lastMessageSent: string | Date;
  conversationId: string;
};

type Message = {
  type?: string;
  id?: string;
  tempId?: string;
  content: any;
  status: string;
  createdAt: string;
  updatedAt: string;
  conversationId: string;
  senderId: string | undefined;
};

export type ChatStore = {
  messages: Message[];
  conversations: Conversation[];
  onlineUsers: Set<string>;

  addMessage: (msg: Message) => void;
  setMessages: (msgs: Message[]) => void;

  setConversations: (conv: any[]) => void;

  updateConversationLastMessage: (msg: any) => void;
  updateListOnNewMessage: (msg: any) => void;

  updateOnlineUsers: (
    payload:
      | { type: "set"; users: string[] }
      | { type: "add"; userId: string }
      | { type: "remove"; userId: string },
  ) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  conversations: [],
  onlineUsers: new Set<string>(),

  addMessage: (msg) =>
    set((state) => {
      if (msg.tempId) {
        const index = state.messages.findIndex((m) => m.tempId === msg.tempId);

        if (index !== -1) {
          const updated = [...state.messages];
          updated[index] = {
            ...msg,
            status: "sent",
          };

          return { messages: updated };
        }
      }

      // normal append
      return {
        messages: [...state.messages, msg],
      };
    }),

  setMessages: (msgs) =>
    set(() => ({
      messages: msgs,
    })),

  setConversations: (conv) =>
    set(() => ({
      conversations: conv,
    })),

  updateConversationLastMessage: (msg) =>
    set((state) => {
      const updated = state.conversations
        .map((conv) => {
          if (conv.conversationId === msg.conversationId) {
            return {
              ...conv,
              lastMessage: msg.content,
              lastMessageSent: msg.createdAt,
            };
          }
          return conv;
        })
        .sort(
          (a, b) =>
            new Date(b.lastMessageSent).getTime() -
            new Date(a.lastMessageSent).getTime(),
        );

      return { conversations: updated };
    }),

  updateListOnNewMessage: (msg) =>
    set((state) => {
      const filtered = state.conversations.filter(
        (c) => c.conversationId !== msg.conversationId,
      );

      return { conversations: [msg, ...filtered] };
    }),

  updateOnlineUsers: (payload) =>
    set((state) => {
      const updated = new Set(state.onlineUsers);

      switch (payload.type) {
        case "set":
          return { onlineUsers: new Set(payload.users) };

        case "add":
          updated.add(payload.userId);
          return { onlineUsers: updated };

        case "remove":
          updated.delete(payload.userId);
          return { onlineUsers: updated };

        default:
          return state;
      }
    }),
}));

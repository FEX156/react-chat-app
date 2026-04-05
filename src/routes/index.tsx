import { createFileRoute, redirect } from "@tanstack/react-router";
import { privateAxios } from "#/libs/axios";
import ChatLayout from "#/layouts/ChatLayout";
import { useAuthStore } from "#/store/authStore";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    try {
      const response = await privateAxios.get("/auth/me");
      const data = response.data.data;
      useAuthStore.getState().setUserData(data);
    } catch (error: unknown) {
      throw redirect({ to: "/login" });
    }
  },
  component: App,
});

function App() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <ChatLayout />
    </div>
  );
}

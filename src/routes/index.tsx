import { createFileRoute, redirect } from "@tanstack/react-router";
import { privateAxios } from "#/libs/axios";
import ChatLayout from "#/layouts/ChatLayout";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    try {
      await privateAxios.get("/auth/me");
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

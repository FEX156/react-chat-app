import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "#/store/authStore";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import axiosInstance from "#/libs/axios";

export const Route = createFileRoute("/login")({
  component: LoginForm,
});

function LoginForm() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      const endpoint = "/auth/login";
      const { data } = await axiosInstance.post(endpoint, payload);

      if (data.data.token) {
        console.log(data.data.token);
        useAuthStore.getState().setAccessToken(data.data.token);
        setMessage("Login successful!");
        navigate({ to: "/" });
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setMessage(`Error: ${errorMsg}`);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-500">Login to continue</p>
            {message && (
              <div
                className={`mt-4 rounded-lg p-3 text-sm ${message.includes("Error") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                {message}
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#24A1DE] focus:ring-1 focus:ring-[#24A1DE]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#24A1DE] focus:ring-1 focus:ring-[#24A1DE]"
              />
            </div>

            {/* Telegram-style Blue Button */}
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-[#24A1DE] py-3 font-semibold text-white transition-colors hover:bg-[#208bbf] active:scale-[0.98]">
              LOG IN
            </button>
          </form>

          {/* Switch Mode Link */}
          <div className="mt-6 text-center">
            <Link
              to="/register"
              className="text-sm font-medium text-[#24A1DE] hover:underline">
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

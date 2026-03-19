import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import "../styles.css";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}

export default function NotFound() {
  return (
    <div className="animate-fade-in flex items-center justify-center h-screen w-full bg-white dark:bg-[#0f172a]">
      <div className="flex flex-col items-center text-center px-6">
        {/* SVG */}
        <div className="w-70 md:w-100 lg:w-125 mb-6">
          <img src={"/not-found.svg"} alt="not found illustration" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Page not found
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* ACTION */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 rounded-lg border 
            border-gray-300 dark:border-slate-600
            text-gray-700 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-slate-700 transition">
            Go Back
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white 
            hover:bg-blue-600 transition">
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

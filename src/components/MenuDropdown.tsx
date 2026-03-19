import { useEffect, useRef, useState } from "react";
import ConfirmLogoutDialog from "./ConfirmLogoutDialog";
import DotsVerticalRoundedIcon from "./icons/DotsVerticalRoundedIcon";
import axiosInstance from "#/libs/axios";

export default function MenuDropdown() {
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    try {
      const endpoint = "/auth/session/logout";
      await axiosInstance.post(endpoint);
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  // close kalau klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* BUTTON */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full transition 
        text-gray-700 dark:text-gray-200
        hover:bg-blue-50 dark:hover:bg-slate-700">
        <DotsVerticalRoundedIcon />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="absolute left-0 mt-2 w-44 rounded-xl shadow-lg 
          bg-white dark:bg-slate-800 border 
          border-gray-200 dark:border-slate-700
          overflow-hidden animate-fade-in">
          <button
            className="w-full text-left px-4 py-2 text-sm 
          hover:bg-blue-50 dark:hover:bg-slate-700">
            New Group
          </button>

          <button
            className="w-full text-left px-4 py-2 text-sm 
          hover:bg-blue-50 dark:hover:bg-slate-700">
            Settings
          </button>

          <button
            onClick={() => {
              setOpen(false);
              setShowLogout(true);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30">
            Logout
          </button>
        </div>
      )}
      {showLogout && (
        <ConfirmLogoutDialog
          open={showLogout}
          onClose={() => setShowLogout(false)}
          onConfirm={async () => {
            setShowLogout(false);
            await handleSubmit();
            console.log("logout...");
          }}
        />
      )}
    </div>
  );
}

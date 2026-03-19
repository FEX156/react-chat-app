import { useEffect } from "react";

export default function ConfirmLogoutDialog({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  // prevent scroll saat modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 
        bg-black/40 backdrop-blur-xs"
      />

      {/* DIALOG */}
      <div
        className="relative z-10 w-[90%] max-w-sm rounded-2xl p-6 
        bg-white dark:bg-slate-800 
        shadow-xl animate-scale-in">
        {/* TITLE */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Confirm Logout
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Are you sure you want to logout from your account?
        </p>

        {/* ACTION */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border 
            border-gray-300 dark:border-slate-600
            text-gray-700 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-slate-700 transition">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg 
            bg-red-500 text-white 
            hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

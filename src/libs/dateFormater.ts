export function dateFormat(isoStr: string) {
  const date = new Date(isoStr);
  const now = new Date();

  // helper: reset ke awal hari
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const diffTime = startOfToday.getTime() - startOfDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  // 🟢 Hari ini → jam saja
  if (diffDays === 0) {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  // 🟡 Kemarin
  if (diffDays === 1) {
    return "Yesterday"; // kalau mau indo: "Kemarin"
  }

  // 🔵 Selain itu → tanggal (mirip WhatsApp)
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getDateLabel(date: Date) {
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const diffTime = startOfToday.getTime() - startOfDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

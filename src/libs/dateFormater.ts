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

  const time = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  const formateDdate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(date);

  if (diffDays === 0) {
    return "today at " + time;
  }

  if (diffDays === 1) {
    return "yesterday at " + time;
  }

  return formateDdate + " at " + time;
}

export function getDateLabel(rawdate: string) {
  const date = new Date(rawdate);
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

export function timeFormater(isoStr: string) {
  const date = new Date(isoStr);
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

import { useRef, useEffect } from "react";

export const useAutoScroll = (trigger: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const shouldAutoScrollRef = useRef(true);
  const isNearBottom = () => {
    const el = containerRef.current;
    if (!el) return false;

    return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      shouldAutoScrollRef.current = isNearBottom();
    };

    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [trigger]);

  return [containerRef, bottomRef];
};

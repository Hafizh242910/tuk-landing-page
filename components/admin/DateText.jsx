"use client";

import { useMemo } from "react";

export default function DateText({ date }) {
  const formatted = useMemo(() => {
    if (!date) return "-";
    const d = typeof date === "string" ? new Date(date) : date;
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [date]);

  return <>{formatted}</>;
}

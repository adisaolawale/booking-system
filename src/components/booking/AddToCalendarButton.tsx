"use client";

import { Download } from "lucide-react";

function toICSDateTime(date: string, time: string) {
  const [h, m] = time.split(":");
  return `${date.replace(/-/g, "")}T${h.padStart(2, "0")}${m.padStart(2, "0")}00`;
}

export function AddToCalendarButton({
  title,
  date,
  startTime,
  endTime,
}: {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}) {
  function handleDownload() {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${toICSDateTime(date, startTime)}`,
      `DTEND:${toICSDateTime(date, endTime)}`,
      `SUMMARY:${title}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "appointment.ics";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
    >
      <Download size={15} />
      Add to calendar
    </button>
  );
}
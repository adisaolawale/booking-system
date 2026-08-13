"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import type { TimeOff } from "@/generated/prisma";
import { AddTimeOffDialog } from "@/components/business/AddTimeOffDialog";
import { removeTimeOff } from "@/lib/actions/time-off";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function to12h(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function TimeOffRow({ item }: { item: TimeOff }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleRemove() {
    startTransition(async () => {
      await removeTimeOff(item.id);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4">
      <div>
        <p className="text-sm font-medium text-foreground">{formatDate(item.date)}</p>
        <p className="text-xs text-muted-foreground">
          {item.startTime && item.endTime
            ? `${to12h(item.startTime)} \u2013 ${to12h(item.endTime)}`
            : "All day"}
          {item.reason ? ` \u00b7 ${item.reason}` : ""}
        </p>
      </div>
      <button
        type="button"
        onClick={handleRemove}
        disabled={isPending}
        aria-label="Remove time off"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
      >
        {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
      </button>
    </div>
  );
}

export function TimeOffSection({ timeOff }: { timeOff: TimeOff[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <AddTimeOffDialog />
      </div>

      {timeOff.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No upcoming time off &mdash; you&rsquo;re bookable during all your set hours.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {timeOff.map((item) => (
            <TimeOffRow key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
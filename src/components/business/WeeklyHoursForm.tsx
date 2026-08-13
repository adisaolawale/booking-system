"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { saveWeeklyAvailability, type AvailabilityState } from "@/lib/actions/availability";
import type { Availability } from "@/generated/prisma";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
    >
      {pending ? "Saving\u2026" : "Save hours"}
    </Button>
  );
}

export function WeeklyHoursForm({ availability }: { availability: Availability[] }) {
  const byDay = new Map(availability.map((a) => [a.dayOfWeek, a]));
  const [openDays, setOpenDays] = useState<boolean[]>(DAYS.map((_, i) => byDay.has(i)));

  const initialState: AvailabilityState = {};
  const [state, formAction] = useActionState(saveWeeklyAvailability, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {DAYS.map((day, i) => {
        const existing = byDay.get(i);
        const isOpen = openDays[i];
        return (
          <div
            key={day}
            className={`flex flex-wrap items-center gap-4 rounded-xl border p-4 transition-colors ${
              isOpen ? "border-border bg-card" : "border-dashed border-border bg-muted/40"
            }`}
          >
            <div className="flex w-32 items-center gap-3">
              <Switch
                checked={isOpen}
                onCheckedChange={(checked) => {
                  const next = [...openDays];
                  next[i] = checked;
                  setOpenDays(next);
                }}
              />
              <span className="text-sm font-medium text-foreground">{day}</span>
            </div>
            <input type="hidden" name={`open-${i}`} value={isOpen ? "1" : "0"} />

            {isOpen ? (
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  name={`start-${i}`}
                  defaultValue={existing?.startTime ?? "09:00"}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:border-primary"
                />
                <span className="text-sm text-muted-foreground">to</span>
                <input
                  type="time"
                  name={`end-${i}`}
                  defaultValue={existing?.endTime ?? "17:00"}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">Closed</span>
            )}
          </div>
        );
      })}

      {state.error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
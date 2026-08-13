"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { addTimeOff, type TimeOffState } from "@/lib/actions/time-off";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
    >
      {pending ? "Saving\u2026" : "Block this time"}
    </Button>
  );
}

export function AddTimeOffDialog() {
  const [open, setOpen] = useState(false);
  const [allDay, setAllDay] = useState(true);
  const initialState: TimeOffState = {};
  const [state, formAction] = useActionState(addTimeOff, initialState);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!state.error) setOpen(false);
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 rounded-full">
          <Plus size={15} />
          Block time off
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Block time off</DialogTitle>
          <DialogDescription>
            Customers won&rsquo;t be able to book this, even during your normal hours.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" required />
          </div>

          <label className="flex items-center gap-2.5">
            <Switch checked={allDay} onCheckedChange={setAllDay} />
            <span className="text-sm text-foreground">All day</span>
          </label>
          <input type="hidden" name="allDay" value={allDay ? "1" : "0"} />

          {!allDay && (
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="startTime">From</Label>
                <Input id="startTime" name="startTime" type="time" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="endTime">To</Label>
                <Input id="endTime" name="endTime" type="time" />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reason">Reason (optional)</Label>
            <Input id="reason" name="reason" placeholder="e.g. Holiday, appointment" />
          </div>

          {state.error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.error}
            </p>
          )}

          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
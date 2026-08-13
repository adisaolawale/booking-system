"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { getAvailableSlots, to12h } from "@/lib/slots";

type Availability = { dayOfWeek: number; startTime: string; endTime: string };
type DayBooking = { date: string; startTime: string; duration: number };
type DayTimeOff = { date: string; startTime: string | null; endTime: string | null };

export function BookingFlow({
  slug,
  serviceId,
  durationMinutes,
  availability,
  bookings,
  timeOff,
}: {
  slug: string;
  serviceId: string;
  durationMinutes: number;
  availability: Availability[];
  bookings: DayBooking[];
  timeOff: DayTimeOff[];
}) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | null>(null);

  const slots = useMemo(() => {
    if (!date) return [];

    const bookingsForDay = bookings
      .filter((b) => new Date(b.date).toDateString() === date.toDateString())
      .map((b) => ({ startTime: b.startTime, duration: b.duration }));

    const timeOffForDay = timeOff
      .filter((t) => new Date(t.date).toDateString() === date.toDateString())
      .map((t) => ({ startTime: t.startTime, endTime: t.endTime }));

    return getAvailableSlots({ date, availability, bookingsForDay, timeOffForDay, durationMinutes });
  }, [date, availability, bookings, timeOff, durationMinutes]);

  function handleContinue() {
    if (!date || !time) return;
    const dateParam = date.toISOString().slice(0, 10);
    router.push(`/b/${slug}/details?service=${serviceId}&date=${dateParam}&time=${time}`);
  }

  return (
    <div className="grid gap-8 sm:grid-cols-[auto_1fr]">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(d) => {
          setDate(d);
          setTime(null);
        }}
        disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
        className="rounded-xl border border-border p-3"
      />

      <div className="flex min-w-0 flex-col">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">Choose Slot</h2>

        {slots.length === 0 ? (
          <p className="mb-6 flex-1 text-sm text-muted-foreground">
            No times available on this day &mdash; try another date.
          </p>
        ) : (
          <div className="mb-6 grid grid-cols-3 gap-2">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setTime(slot)}
                className={`rounded-lg py-2.5 font-mono text-sm transition-colors ${
                  time === slot
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-accent"
                }`}
              >
                {to12h(slot)}
              </button>
            ))}
          </div>
        )}

        <Button
          disabled={!date || !time}
          onClick={handleContinue}
          className="w-full rounded-xl bg-primary py-6 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Continue
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          You&rsquo;ll confirm your details on the next step.
        </p>
      </div>
    </div>
  );
}


// "use client";

// import { useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Calendar } from "@/components/ui/calendar";
// import { Button } from "@/components/ui/button";
// import { getAvailableSlots, to12h } from "@/lib/slots";

// type Availability = { dayOfWeek: number; startTime: string; endTime: string };
// type DayBooking = { date: string; startTime: string; duration: number };

// export function BookingFlow({
//   slug,
//   serviceId,
//   durationMinutes,
//   availability,
//   bookings,
// }: {
//   slug: string;
//   serviceId: string;
//   durationMinutes: number;
//   availability: Availability[];
//   bookings: DayBooking[];
// }) {
//   const router = useRouter();
//   const [date, setDate] = useState<Date | undefined>(new Date());
//   const [time, setTime] = useState<string | null>(null);

//   const slots = useMemo(() => {
//     if (!date) return [];
//     const bookingsForDay = bookings
//       .filter((b) => new Date(b.date).toDateString() === date.toDateString())
//       .map((b) => ({ startTime: b.startTime, duration: b.duration }));

//     return getAvailableSlots({ date, availability, bookingsForDay, durationMinutes });
//   }, [date, availability, bookings, durationMinutes]);

//   function handleContinue() {
//     if (!date || !time) return;
//     const dateParam = date.toISOString().slice(0, 10);
//     router.push(`/b/${slug}/details?service=${serviceId}&date=${dateParam}&time=${time}`);
//   }

//   return (
//     <div className="grid gap-8 sm:grid-cols-[auto_1fr]">
//       <Calendar
//         mode="single"
//         selected={date}
//         onSelect={(d) => {
//           setDate(d);
//           setTime(null);
//         }}
//         disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
//         className="rounded-xl border border-border p-3"
//       />

//       <div className="flex min-w-0 flex-col">
//         <h2 className="mb-4 text-sm font-medium text-muted-foreground">Choose Slot</h2>

//         {slots.length === 0 ? (
//           <p className="mb-6 flex-1 text-sm text-muted-foreground">
//             No times available on this day &mdash; try another date.
//           </p>
//         ) : (
//           <div className="mb-6 grid grid-cols-3 gap-2">
//             {slots.map((slot) => (
//               <button
//                 key={slot}
//                 type="button"
//                 onClick={() => setTime(slot)}
//                 className={`rounded-lg py-2.5 font-mono text-sm transition-colors ${
//                   time === slot
//                     ? "bg-primary text-primary-foreground"
//                     : "bg-muted text-foreground hover:bg-accent"
//                 }`}
//               >
//                 {to12h(slot)}
//               </button>
//             ))}
//           </div>
//         )}

//         <Button
//           disabled={!date || !time}
//           onClick={handleContinue}
//           className="w-full rounded-xl bg-primary py-6 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
//         >
//           Continue
//         </Button>
//         <p className="mt-3 text-center text-xs text-muted-foreground">
//           You&rsquo;ll confirm your details on the next step.
//         </p>
//       </div>
//     </div>
//   );
// }



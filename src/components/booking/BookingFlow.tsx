"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { getAvailableSlots, to12h } from "@/lib/slots";

type Availability = { dayOfWeek: number; startTime: string; endTime: string };
type DayBooking = { date: string; startTime: string; duration: number };

export function BookingFlow({
  slug,
  serviceId,
  durationMinutes,
  availability,
  bookings,
}: {
  slug: string;
  serviceId: string;
  durationMinutes: number;
  availability: Availability[];
  bookings: DayBooking[];
}) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | null>(null);

  const slots = useMemo(() => {
    if (!date) return [];
    const bookingsForDay = bookings
      .filter((b) => new Date(b.date).toDateString() === date.toDateString())
      .map((b) => ({ startTime: b.startTime, duration: b.duration }));

    return getAvailableSlots({ date, availability, bookingsForDay, durationMinutes });
  }, [date, availability, bookings, durationMinutes]);

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

// import { useState } from "react";

// export default function BookingFlow({ business, services }: { business: any; services: any[] }) {
//     const [selectedService, setSelectedService] = useState<any>(null);
//     const [date, setDate] = useState<any>("");
//     const [slots, setSlots] = useState<any>([]);
//     const [selectedSlot, setSelectedSlot] = useState<any>(null);

//     async function fetchSlots(serviceId: string, date: any) {
//         const res = await fetch(
//             `/api/availability?businessId=${business.id}&date=${date}&duration=${selectedService?.duration}`
//         );

//         const data = await res.json();
//         setSlots(data);
//     }

//     return (
//         <div className="mt-6">
//             {/* SERVICES */}
//             {!selectedService && (
//                 <div>
//                     <h2>Select a service</h2>
//                     {services.map((s: any) => (
//                         <button
//                             key={s.id}
//                             onClick={() => setSelectedService(s)}
//                             className="block border p-3 mt-2 w-full text-left"
//                         >
//                             {s.name} — ${s.price / 100}
//                         </button>
//                     ))}
//                 </div>
//             )}

//             {/* DATE */}
//             {selectedService && !date && (
//                 <div className="mt-6">
//                     <h2>Select a date</h2>
//                     <input
//                         type="date"
//                         onChange={(e) => {
//                             setDate(e.target.value);
//                             fetchSlots(selectedService.id, e.target.value);
//                         }}
//                     />
//                 </div>
//             )}

//             {/* TIME SLOTS */}
//             {slots.length > 0 && (
//                 <div className="mt-6">
//                     <h2>Select a time</h2>
//                     {slots.map((slot: any) => (
//                         <button
//                             key={slot.start}
//                             onClick={() => setSelectedSlot(slot)}
//                             className="border p-2 m-1"
//                         >
//                             {slot.start}
//                         </button>
//                     ))}
//                 </div>
//             )}


//             {selectedSlot && (
//                 <div className="mt-6">
//                     <h2>Your details</h2>

//                     <input placeholder="Name" id="name" />
//                     <input placeholder="Email" id="email" />

//                     <button
//                         onClick={async () => {
//                             const name = (document.getElementById("name") as any).value;
//                             const email = (document.getElementById("email") as any).value;

//                             const res = await fetch("/api/bookings", {
//                                 method: "POST",
//                                 body: JSON.stringify({
//                                     businessId: business.id,
//                                     serviceId: selectedService.id,
//                                     date,
//                                     startTime: selectedSlot.start,
//                                     endTime: selectedSlot.end,
//                                     customerName: name,
//                                     customerEmail: email,
//                                 }),
//                             });

//                             if (res.status === 409) {
//                                 alert("Slot already taken");
//                             } else {
//                                 alert("Booking confirmed!");
//                             }
//                         }}
//                     >
//                         Confirm Booking
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }
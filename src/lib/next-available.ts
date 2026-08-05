import type { Availability, Booking } from "@/generated/prisma";

/**
 * Very small first pass: finds the next open start time today (or the next
 * day that has an Availability row) that isn't already taken by a Booking.
 * Swap this out for real slot-splitting logic once duration-aware slots exist.
 */
export function getNextAvailableLabel(
  availability: Availability[],
  bookings: Booking[],
  now: Date = new Date()
): string | null {
  if (availability.length === 0) return null;

  for (let offset = 0; offset < 7; offset++) {
    const day = new Date(now);
    day.setDate(day.getDate() + offset);
    const dow = day.getDay();

    const dayAvailability = availability.find((a) => a.dayOfWeek === dow);
    if (!dayAvailability) continue;

    const takenTimes = new Set(
      bookings
        .filter((b) => sameDate(new Date(b.date), day))
        .map((b) => b.startTime)
    );

    const candidate = offset === 0
      ? nextHalfHourAfter(now, dayAvailability.startTime, dayAvailability.endTime)
      : dayAvailability.startTime;

    if (candidate && !takenTimes.has(candidate)) {
      const label = offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : day.toLocaleDateString(undefined, { weekday: "short" });
      return `${label} \u00b7 ${to12h(candidate)}`;
    }
  }

  return null;
}

function sameDate(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function nextHalfHourAfter(now: Date, start: string, end: string): string | null {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  let slot = Math.max(nowMinutes, startMinutes);
  slot = Math.ceil(slot / 30) * 30;

  if (slot >= endMinutes) return null;

  const h = Math.floor(slot / 60);
  const m = slot % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function to12h(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

// import { Availability, Booking } from "@/generated/prisma";


// /**
//  * Very small first pass: finds the next open start time today (or the next
//  * day that has an Availability row) that isn't already taken by a Booking.
//  * Swap this out for real slot-splitting logic once duration-aware slots exist.
//  */
// export function getNextAvailableLabel(
//   availability: Availability[],
//   bookings: Booking[],
//   now: Date = new Date()
// ): string | null {
//   if (availability.length === 0) return null;

//   for (let offset = 0; offset < 7; offset++) {
//     const day = new Date(now);
//     day.setDate(day.getDate() + offset);
//     const dow = day.getDay();

//     const dayAvailability = availability.find((a) => a.dayOfWeek === dow);
//     if (!dayAvailability) continue;

//     const takenTimes = new Set(
//       bookings
//         .filter((b) => sameDate(new Date(b.date), day))
//         .map((b) => b.startTime)
//     );

//     const candidate = offset === 0
//       ? nextHalfHourAfter(now, dayAvailability.startTime, dayAvailability.endTime)
//       : dayAvailability.startTime;

//     if (candidate && !takenTimes.has(candidate)) {
//       const label = offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : day.toLocaleDateString(undefined, { weekday: "short" });
//       return `${label} \u00b7 ${to12h(candidate)}`;
//     }
//   }

//   return null;
// }

// function sameDate(a: Date, b: Date) {
//   return a.toDateString() === b.toDateString();
// }

// function nextHalfHourAfter(now: Date, start: string, end: string): string | null {
//   const nowMinutes = now.getHours() * 60 + now.getMinutes();
//   const [startH, startM] = start.split(":").map(Number);
//   const [endH, endM] = end.split(":").map(Number);
//   const startMinutes = startH * 60 + startM;
//   const endMinutes = endH * 60 + endM;

//   let slot = Math.max(nowMinutes, startMinutes);
//   slot = Math.ceil(slot / 30) * 30;

//   if (slot >= endMinutes) return null;

//   const h = Math.floor(slot / 60);
//   const m = slot % 60;
//   return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
// }

// function to12h(time: string) {
//   const [h, m] = time.split(":").map(Number);
//   const period = h >= 12 ? "PM" : "AM";
//   const hour = h % 12 === 0 ? 12 : h % 12;
//   return `${hour}:${String(m).padStart(2, "0")} ${period}`;
// }
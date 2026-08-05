type Availability = { dayOfWeek: number; startTime: string; endTime: string };
type DayBooking = { startTime: string; duration: number };

const STEP_MINUTES = 30;

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function toTimeString(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function to12h(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function sameDate(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

/**
 * Generates bookable start times for one day: every 30 minutes inside the
 * business's availability window for that weekday, skipping anything that
 * would overlap an existing booking (matched by its own startTime + the
 * booked service's duration) or that's already in the past today.
 */
export function getAvailableSlots({
  date,
  availability,
  bookingsForDay,
  durationMinutes,
  now = new Date(),
}: {
  date: Date;
  availability: Availability[];
  bookingsForDay: DayBooking[];
  durationMinutes: number;
  now?: Date;
}): string[] {
  const dayAvailability = availability.find((a) => a.dayOfWeek === date.getDay());
  if (!dayAvailability) return [];

  const startMinutes = toMinutes(dayAvailability.startTime);
  const endMinutes = toMinutes(dayAvailability.endTime);

  const isToday = sameDate(date, now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const slots: string[] = [];
  for (let start = startMinutes; start + durationMinutes <= endMinutes; start += STEP_MINUTES) {
    if (isToday && start <= nowMinutes) continue;

    const end = start + durationMinutes;
    const overlaps = bookingsForDay.some((b) => {
      const bStart = toMinutes(b.startTime);
      const bEnd = bStart + b.duration;
      return start < bEnd && end > bStart;
    });

    if (!overlaps) slots.push(toTimeString(start));
  }

  return slots;
}
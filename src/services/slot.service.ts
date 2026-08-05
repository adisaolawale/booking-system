export function generateTimeSlots(
  start: string,
  end: string,
  duration: number
) {
  const slots = [];

  let current = new Date(`1970-01-01T${start}:00`);
  const endTime = new Date(`1970-01-01T${end}:00`);

  while (current < endTime) {
    const slotStart = new Date(current);
    const slotEnd = new Date(current.getTime() + duration * 60000);

    if (slotEnd > endTime) break;

    slots.push({
      start: slotStart.toTimeString().slice(0, 5),
      end: slotEnd.toTimeString().slice(0, 5),
    });

    current = slotEnd;
  }

  return slots;
}
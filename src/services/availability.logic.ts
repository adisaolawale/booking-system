import { prisma } from "@/lib/prisma";

export async function getAvailableSlots({
  businessId,
  date,
  serviceDuration,
}) {
  const day = new Date(date).getDay();

  const availability = await prisma.availability.findFirst({
    where: { businessId, dayOfWeek: day },
  });

  if (!availability) return [];

  const slots = generateTimeSlots(
    availability.startTime,
    availability.endTime,
    serviceDuration
  );

  const bookings = await prisma.booking.findMany({
    where: {
      businessId,
      date: new Date(date),
    },
  });

  return slots.filter((slot) => {
    return !bookings.some((booking) => {
      return booking.startTime === slot.start;
    });
  });
}
import { prisma } from "@/lib/prisma";
import { getAvailableSlots } from "@/lib/slots";

export class BookingError extends Error {
  constructor(public code: "SERVICE_UNAVAILABLE" | "SLOT_UNAVAILABLE" | "SLOT_TAKEN") { super(code); }
}
const addMin = (t: string, m: number) => {
  const [h, mm] = t.split(":").map(Number), tot = h * 60 + mm + m;
  return `${String(Math.floor(tot / 60)).padStart(2, "0")}:${String(tot % 60).padStart(2, "0")}`;
};

export async function createBooking(
  i: { serviceId: string; date: string; time: string; notes?: string }, userId: string,
) {
  const service = await prisma.service.findFirst({
    where: { id: i.serviceId, isActive: true }, include: { business: { select: { id: true, slug: true } } },
  });
  if (!service) throw new BookingError("SERVICE_UNAVAILABLE");

  const day = new Date(`${i.date}T00:00:00.000Z`);
  const businessId = service.business.id;

  try {
    return await prisma.$transaction(async (tx) => {
      // serialize concurrent bookings for this business+day so overlap checks are race-free
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${businessId + i.date}))`;

      const [availability, existing, timeOff] = await Promise.all([
        tx.availability.findMany({ where: { businessId } }),
        tx.booking.findMany({ where: { businessId, date: day, status: { not: "CANCELLED" } },
          select: { startTime: true, service: { select: { duration: true } } } }),
        tx.timeOff.findMany({ where: { businessId, date: day } }),
      ]);

      const slots = getAvailableSlots({
        date: day, availability, timeOffForDay: timeOff, durationMinutes: service.duration,
        bookingsForDay: existing.map((b) => ({ startTime: b.startTime, duration: b.service.duration })),
      });
      if (!slots.includes(i.time)) throw new BookingError("SLOT_UNAVAILABLE");

      const booking = await tx.booking.create({ data: {
        businessId, serviceId: service.id, userId, date: day,
        startTime: i.time, endTime: addMin(i.time, service.duration), notes: i.notes ?? null } });
      return { id: booking.id, slug: service.business.slug! };
    });
  } catch (e) {
    if ((e as { code?: string }).code === "P2002") throw new BookingError("SLOT_TAKEN");
    throw e;
  }
}
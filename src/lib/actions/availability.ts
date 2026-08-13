"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export type AvailabilityState = { error?: string };

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export async function saveWeeklyAvailability(
  _prevState: AvailabilityState,
  formData: FormData
): Promise<AvailabilityState> {
  const session = await auth();
  if (!session || session.user.role !== "OWNER") return { error: "Not authorized." };

  const business = await prisma.business.findFirst({ where: { ownerId: session.user.id } });
  if (!business) return { error: "No business found for this account." };

  // Validate everything before writing anything.
  const days = Array.from({ length: 7 }, (_, i) => i);
  const parsed = days.map((day) => {
    const isOpen = formData.get(`open-${day}`) === "1";
    const start = formData.get(`start-${day}`) as string | null;
    const end = formData.get(`end-${day}`) as string | null;
    return { day, isOpen, start, end };
  });

  for (const { day, isOpen, start, end } of parsed) {
    if (isOpen && (!start || !end || start >= end)) {
      return { error: `Enter a valid time range for ${DAY_NAMES[day]}.` };
    }
  }

  try {
    await prisma.$transaction(
      async (tx) => {
        for (const { day, isOpen, start, end } of parsed) {
          const existing = await tx.availability.findFirst({
            where: { businessId: business.id, dayOfWeek: day },
          });

          if (!isOpen) {
            if (existing) await tx.availability.delete({ where: { id: existing.id } });
            continue;
          }

          if (existing) {
            await tx.availability.update({
              where: { id: existing.id },
              data: { startTime: start!, endTime: end! },
            });
          } else {
            await tx.availability.create({
              data: { businessId: business.id, dayOfWeek: day, startTime: start!, endTime: end! },
            });
          }
        }
      },
      // Default 5000ms is too tight if the DB connection has to wake from
      // an idle/suspended state — same issue we hit earlier with the
      // verification flow.
      { timeout: 20000, maxWait: 10000 }
    );
  } catch {
    return { error: "Something went wrong saving your hours. Please try again." };
  }

  revalidatePath("/business/availability");
  revalidatePath("/business");
  return {};
}
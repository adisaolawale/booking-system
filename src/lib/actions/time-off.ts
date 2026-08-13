"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export type TimeOffState = { error?: string };

async function getOwnedBusiness(userId: string) {
  return prisma.business.findFirst({ where: { ownerId: userId } });
}

export async function addTimeOff(
  _prevState: TimeOffState,
  formData: FormData
): Promise<TimeOffState> {
  const session = await auth();
  if (!session || session.user.role !== "OWNER") return { error: "Not authorized." };

  const business = await getOwnedBusiness(session.user.id);
  if (!business) return { error: "No business found for this account." };

  const date = formData.get("date") as string;
  const allDay = formData.get("allDay") === "1";
  const startTime = allDay ? null : (formData.get("startTime") as string) || null;
  const endTime = allDay ? null : (formData.get("endTime") as string) || null;
  const reason = (formData.get("reason") as string)?.trim() || null;

  if (!date) return { error: "Pick a date." };
  if (!allDay && (!startTime || !endTime || startTime >= endTime)) {
    return { error: "Enter a valid time range, or mark it all day." };
  }

  await prisma.timeOff.create({
    data: {
      businessId: business.id,
      date: new Date(date),
      startTime,
      endTime,
      reason,
    },
  });

  revalidatePath("/business/availability");
  return {};
}

export async function removeTimeOff(timeOffId: string) {
  const session = await auth();
  if (!session || session.user.role !== "OWNER") throw new Error("Not authorized");

  const timeOff = await prisma.timeOff.findUnique({
    where: { id: timeOffId },
    include: { business: true },
  });
  if (!timeOff || timeOff.business.ownerId !== session.user.id) {
    throw new Error("Not found");
  }

  await prisma.timeOff.delete({ where: { id: timeOffId } });
  revalidatePath("/business/availability");
}
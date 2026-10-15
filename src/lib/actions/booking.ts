"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { limit } from "@/server/lib/rate-limit";
import { createBookingSchema } from "@/server/validation/booking";
import {
  createBooking as createBookingRecord,
  BookingError,
} from "@/server/services/booking.service";

export type DetailsFormState = { error?: string };

const MESSAGES: Record<BookingError["code"], string> = {
  SERVICE_UNAVAILABLE: "That service is no longer available.",
  SLOT_UNAVAILABLE: "That time isn't available. Please pick another slot.",
  SLOT_TAKEN: "That time was just booked by someone else. Please pick another slot.",
};

export async function createBooking(
  _prev: DetailsFormState,
  formData: FormData
): Promise<DetailsFormState> {
  const f = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" && v.trim() ? v.trim() : undefined;
  };

  const parsed = createBookingSchema.safeParse({
    serviceId: f("serviceId"),
    date: f("date"),
    time: f("time"),
    notes: f("notes"),
    name: f("name"),
    email: f("email"),
  });
  if (!parsed.success) return { error: "Please check your details and try again." };

  if (!(await limit("booking"))) {
    return { error: "Too many attempts. Please try again shortly." };
  }

  const session = await auth();
  let userId = session?.user?.id;

  if (!userId) {
    const { name, email } = parsed.data;
    if (!name || !email) return { error: "Your name and email are required." };

    const existing = await prisma.user.findUnique({
      where: { email },
      omit: { password: false },
    });
    if (existing?.password) {
      return { error: "That email has an account. Please sign in to book." };
    }
    userId = existing
      ? existing.id
      : (await prisma.user.create({ data: { name, email, role: "CUSTOMER" } })).id;
  }

  let result: { id: string; slug: string };
  try {
    result = await createBookingRecord(parsed.data, userId);
  } catch (e) {
    if (e instanceof BookingError) return { error: MESSAGES[e.code] };
    throw e;
  }

  redirect(`/b/${result.slug}/success?booking=${result.id}`);
}




// "use server";

// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth";

// export type DetailsFormState = {
//   error?: string;
// };

// function addMinutes(time: string, minutes: number) {
//   const [h, m] = time.split(":").map(Number);
//   const total = h * 60 + m + minutes;
//   const hh = Math.floor(total / 60) % 24;
//   const mm = total % 60;
//   return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
// }

// export async function createBooking(
//   _prevState: DetailsFormState,
//   formData: FormData
// ): Promise<DetailsFormState> {
//   const slug = formData.get("slug") as string;
//   const businessId = formData.get("businessId") as string;
//   const serviceId = formData.get("serviceId") as string;
//   const date = formData.get("date") as string;
//   const startTime = formData.get("time") as string;
//   const notes = (formData.get("notes") as string)?.trim() || null;

//   if (!slug || !businessId || !serviceId || !date || !startTime) {
//     return { error: "Missing booking details — please start over from the services page." };
//   }

//   const service = await prisma.service.findUnique({ where: { id: serviceId } });
//   if (!service) {
//     return { error: "That service no longer exists." };
//   }

//   const endTime = addMinutes(startTime, service.duration);
//   const session = await auth();

//   let userId: string;

//   if (session) {
//     // Already have a real account — attach directly, no guest logic needed.
//     userId = session.user.id;
//   } else {
//     const name = (formData.get("name") as string)?.trim();
//     const email = (formData.get("email") as string)?.trim().toLowerCase();

//     if (!name || !email) {
//       return { error: "Name and email are required." };
//     }

//     // Guest checkout: reuse a User row by email if one exists (a returning
//     // guest, or a shell from a previous guest booking), otherwise create
//     // one with no password. It can't log in on its own — it just satisfies
//     // the required Booking.userId relation. If this person later registers
//     // with this same email, registerUser upgrades this shell in place
//     // rather than treating it as a duplicate account.
//     const user = await prisma.user.upsert({
//       where: { email },
//       update: { name },
//       create: { name, email, role: "CUSTOMER" },
//     });
//     userId = user.id;
//   }

//   let booking;
//   try {
//     booking = await prisma.booking.create({
//       data: {
//         businessId,
//         serviceId,
//         userId,
//         date: new Date(date),
//         startTime,
//         endTime,
//         notes,
//       },
//     });
//   } catch (err: unknown) {
//     if (typeof err === "object" && err !== null && "code" in err && err.code === "P2002") {
//       return { error: "That time was just booked by someone else — please pick another slot." };
//     }
//     throw err;
//   }

//   redirect(`/b/${slug}/success?booking=${booking.id}`);
// }



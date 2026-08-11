"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export type ServiceFormState = { error?: string };

async function getOwnedBusiness(userId: string) {
  return prisma.business.findFirst({ where: { ownerId: userId } });
}

export async function createService(
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const session = await auth();
  if (!session || session.user.role !== "OWNER") return { error: "Not authorized." };

  const business = await getOwnedBusiness(session.user.id);
  if (!business) return { error: "No business found for this account." };

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const priceDollars = parseFloat(formData.get("price") as string);
  const duration = parseInt(formData.get("duration") as string, 10);

  if (!title) return { error: "Service name is required." };
  if (Number.isNaN(priceDollars) || priceDollars < 0) return { error: "Enter a valid price." };
  if (Number.isNaN(duration) || duration <= 0) {
    return { error: "Enter a valid duration in minutes." };
  }

  await prisma.service.create({
    data: {
      businessId: business.id,
      title,
      description,
      price: Math.round(priceDollars * 100),
      duration,
    },
  });

  revalidatePath("/business/services");
  revalidatePath("/business");
  return {};
}

export async function updateService(
  serviceId: string,
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const session = await auth();
  if (!session || session.user.role !== "OWNER") return { error: "Not authorized." };

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: { business: true },
  });
  if (!service || service.business.ownerId !== session.user.id) {
    return { error: "Service not found." };
  }

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const priceDollars = parseFloat(formData.get("price") as string);
  const duration = parseInt(formData.get("duration") as string, 10);

  if (!title) return { error: "Service name is required." };
  if (Number.isNaN(priceDollars) || priceDollars < 0) return { error: "Enter a valid price." };
  if (Number.isNaN(duration) || duration <= 0) {
    return { error: "Enter a valid duration in minutes." };
  }

  await prisma.service.update({
    where: { id: serviceId },
    data: {
      title,
      description,
      price: Math.round(priceDollars * 100),
      duration,
    },
  });

  revalidatePath("/business/services");
  revalidatePath("/business");
  return {};
}

export async function deleteService(serviceId: string) {
  const session = await auth();
  if (!session || session.user.role !== "OWNER") throw new Error("Not authorized");

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: { business: true },
  });
  if (!service || service.business.ownerId !== session.user.id) {
    throw new Error("Service not found");
  }

  try {
    await prisma.service.delete({ where: { id: serviceId } });
  } catch (err: unknown) {
    // P2003 = foreign key constraint failed — this service has existing
    // Booking rows pointing at it. A hard delete would either fail or
    // orphan those bookings, so archive instead: hidden from customers,
    // intact for booking history.
    if (typeof err === "object" && err !== null && "code" in err && err.code === "P2003") {
      await prisma.service.update({ where: { id: serviceId }, data: { isActive: false } });
    } else {
      throw err;
    }
  }

  revalidatePath("/business/services");
  revalidatePath("/business");
}

export async function reactivateService(serviceId: string) {
  const session = await auth();
  if (!session || session.user.role !== "OWNER") throw new Error("Not authorized");

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: { business: true },
  });
  if (!service || service.business.ownerId !== session.user.id) {
    throw new Error("Service not found");
  }

  await prisma.service.update({ where: { id: serviceId }, data: { isActive: true } });

  revalidatePath("/business/services");
  revalidatePath("/business");
}



// "use server";

// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { auth } from "@/lib/auth";

// export type ServiceFormState = { error?: string };

// async function getOwnedBusiness(userId: string) {
//   return prisma.business.findFirst({ where: { ownerId: userId } });
// }

// export async function createService(
//   _prevState: ServiceFormState,
//   formData: FormData
// ): Promise<ServiceFormState> {
//   const session = await auth();
//   if (!session || session.user.role !== "OWNER") return { error: "Not authorized." };

//   const business = await getOwnedBusiness(session.user.id);
//   if (!business) return { error: "No business found for this account." };

//   const title = (formData.get("title") as string)?.trim();
//   const description = (formData.get("description") as string)?.trim() || null;
//   const priceDollars = parseFloat(formData.get("price") as string);
//   const duration = parseInt(formData.get("duration") as string, 10);

//   if (!title) return { error: "Service name is required." };
//   if (Number.isNaN(priceDollars) || priceDollars < 0) return { error: "Enter a valid price." };
//   if (Number.isNaN(duration) || duration <= 0) {
//     return { error: "Enter a valid duration in minutes." };
//   }

//   await prisma.service.create({
//     data: {
//       businessId: business.id,
//       title,
//       description,
//       price: Math.round(priceDollars * 100),
//       duration,
//     },
//   });

//   revalidatePath("/business/services");
//   revalidatePath("/business");
//   return {};
// }

// export async function updateService(
//   serviceId: string,
//   _prevState: ServiceFormState,
//   formData: FormData
// ): Promise<ServiceFormState> {
//   const session = await auth();
//   if (!session || session.user.role !== "OWNER") return { error: "Not authorized." };

//   const service = await prisma.service.findUnique({
//     where: { id: serviceId },
//     include: { business: true },
//   });
//   if (!service || service.business.ownerId !== session.user.id) {
//     return { error: "Service not found." };
//   }

//   const title = (formData.get("title") as string)?.trim();
//   const description = (formData.get("description") as string)?.trim() || null;
//   const priceDollars = parseFloat(formData.get("price") as string);
//   const duration = parseInt(formData.get("duration") as string, 10);

//   if (!title) return { error: "Service name is required." };
//   if (Number.isNaN(priceDollars) || priceDollars < 0) return { error: "Enter a valid price." };
//   if (Number.isNaN(duration) || duration <= 0) {
//     return { error: "Enter a valid duration in minutes." };
//   }

//   await prisma.service.update({
//     where: { id: serviceId },
//     data: {
//       title,
//       description,
//       price: Math.round(priceDollars * 100),
//       duration,
//     },
//   });

//   revalidatePath("/business/services");
//   revalidatePath("/business");
//   return {};
// }

// export async function deleteService(serviceId: string) {
//   const session = await auth();
//   if (!session || session.user.role !== "OWNER") throw new Error("Not authorized");

//   const service = await prisma.service.findUnique({
//     where: { id: serviceId },
//     include: { business: true },
//   });
//   if (!service || service.business.ownerId !== session.user.id) {
//     throw new Error("Service not found");
//   }

//   try {
//     await prisma.service.delete({ where: { id: serviceId } });
//   } catch (err: unknown) {
//     // P2003 = foreign key constraint failed — this service has existing
//     // Booking rows pointing at it. A hard delete would either fail or
//     // orphan those bookings, so archive instead: hidden from customers,
//     // intact for booking history.
//     if (typeof err === "object" && err !== null && "code" in err && err.code === "P2003") {
//       await prisma.service.update({ where: { id: serviceId }, data: { isActive: false } });
//     } else {
//       throw err;
//     }
//   }

//   revalidatePath("/business/services");
//   revalidatePath("/business");
// }

// export async function reactivateService(serviceId: string) {
//   const session = await auth();
//   if (!session || session.user.role !== "OWNER") throw new Error("Not authorized");

//   const service = await prisma.service.findUnique({
//     where: { id: serviceId },
//     include: { business: true },
//   });
//   if (!service || service.business.ownerId !== session.user.id) {
//     throw new Error("Service not found");
//   }

//   await prisma.service.update({ where: { id: serviceId }, data: { isActive: true } });

//   revalidatePath("/business/services");
//   revalidatePath("/business");
// }
// src/server/services/registration.service.ts
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generatePin, sha256 } from "@/server/lib/tokens";
import { sendVerificationEmail } from "@/lib/verification";
import { uniqueSlug } from "@/server/services/slug";

export async function startRegistration(i: {
  name: string; email: string; password: string; tab: "customer" | "business";
  businessName?: string; businessDescription?: string; categoryId?: string;
}) {
  const existing = await prisma.user.findUnique({
    where: { email: i.email }, omit: { password: false },
  });
  // Registered, verified account => refuse. A passwordless guest shell is fine to claim,
  // but only after the PIN proves mailbox ownership.
  if (existing?.password) return { error: "ACCOUNT_EXISTS" as const };

  const pin = generatePin();
  await prisma.pendingRegistration.upsert({   // upsert = only ONE valid PIN per email
    where: { email: i.email },
    create: { email: i.email, codeHash: sha256(pin), passwordHash: await bcrypt.hash(i.password, 12),
      name: i.name, tab: i.tab, businessName: i.businessName,
      businessDescription: i.businessDescription, categoryId: i.categoryId,
      expires: new Date(Date.now() + 10 * 60_000) },
    update: { codeHash: sha256(pin), passwordHash: await bcrypt.hash(i.password, 12),
      name: i.name, tab: i.tab, businessName: i.businessName,
      businessDescription: i.businessDescription, categoryId: i.categoryId,
      attempts: 0, expires: new Date(Date.now() + 10 * 60_000) },
  });
  await sendVerificationEmail(i.email, pin);
  return { ok: true as const };
}

export async function completeRegistration(email: string, code: string) {
  const p = await prisma.pendingRegistration.findUnique({ where: { email } });
  if (!p || p.expires < new Date() || p.attempts >= 5) return { error: "INVALID" as const };

  if (p.codeHash !== sha256(code)) {
    await prisma.pendingRegistration.update({ where: { email }, data: { attempts: { increment: 1 } } });
    return { error: "INVALID" as const };
  }

  await prisma.$transaction(async (tx) => {
    const role = p.tab === "business" ? "OWNER" : "CUSTOMER";
    const user = await tx.user.upsert({
      where: { email },
      create: { email, name: p.name, password: p.passwordHash, role, emailVerified: new Date() },
      update: { name: p.name, password: p.passwordHash, role, emailVerified: new Date() },
    });
    if (p.tab === "business" && p.businessName && p.categoryId) {
      await tx.business.create({ data: {
        name: p.businessName, description: p.businessDescription, categoryId: p.categoryId,
        ownerId: user.id, slug: await uniqueSlug(tx, p.businessName),   // fixes F-03
      }});
    }
    await tx.pendingRegistration.delete({ where: { email } });
  });
  return { ok: true as const };
}
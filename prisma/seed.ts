import { prisma } from "./config.js"


async function main() {
  // 1. Create user (owner)
  const user = await prisma.user.create({
    data: {
      name: "Olawale",
      email: "admin@test.com",
      role: "ADMIN",
    },
  });

  // 2. Create business
  const business = await prisma.business.create({
    data: {
      name: "Elite Barber Shop",
      description: "Premium grooming services",
      slug: "elite-barber-shop",
      ownerId: user.id,
    },
  });

  // 3. Create services
  const services = await prisma.service.createMany({
    data: [
      {
        title: "Haircut",
        price: 20,
        duration: 30,
        businessId: business.id,
      },
      {
        title: "Beard Trim",
        price: 15,
        duration: 20,
        businessId: business.id,
      },
      {
        title: "Full Grooming",
        price: 40,
        duration: 60,
        businessId: business.id,
      },
    ],
  });

  // 4. Create availability (Mon–Fri 9–5)
  await prisma.availability.createMany({
    data: [
      { businessId: business.id, dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
      { businessId: business.id, dayOfWeek: 2, startTime: "09:00", endTime: "17:00" },
      { businessId: business.id, dayOfWeek: 3, startTime: "09:00", endTime: "17:00" },
      { businessId: business.id, dayOfWeek: 4, startTime: "09:00", endTime: "17:00" },
      { businessId: business.id, dayOfWeek: 5, startTime: "09:00", endTime: "17:00" },
    ],
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
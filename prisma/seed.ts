import { prisma } from "./config.js"

const CATEGORIES = [
  "Hair & Barbering",
  "Nails & Beauty",
  "Massage & Spa",
  "Yoga & Fitness",
  "Personal Training",
  "Tutoring & Lessons",
  "Coaching & Consulting",
  "Photography",
  "Pet Grooming",
  "Home & Repair Services",
  "Health & Wellness",
  "Events & Entertainment",
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  for (const name of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: { name, slug: slugify(name) },
    });
  }
  console.log(`Seeded ${CATEGORIES.length} categories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
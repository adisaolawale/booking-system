import { prisma } from "./config.js"

// Icon values must match a key exported from src/lib/category-icons.tsx
const CATEGORIES: { name: string; icon: string }[] = [
  { name: "Hair & Barbering", icon: "Scissors" },
  { name: "Nails & Beauty", icon: "Sparkles" },
  { name: "Massage & Spa", icon: "Flower2" },
  { name: "Yoga & Fitness", icon: "PersonStanding" },
  { name: "Personal Training", icon: "Dumbbell" },
  { name: "Tutoring & Lessons", icon: "GraduationCap" },
  { name: "Coaching & Consulting", icon: "Briefcase" },
  { name: "Photography", icon: "Camera" },
  { name: "Pet Grooming", icon: "PawPrint" },
  { name: "Home & Repair Services", icon: "Wrench" },
  { name: "Health & Wellness", icon: "HeartPulse" },
  { name: "Events & Entertainment", icon: "PartyPopper" },
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  for (const { name, icon } of CATEGORIES) {
    const slug = slugify(name);
    await prisma.category.upsert({
      where: { slug },
      update: { icon },
      create: { name, slug, icon },
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
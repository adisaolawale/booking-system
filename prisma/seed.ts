import { prisma } from "./config.js";
import { hash } from "bcryptjs";

// ─────────────────────────────────────────────
// Categories (same 12 names already in the DB)
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// Users (owners) – password for ALL: Adisa@123
// ─────────────────────────────────────────────
const USERS = [
  {
    name: "Elena Marsh",
    email: "elena@lumenyoga.com",
    role: "OWNER" as const,
  },
  {
    name: "Marcus Field",
    email: "marcus@fadeandco.com",
    role: "OWNER" as const,
  },
  {
    name: "Priya Chandran",
    email: "priya@chandrantutoring.com",
    role: "OWNER" as const,
  },
  {
    name: "Diego Alvarez",
    email: "diego@selfmassage.com",
    role: "OWNER" as const,
  },
  {
    name: "Hannah Wu",
    email: "hannah@pulsepilates.com",
    role: "OWNER" as const,
  },
];

// ─────────────────────────────────────────────
// Businesses (5) – category is assigned later by ID
// ─────────────────────────────────────────────
const BUSINESSES = [
  {
    name: "Lumen Yoga",
    description:
      "A calm, light-filled studio offering vinyasa, yin and restorative classes for every level.",
    slug: "lumen-yoga",
    ownerEmail: "elena@lumenyoga.com",
  },
  {
    name: "Fade & Co Barbershop",
    description:
      "Classic cuts, modern fades and hot-towel shaves in a relaxed neighbourhood barbershop.",
    slug: "fade-and-co",
    ownerEmail: "marcus@fadeandco.com",
  },
  {
    name: "Chandran Tutoring",
    description:
      "One-to-one and small-group tutoring in maths, science and exam preparation for secondary students.",
    slug: "chandran-tutoring",
    ownerEmail: "priya@chandrantutoring.com",
  },
  {
    name: "Alvarez Therapeutic Massage",
    description:
      "Deep-tissue, sports and Swedish massage focused on recovery and long-term mobility.",
    slug: "alvarez-massage",
    ownerEmail: "diego@selfmassage.com",
  },
  {
    name: "Pulse Pilates",
    description:
      "Reformer and mat pilates classes designed to build strength, posture and body awareness.",
    slug: "pulse-pilates",
    ownerEmail: "hannah@pulsepilates.com",
  },
];

// ─────────────────────────────────────────────
// Services – 5 per business
// ─────────────────────────────────────────────
const SERVICES_BY_BUSINESS: Record<
  string,
  { title: string; description: string; price: number; duration: number }[]
> = {
  "lumen-yoga": [
    {
      title: "Vinyasa Flow (60 min)",
      description: "Dynamic breath-linked movement suitable for all levels.",
      price: 2500,
      duration: 60,
    },
    {
      title: "Yin Yoga (75 min)",
      description: "Long-held poses that target deep connective tissue.",
      price: 2800,
      duration: 75,
    },
    {
      title: "Restorative Session",
      description: "Supported poses with props for full nervous-system reset.",
      price: 3000,
      duration: 75,
    },
    {
      title: "Private 1:1 Yoga",
      description: "Personalised session tailored to your goals and body.",
      price: 7500,
      duration: 60,
    },
    {
      title: "Intro Workshop",
      description: "90-minute foundational workshop for absolute beginners.",
      price: 3500,
      duration: 90,
    },
  ],
  "fade-and-co": [
    {
      title: "Classic Haircut",
      description: "Wash, cut and style with hot towel finish.",
      price: 3500,
      duration: 45,
    },
    {
      title: "Skin Fade",
      description: "Precision skin fade with detailed finishing.",
      price: 4000,
      duration: 50,
    },
    {
      title: "Hot Towel Shave",
      description: "Traditional straight-razor shave with hot towels.",
      price: 3000,
      duration: 40,
    },
    {
      title: "Cut + Beard Trim",
      description: "Full haircut combined with beard shaping and oil.",
      price: 5000,
      duration: 60,
    },
    {
      title: "Kids Cut (under 12)",
      description: "Quick, friendly cut for younger clients.",
      price: 2000,
      duration: 30,
    },
  ],
  "chandran-tutoring": [
    {
      title: "Maths 1:1 (60 min)",
      description: "Secondary-level maths tutoring focused on weak areas.",
      price: 4500,
      duration: 60,
    },
    {
      title: "Science 1:1 (60 min)",
      description: "Physics, chemistry or biology support.",
      price: 4500,
      duration: 60,
    },
    {
      title: "Exam Prep Intensive",
      description: "90-minute focused revision and past-paper practice.",
      price: 6500,
      duration: 90,
    },
    {
      title: "Small Group Session",
      description: "Up to 4 students, same subject and level.",
      price: 2500,
      duration: 60,
    },
    {
      title: "Homework Help Drop-in",
      description: "30-minute targeted help with current assignments.",
      price: 2500,
      duration: 30,
    },
  ],
  "alvarez-massage": [
    {
      title: "Swedish Massage (60 min)",
      description: "Classic full-body relaxation massage.",
      price: 6000,
      duration: 60,
    },
    {
      title: "Deep Tissue (60 min)",
      description: "Focused work on chronic tension and knots.",
      price: 7000,
      duration: 60,
    },
    {
      title: "Sports Recovery (75 min)",
      description: "Pre/post event or training recovery massage.",
      price: 8500,
      duration: 75,
    },
    {
      title: "Neck & Shoulders Focus",
      description: "45-minute targeted upper-body session.",
      price: 4500,
      duration: 45,
    },
    {
      title: "Couples Massage",
      description: "Side-by-side 60-minute sessions for two people.",
      price: 12000,
      duration: 60,
    },
  ],
  "pulse-pilates": [
    {
      title: "Reformer Group Class",
      description: "Small-group reformer class (max 6).",
      price: 3500,
      duration: 55,
    },
    {
      title: "Mat Pilates",
      description: "Classic mat work focusing on core and alignment.",
      price: 2500,
      duration: 50,
    },
    {
      title: "Private Reformer",
      description: "One-to-one reformer session with full attention.",
      price: 8000,
      duration: 55,
    },
    {
      title: "Duets Session",
      description: "Shared private session for two people.",
      price: 5000,
      duration: 55,
    },
    {
      title: "Intro to Pilates",
      description: "Foundational private session for complete beginners.",
      price: 6000,
      duration: 60,
    },
  ],
};

const PASSWORD = "Adisa@123";

async function main() {
  console.log("🔐 Hashing password...");
  const hashedPassword = await hash(PASSWORD, 12);

  // 1. Ensure the 12 categories exist
  console.log("\n📂 Ensuring categories exist...");
  for (const name of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: { name, slug: slugify(name) },
    });
  }

  // 2. Fetch ALL categories with their real IDs from the database
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  console.log(`   ✓ Found ${categories.length} categories in DB:`);
  categories.forEach((c) => console.log(`     - ${c.name} → ${c.id}`));

  if (categories.length === 0) {
    throw new Error("No categories found in the database. Cannot continue.");
  }

  // 3. Seed users
  console.log("\n👤 Seeding users...");
  const userMap = new Map<string, string>(); // email → id

  for (const u of USERS) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        password: hashedPassword,
        role: u.role,
      },
      create: {
        name: u.name,
        email: u.email,
        password: hashedPassword,
        role: u.role,
      },
    });
    userMap.set(u.email, user.id);
    console.log(`   ✓ ${u.name} <${u.email}>`);
  }

  // 4. Seed businesses – assign categoryId from the fetched list
  console.log("\n🏪 Seeding businesses & services...");

  for (let i = 0; i < BUSINESSES.length; i++) {
    const b = BUSINESSES[i];
    const ownerId = userMap.get(b.ownerEmail);

    if (!ownerId) {
      console.error(`   ✗ Owner not found for ${b.name}`);
      continue;
    }

    // Pick a category ID from the array (cycle through the 12)
    const category = categories[i % categories.length];

    const business = await prisma.business.upsert({
      where: { slug: b.slug },
      update: {
        name: b.name,
        description: b.description,
        ownerId,
        categoryId: category.id,
      },
      create: {
        name: b.name,
        description: b.description,
        slug: b.slug,
        ownerId,
        categoryId: category.id,
      },
    });

    console.log(
      `   ✓ Business: ${business.name} → category: ${category.name} (${category.id})`
    );

    // 5. Create / update 5 services for this business
    const services = SERVICES_BY_BUSINESS[b.slug] ?? [];
    for (const s of services) {
      const existing = await prisma.service.findFirst({
        where: { businessId: business.id, title: s.title },
      });

      if (existing) {
        await prisma.service.update({
          where: { id: existing.id },
          data: {
            description: s.description,
            price: s.price,
            duration: s.duration,
          },
        });
      } else {
        await prisma.service.create({
          data: {
            title: s.title,
            description: s.description,
            price: s.price,
            duration: s.duration,
            businessId: business.id,
          },
        });
      }
    }
    console.log(`     → ${services.length} services`);
  }

  console.log("\n✅ Seed complete!");
  console.log(`   Password for every user: ${PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

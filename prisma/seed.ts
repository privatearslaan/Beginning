import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database");
}

const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);
  const customerHash = await bcrypt.hash("customer123", 12);

  await db.user.upsert({
    where: { email: "admin@pawfectpets.com" },
    update: {},
    create: {
      email: "admin@pawfectpets.com",
      name: "Admin User",
      passwordHash,
      role: "ADMIN",
    },
  });

  await db.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      email: "customer@example.com",
      name: "Jane Customer",
      passwordHash: customerHash,
      role: "CUSTOMER",
    },
  });

  const products = [
    {
      name: "Premium Dog Food",
      slug: "premium-dog-food",
      description:
        "High-quality dry dog food with real chicken, vitamins, and minerals for adult dogs.",
      price: 1299,
      stock: 50,
      category: "FOOD" as const,
      petType: "DOG" as const,
      images: ["/placeholder-product.svg"],
      featured: true,
    },
    {
      name: "Cat Scratching Post",
      slug: "cat-scratching-post",
      description:
        "Durable sisal scratching post with a cozy perch on top for your feline friend.",
      price: 899,
      stock: 30,
      category: "TOYS" as const,
      petType: "CAT" as const,
      images: ["/placeholder-product.svg"],
      featured: true,
    },
    {
      name: "Bird Seed Mix",
      slug: "bird-seed-mix",
      description:
        "Nutritious blend of seeds for parakeets, canaries, and other small birds.",
      price: 349,
      stock: 100,
      category: "FOOD" as const,
      petType: "BIRD" as const,
      images: ["/placeholder-product.svg"],
      featured: true,
    },
    {
      name: "Aquarium Starter Kit",
      slug: "aquarium-starter-kit",
      description:
        "Complete 10-gallon aquarium kit with filter, heater, and LED lighting.",
      price: 2499,
      stock: 15,
      category: "ACCESSORIES" as const,
      petType: "FISH" as const,
      images: ["/placeholder-product.svg"],
      featured: true,
    },
    {
      name: "Rope Chew Toy",
      slug: "rope-chew-toy",
      description:
        "Durable cotton rope toy for dogs of all sizes. Great for dental health.",
      price: 299,
      stock: 80,
      category: "TOYS" as const,
      petType: "DOG" as const,
      images: ["/placeholder-product.svg"],
      featured: false,
    },
    {
      name: "Flea & Tick Shampoo",
      slug: "flea-tick-shampoo",
      description:
        "Gentle medicated shampoo that kills fleas and ticks on contact.",
      price: 449,
      stock: 40,
      category: "HEALTH" as const,
      petType: "ALL" as const,
      images: ["/placeholder-product.svg"],
      featured: false,
    },
  ];

  for (const product of products) {
    await db.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  const services = [
    {
      name: "Full Grooming",
      description:
        "Complete bath, brush, nail trim, and ear cleaning for dogs and cats.",
      durationMin: 60,
      price: 1499,
      active: true,
    },
    {
      name: "Nail Trim",
      description:
        "Quick and gentle nail trimming for dogs, cats, and small pets.",
      durationMin: 15,
      price: 399,
      active: true,
    },
    {
      name: "Wellness Checkup",
      description:
        "Basic health assessment including weight, coat, teeth, and general condition.",
      durationMin: 30,
      price: 899,
      active: true,
    },
  ];

  for (const service of services) {
    const existing = await db.service.findFirst({
      where: { name: service.name },
    });
    if (!existing) {
      await db.service.create({ data: service });
    }
  }

  console.log("Seed complete!");
  console.log("Admin: admin@pawfectpets.com / admin123");
  console.log("Customer: customer@example.com / customer123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

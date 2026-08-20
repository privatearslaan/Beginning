import { resolve } from "node:path";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { readFileSync, existsSync } from "node:fs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { INDIAN_PET_PRODUCTS } from "./products-data";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.production") });

type SeedProduct = {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category: "FOOD" | "TOYS" | "ACCESSORIES" | "HEALTH" | "GROOMING";
  petType: "DOG" | "CAT" | "BIRD" | "FISH" | "SMALL_PET" | "ALL";
  images: string[];
  featured: boolean;
};

function loadProducts(): SeedProduct[] {
  const happyTailsPath = resolve(process.cwd(), "prisma/happytails-products.json");
  if (existsSync(happyTailsPath)) {
    const raw = JSON.parse(readFileSync(happyTailsPath, "utf8")) as Array<
      SeedProduct & { variants?: unknown }
    >;
    return raw.map(({ variants: _variants, ...product }) => product);
  }
  return INDIAN_PET_PRODUCTS;
}

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

  const products = loadProducts();
  const happyTailsPath = resolve(process.cwd(), "prisma/happytails-products.json");

  if (existsSync(happyTailsPath)) {
    await db.product.deleteMany({
      where: {
        slug: { notIn: products.map((product) => product.slug) },
        orderItems: { none: {} },
        cartItems: { none: {} },
      },
    });
  }

  for (const product of products) {
    await db.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        petType: product.petType,
        images: product.images,
        featured: product.featured,
      },
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

  console.log(`Seed complete! ${products.length} products loaded.`);
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

"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContactForm(formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: "Please fill in all fields correctly" };
  }

  await db.contactMessage.create({ data: parsed.data });
  return { success: true };
}

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().min(0),
  category: z.enum(["FOOD", "TOYS", "ACCESSORIES", "HEALTH", "GROOMING"]),
  petType: z.enum(["DOG", "CAT", "BIRD", "FISH", "SMALL_PET", "ALL"]),
  images: z.string().optional(),
  featured: z.coerce.boolean().optional(),
});

export async function createProduct(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const imagesRaw = formData.get("images") as string;
  const images = imagesRaw ? imagesRaw.split(",").filter(Boolean) : [];

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    category: formData.get("category"),
    petType: formData.get("petType"),
    images: imagesRaw,
    featured: formData.get("featured") === "on",
  });

  if (!parsed.success) return { error: "Invalid product data" };

  const slug = slugify(parsed.data.name);
  await db.product.create({
    data: { ...parsed.data, slug, images },
  });

  revalidatePath("/shop");
  revalidatePath("/admin/products");
  return { success: true };
}

export async function updateProduct(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const imagesRaw = formData.get("images") as string;
  const images = imagesRaw ? imagesRaw.split(",").filter(Boolean) : [];

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    category: formData.get("category"),
    petType: formData.get("petType"),
    images: imagesRaw,
    featured: formData.get("featured") === "on",
  });

  if (!parsed.success) return { error: "Invalid product data" };

  await db.product.update({
    where: { id },
    data: { ...parsed.data, images },
  });

  revalidatePath("/shop");
  revalidatePath("/admin/products");
  return { success: true };
}

export async function deleteProduct(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await db.product.delete({ where: { id } });
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  return { success: true };
}

const serviceSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  durationMin: z.coerce.number().int().positive(),
  price: z.coerce.number().positive(),
  active: z.coerce.boolean().optional(),
  image: z.string().optional(),
});

export async function createService(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const parsed = serviceSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    durationMin: formData.get("durationMin"),
    price: formData.get("price"),
    active: formData.get("active") !== "off",
    image: formData.get("image") || undefined,
  });

  if (!parsed.success) return { error: "Invalid service data" };

  await db.service.create({ data: parsed.data });
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function updateService(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const parsed = serviceSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    durationMin: formData.get("durationMin"),
    price: formData.get("price"),
    active: formData.get("active") !== "off",
    image: formData.get("image") || undefined,
  });

  if (!parsed.success) return { error: "Invalid service data" };

  await db.service.update({ where: { id }, data: parsed.data });
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function deleteService(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await db.service.delete({ where: { id } });
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function markContactRead(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await db.contactMessage.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/messages");
  return { success: true };
}

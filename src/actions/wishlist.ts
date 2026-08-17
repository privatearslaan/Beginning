"use server";

import { db } from "@/lib/db";

export async function getWishlistProducts(productIds: string[]) {
  if (productIds.length === 0) return [];

  return db.product.findMany({
    where: { id: { in: productIds } },
    orderBy: { name: "asc" },
  });
}

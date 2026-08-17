import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ProductForm } from "./ProductForm";
import { ProductList } from "./ProductList";

export const metadata: Metadata = {
  title: "Manage Products",
};

export default async function AdminProductsPage() {
  const products = await db.product.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-stone-900">Products</h1>
      <ProductForm />
      <ProductList products={products} />
    </div>
  );
}

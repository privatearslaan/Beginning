"use client";

import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createProduct } from "@/actions/admin";
import { toast } from "sonner";

export function ProductForm() {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          const result = await createProduct(formData);
          if (result.error) toast.error(result.error);
          else toast.success("Product created");
        });
      }}
      className="mb-8 space-y-4 rounded-xl border border-emerald-100 bg-white p-6"
    >
      <h2 className="font-semibold text-stone-900">Add Product</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" step="0.01" required />
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" name="stock" type="number" required />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select id="category" name="category" required>
            <option value="FOOD">Food</option>
            <option value="TOYS">Toys</option>
            <option value="ACCESSORIES">Accessories</option>
            <option value="HEALTH">Health</option>
            <option value="GROOMING">Grooming</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="petType">Pet Type</Label>
          <Select id="petType" name="petType" required>
            <option value="ALL">All</option>
            <option value="DOG">Dog</option>
            <option value="CAT">Cat</option>
            <option value="BIRD">Bird</option>
            <option value="FISH">Fish</option>
            <option value="SMALL_PET">Small Pet</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="images">Image URLs (comma-separated)</Label>
          <Input id="images" name="images" placeholder="/placeholder-product.svg" />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required rows={3} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" />
        Featured product
      </label>
      <Button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create Product"}
      </Button>
    </form>
  );
}

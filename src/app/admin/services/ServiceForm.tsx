"use client";

import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createService } from "@/actions/admin";
import { toast } from "sonner";

export function ServiceForm() {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          const result = await createService(formData);
          if (result.error) toast.error(result.error);
          else toast.success("Service created");
        });
      }}
      className="mb-8 space-y-4 rounded-xl border border-emerald-100 bg-white p-6"
    >
      <h2 className="font-semibold text-stone-900">Add Service</h2>
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
          <Label htmlFor="durationMin">Duration (minutes)</Label>
          <Input id="durationMin" name="durationMin" type="number" required />
        </div>
        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input id="image" name="image" />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required rows={3} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked />
        Active
      </label>
      <Button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create Service"}
      </Button>
    </form>
  );
}

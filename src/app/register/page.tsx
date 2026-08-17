"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/actions/auth";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold text-stone-900">Create Account</h1>
      <p className="mb-8 text-stone-600">
        Join Pawfect Pets to shop, book services, and track orders.
      </p>

      <form
        action={(formData) => {
          startTransition(async () => {
            const result = await registerUser(formData);
            if (result.error) {
              toast.error(result.error);
            } else {
              toast.success("Account created!");
              router.push("/account");
              router.refresh();
            }
          });
        }}
        className="space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm"
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" minLength={6} required />
        </div>
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Creating..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-stone-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-emerald-700 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}

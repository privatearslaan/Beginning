"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/actions/auth";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/account";
  const [pending, startTransition] = useTransition();

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <h1 className="mb-2 text-2xl font-bold text-stone-900">Sign In</h1>
      <p className="mb-8 text-stone-600">
        Welcome back! Sign in to your account.
      </p>

      <form
        action={(formData) => {
          startTransition(async () => {
            const result = await loginUser(formData);
            if (result.error) {
              toast.error(result.error);
            } else {
              router.push(callbackUrl);
              router.refresh();
            }
          });
        }}
        className="space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm"
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-stone-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-emerald-700 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

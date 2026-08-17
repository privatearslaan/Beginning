"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginUser, registerUser } from "@/actions/auth";
import { PAGE_COPY } from "@/lib/site";
import { toast } from "sonner";

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/account";
  const initialTab = searchParams.get("tab") === "register" ? "register" : "login";
  const [tab, setTab] = useState<"login" | "register">(initialTab);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <PageHero
        eyebrow={PAGE_COPY.account.eyebrow}
        title={PAGE_COPY.account.title}
        description={PAGE_COPY.account.description}
      />

      <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
        <div className="mb-6 flex rounded-xl border border-orange-100 bg-white p-1">
          <button
            type="button"
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium ${
              tab === "login" ? "bg-orange-500 text-white" : "text-stone-600"
            }`}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium ${
              tab === "register" ? "bg-orange-500 text-white" : "text-stone-600"
            }`}
            onClick={() => setTab("register")}
          >
            Register
          </button>
        </div>

        {tab === "login" ? (
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
            className="space-y-4 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
              Existing customer
            </p>
            <h2 className="text-xl font-bold text-stone-900">Login</h2>
            <div>
              <Label htmlFor="login-email">Email or phone</Label>
              <Input id="login-email" name="email" required autoComplete="username" />
            </div>
            <div>
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Signing in..." : "Login"}
            </Button>
            <p className="text-center text-sm text-stone-600">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="font-medium text-orange-700 hover:underline"
                onClick={() => setTab("register")}
              >
                Register
              </button>
            </p>
          </form>
        ) : (
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
            className="space-y-4 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
              New customer
            </p>
            <h2 className="text-xl font-bold text-stone-900">Register</h2>
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" required autoComplete="name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div>
              <Label htmlFor="mobile">Phone</Label>
              <Input id="mobile" name="mobile" required autoComplete="tel" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="pet_type">Pet type</Label>
                <select
                  id="pet_type"
                  name="pet_type"
                  className="h-10 w-full rounded-md border border-stone-200 bg-white px-3 text-sm"
                  defaultValue="Dog"
                >
                  <option>Dog</option>
                  <option>Cat</option>
                  <option>Bird</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="pet_name">Pet name</Label>
                <Input id="pet_name" name="pet_name" placeholder="Bruno, Milo..." />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="breed">Breed</Label>
                <Input id="breed" name="breed" placeholder="Golden Retriever" />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" name="pincode" placeholder="192101" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="pet_size">Pet size</Label>
                <select
                  id="pet_size"
                  name="pet_size"
                  className="h-10 w-full rounded-md border border-stone-200 bg-white px-3 text-sm"
                  defaultValue="Small"
                >
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>Extra Large</option>
                </select>
              </div>
              <div>
                <Label htmlFor="pet_age">Pet age</Label>
                <Input id="pet_age" name="pet_age" placeholder="2 years" />
              </div>
            </div>
            <div>
              <Label htmlFor="address_line">Address line</Label>
              <Input
                id="address_line"
                name="address_line"
                placeholder="House / street / landmark"
              />
            </div>
            <div>
              <Label htmlFor="city">City / village</Label>
              <Input id="city" name="city" defaultValue="Anantnag" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                minLength={6}
                required
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Creating..." : "Create Account"}
            </Button>
            <p className="text-sm text-stone-600">{PAGE_COPY.account.registerNote}</p>
            <p className="text-center text-sm text-stone-600">
              Already have an account?{" "}
              <button
                type="button"
                className="font-medium text-orange-700 hover:underline"
                onClick={() => setTab("login")}
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </>
  );
}

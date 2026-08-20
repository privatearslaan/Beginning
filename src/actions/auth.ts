"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { isDbAvailable } from "@/lib/db-available";
import { db } from "@/lib/db";
import { signIn } from "@/lib/auth";
import { mergeGuestCart } from "@/actions/cart";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function registerUser(formData: FormData) {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  if (!(await isDbAvailable())) {
    return {
      error:
        "Account creation is temporarily unavailable. You can shop and book grooming without signing in, or message us on WhatsApp.",
    };
  }

  try {
    const existing = await db.user.findUnique({
      where: { email: parsed.data.email },
    });
    if (existing) {
      return { error: "Email already registered" };
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await db.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
      },
    });

    try {
      await mergeGuestCart(user.id);
    } catch (error) {
      console.error("Unable to merge guest cart after registration:", error);
    }

    const signInResult = await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });

    if (signInResult?.error) {
      return {
        error:
          "Account created, but automatic sign-in failed. Please log in with your new email and password.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Registration failed:", error);
    return {
      error:
        "Unable to create your account right now. Please try again later or contact us on WhatsApp.",
    };
  }
}

export async function loginUser(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  if (!(await isDbAvailable())) {
    return {
      error:
        "Login is temporarily unavailable. You can still shop, checkout, and book grooming without an account.",
    };
  }

  try {
    const result = await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Invalid email or password" };
    }

    try {
      const user = await db.user.findUnique({
        where: { email: parsed.data.email },
      });
      if (user) await mergeGuestCart(user.id);
    } catch (error) {
      console.error("Unable to merge guest cart after login:", error);
    }

    return { success: true };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      error: "Unable to sign in right now. Please try again later.",
    };
  }
}

export async function getAuthAvailability() {
  return { dbAvailable: await isDbAvailable() };
}

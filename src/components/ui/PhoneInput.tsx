"use client";

import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhoneInputProps
  extends Omit<ComponentProps<typeof Input>, "type" | "inputMode"> {
  prefixClassName?: string;
}

export function PhoneInput({
  className,
  prefixClassName,
  placeholder = "98765 43210",
  maxLength = 10,
  ...props
}: PhoneInputProps) {
  return (
    <div className="flex">
      <span
        className={cn(
          "inline-flex h-11 shrink-0 items-center rounded-l-lg border border-r-0 border-emerald-200 bg-emerald-50 px-3 text-sm font-medium text-stone-700",
          prefixClassName,
        )}
        aria-hidden
      >
        +91
      </span>
      <Input
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder={placeholder}
        pattern="[6-9][0-9]{9}"
        maxLength={maxLength}
        className={cn("rounded-l-none", className)}
        {...props}
      />
    </div>
  );
}

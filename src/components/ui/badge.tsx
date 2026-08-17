import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "secondary" | "outline" }
>(({ className, variant = "default", ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      variant === "default" && "bg-emerald-100 text-emerald-800",
      variant === "secondary" && "bg-orange-100 text-orange-800",
      variant === "outline" && "border border-emerald-200 text-emerald-700",
      className,
    )}
    {...props}
  />
));
Badge.displayName = "Badge";

export { Badge };

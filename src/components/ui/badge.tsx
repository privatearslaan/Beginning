import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "secondary" | "outline" }
>(({ className, variant = "default", ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
      variant === "default" && "bg-[#4e7c59]/15 text-[#4e7c59]",
      variant === "secondary" && "bg-orange-brand/10 text-orange-brand",
      variant === "outline" && "border border-line text-muted",
      className,
    )}
    {...props}
  />
));
Badge.displayName = "Badge";

export { Badge };

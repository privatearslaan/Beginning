"use client";

import { cn } from "@/lib/utils";

type RevealHeadingProps = {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export function RevealHeading({
  as: Tag = "h2",
  delay = 0,
  className,
  children,
}: RevealHeadingProps) {
  return (
    <Tag
      className={cn("reveal-from-left", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function RevealBlock({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("reveal-from-left", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

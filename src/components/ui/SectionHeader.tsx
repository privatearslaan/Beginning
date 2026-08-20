import Link from "next/link";
import { cn } from "@/lib/utils";
import { RevealBlock, RevealHeading } from "@/components/ui/RevealHeading";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  dark?: boolean;
  delay?: number;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View All →",
  className,
  dark = false,
  delay = 0,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div>
        {eyebrow && (
          <RevealBlock delay={delay}>
            <span className="section-eyebrow mb-3">{eyebrow}</span>
          </RevealBlock>
        )}
        <RevealHeading
          delay={delay + 80}
          className={cn(
            "text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl",
            dark ? "text-white" : "text-ink",
          )}
        >
          {title}
        </RevealHeading>
        {description && (
          <RevealBlock delay={delay + 160}>
            <p
              className={cn(
                "mt-2 max-w-2xl text-sm sm:text-base",
                dark ? "text-white/70" : "text-muted",
              )}
            >
              {description}
            </p>
          </RevealBlock>
        )}
      </div>
      {href && (
        <RevealBlock delay={delay + 220}>
          <Link
            href={href}
            className={cn(
              "text-sm font-bold transition-colors",
              dark
                ? "text-lime-brand hover:text-white"
                : "text-orange-brand hover:text-orange-dark",
            )}
          >
            {linkLabel}
          </Link>
        </RevealBlock>
      )}
    </div>
  );
}

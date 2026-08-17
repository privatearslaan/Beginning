import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "border-b border-orange-100 bg-gradient-to-br from-orange-50 via-white to-emerald-50",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-orange-600">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-3xl font-bold text-stone-900 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-base text-stone-600 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

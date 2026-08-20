import { cn } from "@/lib/utils";
import { RevealBlock, RevealHeading } from "@/components/ui/RevealHeading";
import { PetImage } from "@/components/ui/PetImage";
import type { PetPhoto } from "@/lib/pet-photos";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  photos?: readonly PetPhoto[];
}

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  photos,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-line/70 mesh-bg",
        className,
      )}
    >
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-orange-brand/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            {eyebrow && (
              <RevealBlock>
                <span className="section-eyebrow mb-4">{eyebrow}</span>
              </RevealBlock>
            )}
            <RevealHeading
              as="h1"
              delay={100}
              className="max-w-3xl text-3xl font-black tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              {title}
            </RevealHeading>
            {description && (
              <RevealBlock delay={200}>
                <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
                  {description}
                </p>
              </RevealBlock>
            )}
          </div>

          {photos && photos.length > 0 && (
            <RevealBlock delay={260}>
              <div className="grid grid-cols-3 gap-3">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border border-line/70 bg-white shadow-md shadow-orange-brand/5 transition hover:-translate-y-1 hover:shadow-lg",
                      index === 0 && "col-span-2 row-span-2 aspect-square",
                      index !== 0 && "aspect-square",
                    )}
                  >
                    <PetImage
                      src={photo.src}
                      alt={photo.alt}
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 200px"
                    />
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}
        </div>
      </div>
    </section>
  );
}

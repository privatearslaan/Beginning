import Link from "next/link";
import { PetImage } from "@/components/ui/PetImage";
import { GROOMING_HOME } from "@/lib/site";
import { GROOMING_GALLERY } from "@/lib/pet-photos";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function GroomingHomeSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Grooming"
        title={GROOMING_HOME.title}
        description={GROOMING_HOME.text}
        href="/services"
        linkLabel="View Services →"
        delay={100}
      />
      <div className="overflow-hidden rounded-[2rem] border border-line/70 bg-white shadow-xl shadow-orange-brand/10 lg:grid lg:grid-cols-[1.05fr_1fr]">
        <div className="relative min-h-[280px] lg:min-h-full">
          <PetImage
            src={GROOMING_HOME.image}
            alt="Professional pet grooming"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 lg:bg-gradient-to-r lg:from-transparent lg:to-white" />
          <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2">
            {GROOMING_GALLERY.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/30 shadow-lg"
              >
                <PetImage
                  src={photo.src}
                  alt={photo.alt}
                  className="object-cover transition hover:scale-105"
                  sizes="120px"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {GROOMING_HOME.steps.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-line/70 bg-cream/60 p-4 text-center transition hover:-translate-y-1 hover:border-orange-brand/30 hover:bg-white hover:shadow-lg hover:shadow-orange-brand/10"
              >
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-brand to-orange-dark text-sm font-black text-white shadow-md">
                  {item.step}
                </span>
                <p className="text-sm font-black text-ink">{item.title}</p>
                <p className="mt-1 text-xs text-muted">{item.text}</p>
              </div>
            ))}
          </div>
          <Link href="/services" className="mt-8 inline-block">
            <Button size="lg">{GROOMING_HOME.cta}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { PawPrint, X, ZoomIn } from "lucide-react";
import { PetImage } from "@/components/ui/PetImage";
import { PET_GALLERY_PHOTOS, type PetPhoto } from "@/lib/pet-photos";
import { cn } from "@/lib/utils";

export function InteractivePetGallery() {
  const [activePhoto, setActivePhoto] = useState<PetPhoto | null>(null);

  return (
    <section className="relative overflow-hidden border-y border-line/70 bg-white/85 py-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,90,0,0.08),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(214,229,28,0.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-eyebrow mb-3">
              <PawPrint className="h-3.5 w-3.5" />
              Pet Moments
            </p>
            <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
              Meet the pets we love to care for
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              Tap a photo to zoom in. Hover to explore categories — dogs, cats,
              grooming and more.
            </p>
          </div>
          <p className="rounded-full border border-orange-brand/20 bg-orange-brand/8 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-brand">
            Click any photo to preview
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8 lg:gap-4">
          {PET_GALLERY_PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              className={cn(
                index === 0 && "col-span-2 row-span-2",
                index === 3 && "sm:col-span-2",
              )}
            >
              <button
                type="button"
                onClick={() => setActivePhoto(photo)}
                className={cn(
                  "group relative w-full overflow-hidden rounded-[1.25rem] border border-line/70 bg-white text-left shadow-md shadow-orange-brand/5 transition duration-300",
                  "hover:-translate-y-1 hover:border-orange-brand/35 hover:shadow-xl hover:shadow-orange-brand/15",
                  index === 0 ? "min-h-[220px] aspect-auto h-full" : "aspect-square",
                )}
              >
                <PetImage
                  src={photo.src}
                  alt={photo.alt}
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-80 transition group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                  <span className="text-sm font-black text-white">{photo.label}</span>
                  <ZoomIn className="h-4 w-4 shrink-0 text-white/80 transition group-hover:scale-110 group-hover:text-lime-brand" />
                </div>
              </button>
              {photo.href && (
                <Link
                  href={photo.href}
                  className="mt-2 block text-center text-xs font-bold text-orange-brand hover:underline"
                >
                  Shop {photo.label} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt}
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-[1.5rem] border border-white/15 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close preview"
              className="absolute right-3 top-3 z-10 rounded-full bg-ink/70 p-2 text-white hover:bg-ink"
              onClick={() => setActivePhoto(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[4/3]">
              <PetImage
                src={activePhoto.src}
                alt={activePhoto.alt}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <div className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="text-lg font-black text-ink">{activePhoto.label}</p>
                <p className="text-sm text-muted">{activePhoto.alt}</p>
              </div>
              {activePhoto.href && (
                <Link
                  href={activePhoto.href}
                  className="rounded-xl bg-orange-brand px-4 py-2 text-sm font-bold text-white hover:bg-orange-dark"
                >
                  Explore
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PetImage } from "@/components/ui/PetImage";
import { HERO_PET_STACK, type PetPhoto } from "@/lib/pet-photos";
import { cn } from "@/lib/utils";

export function HeroPetPhotoStack() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_PET_STACK.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const node = stackRef.current;
    if (!node) return;

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
      setTilt({ x, y });
    };

    const onLeave = () => setTilt({ x: 0, y: 0 });
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={stackRef}
      className="relative mt-8 hidden h-[280px] lg:block"
      style={{
        transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
    >
      {HERO_PET_STACK.map((photo: PetPhoto, index) => {
        const offset = (index - activeIndex + HERO_PET_STACK.length) % HERO_PET_STACK.length;
        const isFront = offset === 0;

        return (
          <Link
            key={photo.id}
            href={photo.href ?? "/shop"}
            className={cn(
              "absolute left-1/2 top-1/2 w-[62%] overflow-hidden rounded-[1.35rem] border border-white/20 bg-white/10 shadow-2xl transition-all duration-500",
              isFront ? "z-30" : offset === 1 ? "z-20" : "z-10",
            )}
            style={{
              transform: `translate(-50%, -50%) translateX(${offset * 28}px) translateY(${offset * 12}px) rotate(${offset * 4 - 2}deg) scale(${1 - offset * 0.05})`,
            }}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div className="relative aspect-[4/3]">
              <PetImage
                src={photo.src}
                alt={photo.alt}
                className="object-cover"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-3 text-sm font-black text-white">
                {photo.label}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function HeroPetPhotoStrip() {
  return (
    <div className="mt-8 grid grid-cols-4 gap-2 lg:hidden">
      {HERO_PET_STACK.map((photo) => (
        <Link
          key={photo.id}
          href={photo.href ?? "/shop"}
          className="group relative aspect-square overflow-hidden rounded-xl border border-white/15"
        >
          <PetImage
            src={photo.src}
            alt={photo.alt}
            className="object-cover transition duration-500 group-active:scale-105"
            sizes="25vw"
          />
        </Link>
      ))}
    </div>
  );
}

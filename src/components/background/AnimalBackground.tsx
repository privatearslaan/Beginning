"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MousePointer2, X } from "lucide-react";

const AnimalScene3D = dynamic(
  () =>
    import("@/components/background/AnimalScene3D").then(
      (mod) => mod.AnimalScene3D,
    ),
  {
    ssr: false,
    loading: () => <div className="animal-bg-fallback" aria-hidden="true" />,
  },
);

export function AnimalBackground() {
  const [webglSupported, setWebglSupported] = useState(true);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
      setWebglSupported(Boolean(gl));
    } catch {
      setWebglSupported(false);
    }

    const dismissed = window.sessionStorage.getItem("animal-bg-hint-dismissed");
    if (dismissed) setShowHint(false);
  }, []);

  return (
    <div className="animal-bg-root" aria-hidden="true">
      {webglSupported ? (
        <AnimalScene3D />
      ) : (
        <div className="animal-bg-fallback" />
      )}
      <div className="animal-bg-scrim" />
      <div className="animal-bg-vignette" />

      {showHint && webglSupported && (
        <div className="animal-bg-hint">
          <MousePointer2 className="h-4 w-4 shrink-0 text-orange-brand" />
          <span>Move mouse to explore 3D pets · Click animals to interact</span>
          <button
            type="button"
            aria-label="Dismiss hint"
            className="rounded-full p-1 hover:bg-white/10"
            onClick={() => {
              setShowHint(false);
              window.sessionStorage.setItem("animal-bg-hint-dismissed", "1");
            }}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { INDIAN_STATES_AND_UTS } from "@/lib/india";
import { cn } from "@/lib/utils";

interface StateSearchSelectProps {
  name: string;
  id?: string;
  required?: boolean;
  defaultValue?: string;
}

export function StateSearchSelect({
  name,
  id,
  required,
  defaultValue = "",
}: StateSearchSelectProps) {
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(defaultValue);
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return [...INDIAN_STATES_AND_UTS];
    }

    return INDIAN_STATES_AND_UTS.filter((state) =>
      state.toLowerCase().includes(normalized),
    );
  }, [query]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery(selected);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [selected]);

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={selected} required={required} />

      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="address-level1"
        placeholder="Search state or UT..."
        value={open ? query : selected}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          if (!event.target.value.trim()) {
            setSelected("");
          }
        }}
        onFocus={() => {
          setQuery(selected);
          setOpen(true);
        }}
        className="flex h-11 w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-base text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:text-sm"
      />

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-52 w-full overflow-auto rounded-lg border border-emerald-200 bg-white py-1 shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-stone-500">No matching state</li>
          ) : (
            filtered.map((state) => (
              <li key={state} role="option" aria-selected={state === selected}>
                <button
                  type="button"
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm hover:bg-emerald-50",
                    state === selected && "bg-emerald-50 font-medium text-emerald-800",
                  )}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    setSelected(state);
                    setQuery(state);
                    setOpen(false);
                  }}
                >
                  {state}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

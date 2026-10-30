"use client";

import { useCallback, useEffect, useState } from "react";

export type GalleryItem = { src: string; alt: string; caption?: string };

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () =>
      setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  const current = open === null ? null : items[open];

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-frost focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/50"
            aria-label={`Відкрити фото: ${item.alt}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            {item.caption && (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 text-left text-sm font-medium text-white">
                {item.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Перегляд фото"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Закрити"
            className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-2xl leading-none text-white hover:bg-white/20"
          >
            ×
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Попереднє фото"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-2xl text-white hover:bg-white/20"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Наступне фото"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-2xl text-white hover:bg-white/20"
              >
                ›
              </button>
            </>
          )}

          <figure
            className="max-h-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain"
            />
            {current.caption && (
              <figcaption className="mt-3 text-center text-sm text-white/80">
                {current.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}

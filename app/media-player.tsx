"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const SAMPLE_VIDEO_SRC = "https://www.w3schools.com/html/mov_bbb.mp4";
const POSTER_SRC = "/video-poster.png";

export function MediaPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    requestAnimationFrame(() => {
      v.play().catch(() => {});
    });
  };

  return (
    <section className="relative z-20 -mt-[5%] px-4 pb-24 sm:-mt-[6%] sm:px-6 md:-mt-[7%] lg:-mt-[8%] lg:pb-32">
      <div className="mx-auto w-full max-w-5xl">
        <div className="relative rounded-[28px] bg-zinc-950 p-2 shadow-[0_40px_80px_-24px_rgba(12,20,40,0.35),0_16px_32px_-16px_rgba(12,20,40,0.25)] ring-1 ring-black/10 sm:p-2.5">
          <div className="relative aspect-video overflow-hidden rounded-[20px] bg-white">
            <video
              ref={videoRef}
              src={SAMPLE_VIDEO_SRC}
              poster={POSTER_SRC}
              playsInline
              preload="metadata"
              controls={started}
              className={`absolute inset-0 size-full bg-black object-cover transition-opacity duration-500 ${
                started ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              onEnded={() => setStarted(false)}
            />

            {!started && (
              <>
                <Image
                  src={POSTER_SRC}
                  alt="Neatlogs traces dashboard"
                  fill
                  priority
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="pointer-events-none object-contain"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/30"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handlePlay}
                    aria-label="Play product walkthrough"
                    className="group relative flex size-20 cursor-pointer items-center justify-center rounded-full bg-zinc-950 text-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)_inset] transition-transform duration-200 ease-out touch-manipulation hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 motion-reduce:transition-none sm:size-24"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -inset-3 rounded-full border border-zinc-900/10 transition-transform duration-500 ease-out group-hover:scale-[1.08] motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -inset-7 rounded-full border border-zinc-900/6 transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
                    />
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-7 sm:size-8"
                      aria-hidden="true"
                    >
                      <path d="M8 5.5a1 1 0 0 1 1.5-.87l11 6.5a1 1 0 0 1 0 1.74l-11 6.5A1 1 0 0 1 8 18.5v-13Z" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

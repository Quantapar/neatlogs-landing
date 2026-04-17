"use client";

import { useRef, useState } from "react";

const SAMPLE_VIDEO_SRC = "https://www.w3schools.com/html/mov_bbb.mp4";

export function MediaPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    requestAnimationFrame(() => {
      video.play().catch(() => {});
    });
  };

  return (
    <section className="relative z-20 -mt-[5%] px-4 pb-24 sm:-mt-[6%] sm:px-6 md:-mt-[7%] lg:-mt-[8%] lg:pb-32">
      <div className="mx-auto w-full max-w-5xl">
        <div className="relative rounded-[28px] bg-zinc-950 p-2 shadow-[0_40px_80px_-24px_rgba(12,20,40,0.35),0_16px_32px_-16px_rgba(12,20,40,0.25)] ring-1 ring-black/10 sm:p-2.5">
          <div className="relative aspect-video overflow-hidden rounded-[20px] bg-linear-to-br from-zinc-50 via-white to-zinc-100">
            <video
              ref={videoRef}
              src={SAMPLE_VIDEO_SRC}
              className={`absolute inset-0 size-full bg-black object-cover transition-opacity duration-300 ${
                started ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              controls={started}
              playsInline
              preload="metadata"
              onEnded={() => setStarted(false)}
            />

            {!started && (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.55]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 20%, rgba(208,74,48,0.10), transparent 45%), radial-gradient(circle at 80% 60%, rgba(90,120,200,0.10), transparent 50%)",
                  }}
                />

                <div className="absolute left-0 top-0 flex h-10 w-full items-center gap-1.5 border-b border-black/5 bg-white/70 px-4 backdrop-blur-sm">
                  <span className="size-2.5 rounded-full bg-zinc-300" />
                  <span className="size-2.5 rounded-full bg-zinc-300" />
                  <span className="size-2.5 rounded-full bg-zinc-300" />
                  <span className="ml-4 font-pixel text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                    neatlogs · live trace
                  </span>
                </div>

                <div className="pointer-events-none absolute inset-x-0 top-10 bottom-11 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handlePlay}
                    aria-label="Play product walkthrough"
                    className="group pointer-events-auto relative flex size-20 cursor-pointer items-center justify-center rounded-full bg-zinc-950 text-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)_inset] transition-transform duration-200 ease-out touch-manipulation hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 motion-reduce:transition-none sm:size-24"
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
                      className="size-7 translate-x-[1px] sm:size-8"
                      aria-hidden="true"
                    >
                      <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l11.07-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z" />
                    </svg>
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-black/5 bg-white/70 px-4 py-2.5 backdrop-blur-sm">
                  <span className="font-pixel text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    2 min walkthrough
                  </span>
                  <span className="font-pixel text-[10px] uppercase tracking-[0.16em] text-zinc-400">
                    00:00 / 02:14
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

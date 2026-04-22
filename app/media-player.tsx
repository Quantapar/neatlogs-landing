"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

const SAMPLE_VIDEO_SRC = "/walkthrough.mp4";
const POSTER_SRC = "/video-thumb-v6.png";

export function MediaPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!started) setStarted(true);
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      el.requestFullscreen().catch(() => {});
    }
  };

  return (
    <section className="relative z-20 -mt-[2%] px-4 pb-24 sm:-mt-[3%] sm:px-6 md:-mt-[3%] lg:-mt-[4%] lg:pb-32">
      <div className="mx-auto w-full max-w-5xl">
        <div
          ref={frameRef}
          className={
            isFullscreen
              ? "relative flex h-screen w-screen flex-col bg-black"
              : "relative rounded-[28px] bg-white/90 p-3 shadow-[0_30px_60px_-24px_rgba(12,20,40,0.22),0_12px_24px_-16px_rgba(12,20,40,0.14)] ring-1 ring-zinc-900/5 backdrop-blur-sm sm:p-4"
          }
        >
          <div
            className={
              isFullscreen
                ? "relative flex-1 overflow-hidden bg-black"
                : "relative aspect-video overflow-hidden rounded-[20px] bg-[#FAFAFA]"
            }
          >
            <video
              ref={videoRef}
              src={SAMPLE_VIDEO_SRC}
              poster={POSTER_SRC}
              playsInline
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => {
                setPlaying(false);
                setStarted(false);
              }}
              onClick={togglePlay}
              className={`absolute inset-0 size-full cursor-pointer bg-black transition-opacity duration-300 ease-out ${
                isFullscreen ? "object-contain" : "object-cover"
              } ${started ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />

            {!started && (
              <>
                <Image
                  src={POSTER_SRC}
                  alt="Neatlogs traces dashboard"
                  fill
                  priority
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="pointer-events-none z-10 object-cover"
                />

                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label="Play product walkthrough"
                    className="group relative flex size-20 cursor-pointer items-center justify-center rounded-full bg-(--glass-bg) text-zinc-950 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-zinc-900/10 backdrop-blur-md transition-transform duration-200 ease touch-manipulation hover-hover:hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.97] motion-reduce:transition-none sm:size-[88px]"
                  >
                    <IconPlay className="size-7 translate-x-[1px] sm:size-8" />
                  </button>
                </div>
              </>
            )}
          </div>

          <div
            className={`flex items-center justify-between gap-2 ${
              isFullscreen
                ? "bg-black px-4 py-3 text-white"
                : "mt-3 px-1 sm:mt-4 sm:px-2"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <ControlButton
                round
                onClick={togglePlay}
                ariaLabel={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <IconPause className="size-4" />
                ) : (
                  <IconPlay className="size-4" />
                )}
              </ControlButton>
              <ControlButton
                onClick={toggleMute}
                ariaLabel={muted ? "Unmute" : "Mute"}
              >
                {muted ? (
                  <IconMuted className="size-4" />
                ) : (
                  <IconVolume className="size-4" />
                )}
                <span>{muted ? "Unmute" : "Mute"}</span>
              </ControlButton>
            </div>

            <div className="hidden lg:inline-flex">
              <ControlButton
                onClick={toggleFullscreen}
                ariaLabel={isFullscreen ? "Exit full screen" : "Full screen"}
              >
                <IconFullscreen className="size-3.5" />
                <span>{isFullscreen ? "Exit" : "Full Screen"}</span>
              </ControlButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlButton({
  children,
  onClick,
  ariaLabel,
  round,
}: {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
  round?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-white text-[13px] font-medium text-zinc-900 shadow-[0_1px_2px_rgba(12,20,40,0.08),0_0_0_1px_rgba(12,20,40,0.06)] transition-[transform,background-color,box-shadow] duration-150 ease touch-manipulation hover:bg-zinc-50 hover:shadow-[0_4px_10px_-4px_rgba(12,20,40,0.12),0_0_0_1px_rgba(12,20,40,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 ${
        round ? "w-10 justify-center p-0" : "px-4"
      }`}
    >
      {children}
    </button>
  );
}

function IconPlay({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 5.5a1 1 0 0 1 1.5-.87l10 6.5a1 1 0 0 1 0 1.68l-10 6.5A1 1 0 0 1 7 18.5v-13Z" />
    </svg>
  );
}

function IconPause({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <rect x="6.5" y="5" width="4" height="14" rx="1.2" />
      <rect x="13.5" y="5" width="4" height="14" rx="1.2" />
    </svg>
  );
}

function IconVolume({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 9h3l4-3v12l-4-3H5V9Z" fill="currentColor" />
      <path d="M16 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 6a8 8 0 0 1 0 12" />
    </svg>
  );
}

function IconMuted({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 9h3l4-3v12l-4-3H5V9Z" fill="currentColor" />
      <path d="M16 9.5l5 5" />
      <path d="M21 9.5l-5 5" />
    </svg>
  );
}

function IconFullscreen({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 9V4h5" />
      <path d="M20 9V4h-5" />
      <path d="M4 15v5h5" />
      <path d="M20 15v5h-5" />
    </svg>
  );
}

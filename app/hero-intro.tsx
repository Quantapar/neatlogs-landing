"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { HeroHeadline } from "./hero-headline";
import { easings } from "./easings";

export function HeroIntro() {
  const reducedMotion = useReducedMotion();

  const fade = (delay: number) =>
    reducedMotion
      ? {
          initial: false as const,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0 },
        }
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: easings.snap },
        };

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-[7%] sm:pt-[8%]">
      <motion.span
        {...fade(0)}
        className="font-ui text-[12px] font-medium uppercase tracking-[0.14em] text-zinc-900/85"
      >
        For teams shipping agents
      </motion.span>

      <HeroHeadline />

      <motion.p
        {...fade(0.4)}
        className="font-pixel mt-5 max-w-2xl text-pretty text-center text-base font-medium tracking-tight leading-relaxed text-zinc-950 sm:text-lg"
      >
        Building a prototype is easy. The hard part is making it work every day
        in production. Neatlogs helps <span translate="no">AI</span> teams find
        issues faster, fix them sooner, and stay reliable after launch.
      </motion.p>

      <motion.div
        {...fade(0.6)}
        className="mt-32 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center"
      >
        <Link
          href="/demo"
          className="font-ui inline-flex h-11 cursor-pointer items-center justify-center rounded bg-zinc-950/80 px-6 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)] ring-1 ring-white/15 backdrop-blur-xs transition-[transform,background-color] duration-150 ease-snap touch-manipulation hover:bg-zinc-950/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          Book a Demo
        </Link>
        <Link
          href="/waitlist"
          className="font-ui inline-flex h-11 cursor-pointer items-center justify-center rounded bg-(--glass-bg) px-6 text-sm font-medium text-zinc-950 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-zinc-900/10 backdrop-blur-xs transition-[transform,background-color] duration-150 ease-snap touch-manipulation hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          Join the Waitlist
        </Link>
      </motion.div>
    </section>
  );
}


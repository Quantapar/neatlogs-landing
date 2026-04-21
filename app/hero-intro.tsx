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
    <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-[11%] sm:pt-[13%]">
      <motion.span
        {...fade(0)}
        className="font-ui text-[12px] font-medium uppercase tracking-[0.14em] text-zinc-700"
      >
        For teams building <span translate="no">AI</span> agents
      </motion.span>

      <HeroHeadline />

      <motion.p
        {...fade(0.4)}
        className="font-ui mt-6 max-w-xl text-pretty text-center text-base leading-relaxed text-zinc-700 sm:text-lg"
      >
        The shared workspace where your team debugs{" "}
        <span translate="no">AI</span> agents together. No Slack threads. No
        trace archaeology.
      </motion.p>

      <motion.div
        {...fade(0.6)}
        className="mt-28 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center"
      >
        <Link
          href="/demo"
          className="font-ui inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-zinc-950/80 px-6 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)] ring-1 ring-white/15 backdrop-blur-xs transition-[transform,background-color] duration-150 ease-snap touch-manipulation hover:bg-zinc-950/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          Book a Demo
        </Link>
        <Link
          href="/start"
          className="font-ui inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-(--glass-bg) px-6 text-sm font-medium text-zinc-950 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-zinc-900/10 backdrop-blur-xs transition-[transform,background-color] duration-150 ease-snap touch-manipulation hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          Get Started
        </Link>
      </motion.div>
    </section>
  );
}

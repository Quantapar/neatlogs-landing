"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { HeroHeadline } from "./hero-headline";
import { easings } from "./easings";

type Props = {
  scrollProgress: MotionValue<number>;
};

export function HeroIntro({ scrollProgress }: Props) {
  const reducedMotion = useReducedMotion();

  // As the ground parallaxes up and covers the bottom of the hero, fade and
  // blur the CTA block so the text reads as obscured by the rising landscape —
  // same atmospheric treatment the buildings and bridge already get from fog.
  const ctaBlur = useTransform(scrollProgress, [0, 0.25, 0.7], [0, 0, 10]);
  const ctaOpacity = useTransform(scrollProgress, [0, 0.35, 0.85], [1, 1, 0.2]);
  const ctaFilter = useMotionTemplate`blur(${ctaBlur}px)`;

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
    <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-[12%] sm:pt-[14%]">
      <motion.div
        style={
          reducedMotion
            ? undefined
            : { filter: ctaFilter, opacity: ctaOpacity }
        }
        className="flex w-full flex-col items-center"
      >
        <motion.span
          {...fade(0)}
          className="font-ui text-[12px] font-medium uppercase tracking-[0.14em] text-zinc-900/85"
        >
          For teams shipping agents
        </motion.span>

        <HeroHeadline />

        <motion.p
          {...fade(0.4)}
          className="font-ui mt-5 max-w-4xl text-balance text-center text-[15px] font-medium leading-relaxed text-zinc-700 sm:text-base"
        >
          one workspace for teams to find issues, align on failures, and ship
          fixes together
          <br />
          get agents to production faster and keep them reliable after launch
        </motion.p>

        <motion.div
          {...fade(0.6)}
          className="mt-40 flex flex-col items-stretch gap-3 sm:mt-14 sm:flex-row sm:items-center"
        >
          <Link
            href="/demo"
            className="font-ui inline-flex h-11 cursor-pointer items-center justify-center rounded bg-(--glass-bg) px-6 text-sm font-medium text-zinc-950 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-zinc-900/10 backdrop-blur-xs transition-[transform,background-color] duration-150 ease-snap touch-manipulation hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            Book a Demo
          </Link>
          <Link
            href="/waitlist"
            className="font-ui inline-flex h-11 cursor-pointer items-center justify-center rounded bg-zinc-950/80 px-6 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)] ring-1 ring-white/15 backdrop-blur-xs transition-[transform,background-color] duration-150 ease-snap touch-manipulation hover:bg-zinc-950/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            Join the Waitlist
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}


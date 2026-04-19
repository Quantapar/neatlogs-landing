"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const parentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function Word({ children }: { children: ReactNode }) {
  return (
    <motion.span variants={wordVariants} className="inline-block">
      {children}
    </motion.span>
  );
}

export function HeroHeadline() {
  return (
    <motion.h1
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      className="mt-5 max-w-4xl text-balance text-center text-5xl font-semibold leading-[1.04] tracking-tighter text-zinc-950 sm:text-6xl md:text-7xl lg:text-[80px]"
    >
      <Word>From</Word> <Word>feedback</Word> <Word>to</Word> <Word>fix</Word>
      <br />
      <span className="text-zinc-500">
        <Word>In</Word> <Word>minutes,</Word> <Word>not</Word>{" "}
        <Word>weeks</Word>
      </span>
    </motion.h1>
  );
}

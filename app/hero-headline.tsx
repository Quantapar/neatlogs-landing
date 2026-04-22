"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { easings } from "./easings";

const parentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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
      duration: 0.55,
      ease: easings.snap,
    },
  },
};

const reducedWordVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

function Word({
  children,
  variants,
}: {
  children: ReactNode;
  variants: Variants;
}) {
  return (
    <motion.span variants={variants} className="inline-block">
      {children}
    </motion.span>
  );
}

export function HeroHeadline() {
  const reducedMotion = useReducedMotion();
  const variants = reducedMotion ? reducedWordVariants : wordVariants;
  return (
    <motion.h1
      variants={parentVariants}
      initial={reducedMotion ? "visible" : "hidden"}
      animate="visible"
      style={{ fontFamily: "var(--font-geist-sans), sans-serif", fontWeight: 500 }}
      className="mt-5 max-w-4xl text-balance text-center text-5xl leading-[1.04] tracking-tighter text-zinc-950 sm:text-6xl md:text-7xl lg:text-[80px]"
    >
      <Word variants={variants}>Fix</Word>{" "}
      <Word variants={variants}>agents</Word>{" "}
      <Word variants={variants}>in</Word>{" "}
      <span className="text-[#B85548]">
        <Word variants={variants}>minutes</Word>
      </span>
    </motion.h1>
  );
}

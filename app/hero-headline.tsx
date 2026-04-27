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
      style={{
        fontFamily: "var(--font-geist-sans), sans-serif",
        fontWeight: 500,
      }}
      className="mt-5 w-full text-center text-5xl leading-[1.04] tracking-tighter text-zinc-950 sm:w-max sm:max-w-full sm:text-6xl md:text-7xl lg:text-[80px]"
    >
      <span className="font-pixel-circle">
        <Word variants={variants}>feedback</Word>{" "}
        <Word variants={variants}>to</Word>{" "}
        <Word variants={variants}>fix,</Word>
      </span>{" "}
      <Word variants={variants}>fast</Word>
    </motion.h1>
  );
}

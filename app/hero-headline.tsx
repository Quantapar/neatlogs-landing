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
      className="font-lora mt-5 max-w-4xl text-balance text-center text-4xl font-medium leading-[1.04] tracking-tighter text-zinc-950 sm:text-6xl md:text-7xl lg:text-[80px]"
    >
      <Word variants={variants}>From</Word>{" "}
      <Word variants={variants}>feedback</Word>{" "}
      <Word variants={variants}>to</Word>{" "}
      <Word variants={variants}>fix</Word>
      <br />
      <span className="text-[#C06555]">
        <Word variants={variants}>In</Word>{" "}
        <Word variants={variants}>minutes,</Word>{" "}
        <Word variants={variants}>not</Word>{" "}
        <Word variants={variants}>weeks</Word>
      </span>
    </motion.h1>
  );
}

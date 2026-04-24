"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { easings } from "./easings";

const POINTS = [
  "The issue is there, but buried in traces.",
  "Someone knows the output is wrong, but the feedback is vague.",
  "Engineering gets pulled in, but root cause takes too long.",
  "A fix ships, but nobody fully trusts it yet.",
];

export function CycleLoop() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative w-full bg-[#FAFAFA] pt-20 pb-28 sm:pt-28 sm:pb-36 lg:pt-36 lg:pb-44"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <motion.span
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: easings.snap }}
            className="font-pixel text-2xl font-semibold tracking-tight sm:text-3xl inline-block"
            style={{ color: "#E9462E" }}
          >
            Problem
          </motion.span>
          <motion.h2
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: easings.snap }}
            className="mt-5 text-balance text-4xl leading-[1.04] tracking-tighter text-zinc-950 sm:text-5xl md:text-[56px]"
          >
            Your agent worked in the demo.
            <br />
            Then reality showed up.
          </motion.h2>
        </div>

        <div className="mt-16 grid items-center gap-10 sm:mt-20 lg:mt-24 lg:grid-cols-2 lg:gap-16">
          <motion.ul
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: easings.snap }}
            className="font-ui flex flex-col gap-5 text-[16px] leading-relaxed text-zinc-700 sm:text-[17px]"
          >
            {POINTS.map((point) => (
              <li key={point} className="relative pl-6">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.65em] block size-2 rounded-full bg-[#E9462E]"
                />
                {point}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easings.snap }}
            className="relative w-full"
          >
            <Image
              src="/problem-chaos.png"
              alt="Teammates struggling to debug an AI agent across a chaotic stack of tools"
              width={2576}
              height={1923}
              className="h-auto w-full rounded"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </motion.div>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: easings.snap }}
          className="mx-auto mt-16 max-w-3xl text-center sm:mt-20 lg:mt-24"
        >
          <p className="text-balance text-2xl font-medium leading-snug tracking-tight text-zinc-950 sm:text-3xl md:text-[34px]">
            That&rsquo;s not a model problem. It&rsquo;s a collaboration problem.
          </p>
          <p className="font-ui mx-auto mt-5 max-w-2xl text-balance text-[15px] leading-relaxed text-zinc-600 sm:text-base">
            The people who can spot the issue and the people who can fix it are
            not working in different tools, and they don&rsquo;t have the same
            context.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

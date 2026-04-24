"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { easings } from "./easings";

const POINTS = [
  "the issue is there, but buried in traces",
  "someone knows the output is wrong, but the feedback is vague",
  "engineering gets pulled in, but root cause takes too long",
  "a fix ships, but nobody fully trusts it yet",
];

export function CycleLoop() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative w-full bg-[#FAFAFA] pt-20 pb-28 sm:pt-28 sm:pb-36 lg:pt-36 lg:pb-44"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-start gap-8 lg:grid-cols-[5fr_4fr] lg:gap-10">
          <div className="flex flex-col gap-6 sm:gap-7 lg:-mt-8 lg:gap-8 lg:self-center">
            <motion.h2
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.95, ease: easings.snap }}
              className="font-pixel-circle text-balance text-left text-2xl leading-[1.1] tracking-tight text-zinc-950 sm:text-3xl md:text-4xl"
            >
              your agent worked in the demo
              <br />
              <span
                className="font-semibold"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                then reality showed up
              </span>
            </motion.h2>

            <motion.ul
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.95, delay: 0.18, ease: easings.snap }}
              className="font-ui flex flex-col gap-3 text-[16px] font-normal leading-relaxed text-zinc-700 sm:text-[17px]"
            >
              {POINTS.map((point) => (
                <li key={point} className="relative pl-6">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.65em] block size-2 rounded-full bg-zinc-950"
                  />
                  {point}
                </li>
              ))}
            </motion.ul>

          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.05, delay: 0.1, ease: easings.snap }}
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 4%, rgba(0,0,0,0.65) 10%, black 18%, black 82%, rgba(0,0,0,0.65) 90%, rgba(0,0,0,0.25) 96%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 4%, rgba(0,0,0,0.65) 10%, black 18%, black 82%, rgba(0,0,0,0.65) 90%, rgba(0,0,0,0.25) 96%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 4%, rgba(0,0,0,0.65) 10%, black 18%, black 82%, rgba(0,0,0,0.65) 90%, rgba(0,0,0,0.25) 96%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 4%, rgba(0,0,0,0.65) 10%, black 18%, black 82%, rgba(0,0,0,0.65) 90%, rgba(0,0,0,0.25) 96%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
            className="relative w-full lg:-mt-10 lg:origin-right lg:scale-110"
          >
            <Image
              src="/people.png"
              alt="Teammates struggling to debug an AI agent across a chaotic stack of tools"
              width={1453}
              height={1083}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 580px, 100vw"
            />
          </motion.div>
        </div>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.95, ease: easings.snap }}
          className="mt-20 max-w-4xl text-left text-4xl leading-[1.04] tracking-tighter text-zinc-950 sm:mt-28 sm:text-5xl md:mt-36 md:text-[56px]"
        >
          <span className="font-pixel-circle">
            that&rsquo;s not a model problem,
          </span>
          <br />
          it&rsquo;s a collaboration problem
        </motion.p>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.18, ease: easings.snap }}
          className="font-ui mt-6 w-full max-w-4xl text-[15px] font-medium leading-relaxed text-zinc-700 sm:mt-8 sm:text-base"
        >
          the people who can spot the issue and the people who can fix it are
          not working in different tools,
          <br />
          and they don&rsquo;t have the same context
        </motion.p>
      </div>
    </section>
  );
}

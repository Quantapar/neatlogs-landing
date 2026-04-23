"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { easings } from "./easings";

type Step = {
  id: string;
  angleDeg: number;
  activeAt: number;
  tag: string;
  label: string;
  body: string;
};

const STEPS: Step[] = [
  {
    id: "traces",
    angleDeg: -90,
    activeAt: 0,
    tag: "01",
    label: "Traces captured",
    body: "Every agent run, auto-logged with full context.",
  },
  {
    id: "detection",
    angleDeg: 0,
    activeAt: 0.25,
    tag: "02",
    label: "Anomaly detected",
    body: "The system flags what's wrong before you ask.",
  },
  {
    id: "suggestion",
    angleDeg: 90,
    activeAt: 0.5,
    tag: "03",
    label: "AI suggestion",
    body: "A context-aware fix, ready for human review.",
  },
  {
    id: "team",
    angleDeg: 180,
    activeAt: 0.75,
    tag: "04",
    label: "Team ships it",
    body: "Reviewed, merged, and monitored for recurrence.",
  },
];

const VIEWBOX = 800;
const CENTER = VIEWBOX / 2;
const RADIUS = 260;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function useActiveStep(progress: MotionValue<number>): MotionValue<number> {
  return useTransform<number, number>(progress, (v) => {
    if (v < 0.125) return 0;
    if (v < 0.375) return 1;
    if (v < 0.625) return 2;
    return 3;
  });
}

export function CycleLoop() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 25%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 32,
    mass: 0.4,
  });

  const dashOffset = useTransform(progress, [0, 1], [CIRCUMFERENCE, 0]);

  const dotAngle = useTransform(
    progress,
    [0, 1],
    [-90, 270],
  );
  const dotCx = useTransform(dotAngle, (a) => {
    const rad = (a * Math.PI) / 180;
    return CENTER + Math.cos(rad) * RADIUS;
  });
  const dotCy = useTransform(dotAngle, (a) => {
    const rad = (a * Math.PI) / 180;
    return CENTER + Math.sin(rad) * RADIUS;
  });

  const activeStep = useActiveStep(progress);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAFAFA] pt-20 pb-28 sm:pt-28 sm:pb-36 lg:pt-36 lg:pb-44"
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.span
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easings.snap }}
          className="font-pixel text-2xl font-semibold tracking-tight sm:text-3xl inline-block"
          style={{ color: "#E9462E" }}
        >
          The Loop
        </motion.span>
        <motion.h2
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: easings.snap }}
          className="mt-5 text-balance text-4xl leading-[1.04] tracking-tighter text-zinc-950 sm:text-5xl md:text-[56px]"
        >
          From signal to shipped fix.
          <br />
          Then monitored for recurrence.
        </motion.h2>
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.16, ease: easings.snap }}
          className="font-pixel mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base"
        >
          Scroll to trace one full loop — the ring fills as each step locks in.
        </motion.p>
      </div>

      <div className="relative mx-auto mt-16 aspect-square w-full max-w-[320px] sm:mt-20 sm:max-w-[560px] lg:max-w-[760px]">
        <svg
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#E4E4E7"
            strokeWidth={1.8}
          />
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="#0A0A0A"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            style={{ strokeDashoffset: dashOffset }}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
          />

          {!reducedMotion && (
            <>
              <motion.circle
                r={16}
                fill="none"
                stroke="rgba(233,70,46,0.25)"
                strokeWidth={1}
                style={{ cx: dotCx, cy: dotCy }}
              >
                <animate
                  attributeName="r"
                  values="8;18;8"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0.2;0.7"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </motion.circle>
              <motion.circle
                r={4.5}
                fill="#E9462E"
                style={{ cx: dotCx, cy: dotCy }}
              />
              <motion.circle
                r={7}
                fill="none"
                stroke="rgba(233,70,46,0.35)"
                strokeWidth={1.2}
                style={{ cx: dotCx, cy: dotCy }}
              >
                <animate
                  attributeName="r"
                  values="5;10;5"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0.15;0.6"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </motion.circle>
            </>
          )}

          <motion.g
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          >
            {[-45, 45, 135, 225].map((a) => {
              const rad = (a * Math.PI) / 180;
              const x = CENTER + Math.cos(rad) * RADIUS;
              const y = CENTER + Math.sin(rad) * RADIUS;
              const rotate = a + 90;
              return (
                <g key={a} transform={`translate(${x} ${y}) rotate(${rotate})`}>
                  <path
                    d="M-7 -5 L1 0 L-7 5"
                    fill="none"
                    stroke="#A1A1AA"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              );
            })}
          </motion.g>
        </svg>

        <CenterLabel activeStep={activeStep} reducedMotion={!!reducedMotion} />

        {STEPS.map((step, i) => {
          const rad = (step.angleDeg * Math.PI) / 180;
          const xPct = 50 + (Math.cos(rad) * RADIUS * 100) / VIEWBOX;
          const yPct = 50 + (Math.sin(rad) * RADIUS * 100) / VIEWBOX;
          return (
            <div
              key={step.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${xPct}%`, top: `${yPct}%` }}
            >
              <StepCard
                step={step}
                index={i}
                progress={progress}
                reducedMotion={!!reducedMotion}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CenterLabel({
  activeStep,
  reducedMotion,
}: {
  activeStep: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const label = useTransform(activeStep, (i) => STEPS[i]?.label ?? "");
  const tag = useTransform(activeStep, (i) => STEPS[i]?.tag ?? "");

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-1">
        <motion.span
          className="font-pixel text-[10px] uppercase tracking-[0.15em] text-[#E9462E]/70 sm:text-[11px]"
          style={{ opacity: reducedMotion ? 1 : undefined }}
        >
          <MotionText value={tag} prefix="Step " reducedMotion={reducedMotion} />
        </motion.span>
        <motion.span className="text-[13px] font-medium tracking-tight text-zinc-950 sm:text-[15px] lg:text-[17px]">
          <MotionText value={label} reducedMotion={reducedMotion} />
        </motion.span>
      </div>
    </div>
  );
}

function MotionText({
  value,
  prefix,
  reducedMotion,
}: {
  value: MotionValue<string>;
  prefix?: string;
  reducedMotion: boolean;
}) {
  const text = useTransform(value, (v) => `${prefix ?? ""}${v}`);
  return <motion.span>{text}</motion.span>;
}

function StepCard({
  step,
  index,
  progress,
  reducedMotion,
}: {
  step: Step;
  index: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const borderColor = useTransform(
    progress,
    [Math.max(0, step.activeAt - 0.04), step.activeAt, step.activeAt + 0.18],
    ["rgba(9,9,11,0.08)", "rgba(233,70,46,0.6)", "rgba(9,9,11,0.12)"]
  );
  const shadow = useTransform(
    progress,
    [Math.max(0, step.activeAt - 0.04), step.activeAt, step.activeAt + 0.18],
    [
      "0 4px 20px -4px rgba(0,0,0,0.08), 0 2px 6px -2px rgba(0,0,0,0.05)",
      "0 10px 32px -6px rgba(233,70,46,0.22), 0 4px 12px -2px rgba(233,70,46,0.12)",
      "0 4px 20px -4px rgba(0,0,0,0.08), 0 2px 6px -2px rgba(0,0,0,0.05)",
    ]
  );
  const cardScale = useTransform(
    progress,
    [Math.max(0, step.activeAt - 0.04), step.activeAt, step.activeAt + 0.18],
    [1, 1.04, 1]
  );
  const cardY = useTransform(
    progress,
    [Math.max(0, step.activeAt - 0.04), step.activeAt, step.activeAt + 0.18],
    [0, -3, 0]
  );

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.95, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: easings.snap }}
      style={{
        borderColor,
        boxShadow: shadow,
        scale: reducedMotion ? undefined : cardScale,
        y: reducedMotion ? undefined : cardY,
      }}
      className="group w-[150px] cursor-pointer rounded border bg-white p-3.5 transition-[background-color] duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] sm:w-[200px] sm:p-4 lg:w-[220px] lg:p-5 will-change-transform"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-pixel text-[10px] uppercase tracking-[0.15em] text-zinc-400">
          Step {step.tag}
        </span>
        <StepVisual id={step.id} />
      </div>
      <div className="text-[14px] font-medium leading-snug tracking-tight text-zinc-950 sm:text-[15px]">
        {step.label}
      </div>
      <p className="mt-1.5 text-[11.5px] leading-relaxed text-zinc-500 sm:text-[12.5px]">
        {step.body}
      </p>
    </motion.div>
  );
}

function StepVisual({ id }: { id: string }): ReactNode {
  if (id === "traces") {
    return (
      <div className="flex flex-col gap-[3px]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-[3px] rounded-full bg-zinc-300"
            style={{ width: `${18 - i * 3}px` }}
          />
        ))}
      </div>
    );
  }
  if (id === "detection") {
    return (
      <div className="relative flex size-4 items-center justify-center">
        <span className="absolute size-4 animate-ping rounded-full bg-[#E9462E]/30" />
        <span className="relative size-2 rounded-full bg-[#E9462E]" />
      </div>
    );
  }
  if (id === "suggestion") {
    return (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className="size-4 text-[#E9462E]"
        aria-hidden="true"
      >
        <path
          d="M10 2l1.8 4.6L16 8l-4.2 1.4L10 14l-1.8-4.6L4 8l4.2-1.4L10 2z"
          fill="currentColor"
        />
        <circle cx="15.5" cy="4.5" r="1" fill="currentColor" />
        <circle cx="4.5" cy="15.5" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (id === "team") {
    return (
      <div className="flex -space-x-1.5">
        {[
          "from-rose-400 to-rose-500",
          "from-emerald-400 to-emerald-500",
          "from-sky-400 to-sky-500",
        ].map((grad, i) => (
          <div
            key={i}
            className={`size-4 rounded-full bg-gradient-to-br ring-2 ring-white ${grad}`}
          />
        ))}
      </div>
    );
  }
  return null;
}

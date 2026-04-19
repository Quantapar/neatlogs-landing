"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { easings } from "./easings";

type Step = {
  id: string;
  label: string;
  body: string;
  features: { icon: ReactNode; text: string }[];
  Visual: () => ReactNode;
};

const STEPS: Step[] = [
  {
    id: "agent",
    label: "Agent runs",
    body: "Your agent fires in production. Neatlogs auto-captures the trace — no custom instrumentation, no waking the engineer.",
    features: [
      { icon: <IconBolt />, text: "OpenAI, Anthropic, local models" },
      { icon: <IconLayers />, text: "LangGraph, CrewAI, LangChain" },
      { icon: <IconPlug />, text: "Zero setup instrumentation" },
    ],
    Visual: AgentRunsVisual,
  },
  {
    id: "trace",
    label: "Trace captured",
    body: "Product and QA see the full run: inputs, tool calls, outputs. They flag the weird behavior without having to ask an engineer what just happened.",
    features: [
      { icon: <IconSpan />, text: "Every span annotated in plain english" },
      { icon: <IconInput />, text: "Inputs, outputs, tool calls" },
      { icon: <IconPin />, text: "Comment on the exact failure" },
    ],
    Visual: TraceCapturedVisual,
  },
  {
    id: "fix",
    label: "Fix shipped",
    body: "Context flows into Cursor or your PR. From flagged issue to shipped fix in the same afternoon — no re-explaining, no handoff lag.",
    features: [
      { icon: <IconCursor />, text: "Context streams into Cursor" },
      { icon: <IconGitBranch />, text: "PR-ready suggestions" },
      { icon: <IconCheck />, text: "Shipped from one thread" },
    ],
    Visual: FixShippedVisual,
  },
];

export function Flow() {
  return (
    <section className="relative bg-[#FAFAFA] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span
            translate="no"
            className="font-ui text-2xl sm:text-3xl font-semibold tracking-tight"
            style={{ color: "#E9462E" }}
          >
            Built for both sides of the table
          </span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.04] tracking-tighter text-zinc-950 sm:text-5xl md:text-[56px]">
            Built for the people who spot the problem
            <br />
            <span>and the people who fix it.</span>
          </h2>
          <p className="font-ui mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-zinc-600 sm:text-base">
            Different depth for domain experts and devs. Shared context all the
            way through.
          </p>
        </div>

        <div className="relative mt-14 md:mt-20">
          <div
            aria-hidden="true"
            className="absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 border-l border-dashed border-zinc-900/15 md:block"
          />

          <div>
            {STEPS.map((step, i) => (
              <FlowRow
                key={step.id}
                step={step}
                number={i + 1}
                reversed={i % 2 === 1}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowRow({
  step,
  number,
  reversed,
  isLast,
}: {
  step: Step;
  number: number;
  reversed: boolean;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={
        reducedMotion
          ? { opacity: 1, y: 0 }
          : inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 16 }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: easings.snap }
      }
      className={`grid items-center gap-8 md:grid-cols-[1fr_60px_1fr] md:gap-8 ${
        !isLast ? "pb-14 md:pb-20" : ""
      }`}
    >
      <div className={reversed ? "md:order-3" : "md:order-1"}>
        <step.Visual />
      </div>
      <div className="relative hidden md:order-2 md:flex md:items-center md:justify-center">
        <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-b from-white to-zinc-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(12,20,40,0.06),0_1px_2px_rgba(12,20,40,0.05),0_10px_22px_-6px_rgba(12,20,40,0.18),0_20px_36px_-12px_rgba(12,20,40,0.18)] ring-1 ring-zinc-900/[0.08]">
          <span className="font-mono text-[14px] font-medium text-zinc-700">
            {number}
          </span>
        </div>
      </div>
      <div className={reversed ? "md:order-1" : "md:order-3"}>
        <TextBlock
          title={step.label}
          body={step.body}
          features={step.features}
        />
      </div>
    </motion.div>
  );
}

function TextBlock({
  title,
  body,
  features,
}: {
  title: string;
  body: string;
  features: { icon: ReactNode; text: string }[];
}) {
  return (
    <div>
      <h3 className="text-[22px] font-semibold tracking-[-0.01em] text-zinc-950 sm:text-[24px]">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-[14.5px] leading-[1.55] text-zinc-500">
        {body}
      </p>
      <ul className="mt-5 space-y-2.5">
        {features.map((f, i) => (
          <li
            key={i}
            className="flex items-center gap-2.5 text-[14px] font-normal text-zinc-800"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white text-zinc-700 shadow-[0_1px_2px_rgba(12,20,40,0.05),0_6px_12px_-4px_rgba(12,20,40,0.12),0_14px_24px_-8px_rgba(12,20,40,0.14)] ring-1 ring-zinc-900/[0.08]">
              {f.icon}
            </span>
            {f.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function VisualCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[320px] rounded-[20px] border border-zinc-900/10 bg-[#FCFCFD] p-1.5 shadow-[0_24px_48px_-20px_rgba(12,20,40,0.2),0_10px_20px_-12px_rgba(12,20,40,0.1)] ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-white ring-1 ring-zinc-900/10">
        <div className="relative h-full p-5">{children}</div>
      </div>
    </div>
  );
}

function FlickeringGrid() {
  const cols = 32;
  const rows = 22;

  const pixels = useMemo(() => {
    const hash = (n: number) => {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    const arr: {
      x: number;
      y: number;
      opacity: number;
      flicker: boolean;
      delay: number;
      dur: number;
    }[] = [];
    for (let i = 0; i < cols * rows; i++) {
      const r1 = hash(i * 1.7);
      const r2 = hash(i * 2.3 + 7);
      arr.push({
        x: i % cols,
        y: Math.floor(i / cols),
        opacity: 0.03 + r1 * 0.1,
        flicker: r2 > 0.86,
        delay: r2 * 4,
        dur: 1.6 + r1 * 1.8,
      });
    }
    return arr;
  }, []);

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${cols} ${rows}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {pixels.map((p, i) => (
        <rect
          key={i}
          x={p.x + 0.15}
          y={p.y + 0.15}
          width="0.7"
          height="0.7"
          fill="#71717a"
          opacity={p.opacity}
        >
          {p.flicker && (
            <animate
              attributeName="opacity"
              values={`${p.opacity};0.4;${p.opacity}`}
              dur={`${p.dur}s`}
              begin={`${p.delay}s`}
              repeatCount="indefinite"
            />
          )}
        </rect>
      ))}
    </svg>
  );
}

function AgentRunsVisual() {
  return (
    <VisualCard>
      <FlickeringGrid />
      <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white p-1 shadow-[inset_0_2px_6px_rgba(113,113,122,0.22),inset_0_-1px_3px_rgba(113,113,122,0.1),0_2px_4px_rgba(12,20,40,0.06),0_10px_20px_-6px_rgba(12,20,40,0.18),0_22px_40px_-10px_rgba(12,20,40,0.2)] ring-1 ring-zinc-900/[0.08]">
        <Image
          src="/nl-logo.png"
          alt="Neatlogs"
          width={56}
          height={56}
          className="size-full rounded-xl"
        />
      </div>
    </VisualCard>
  );
}

const TRACE_EVENTS: { workflow: string; latency: string; cost: string }[] = [
  { workflow: "weather-research-agent", latency: "3.08s", cost: "$0.00070" },
  { workflow: "support-triage", latency: "3.32s", cost: "$0.00077" },
  { workflow: "pricing-qa", latency: "4.13s", cost: "$0.00072" },
  { workflow: "weather-research-agent", latency: "4.04s", cost: "$0.00079" },
  { workflow: "content-writer", latency: "3.45s", cost: "$0.00077" },
  { workflow: "support-triage", latency: "3.77s", cost: "$0.00078" },
  { workflow: "weather-research-agent", latency: "3.96s", cost: "$0.00076" },
  { workflow: "pricing-qa", latency: "3.42s", cost: "$0.00076" },
];

function PixelFire() {
  const cols = 44;
  const rows = 20;

  const pixels = useMemo(() => {
    const hash = (n: number) => {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    const arr: {
      x: number;
      y: number;
      opacity: number;
      delay: number;
      dur: number;
    }[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const r = hash(y * cols + x * 1.7);
        const vertical = (y + 1) / rows;
        const centerDist = Math.abs(x - (cols - 1) / 2) / (cols / 2);
        const horizontal = 1 - centerDist * 0.55;
        const density = vertical * horizontal;
        if (r > density * 1.35) continue;
        arr.push({
          x,
          y,
          opacity: 0.2 + r * 0.55,
          delay: r * 3,
          dur: 0.9 + r * 1.6,
        });
      }
    }
    return arr;
  }, []);

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] w-full"
      viewBox={`0 0 ${cols} ${rows}`}
      preserveAspectRatio="xMidYMax slice"
    >
      {pixels.map((p, i) => (
        <rect
          key={i}
          x={p.x + 0.1}
          y={p.y + 0.1}
          width="0.8"
          height="0.8"
          fill="#E9462E"
          opacity={p.opacity}
        >
          <animate
            attributeName="opacity"
            values={`${p.opacity};${Math.min(0.95, p.opacity + 0.35)};${p.opacity}`}
            dur={`${p.dur}s`}
            begin={`${p.delay}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
    </svg>
  );
}

function TraceCapturedVisual() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => setIndex((i) => i + 1), 1400);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const ITEM_H = 28;
  const VISIBLE = 4;

  const items = Array.from({ length: VISIBLE }, (_, i) => {
    const key = index - i;
    const idx =
      ((key % TRACE_EVENTS.length) + TRACE_EVENTS.length) % TRACE_EVENTS.length;
    return {
      key,
      event: TRACE_EVENTS[idx],
      pos: i,
    };
  });

  return (
    <VisualCard>
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 40%, transparent 56%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 40%, transparent 56%)",
        }}
      >
        <div className="relative mx-auto h-full pt-2">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -ITEM_H + 6, scale: 0.96 }}
                animate={{ opacity: 1, y: item.pos * ITEM_H + 8, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: VISIBLE * ITEM_H + 16,
                  scale: 0.96,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 26,
                  mass: 0.6,
                }}
                className="absolute inset-x-1 flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 shadow-[0_1px_2px_rgba(12,20,40,0.04),0_6px_14px_-6px_rgba(12,20,40,0.12)] ring-1 ring-zinc-900/[0.06]"
              >
                <span className="flex-1 truncate font-mono text-[9.5px] leading-none tracking-tight text-zinc-700">
                  {item.event.workflow}
                </span>
                <span className="shrink-0 font-mono text-[9.5px] leading-none text-zinc-900 [font-variant-numeric:tabular-nums]">
                  {item.event.latency}
                </span>
                <span className="shrink-0 font-mono text-[9px] leading-none text-zinc-400 [font-variant-numeric:tabular-nums]">
                  {item.event.cost}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <PixelFire />

      <div className="absolute left-1/2 top-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white p-1 shadow-[inset_0_2px_6px_rgba(113,113,122,0.22),inset_0_-1px_3px_rgba(113,113,122,0.1),0_2px_4px_rgba(12,20,40,0.06),0_10px_20px_-6px_rgba(12,20,40,0.18),0_22px_40px_-10px_rgba(12,20,40,0.2)] ring-1 ring-zinc-900/[0.08]">
        <Image
          src="/nl-logo.png"
          alt="Neatlogs"
          width={48}
          height={48}
          className="size-full rounded-xl"
        />
      </div>
    </VisualCard>
  );
}

const DIFF_LINES: { kind: "rm" | "add"; text: string }[] = [
  { kind: "rm", text: "- result = fetch(url, timeout=30)" },
  { kind: "add", text: "+ result = safe_fetch(url, retries=2)" },
  { kind: "add", text: "+ return cached_result(query)" },
];

function FixShippedVisual() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(cardRef, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();

  return (
    <VisualCard>
      <div ref={cardRef} className="flex h-full items-center justify-center">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={
            inView || reducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 10 }
          }
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.4, ease: easings.snap }
          }
          className="w-full max-w-[320px] overflow-hidden rounded-xl bg-white shadow-[0_18px_40px_-14px_rgba(12,20,40,0.28),0_6px_12px_-6px_rgba(12,20,40,0.14)] ring-1 ring-zinc-900/10"
        >
          <div className="flex items-center justify-between border-b border-zinc-900/5 bg-zinc-50/80 px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-zinc-300" />
              <span className="size-2 rounded-full bg-zinc-300" />
              <span className="size-2 rounded-full bg-zinc-300" />
            </div>
            <span className="font-mono text-[9px] text-zinc-500">
              research-agent.py
            </span>
          </div>
          <div className="space-y-1 px-3 py-3 font-mono text-[10.5px] leading-relaxed">
            {DIFF_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={
                  reducedMotion ? false : { clipPath: "inset(0 100% 0 0)" }
                }
                animate={
                  inView || reducedMotion
                    ? { clipPath: "inset(0 0 0 0)" }
                    : { clipPath: "inset(0 100% 0 0)" }
                }
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.32,
                        delay: 0.3 + i * 0.18,
                        ease: easings.snap,
                      }
                }
                className={`rounded px-1.5 ${
                  line.kind === "rm"
                    ? "bg-rose-50 text-rose-700"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {line.text}
              </motion.div>
            ))}
            <div className="px-1.5 text-zinc-400">&nbsp;</div>
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 4 }}
              animate={
                inView || reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 4 }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.3, delay: 0.95, ease: easings.snap }
              }
              className="flex items-center gap-1.5 px-1.5 text-[10px] text-zinc-700"
            >
              <span className="inline-flex size-3 items-center justify-center rounded-full bg-emerald-100 text-[8px] text-emerald-700">
                ✓
              </span>
              Open in Cursor · review &amp; ship
            </motion.div>
          </div>
        </motion.div>
      </div>
    </VisualCard>
  );
}

function IconBolt() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
      <path d="M11 2L4 11h5l-1 7 7-9h-5l1-7z" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M10 3l7 3.5-7 3.5-7-3.5L10 3z" />
      <path d="M3 10l7 3.5L17 10" />
      <path d="M3 13.5l7 3.5 7-3.5" />
    </svg>
  );
}

function IconPlug() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M6 8V3M14 8V3" />
      <path d="M5 8h10v3a5 5 0 0 1-10 0V8z" />
      <path d="M10 16v2" />
    </svg>
  );
}

function IconSpan() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <rect x="3" y="5" width="10" height="2" rx="1" fill="currentColor" />
      <rect x="6" y="9" width="10" height="2" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="4" y="13" width="8" height="2" rx="1" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

function IconInput() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M3 10h10" />
      <path d="M10 6l4 4-4 4" />
      <path d="M16 4v12" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M10 3a5 5 0 0 0-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 0 0-5-5z" />
      <circle cx="10" cy="8" r="1.6" fill="currentColor" />
    </svg>
  );
}

function IconCursor() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M4 3l12 7-5 1-3 5-4-13z" />
    </svg>
  );
}

function IconGitBranch() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <circle cx="5" cy="4" r="1.6" />
      <circle cx="5" cy="15" r="1.6" />
      <circle cx="14" cy="8" r="1.6" />
      <path d="M5 6v7" />
      <path d="M14 9.5c0 3-4 3-4 5.5" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="M4 10.5l4 4 8-8" />
    </svg>
  );
}

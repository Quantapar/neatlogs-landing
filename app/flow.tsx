"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
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
          <h2 className="mt-5 text-balance text-[22px] font-semibold leading-[1.2] tracking-tight text-zinc-950 sm:text-5xl sm:leading-[1.04] sm:tracking-tighter md:text-[56px]">
            Built for the people<br className="sm:hidden" /> who spot the problem
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
        reducedMotion ? { duration: 0 } : { duration: 0.5, ease: easings.snap }
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

export function FlickeringGrid() {
  const cols = 32;
  const rows = 22;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  if (!mounted) return null;

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
      <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <Image
          src="/nl-logo.png"
          alt="Neatlogs"
          width={64}
          height={64}
          className="size-full rounded-[22%] object-contain ring-1 ring-zinc-900/10 drop-shadow-[0_10px_20px_rgba(12,20,40,0.22)]"
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
  const cols = 56;
  const rows = 16;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const pixels = useMemo(() => {
    const hash = (n: number) => {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    const smoothCol = (x: number) => {
      const a = hash(x * 3.1);
      const b = hash((x + 1) * 3.1);
      const t = x - Math.floor(x);
      return a * (1 - t) + b * t;
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
        const r = hash(y * cols + x * 1.7 + 13);
        const r2 = hash(y * cols + x * 2.9 + 97);

        const v = (y + 0.5) / rows;
        const edgeFade =
          1 - Math.pow(Math.abs((x - (cols - 1) / 2) / (cols / 2)), 1.4) * 0.4;
        const colHeight = 0.55 + smoothCol(x * 0.6) * 0.5;
        const density = Math.pow(v, 1.1) * colHeight * edgeFade;

        if (r > density * 1.35) continue;

        arr.push({
          x,
          y,
          opacity: 0.3 + r * 0.55,
          delay: r2 * 2.4,
          dur: 0.7 + r * 1.4,
        });
      }
    }
    return arr;
  }, []);

  if (!mounted) return null;

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] w-full"
      viewBox={`0 0 ${cols} ${rows}`}
      preserveAspectRatio="none"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      {pixels.map((p, i) => (
        <rect
          key={i}
          x={p.x + 0.05}
          y={p.y + 0.05}
          width="0.9"
          height="0.9"
          fill="#E9462E"
          opacity={p.opacity}
        >
          <animate
            attributeName="opacity"
            values={`${p.opacity};${Math.min(0.98, p.opacity + 0.3)};${p.opacity * 0.75};${p.opacity}`}
            keyTimes="0;0.35;0.7;1"
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
  type LiveItem = { id: number; event: (typeof TRACE_EVENTS)[number] };
  const [items, setItems] = useState<LiveItem[]>([]);
  const counterRef = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let interval: number | null = null;

    const spawn = () => {
      const id = counterRef.current++;
      const event = TRACE_EVENTS[id % TRACE_EVENTS.length];
      setItems((prev) => [...prev.slice(-5), { id, event }]);
    };

    const start = () => {
      if (interval != null) return;
      setItems([]);
      spawn();
      interval = window.setInterval(spawn, 1100);
    };
    const stop = () => {
      if (interval != null) {
        window.clearInterval(interval);
        interval = null;
      }
    };
    const onVis = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    if (document.visibilityState === "visible") start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reducedMotion]);

  const TRAVEL = 110;
  const DUR = 3.6;

  return (
    <VisualCard>
      <div className="absolute inset-x-4 top-1.5 z-10 flex items-center gap-2 border-b border-zinc-900/[0.06] px-0.5 pb-1.5">
        <span className="flex-1 font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400">
          Traces
        </span>
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400">
          Time
        </span>
        <span className="ml-4 w-[52px] shrink-0 text-right font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400">
          Cost
        </span>
      </div>

      <div className="absolute inset-x-0 top-7 h-[55%] overflow-hidden">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: TRAVEL, opacity: [0, 1, 1, 0] }}
            transition={{
              y: { duration: DUR, ease: "linear" },
              opacity: {
                duration: DUR,
                ease: "linear",
                times: [0, 0.12, 0.65, 1],
              },
            }}
            className="absolute inset-x-4 flex items-center gap-2 px-0.5 py-1"
          >
            <span className="flex-1 truncate font-mono text-[9.5px] leading-none tracking-tight text-zinc-700">
              {item.event.workflow}
            </span>
            <span className="shrink-0 font-mono text-[9.5px] leading-none text-zinc-900 [font-variant-numeric:tabular-nums]">
              {item.event.latency}
            </span>
            <span className="ml-4 w-[52px] shrink-0 text-right font-mono text-[9px] leading-none text-zinc-400 [font-variant-numeric:tabular-nums]">
              {item.event.cost}
            </span>
          </motion.div>
        ))}
      </div>

      <PixelFire />
    </VisualCard>
  );
}

type TeamMsg = {
  kind: "pr" | "comment" | "merge" | "fix";
  title: string;
  meta: string;
  avatar: string;
  initial: string;
};

const TEAM_MESSAGES: TeamMsg[] = [
  {
    kind: "pr",
    title: "fix(tool): retry serpapi on timeout",
    meta: "#4821 · maya",
    avatar: "from-rose-400 to-rose-500",
    initial: "M",
  },
  {
    kind: "comment",
    title: "agent retries look clean — shipping",
    meta: "alex · 2m",
    avatar: "from-emerald-400 to-emerald-500",
    initial: "A",
  },
  {
    kind: "merge",
    title: "merged: cached_result fallback",
    meta: "#4820 · sam",
    avatar: "from-indigo-400 to-indigo-500",
    initial: "S",
  },
  {
    kind: "fix",
    title: "hotfix: bump pricing-agent timeout",
    meta: "#4819 · jake",
    avatar: "from-amber-400 to-amber-500",
    initial: "J",
  },
  {
    kind: "pr",
    title: "feat: span-level annotations",
    meta: "#4818 · priya",
    avatar: "from-sky-400 to-sky-500",
    initial: "P",
  },
  {
    kind: "comment",
    title: "nice catch on the retry cap",
    meta: "raf · 5m",
    avatar: "from-violet-400 to-violet-500",
    initial: "R",
  },
];

function FixShippedVisual() {
  type LiveMsg = { id: number; msg: TeamMsg };
  const [items, setItems] = useState<LiveMsg[]>([]);
  const counterRef = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let interval: number | null = null;

    const spawn = () => {
      const id = counterRef.current++;
      const msg = TEAM_MESSAGES[id % TEAM_MESSAGES.length];
      setItems((prev) => [...prev.slice(-5), { id, msg }]);
    };

    const start = () => {
      if (interval != null) return;
      setItems([]);
      spawn();
      interval = window.setInterval(spawn, 1400);
    };
    const stop = () => {
      if (interval != null) {
        window.clearInterval(interval);
        interval = null;
      }
    };
    const onVis = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    if (document.visibilityState === "visible") start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reducedMotion]);

  const TRAVEL = 180;
  const DUR = 5.2;

  return (
    <VisualCard>
      <div className="absolute inset-0 overflow-hidden">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: TRAVEL, opacity: [0, 1, 1, 0] }}
            transition={{
              y: { duration: DUR, ease: "linear" },
              opacity: {
                duration: DUR,
                ease: "linear",
                times: [0, 0.12, 0.72, 1],
              },
            }}
            className="absolute inset-x-5 flex items-start gap-2 rounded-lg bg-white px-2 py-1.5 shadow-[0_1px_2px_rgba(12,20,40,0.04),0_4px_10px_-4px_rgba(12,20,40,0.08)] ring-1 ring-zinc-900/[0.06]"
          >
            <TeamIcon kind={item.msg.kind} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[10.5px] font-medium leading-tight text-zinc-900">
                {item.msg.title}
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span
                  className={`flex size-3.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[7px] font-semibold text-white ${item.msg.avatar}`}
                >
                  {item.msg.initial}
                </span>
                <span className="truncate text-[9px] text-zinc-400">
                  {item.msg.meta}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </VisualCard>
  );
}

function TeamIcon({ kind }: { kind: TeamMsg["kind"] }) {
  const color =
    kind === "pr"
      ? "text-[#E9462E]"
      : kind === "merge"
        ? "text-violet-500"
        : kind === "fix"
          ? "text-emerald-500"
          : "text-zinc-400";

  if (kind === "comment") {
    return (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`mt-0.5 size-3.5 shrink-0 ${color}`}
      >
        <path d="M4 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4l-3 3v-3H6a2 2 0 0 1-2-2V6z" />
      </svg>
    );
  }
  if (kind === "merge") {
    return (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`mt-0.5 size-3.5 shrink-0 ${color}`}
      >
        <circle cx="5" cy="4.5" r="1.6" />
        <circle cx="5" cy="15.5" r="1.6" />
        <circle cx="14" cy="8.5" r="1.6" />
        <path d="M5 6v8" />
        <path d="M5 9c0-2 1.5-3 4-3h3.4" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`mt-0.5 size-3.5 shrink-0 ${color}`}
    >
      <circle cx="5" cy="4.5" r="1.6" />
      <circle cx="5" cy="15.5" r="1.6" />
      <circle cx="14" cy="8.5" r="1.6" />
      <path d="M5 6v8" />
      <path d="M14 10c0 3-4 3-4 5.5" />
    </svg>
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
      <rect
        x="6"
        y="9"
        width="10"
        height="2"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="4"
        y="13"
        width="8"
        height="2"
        rx="1"
        fill="currentColor"
        opacity="0.75"
      />
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

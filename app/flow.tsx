"use client";

import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const COS30 = 0.8660254;
const SIN30 = 0.5;

type IconName = "agent" | "trace" | "team" | "fix";

type Step = {
  id: string;
  label: string;
  body: string;
  icon: IconName;
  w: number;
  h: number;
};

const STEPS: Step[] = [
  {
    id: "agent",
    label: "Agent runs",
    body: "Your agent fires in production. Neatlogs auto-captures the trace — no custom instrumentation, no waking the engineer.",
    icon: "agent",
    w: 86,
    h: 14,
  },
  {
    id: "trace",
    label: "Trace captured",
    body: "Product and QA see the full run: inputs, tool calls, outputs. They flag the weird behavior without having to ask an engineer what just happened.",
    icon: "trace",
    w: 100,
    h: 14,
  },
  {
    id: "team",
    label: "Team aligned",
    body: "Comments land on exact spans. Engineers jump in with context already loaded — not a “hey can you repro” thread three days later.",
    icon: "team",
    w: 114,
    h: 14,
  },
  {
    id: "fix",
    label: "Fix shipped",
    body: "Context flows into Cursor or your PR. From flagged issue to shipped fix in the same afternoon.",
    icon: "fix",
    w: 130,
    h: 18,
  },
];

const SLAB_BASE_EXT = 5;
const SLAB_BASE_H = 4;
const SLAB_GAP = 12;
const SLAB_OX = 200;
const SLAB_OY_START = 36;

function slabVisHeight(step: Step) {
  return step.w + step.h + SLAB_BASE_EXT * 2 + SLAB_BASE_H;
}

function computeSlabLayout() {
  const positions: { oy: number; step: Step }[] = [];
  let oy = SLAB_OY_START;
  for (const step of STEPS) {
    positions.push({ oy, step });
    oy += slabVisHeight(step) + SLAB_GAP;
  }
  return positions;
}

export function Flow() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-[#EAF3F6] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-ui text-[12px] font-medium uppercase tracking-[0.15em] text-zinc-600">
            Built for both sides of the table
          </span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.04] tracking-tighter text-zinc-950 sm:text-5xl md:text-[56px]">
            Built for the people who spot the problem{" "}
            <span className="text-zinc-500">— and the people who fix it.</span>
          </h2>
          <p className="font-ui mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-zinc-600 sm:text-base">
            Different depth for domain experts and devs. Shared context all the
            way through.
          </p>
        </div>

        <div className="mt-16 grid items-start gap-10 lg:mt-20 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <StackViz active={active} onSelect={setActive} />
          </div>

          <div className="order-1 lg:order-2">
            <ol className="relative border-t border-zinc-900/10">
              {STEPS.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.id} className="border-b border-zinc-900/10">
                    <div
                      className={`relative transition-colors duration-200 ${
                        isActive ? "bg-white/50" : ""
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-zinc-950 transition-opacity duration-200 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-expanded={isActive}
                        aria-controls={`flow-panel-${s.id}`}
                        className="group flex w-full cursor-pointer items-center gap-4 py-5 pl-4 pr-4 origin-left text-left transition-all duration-200 ease-out hover:bg-white/30 active:scale-[0.98] sm:py-6 sm:pl-5"
                      >
                        <span className="w-6 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 [font-variant-numeric:tabular-nums]">
                          0{i + 1}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`inline-block size-2 rounded-full transition-colors duration-200 ${
                            isActive
                              ? "bg-zinc-950"
                              : "bg-zinc-300 group-hover:bg-zinc-500"
                          }`}
                        />
                        <span className="flex-1 text-[17px] font-semibold tracking-[-0.01em] text-zinc-950 sm:text-[19px]">
                          {s.label}
                        </span>
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className={`size-4 text-zinc-500 transition-transform duration-200 ease-out motion-reduce:transition-none ${
                            isActive ? "rotate-180 text-zinc-900" : ""
                          }`}
                          aria-hidden="true"
                        >
                          <path d="M5 8l5 5 5-5" />
                        </svg>
                      </button>
                      <div
                        id={`flow-panel-${s.id}`}
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                          isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-5 pl-[72px] pr-6 text-[14.5px] leading-relaxed text-zinc-600 sm:pb-6">
                            {s.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            
            <div className="mt-12 flex items-center justify-center pt-4">
              {/* Added image pixel art below the steps to fill vertical space */}
              <img 
                src="/tree2.png" 
                alt="Pixel art palm trees with San Francisco skyline" 
                className="w-full max-w-sm object-contain mix-blend-multiply opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StackViz({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (index: number) => void;
}) {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 15%"]
  });

  const positions = computeSlabLayout();
  const lastPos = positions[positions.length - 1];
  const viewH = lastPos.oy + slabVisHeight(lastPos.step) + 36;
  const viewW = 500;

  // Compute building stack initial Ys
  const stackedYs: number[] = new Array(positions.length);
  stackedYs[positions.length - 1] = positions[positions.length - 1].oy;
  for (let i = positions.length - 2; i >= 0; i--) {
    const belowStep = positions[i + 1].step;
    const currentStep = positions[i].step;
    stackedYs[i] =
      stackedYs[i + 1] +
      0.5 * (belowStep.w - currentStep.w) -
      belowStep.h -
      SLAB_BASE_H;
  }

  const connections = positions.slice(0, -1).map((pos, i) => {
    const nextPos = positions[i + 1];
    const cx = SLAB_OX;
    const y1 = pos.oy + slabVisHeight(pos.step) - pos.step.h + 2;
    const y2 = nextPos.oy - nextPos.step.h - 2;
    return {
      key: `flowpath-${i}`,
      cx,
      y1,
      y2,
      d: `M ${cx} ${y1} L ${cx} ${y2}`,
    };
  });

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${viewW} ${viewH}`}
      role="img"
      aria-label="Neatlogs end-to-end flow: agent runs, trace captured, team aligned, fix shipped"
      className="mx-auto block h-auto w-full max-w-[500px]"
    >
      <defs>
        <linearGradient id="slabTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d4d4d8" />
        </linearGradient>
        <linearGradient id="slabTopActive" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#27272a" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
        <radialGradient id="slabGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#18181b" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#18181b" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#18181b" stopOpacity="0" />
        </radialGradient>
        <filter id="slabBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        {connections.map((c) => (
          <path key={c.key} id={c.key} d={c.d} />
        ))}
      </defs>

      {connections.map((c, i) => {
        // Aggressively fast fade bounds to maximize reading dwell time
        const startO = i * 0.03;
        const endO = startO + 0.20;
        const closeStartO = 0.75 + i * 0.03;
        const closeEndO = closeStartO + 0.15;
        const lineOpacity = useTransform(
          scrollYProgress, 
          [0, startO, endO, closeStartO, closeEndO, 1], 
          [0, 0, 1, 1, 0, 0]
        );

        return (
          <motion.g
            key={`connection-${c.key}`}
            style={{ opacity: lineOpacity }}
          >
            <line
              x1={c.cx}
              y1={c.y1}
              x2={c.cx}
              y2={c.y2}
              stroke="#a1a1aa"
              strokeOpacity="0.3"
              strokeWidth="2"
              strokeDasharray="2 5"
              strokeLinecap="round"
            />
            <motion.line
              x1={c.cx}
              y1={c.y1}
              x2={c.cx}
              y2={c.y2}
              stroke="#09090b"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={false}
              animate={{
                pathLength: active > i ? 1 : 0,
                opacity: active > i ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.g>
        );
      })}

      {positions
        .map((pos, i) => (
          <Slab
            key={pos.step.id}
            ox={SLAB_OX}
            targetY={pos.oy}
            stackedY={stackedYs[i]}
            step={pos.step}
            index={i}
            active={i === active}
            onClick={() => onSelect(i)}
            isInView={isInView}
            progress={scrollYProgress}
          />
        ))
        .reverse()}
    </svg>
  );
}

function Slab({
  ox,
  targetY,
  stackedY,
  step,
  index,
  active,
  onClick,
  isInView,
  progress,
}: {
  ox: number;
  targetY: number;
  stackedY: number;
  step: Step;
  index: number;
  active: boolean;
  onClick: () => void;
  isInView: boolean;
  progress: any;
}) {
  const oy = 0;
  const W = step.w;
  const D = step.w;
  const H = step.h;
  const E = SLAB_BASE_EXT;
  const BH = SLAB_BASE_H;

  const pt = (x: number, y: number, z: number) =>
    `${ox + COS30 * (x - y)} ${oy + E + SIN30 * (x + y) - z}`;

  const top = `M ${pt(0, 0, H)} L ${pt(W, 0, H)} L ${pt(W, D, H)} L ${pt(0, D, H)} Z`;
  const left = `M ${pt(0, D, 0)} L ${pt(W, D, 0)} L ${pt(W, D, H)} L ${pt(0, D, H)} Z`;
  const right = `M ${pt(W, 0, 0)} L ${pt(W, D, 0)} L ${pt(W, D, H)} L ${pt(W, 0, H)} Z`;

  const baseTop = `M ${pt(-E, -E, 0)} L ${pt(W + E, -E, 0)} L ${pt(W + E, D + E, 0)} L ${pt(-E, D + E, 0)} Z`;
  const baseLeft = `M ${pt(-E, D + E, -BH)} L ${pt(W + E, D + E, -BH)} L ${pt(W + E, D + E, 0)} L ${pt(-E, D + E, 0)} Z`;
  const baseRight = `M ${pt(W + E, -E, -BH)} L ${pt(W + E, D + E, -BH)} L ${pt(W + E, D + E, 0)} L ${pt(W + E, -E, 0)} Z`;

  const topMidLine = `M ${pt(0, D / 2, H)} L ${pt(W, D / 2, H)}`;
  const topCrossLine = `M ${pt(W / 2, 0, H)} L ${pt(W / 2, D, H)}`;

  const shadowCx = ox;
  const shadowCy = oy + E + SIN30 * (W + D) + BH + 14;
  const shadowRx = COS30 * (W + E * 2) * 0.95;
  const shadowRy = SIN30 * (W + E * 2) * 0.32;

  const topCx = ox;
  const topCy = oy + E + SIN30 * W - H;

  const labelX = ox + COS30 * (W + E) + 22;
  const labelY = oy + E + SIN30 * W - H / 2 + 4;

  const glowRx = COS30 * W * 1.45;
  const glowRy = SIN30 * (W + D) * 0.85;

  // Heavily bias the keyframes to the strict edges (0.0-0.35 and 0.7-1.0) so it holds completely open at 0.5 center.
  const openStart = index * 0.03;
  const openEnd = openStart + 0.25;
  const closeStart = 0.75 + (3 - index) * 0.03;
  const closeEnd = closeStart + 0.15;
  
  const scrollY = useTransform(
    progress, 
    [0, openStart, openEnd, closeStart, closeEnd, 1], 
    [stackedY, stackedY, targetY, targetY, stackedY, stackedY]
  );

  return (
    <motion.g style={{ y: scrollY }}>
      <motion.g
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{
          y: active ? -9 : 0,
          opacity: isInView ? 1 : 0,
        }}
        transition={{
          y: { type: "spring", duration: 0.6, bounce: 0.25 },
          opacity: { duration: 0.5 },
        }}
        className="group cursor-pointer"
      >
        <ellipse
          cx={topCx}
          cy={topCy + (SIN30 * W) / 2 + 4}
          rx={glowRx}
          ry={glowRy}
          fill="url(#slabGlow)"
          opacity={active ? 1 : 0}
          style={{ transition: "opacity 420ms ease-out" }}
        />

        <ellipse
          cx={shadowCx}
          cy={shadowCy + 8}
          rx={shadowRx * 1.15}
          ry={shadowRy * 1.15}
          fill="#09090b"
          opacity={index === 3 ? (active ? 0.28 : 0) : 0}
          filter="url(#slabBlur)"
          style={{ transition: "all 300ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />

        {/* Resting shadow */}
        <ellipse
          cx={shadowCx}
          cy={shadowCy}
          rx={shadowRx}
          ry={shadowRy}
          fill="#09090b"
          opacity={index === 3 ? (active ? 0 : 0.16) : 0}
          filter="url(#slabBlur)"
          style={{ transition: "all 300ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />

        <path
          d={baseRight}
          fill={active ? "#18181b" : "#a1a1aa"}
          stroke={active ? "#000000" : "#52525b"}
          strokeOpacity={active ? 0.5 : 0.28}
          strokeWidth="1"
          strokeLinejoin="round"
          style={{ transition: "fill 260ms ease-out" }}
        />
        <path
          d={baseLeft}
          fill={active ? "#27272a" : "#d4d4d8"}
          stroke={active ? "#000000" : "#52525b"}
          strokeOpacity={active ? 0.4 : 0.24}
          strokeWidth="1"
          strokeLinejoin="round"
          style={{ transition: "fill 260ms ease-out" }}
        />
        <path
          d={baseTop}
          fill={active ? "#3f3f46" : "#e4e4e7"}
          stroke={active ? "#000000" : "#52525b"}
          strokeOpacity={active ? 0.48 : 0.3}
          strokeWidth="1"
          strokeLinejoin="round"
          style={{ transition: "fill 260ms ease-out" }}
        />

        <path
          d={right}
          fill={active ? "#09090b" : "#a1a1aa"}
          stroke={active ? "#000000" : "#52525b"}
          strokeOpacity={active ? 0.6 : 0.36}
          strokeWidth="1"
          strokeLinejoin="round"
          style={{ transition: "fill 260ms ease-out" }}
        />
        <path
          d={left}
          fill={active ? "#1c1c1f" : "#d4d4d8"}
          stroke={active ? "#000000" : "#52525b"}
          strokeOpacity={active ? 0.5 : 0.3}
          strokeWidth="1"
          strokeLinejoin="round"
          style={{ transition: "fill 260ms ease-out" }}
        />
        <path
          d={top}
          fill={active ? "url(#slabTopActive)" : 
            "url(#slabTop)"}
          stroke={active ? "#000000" : "#52525b"}
          strokeOpacity={active ? 0.65 : 0.34}
          strokeWidth="1"
          strokeLinejoin="round"
        />

        <path
          d={topMidLine}
          stroke={active ? "#ffffff" : "#71717a"}
          strokeOpacity={active ? 0.14 : 0.22}
          strokeWidth="1"
          fill="none"
        />
        <path
          d={topCrossLine}
          stroke={active ? "#ffffff" : "#71717a"}
          strokeOpacity={active ? 0.14 : 0.22}
          strokeWidth="1"
          fill="none"
        />

        <text
          x={labelX}
          y={labelY}
          style={{
            fontSize: 11,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: active ? 700 : 500,
            fill: active ? "#09090b" : "#71717a",
            transition: "fill 200ms ease-out, font-weight 200ms ease-out",
          }}
        >
          {`0${index + 1} · ${step.label}`}
        </text>
      </motion.g>
    </motion.g>
  );
}

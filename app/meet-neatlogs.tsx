"use client";

import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { type ReactNode, useRef } from "react";
import { Reveal } from "./reveal";

const ACCENT = "#E8462F";

export function MeetNeatlogs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative" }}
      className="bg-[#EAF3F6] pt-10 pb-24 sm:pt-14 sm:pb-28 lg:pt-16 lg:pb-36"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <span
          translate="no"
          className="text-2xl sm:text-3xl font-semibold tracking-tight"
          style={{ color: ACCENT }}
        >
          <Reveal progress={scrollYProgress} from={0.14} to={0.2}>
            Meet Neatlogs
          </Reveal>
        </span>

        <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-[72px]">
          <span className="text-zinc-500">
            <Reveal
              progress={scrollYProgress}
              from={0.2}
              to={0.3}
              style={{ color: "rgb(113,113,122)" }}
              baseColor="#ADB2B7"
            >
              Code got GitHub.
            </Reveal>
          </span>
          <br />
          <span className="text-zinc-500">
            <Reveal
              progress={scrollYProgress}
              from={0.3}
              to={0.38}
              style={{ color: "rgb(113,113,122)" }}
              baseColor="#ADB2B7"
            >
              Design got Figma.
            </Reveal>
          </span>
          <br />
          <span className="text-zinc-950">
            <Reveal
              progress={scrollYProgress}
              from={0.38}
              to={0.46}
              style={{ color: "rgb(9,9,11)" }}
              baseColor="#ADB2B7"
            >
              Agents get Neatlogs.
            </Reveal>
          </span>
        </h2>

        <div className="relative mt-20 sm:mt-24 lg:mt-28">
          <div aria-hidden="true" className="absolute inset-0 hidden sm:block">
            <LineageConnector />
          </div>

          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-8">
            <Era
              year="2008"
              brand="GitHub"
              role="for code"
              progress={scrollYProgress}
              from={0.48}
              to={0.55}
            >
              <CodeScene />
            </Era>
            <Era
              year="2016"
              brand="Figma"
              role="for design"
              progress={scrollYProgress}
              from={0.52}
              to={0.59}
            >
              <DesignScene />
            </Era>
            <Era
              year="2026"
              brand="Neatlogs"
              role="for agents"
              progress={scrollYProgress}
              from={0.56}
              to={0.63}
              active
            >
              <AgentScene />
            </Era>
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-xl text-balance text-[15px] leading-relaxed text-zinc-600 sm:mt-16 sm:text-base">
          <Reveal progress={scrollYProgress} from={0.66} to={0.8}>
            One shared room for the people who build agents and the people who
            know what they&rsquo;re supposed to do.
          </Reveal>
        </p>
      </div>
    </section>
  );
}



function Era({
  year,
  brand,
  role,
  active,
  progress,
  from,
  to,
  children,
}: {
  year: string;
  brand: string;
  role: string;
  active?: boolean;
  progress: MotionValue<number>;
  from: number;
  to: number;
  children: ReactNode;
}) {
  const step = (to - from) / 3;
  const yearTo = from + step;
  const brandTo = from + step * 2;

  return (
    <div
      className={`group flex flex-col items-center gap-4 transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-55"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-zinc-500">
          <Reveal
            progress={progress}
            from={from}
            to={yearTo}
            style={{ color: "rgb(113,113,122)" }}
          >
            {year}
          </Reveal>
        </span>
      </div>

      <div
        className={`relative w-full rounded-[18px] bg-zinc-950 p-1.5 ring-1 ring-black/10 transition-shadow duration-500 sm:p-2 ${
          active
            ? "shadow-[0_24px_50px_-28px_rgba(12,20,40,0.35),0_12px_24px_-16px_rgba(12,20,40,0.25)]"
            : "shadow-[0_18px_40px_-24px_rgba(12,20,40,0.25)]"
        }`}
      >
        <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-zinc-50">
          <div className="absolute left-0 top-0 flex h-6 w-full items-center gap-1 border-b border-black/5 bg-white/75 px-2.5 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-zinc-300" />
            <span className="size-1.5 rounded-full bg-zinc-300" />
            <span className="size-1.5 rounded-full bg-zinc-300" />
          </div>
          <div className="absolute inset-0 pt-6">
            <div className="h-full p-3">{children}</div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div
          translate="no"
          className="text-[16px] font-semibold tracking-tight"
          style={active ? { color: ACCENT } : { color: "rgb(24,24,27)" }}
        >
          <Reveal
            progress={progress}
            from={yearTo}
            to={brandTo}
            style={active ? { color: ACCENT } : { color: "rgb(24,24,27)" }}
          >
            {brand}
          </Reveal>
        </div>
        <div className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <Reveal
            progress={progress}
            from={brandTo}
            to={to}
            style={{ color: "rgb(113,113,122)" }}
          >
            {role}
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function LineageConnector() {
  return (
    <svg
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      className="absolute left-0 right-0 top-8 h-px w-full"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="0.5"
        x2="100"
        y2="0.5"
        stroke="rgb(24, 24, 27)"
        strokeOpacity="0.12"
        strokeWidth="1"
        strokeDasharray="0.4 0.8"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function CodeScene() {
  return (
    <div className="flex h-full flex-col justify-center gap-1.25 font-mono text-[8px] leading-none text-zinc-400">
      <Row
        mark="+"
        markColor="text-emerald-600"
        tint="bg-emerald-200/70"
        width="w-full"
      />
      <Row
        mark="+"
        markColor="text-emerald-600"
        tint="bg-emerald-200/70"
        width="w-3/4"
      />
      <Row
        mark="−"
        markColor="text-red-500"
        tint="bg-red-200/70"
        width="w-2/3"
      />
      <Row
        mark=" "
        markColor="text-zinc-400"
        tint="bg-zinc-200/80"
        width="w-5/6"
      />
      <Row
        mark="+"
        markColor="text-emerald-600"
        tint="bg-emerald-200/70"
        width="w-1/2"
      />
    </div>
  );
}

function Row({
  mark,
  markColor,
  tint,
  width,
}: {
  mark: string;
  markColor: string;
  tint: string;
  width: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 ${markColor}`}>{mark}</span>
      <span className={`h-1 rounded-full ${tint} ${width}`} />
    </div>
  );
}

function DesignScene() {
  return (
    <div className="relative h-full">
      <span className="absolute left-1 top-1 size-8 rounded-md bg-sky-200/70 ring-1 ring-sky-400/40" />
      <span className="absolute left-6 top-5 size-6 rounded-full bg-rose-200/80 ring-1 ring-rose-400/40" />
      <span
        className="absolute bottom-1 right-1 h-6 w-10 rounded-sm bg-amber-200/70 ring-1 ring-amber-400/40"
        style={{ transform: "rotate(-6deg)" }}
      />
      <span className="absolute bottom-3 left-2 size-2 rounded-full bg-zinc-900/70" />
      <span className="absolute right-8 top-2 block h-px w-6 bg-zinc-900/30" />
    </div>
  );
}

function AgentScene() {
  return (
    <div className="flex h-full flex-col justify-center gap-1.25 font-mono text-[8px] leading-none">
      <TraceRow dot={ACCENT} tint="rgba(232,70,47,0.25)" width="w-full" pulse />
      <TraceRow dot="#f59e0b" tint="rgba(245,158,11,0.25)" width="w-3/4" />
      <TraceRow dot="#10b981" tint="rgba(16,185,129,0.28)" width="w-5/6" />
      <TraceRow dot="#10b981" tint="rgba(16,185,129,0.28)" width="w-2/3" />
      <TraceRow dot={ACCENT} tint="rgba(232,70,47,0.25)" width="w-1/2" />
    </div>
  );
}

function TraceRow({
  dot,
  tint,
  width,
  pulse,
}: {
  dot: string;
  tint: string;
  width: string;
  pulse?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="relative flex size-1.5 shrink-0">
        {pulse && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ backgroundColor: dot }}
          />
        )}
        <span
          className="relative inline-flex size-1.5 rounded-full"
          style={{ backgroundColor: dot }}
        />
      </span>
      <span
        className={`h-1 rounded-full ${width}`}
        style={{ backgroundColor: tint }}
      />
    </div>
  );
}

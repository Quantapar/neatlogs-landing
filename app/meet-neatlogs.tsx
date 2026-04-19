"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
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
      className="bg-[#FAFAFA] pt-10 sm:pt-14 lg:pt-16"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <span
          translate="no"
          className="font-ui text-2xl sm:text-3xl font-semibold tracking-tight"
          style={{ color: ACCENT }}
        >
          <Reveal progress={scrollYProgress} from={0.05} to={0.1}>
            Meet Neatlogs
          </Reveal>
        </span>

        <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.2] tracking-tighter sm:text-5xl md:text-[56px]">
          <span className="text-zinc-950">
            <Reveal
              progress={scrollYProgress}
              from={0.08}
              to={0.15}
              style={{ color: "rgb(9,9,11)" }}
              baseColor="#ADB2B7"
            >
              The shared workspace for agent teams.
            </Reveal>
          </span>
          <br />
          <span className="text-zinc-950">
            <Reveal
              progress={scrollYProgress}
              from={0.15}
              to={0.22}
              style={{ color: "rgb(9,9,11)" }}
              baseColor="#ADB2B7"
            >
              One thread from break to shipped fix.
            </Reveal>
          </span>
        </h2>
      </div>

      <DashboardScene />
    </section>
  );
}

function DashboardScene() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: entryProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(entryProgress, [0.1, 1], [1, 0.78]);

  const leftX = useTransform(scrollYProgress, [0.32, 0.5], ["-14%", "0%"]);
  const leftOpacity = useTransform(scrollYProgress, [0.32, 0.5], [0, 1]);

  const rightX = useTransform(scrollYProgress, [0.4, 0.58], ["14%", "0%"]);
  const rightOpacity = useTransform(scrollYProgress, [0.4, 0.58], [0, 1]);

  const centerScale = useTransform(scrollYProgress, [0.18, 0.32], [0.85, 1]);
  const centerOpacity = useTransform(scrollYProgress, [0.18, 0.32], [0, 1]);

  return (
    <div ref={sceneRef} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-start justify-center pt-16 sm:pt-20">
        <motion.div
          style={{ scale }}
          className="relative w-full overflow-hidden rounded-[28px] bg-zinc-950 p-3 shadow-[0_40px_100px_-30px_rgba(12,20,40,0.45)] ring-1 ring-white/5 sm:p-4"
        >
          <DashboardHeader />

          <div className="relative mt-3 flex h-[420px] items-center justify-center gap-3 rounded-[20px] bg-[#0a0a0a] px-4 py-6 sm:h-[500px] sm:gap-5 sm:px-8 sm:py-10 lg:h-[600px]">
            <BackgroundGrid />

            <motion.div
              style={{ x: leftX, opacity: leftOpacity }}
              className="relative z-10 hidden w-[22%] min-w-[160px] sm:block"
            >
              <AlertNode />
            </motion.div>

            <motion.div
              style={{ scale: centerScale, opacity: centerOpacity }}
              className="relative z-10 w-full max-w-[300px] sm:w-[38%] sm:max-w-none"
            >
              <TraceNode />
            </motion.div>

            <motion.div
              style={{ x: rightX, opacity: rightOpacity }}
              className="relative z-10 hidden w-[22%] min-w-[160px] sm:block"
            >
              <FixNode />
            </motion.div>

            <Toolbar />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="flex items-center justify-between px-2 pb-1 pt-1 sm:px-3">
      <div className="flex items-center gap-2.5">
        <div className="flex size-7 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10">
          <div className="size-3 rounded-sm bg-white/60" />
        </div>
        <div className="text-left">
          <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">
            Project
          </div>
          <div className="text-[13px] font-semibold text-white">
            Research Agent · run #4821
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex h-7 items-center gap-1.5 rounded-md bg-white/5 px-3 text-[11px] font-medium text-zinc-300 ring-1 ring-white/5">
          Actions
          <ChevronDown />
        </div>
        <div className="flex h-7 items-center gap-1.5 rounded-md bg-white/5 px-3 text-[11px] font-medium text-zinc-300 ring-1 ring-white/5">
          <Dot />
          Credits <span className="text-zinc-500">1,250</span>
        </div>
      </div>
    </div>
  );
}

function BackgroundGrid() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full opacity-[0.15]"
    >
      <defs>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function AlertNode() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#141416] p-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-rose-400">
          Detection
        </span>
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-500 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-rose-500" />
        </span>
      </div>
      <div className="mt-2.5 text-[12.5px] font-medium leading-tight text-white">
        Tool call timeout
      </div>
      <div className="mt-1.5 font-mono text-[10px] text-zinc-400">
        serpapi.search · 28.3s
      </div>
      <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-[2px] font-mono text-[9px] uppercase tracking-wider text-rose-300">
        critical
      </div>
    </div>
  );
}

function TraceNode() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#141416] p-4 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
          Trace · agent run
        </span>
        <span className="font-mono text-[9px] text-zinc-600">#4821</span>
      </div>
      <div className="mt-4 space-y-2.5">
        <TraceRow label="route" width="90%" />
        <TraceRow label="fetch_context" width="78%" />
        <TraceRow label="serpapi.search" width="62%" tone="rose" />
        <TraceRow label="summarize" width="44%" muted />
      </div>
    </div>
  );
}

function TraceRow({
  label,
  width,
  tone = "default",
  muted,
}: {
  label: string;
  width: string;
  tone?: "default" | "rose";
  muted?: boolean;
}) {
  const barClass =
    tone === "rose"
      ? "bg-gradient-to-r from-rose-500/70 to-rose-400/40"
      : muted
        ? "bg-white/5"
        : "bg-gradient-to-r from-white/25 to-white/10";
  return (
    <div className="flex items-center gap-2">
      <span className="w-[72px] shrink-0 truncate font-mono text-[9px] text-zinc-500">
        {label}
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
        <div className={`h-full rounded-full ${barClass}`} style={{ width }} />
      </div>
    </div>
  );
}

function FixNode() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#141416] p-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-300">
          AI fix
        </span>
        <span className="font-mono text-[9px] text-emerald-400/70">+12 −4</span>
      </div>
      <div className="mt-2.5 text-[12.5px] font-medium leading-tight text-white">
        Suggested diff
      </div>
      <div className="mt-2 rounded-md bg-black/60 p-2 font-mono text-[9.5px] leading-[1.55] text-zinc-300">
        <div>
          <span className="text-zinc-500">try</span>:
        </div>
        <div className="pl-2">
          result = <span className="text-sky-300">fetch_context</span>(q)
        </div>
        <div>
          <span className="text-zinc-500">except</span>{" "}
          <span className="text-rose-300">Timeout</span>:
        </div>
        <div className="pl-2 text-emerald-300">+ use_cached_context(q)</div>
      </div>
    </div>
  );
}

function Toolbar() {
  return (
    <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center sm:bottom-6">
      <div className="flex items-center gap-1 rounded-full bg-[#18181b]/90 px-2 py-1.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/10 backdrop-blur-md">
        {["+", "◇", "✎", "↗", "⎘"].map((t, i) => (
          <button
            key={i}
            type="button"
            className="flex size-7 cursor-pointer items-center justify-center rounded-full text-[12px] text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-3 text-zinc-500"
      fill="currentColor"
    >
      <path d="M5.5 7.5a.75.75 0 0 1 1.06 0L10 10.94l3.44-3.44a.75.75 0 0 1 1.06 1.06l-3.97 3.97a.75.75 0 0 1-1.06 0L5.5 8.56a.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}

function Dot() {
  return <span className="size-1.5 rounded-full bg-emerald-400" />;
}

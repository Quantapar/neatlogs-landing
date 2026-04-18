"use client";

import { useEffect, useState, type ReactNode, type SVGProps } from "react";

export function Features() {
  return (
    <section
      id="features"
      className="relative bg-[#EAF3F6] pt-8 pb-20 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-[12px] font-medium uppercase tracking-[0.15em] text-zinc-600">
            Why Neatlogs
          </span>
          <h2 className="mt-5 text-balance text-4xl leading-[1.08] tracking-[-0.03em] text-zinc-950 sm:text-5xl md:text-[58px]">
            <span className="font-semibold">
              Most teams don&rsquo;t have a visibility problem.
            </span>{" "}
            <span className="text-zinc-500 font-medium tracking-tight">
              They have a handoff problem.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-zinc-600 sm:text-base">
            The issue gets spotted in one place, discussed in another, and fixed
            in a third. Neatlogs closes that loop.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          <FeatureCard
            tone="dark"
            className="sm:col-span-2 lg:col-span-2"
            icon={<IconSearch />}
            title="Surface the issue"
            body="Detection triggers instantly. Alerts hit Slack and email before your team notices something's wrong."
            visual={<AlertVisual />}
          />
          <FeatureCard
            icon={<IconUsers />}
            title="Shared context, always"
            body="Domain experts and developers see the same thread — no re-explaining what broke or why it matters."
            visual={<AvatarVisual />}
          />
          <FeatureCard
            icon={<IconBolt />}
            title="Move fast"
            body="From alert to aligned fix in minutes, not hours. No handoff lag. No context lost in translation."
            visual={<TimerVisual />}
          />
          <FeatureCard
            icon={<IconSparkle />}
            title="Fix it with AI"
            body="Filter the relevant context, generate fix suggestions, and orchestrate your coding agent to ship."
            visual={<DiffVisual />}
          />
          <FeatureCard
            icon={<IconPulse />}
            title="Monitor for recurrence"
            body="After the fix ships, Neatlogs watches for the same pattern so you know if it comes back."
            visual={<SparklineVisual />}
          />
          <FeatureCard
            className="sm:col-span-2 lg:col-span-3"
            icon={<IconBrain />}
            title="Built for AI agents"
            body="Purpose-built tracing for LangGraph, CrewAI, LangChain, and any agentic workflow your team ships."
            visual={<FrameworksVisual />}
            horizontal
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  tone = "light",
  className = "",
  icon,
  title,
  body,
  visual,
  horizontal,
}: {
  tone?: "light" | "dark";
  className?: string;
  icon: ReactNode;
  title: string;
  body: string;
  visual?: ReactNode;
  horizontal?: boolean;
}) {
  const isDark = tone === "dark";
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl p-6 ring-1 transition-[transform,box-shadow,background-color] duration-200 ease will-change-transform motion-reduce:transition-none hover:-translate-y-0.5 ${
        isDark
          ? "bg-zinc-950 text-white ring-black/10 hover:shadow-[0_22px_52px_-22px_rgba(0,0,0,0.55)]"
          : "bg-white/80 text-zinc-950 ring-zinc-900/5 hover:bg-white hover:shadow-[0_14px_36px_-20px_rgba(12,20,40,0.25)]"
      } ${horizontal ? "lg:flex-row lg:items-center lg:gap-10" : ""} ${className}`}
    >
      <div className={horizontal ? "lg:max-w-sm" : ""}>
        <span
          className={`inline-flex size-9 items-center justify-center rounded-xl ring-1 transition-transform duration-200 ease group-hover:scale-[1.04] motion-reduce:transition-none ${
            isDark
              ? "bg-white/5 text-white ring-white/10"
              : "bg-zinc-900/[0.03] text-zinc-900 ring-zinc-900/10"
          }`}
        >
          {icon}
        </span>
        <h3
          className={`mt-6 text-[20px] font-semibold tracking-tight leading-[1.18] sm:text-[22px] ${
            isDark ? "text-white" : "text-zinc-950"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-2.5 max-w-md text-[14px] leading-relaxed ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          {body}
        </p>
      </div>
      {visual && (
        <div
          className={`${horizontal ? "mt-6 lg:mt-0 lg:flex-1" : "mt-7 flex-1"}`}
        >
          {visual}
        </div>
      )}
    </article>
  );
}

function AlertVisual() {
  const rows: { title: string; meta: string; delay: number }[] = [
    { title: "Tool call timeout", meta: "serpapi · 28.3s", delay: 0 },
    { title: "Unexpected output", meta: "summarise · score 0.34", delay: 60 },
    { title: "All clear", meta: "classify · 3 runs · 1.2s", delay: 120 },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      {rows.map((r, i) => (
        <div
          key={r.title}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ring-1 transition-transform duration-200 ease will-change-transform group-hover:translate-x-1 motion-reduce:transition-none ${
            i === 0
              ? "bg-white/[0.07] ring-white/15"
              : "bg-white/[0.02] ring-white/10"
          }`}
          style={{ transitionDelay: `${r.delay}ms` }}
        >
          <span className="text-[10px] uppercase font-mono tracking-widest text-white/35">
            0{i + 1}
          </span>
          <span className="flex-1 truncate text-[12px] font-medium text-white/90">
            {r.title}
          </span>
          <span
            translate="no"
            className="hidden truncate font-mono text-[10px] text-white/40 sm:inline"
          >
            {r.meta}
          </span>
        </div>
      ))}
    </div>
  );
}

function AvatarVisual() {
  const MEMBERS: {
    initials: string;
    role: string;
    quote: string;
    bg: string;
  }[] = [
    { initials: "MK", role: "Product", quote: "Caught the wrong source early.", bg: "#18181B" },
    { initials: "AR", role: "Engineering", quote: "Shipped the fix before lunch.", bg: "#27272A" },
    { initials: "SJ", role: "Support", quote: "Told the user within minutes.", bg: "#3F3F46" },
    { initials: "DK", role: "Research", quote: "Saw the exact same trace.", bg: "#52525B" },
    { initials: "LM", role: "Ops", quote: "Zero back-and-forth in Slack.", bg: "#71717A" },
    { initials: "JT", role: "Compliance", quote: "Audited the fix in context.", bg: "#A1A1AA" },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % MEMBERS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [MEMBERS.length]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1.5">
        {MEMBERS.map((m, i) => {
          const isActive = i === active;
          return (
            <span
              key={m.initials}
              className={`flex size-8 items-center justify-center rounded-full text-[10.5px] font-semibold transition-[transform,opacity,box-shadow] duration-250 ease will-change-transform motion-reduce:transition-none ${
                isActive
                  ? "scale-[1.12] opacity-100 shadow-[0_0_0_2px_rgb(9,9,11)]"
                  : "opacity-45 shadow-[0_0_0_1px_rgba(24,24,27,0.1)]"
              }`}
              style={{ backgroundColor: m.bg, color: "#ffffff" }}
            >
              {m.initials}
            </span>
          );
        })}
      </div>
      <div className="relative min-h-[40px]">
        {MEMBERS.map((m, i) => (
          <div
            key={m.initials}
            aria-hidden={i !== active}
            className={`absolute inset-0 flex items-center gap-2 text-[12.5px] leading-snug transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
              i === active
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-1 opacity-0"
            }`}
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-900">
              {m.role}
            </span>
            <span className="text-zinc-300">—</span>
            <span className="truncate italic text-zinc-600">
              &ldquo;{m.quote}&rdquo;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimerVisual() {
  return (
    <div className="relative">
      <div className="relative h-1.5 overflow-hidden rounded-full bg-zinc-200/80">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[35%] rounded-full bg-zinc-950 transition-[width] duration-[450ms] ease-out group-hover:w-[78%] motion-reduce:transition-none"
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-zinc-500 [font-variant-numeric:tabular-nums]">
        <span>Alert</span>
        <span className="text-zinc-900">7m 42s</span>
        <span>Shipped</span>
      </div>
    </div>
  );
}

function DiffVisual() {
  const lines: { mark: "−" | "+"; text: string; delay: number }[] = [
    { mark: "−", text: "use_source(\"2019-prices\")", delay: 0 },
    { mark: "+", text: "use_source(current())", delay: 80 },
    { mark: "+", text: "log.info(\"resolved\")", delay: 160 },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-900/10 bg-white">
      <div className="flex items-center justify-between border-b border-zinc-900/5 px-3 py-1.5">
        <span translate="no" className="font-mono text-[10px] text-zinc-600">
          source-picker.ts
        </span>
        <span className="font-mono text-[10px] text-zinc-500">+12 −4</span>
      </div>
      <div className="flex flex-col gap-1 p-3 font-mono text-[10.5px]">
        {lines.map((l) => (
          <div
            key={l.text}
            className="flex items-center gap-2 rounded bg-zinc-900/[0.03] px-2 py-1 transition-transform duration-[200ms] ease-out will-change-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
            style={{ transitionDelay: `${l.delay}ms` }}
          >
            <span className="w-2 text-zinc-400">{l.mark}</span>
            <span className="truncate text-zinc-700">{l.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SparklineVisual() {
  const d = "M4 44 L24 40 L46 44 L68 30 L90 34 L112 18 L134 26 L156 12 L176 20 L194 10";
  return (
    <div className="relative">
      <svg
        viewBox="0 0 200 60"
        className="h-[60px] w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(24,24,27)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="rgb(24,24,27)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${d} L194 60 L4 60 Z`} fill="url(#sparkFill)" />
        <path
          d={d}
          fill="none"
          stroke="rgb(9,9,11)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-[stroke-width] duration-[300ms] ease-out group-hover:[stroke-width:2.2] motion-reduce:transition-none"
        />
      </svg>
      <div className="mt-1 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-zinc-500">
        <span>30 days</span>
        <span className="text-zinc-900">Stable</span>
      </div>
    </div>
  );
}

function FrameworksVisual() {
  const FRAMEWORKS = [
    "LangGraph",
    "CrewAI",
    "LangChain",
    "OpenAI Agents",
    "Vercel AI SDK",
    "Claude",
    "LlamaIndex",
    "Mastra",
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {FRAMEWORKS.map((f, i) => (
        <span
          key={f}
          className="inline-flex h-9 cursor-default items-center rounded-full border border-zinc-900/10 bg-white/90 px-3.5 text-[12.5px] font-medium text-zinc-800 shadow-[0_1px_2px_rgba(12,20,40,0.04)] transition-[transform,border-color,background-color,box-shadow] duration-[250ms] ease will-change-transform group-hover:-translate-y-[2px] group-hover:border-zinc-900/20 group-hover:bg-white group-hover:shadow-[0_6px_16px_-8px_rgba(12,20,40,0.2)] motion-reduce:transition-none"
          style={{ transitionDelay: `${i * 30}ms` }}
        >
          {f}
        </span>
      ))}
    </div>
  );
}

function IconSearch(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[18px]"
      aria-hidden="true"
      {...p}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

function IconUsers(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[18px]"
      aria-hidden="true"
      {...p}
    >
      <circle cx="10" cy="8" r="3" />
      <path d="M4 18c0-2.5 2.5-4.5 6-4.5s6 2 6 4.5" />
      <circle cx="17.5" cy="9" r="2.2" />
      <path d="M15.5 18c.2-1.8 1.4-2.8 3.6-2.8" />
    </svg>
  );
}

function IconBolt(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[18px]"
      aria-hidden="true"
      {...p}
    >
      <path d="M13 3 5 14h5l-1 7 8-11h-5l1-7Z" />
    </svg>
  );
}

function IconSparkle(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[18px]"
      aria-hidden="true"
      {...p}
    >
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="M6 6l2.5 2.5" />
      <path d="M15.5 15.5 18 18" />
      <path d="M6 18l2.5-2.5" />
      <path d="M15.5 8.5 18 6" />
    </svg>
  );
}

function IconPulse(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[18px]"
      aria-hidden="true"
      {...p}
    >
      <path d="M3 12h4l2-5 4 10 2-5h6" />
    </svg>
  );
}

function IconBrain(p: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[18px]"
      aria-hidden="true"
      {...p}
    >
      <path d="M9.5 4a2.5 2.5 0 0 0-2.5 2.5V7a3 3 0 0 0-2 5.2A3 3 0 0 0 7 17v.5A2.5 2.5 0 0 0 9.5 20 2.5 2.5 0 0 0 12 17.5V4Z" />
      <path d="M14.5 4A2.5 2.5 0 0 1 17 6.5V7a3 3 0 0 1 2 5.2 3 3 0 0 1-2 4.8v.5a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 12 17.5V4Z" />
    </svg>
  );
}

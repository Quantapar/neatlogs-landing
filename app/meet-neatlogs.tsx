"use client";

import {
  ArrowUp,
  Check,
  ChevronDown,
  ChevronRight,
  History,
  PanelLeft,
  Zap,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { easings } from "./easings";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
              From bug to fix in one thread.
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
  const reducedMotion = useReducedMotion();
  const { scrollYProgress: entryProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(entryProgress, [0.1, 1], [1, 0.78]);

  return (
    <div ref={sceneRef} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-start justify-center pt-16 sm:pt-20">
        <motion.div
          style={reducedMotion ? undefined : { scale }}
          className="relative w-full overflow-hidden rounded-[28px] border border-zinc-900/10 bg-[#FCFCFD] p-3 shadow-[0_30px_60px_-24px_rgba(12,20,40,0.22),0_12px_24px_-16px_rgba(12,20,40,0.14)] sm:p-4"
        >
          <div className="relative flex h-[500px] overflow-hidden rounded-[20px] bg-[#FCFCFD] ring-1 ring-zinc-900/10 sm:h-[590px] lg:h-[700px]">
            <Sidebar />
            <MainArea />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const fadeLabel = `transition-opacity duration-200 ${collapsed ? "pointer-events-none opacity-0" : "opacity-100 delay-150"}`;

  return (
    <aside
      className={`hidden shrink-0 flex-col overflow-hidden border-r border-zinc-900/5 bg-white/70 py-4 text-[13px] transition-[width] duration-300 ease-drawer sm:flex ${
        collapsed ? "w-[52px]" : "w-[220px]"
      }`}
    >
      <div className="flex h-8 shrink-0 items-center gap-2 px-3">
        <button
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((c) => !c)}
          className="group relative flex size-[26px] shrink-0 cursor-pointer items-center justify-center rounded-md"
        >
          <Image
            src="/nl-logo.png"
            alt=""
            width={22}
            height={22}
            className={`size-[22px] rounded-md ring-1 ring-black/5 transition-opacity duration-150 ${collapsed ? "group-hover:opacity-0" : ""}`}
          />
          {collapsed && (
            <PanelLeft className="absolute size-4 text-zinc-700 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
          )}
        </button>
        <span
          className={`font-pixel whitespace-nowrap text-[14px] font-normal leading-none tracking-tight text-zinc-950 ${fadeLabel}`}
        >
          neatlogs
        </span>
        <button
          type="button"
          aria-label="Collapse sidebar"
          onClick={() => setCollapsed(true)}
          className={`ml-auto flex size-[26px] shrink-0 cursor-pointer items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-900/5 hover:text-zinc-950 ${fadeLabel}`}
        >
          <PanelLeft className="size-4" />
        </button>
      </div>

      <div className="mt-5 flex w-full flex-col gap-0.5 px-1.5">
        <SidebarItem icon={IconPlus} label="Create project" bordered collapsed={collapsed} />
        <SidebarItem icon={IconAISearch} label="AI Search" active collapsed={collapsed} />
        <SidebarItem icon={IconTraces} label="Traces" collapsed={collapsed} />
        <SidebarItem icon={IconDetections} label="Detections" collapsed={collapsed} />
        <SidebarItem icon={IconFlask} label="Experiments" hasChevron collapsed={collapsed} />
        <SidebarItem icon={IconEvals} label="Evals" collapsed={collapsed} />
        <SidebarItem icon={IconCode} label="Code fixes" pill="Coming soon" collapsed={collapsed} />
      </div>

      <div className="mt-auto flex w-full flex-col gap-0.5 px-1.5">
        <SidebarItem icon={IconBell} label="Activity" collapsed={collapsed} />
        <SidebarItem icon={IconGear} label="Settings" collapsed={collapsed} />
        <div className="mt-2 flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1.5 transition-colors hover:bg-zinc-900/5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-rose-400 text-[11px] font-semibold text-white">
            M
          </div>
          <div
            className={`flex min-w-0 flex-col whitespace-nowrap ${fadeLabel}`}
          >
            <span className="text-[13px] font-semibold leading-tight text-zinc-950">
              Manu
            </span>
            <span className="truncate text-[10px] leading-tight text-zinc-500">
              Manushrama2462@gmail...
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active,
  hasChevron,
  pill,
  bordered,
  collapsed,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  active?: boolean;
  hasChevron?: boolean;
  pill?: string;
  bordered?: boolean;
  collapsed?: boolean;
}) {
  const fadeLabel = `transition-opacity duration-200 ${collapsed ? "pointer-events-none opacity-0" : "opacity-100 delay-150"}`;

  return (
    <button
      type="button"
      aria-label={label}
      title={collapsed ? label : undefined}
      className={`group flex h-[30px] cursor-pointer items-center gap-2.5 rounded-md px-1.5 text-left transition-colors ${
        bordered
          ? "border border-zinc-900/10 text-zinc-700 hover:bg-zinc-900/5 hover:text-zinc-950"
          : active
            ? "bg-zinc-900/5 text-zinc-950"
            : "text-zinc-600 hover:bg-zinc-900/5 hover:text-zinc-950"
      }`}
    >
      <Icon className="size-4 shrink-0" />
      <span
        className={`font-pixel flex-1 truncate whitespace-nowrap text-[12.5px] font-normal ${fadeLabel}`}
      >
        {label}
      </span>
      {pill && (
        <span
          className={`font-pixel shrink-0 rounded-full bg-sky-100 px-1.5 py-[1px] text-[9px] font-normal uppercase tracking-wider text-sky-700 ${fadeLabel}`}
        >
          {pill}
        </span>
      )}
      {hasChevron && (
        <ChevronRight
          className={`size-3 shrink-0 text-zinc-400 ${fadeLabel}`}
        />
      )}
    </button>
  );
}

function MainArea() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"Fast" | "Pro">("Fast");
  const [modeOpen, setModeOpen] = useState(false);
  const modeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!modeOpen) return;
    const onDown = (e: MouseEvent) => {
      if (modeRef.current && !modeRef.current.contains(e.target as Node)) {
        setModeOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [modeOpen]);

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6">
      <Image
        src="/dashboard-bg.png"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="text-center">
          <h3 className="font-pixel text-[34px] font-normal leading-none text-zinc-950">
            AI Search
          </h3>
          <p className="font-pixel mt-2 text-[13px] font-normal text-zinc-600">
            Find anything about your traces
          </p>
        </div>

        <div className="mt-6 rounded-xl bg-white/95 p-3 shadow-[0_8px_24px_-8px_rgba(12,20,40,0.15)] ring-1 ring-zinc-900/10 backdrop-blur-sm">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything..."
            className="font-pixel w-full bg-transparent text-[13.5px] font-normal text-zinc-950 outline-none placeholder:text-zinc-400"
          />
          <div className="mt-3 flex items-center gap-1.5">
            <div ref={modeRef} className="relative">
              <button
                type="button"
                onClick={() => setModeOpen((v) => !v)}
                className="font-pixel flex cursor-pointer items-center gap-1 rounded-md bg-zinc-900/5 px-2 py-1 text-[11px] font-normal text-zinc-700 transition-colors hover:bg-zinc-900/10"
              >
                <Zap className="size-3" />
                {mode}
                <ChevronDown className="size-3" />
              </button>
              <AnimatePresence>
                {modeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.14, ease: easings.snap }}
                    className="absolute left-0 top-full z-20 mt-1.5 w-[120px] overflow-hidden rounded-lg bg-white p-1 shadow-[0_12px_28px_-10px_rgba(12,20,40,0.22),0_4px_10px_-6px_rgba(12,20,40,0.12)] ring-1 ring-zinc-900/10"
                  >
                    {(["Fast", "Pro"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setMode(opt);
                          setModeOpen(false);
                        }}
                        className="font-pixel flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-[11px] font-normal text-zinc-700 transition-colors hover:bg-zinc-900/5"
                      >
                        <span>{opt}</span>
                        {mode === opt && (
                          <Check className="size-3 text-zinc-600" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              type="button"
              className="font-pixel flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-[11px] font-normal text-zinc-400 transition-colors hover:text-zinc-700"
            >
              <History className="size-3" />
              History
              <ChevronDown className="size-3" />
            </button>
            <button
              type="button"
              aria-label="Submit search"
              className="ml-auto flex size-7 cursor-pointer items-center justify-center rounded-md bg-zinc-900/5 text-zinc-600 transition-colors hover:bg-zinc-900/10 hover:text-zinc-950"
            >
              <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>

        <QuestionCycle />
      </div>
    </main>
  );
}

const QUESTIONS = [
  "Failed by status code 500",
  "Compare performance across versions",
  "Show me the latest errors",
  "List traces from user@example.com",
  "Which agents have the slowest response times",
  "Show retries in the last hour",
  "Summarize yesterday's failures",
  "Filter traces by tool call timeout",
];

function QuestionCycle() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setIndex((i) => i + 1), 2500);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const ITEM_H = 26;
  const VISIBLE = 3;
  const visible = Array.from({ length: VISIBLE }, (_, i) => ({
    key: index + i,
    text: QUESTIONS[(index + i) % QUESTIONS.length],
    position: i,
  }));

  return (
    <div
      className="relative mt-4 overflow-hidden"
      style={{
        height: ITEM_H * VISIBLE,
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)",
      }}
    >
      <AnimatePresence initial={false}>
        {visible.map((item) => (
          <motion.button
            key={item.key}
            type="button"
            initial={{ opacity: 0, y: ITEM_H * VISIBLE }}
            animate={{ opacity: 1, y: item.position * ITEM_H }}
            exit={{ opacity: 0, y: -ITEM_H }}
            transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            className="font-pixel absolute inset-x-0 cursor-pointer text-center text-[12px] font-normal text-zinc-500 transition-colors hover:text-zinc-800"
          >
            {item.text}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}

function IconPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      {...props}
    >
      <path d="M10 4.5v11M4.5 10h11" />
    </svg>
  );
}

function IconAISearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="9" cy="9" r="4.8" />
      <path d="M12.8 12.8l3 3" />
      <path
        d="M11 6.4l.55 1.1 1.1.5-1.1.5-.55 1.1-.55-1.1-1.1-.5 1.1-.5z"
        fill="currentColor"
        fillOpacity="0.22"
        strokeWidth="0.9"
      />
    </svg>
  );
}

function IconTraces(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="5" width="12" height="10" rx="2" />
      <path d="M7 10h6" />
    </svg>
  );
}

function IconDetections(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="8.6" cy="8.6" r="3.8" />
      <path d="M11.4 11.4l3 3" />
      <path d="M6.5 8.2h4.2M6.5 10h2.8" strokeWidth="1" />
    </svg>
  );
}

function IconFlask(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 3h4" />
      <path d="M9 3v4.2l-3.3 6.8a1.5 1.5 0 0 0 1.35 2.2h5.9a1.5 1.5 0 0 0 1.35-2.2L11 7.2V3" />
    </svg>
  );
}

function IconEvals(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="5" width="12" height="10" rx="2" />
      <path d="M7 11h5" />
      <path d="M11.6 7.3l1.3 1.3 2.2-2.2" strokeWidth="1.2" />
    </svg>
  );
}

function IconCode(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7.5 6.5L4 10l3.5 3.5M12.5 6.5L16 10l-3.5 3.5" />
    </svg>
  );
}

function IconBell(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 13V9a4.5 4.5 0 0 0-9 0v4L4 15.5h12L14.5 13z" />
      <path d="M8 17a2 2 0 0 0 4 0" />
    </svg>
  );
}

function IconGear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="10" cy="10" r="2.2" />
      <path d="M10 2.5v2M10 15.5v2M4.5 4.5l1.4 1.4M14.1 14.1l1.4 1.4M2.5 10h2M15.5 10h2M4.5 15.5l1.4-1.4M14.1 5.9l1.4-1.4" />
    </svg>
  );
}

"use client";

import {
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronRight,
  History,
  MessageSquare,
  PanelLeft,
  SmilePlus,
  Wrench,
  X,
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

export function MeetNeatlogs() {
  return (
    <section
      style={{ position: "relative" }}
      className="bg-[#FAFAFA] pt-10 sm:pt-14 lg:pt-16"
    >
      {/* DashboardScene kept defined below for later — currently rendering TraceMock instead. */}
      {/* <DashboardScene /> */}
      <TraceMock />
      <CollabScene />
    </section>
  );
}

function CollabScene() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 65%"],
  });

  const devX = useTransform(scrollYProgress, [0, 0.85], ["-100%", "1%"]);
  const bizX = useTransform(scrollYProgress, [0, 0.85], ["100%", "-1%"]);
  const fadeIn = useTransform(scrollYProgress, [0, 0.3, 0.85], [0, 0.9, 1]);

  return (
    <div className="mx-auto mt-12 w-full max-w-[1500px] px-2 pb-12 sm:mt-16 sm:px-3 sm:pb-16 lg:mt-20 lg:px-4 lg:pb-20">
      <div
        ref={ref}
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 4%, rgba(0,0,0,0.6) 8%, rgba(0,0,0,0.9) 14%, black 18%, black 82%, rgba(0,0,0,0.9) 86%, rgba(0,0,0,0.6) 92%, rgba(0,0,0,0.25) 96%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 4%, rgba(0,0,0,0.6) 8%, rgba(0,0,0,0.9) 14%, black 18%, black 82%, rgba(0,0,0,0.9) 86%, rgba(0,0,0,0.6) 92%, rgba(0,0,0,0.25) 96%, transparent 100%)",
        }}
        className="relative aspect-[3/2] w-full overflow-hidden bg-[#FAFAFA]"
      >
        <motion.div
          style={reducedMotion ? undefined : { x: devX, opacity: fadeIn }}
          className="pointer-events-none absolute bottom-[-5%] left-0 w-[58%] max-w-[760px] select-none"
        >
          <video
            src="/leftman.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Developer reaching out"
            className="block h-auto w-full"
          />
        </motion.div>

        <motion.div
          style={reducedMotion ? undefined : { x: bizX, opacity: fadeIn }}
          className="pointer-events-none absolute right-0 top-[-42%] w-[56%] max-w-[720px] select-none"
        >
          <video
            src="/Untitled.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Domain expert reaching out"
            className="block h-auto w-full"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[6%] bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-[8%] z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-3 px-6 text-center sm:bottom-[10%] sm:gap-4 lg:px-10">
          <h2 className="text-balance text-3xl font-semibold leading-[1.04] tracking-tighter text-zinc-950 sm:text-4xl md:text-5xl lg:text-[56px]">
            One place to go from issue to feedback to fix
          </h2>
          <p className="font-ui max-w-xl text-[14px] font-medium leading-relaxed text-zinc-700 sm:text-[15px] md:text-base">
            Developers and domain experts can look at the same run, understand
            what happened, and collaborate on the next step.
          </p>
        </div>
      </div>
    </div>
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
    <div ref={sceneRef} className="relative md:h-[260vh]">
      <div className="flex items-start justify-center pt-8 sm:pt-12 md:sticky md:top-0 md:h-screen md:pt-16 lg:pt-20">
        <motion.div
          style={reducedMotion ? undefined : { scale }}
          className="relative w-full overflow-hidden rounded border border-zinc-900/10 bg-[#FCFCFD] p-3 shadow-[0_30px_60px_-24px_rgba(12,20,40,0.22),0_12px_24px_-16px_rgba(12,20,40,0.14)] sm:p-4"
        >
          <div className="relative flex h-[500px] overflow-hidden rounded bg-[#FCFCFD] ring-1 ring-zinc-900/10 sm:h-[590px] lg:h-[700px]">
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
            className={`size-[22px] rounded transition-opacity duration-150 ${collapsed ? "group-hover:opacity-0" : ""}`}
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
                    className="absolute left-0 top-full z-20 mt-1 w-[84px] overflow-hidden rounded-md bg-white p-0.5 shadow-[0_10px_22px_-10px_rgba(12,20,40,0.2),0_3px_8px_-4px_rgba(12,20,40,0.1)] ring-1 ring-zinc-900/10"
                  >
                    {(["Fast", "Pro"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setMode(opt);
                          setModeOpen(false);
                        }}
                        className="font-pixel flex w-full cursor-pointer items-center justify-between rounded-[4px] px-2 py-[3px] text-[10.5px] font-normal text-zinc-700 transition-colors hover:bg-zinc-900/5"
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

/* ------------------------------------------------------------------ */
/* TraceMock — recreates the workflow tree screenshot the user shared. */
/* Workflow parent + 3 agents (1st & 3rd collapsed, 2nd expanded with  */
/* prompt → LLM → tool (with input/output) → final LLM response).       */
/* ------------------------------------------------------------------ */

function TraceMock() {
  return (
    <div className="mx-auto mt-10 w-full max-w-[1440px] px-6 pb-16 sm:mt-14 sm:pb-20 lg:mt-16 lg:px-10 lg:pb-24">
      <div className="relative">
      <div className="relative max-w-[1360px] overflow-hidden rounded-lg border border-zinc-900/10 bg-white shadow-[0_24px_48px_-20px_rgba(12,20,40,0.18),0_10px_20px_-12px_rgba(12,20,40,0.1)] lg:min-h-[1000px]">
        <WorkflowHeader title="Support Access Workflow" duration="4.8s" />

        <div className="px-2 pt-3 sm:px-4 sm:pt-4 pb-6">
          <Subtree>
            {/* === Agent 1 — collapsed === */}
            <Branch>
              <AgentHeader
                name="Question Extraction Agent"
                duration="0.7s"
                cost="$0.0019"
                detections={[
                  "billing query",
                  "access request",
                  "multiple questions",
                ]}
              />
            </Branch>
            <CollapsedSummary
              parts={["Prompt", "1 span", "Final Response"]}
            />

            {/* === Agent 2 — expanded === */}
            <Branch>
              <AgentHeader
                name="Support Operations Agent"
                duration="2.3s"
                cost="$0.0058"
                detections={["Feature", "Billing"]}
                commentCount={5}
              />
            </Branch>
            <Subtree>
              <Branch showCircle={false}>
                <StepLabel>Prompt</StepLabel>
                <Body className="whitespace-pre-line">
                  {`You are the Support Operations Agent for a SaaS product.

Your job is to analyze the customer's email, determine what operation they are requesting, and select the right tool.

Rules:
- First understand what the customer is actually asking for.
- Use the tool descriptions carefully. They explain when each tool should be used.
`}
                  <span className="block text-[18px] font-semibold leading-none tracking-[0.15em] text-zinc-400">
                    …
                  </span>
                </Body>
              </Branch>

              <Branch showCircle={false}>
                <StepLabel>Context</StepLabel>
                <Body className="whitespace-pre-line">
                  {`Customer email:
Hi support team,

We need to give our external design agency access to one dashboard so they can review work in progress. They should not count as a paid seat.
`}
                  <span className="block text-[18px] font-semibold leading-none tracking-[0.15em] text-zinc-400">
                    …
                  </span>
                </Body>
              </Branch>

              <Branch>
                <ToolHeader name="add_member" duration="0.6s" />
              </Branch>
              <Subtree>
                <Branch showCircle={false}>
                  <StepLabel>Input</StepLabel>
                  <Body className="font-mono">
                    {`{"email":"agency@partner.co","role":"viewer"}`}
                  </Body>
                </Branch>
                <Branch showCircle={false}>
                  <StepLabel>Output</StepLabel>
                  <Body className="font-mono">
                    {`{"status":"success","member_id":"mem_4821","billable_seat_created":true}`}
                  </Body>
                </Branch>
              </Subtree>

              <Branch>
                <LLMHeader
                  model="model"
                  duration="1.7s"
                  cost="$0.0058"
                  badges={["Paid seat created", "Slow LLM Response"]}
                />
              </Branch>
              <InlineBody>
                <Body className="whitespace-pre-wrap font-mono">
                  {`{
  "operation_selected": "grant_workspace_access",
  "tool_used": "add_member",
  "result": "Created viewer member access for agency@partner.co",
  "confirmation_for_email_agent": "The user was added to the workspace as a viewer. This action created a billable member seat."
}`}
                </Body>
              </InlineBody>
            </Subtree>

            {/* === Agent 3 — collapsed === */}
            <Branch>
              <AgentHeader
                name="Reply Drafting Agent"
                duration="1.8s"
                cost="$0.0069"
                detections={["Email Drafted"]}
              />
            </Branch>
            <CollapsedSummary
              parts={["Prompt", "1 span", "Final Response"]}
            />
          </Subtree>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white"
        />
      </div>
        <CommentsPanel />
      </div>
    </div>
  );
}

function CommentsPanel() {
  return (
    <div className="absolute right-0 top-14 hidden w-[360px] lg:block">
      <div className="overflow-hidden rounded-lg border border-zinc-900/10 bg-white shadow-[0_30px_60px_-20px_rgba(12,20,40,0.28),0_12px_24px_-12px_rgba(12,20,40,0.16)]">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-[15px] font-normal tracking-tight text-zinc-950">
            Comments
          </span>
          <button
            type="button"
            aria-label="Close"
            className="cursor-pointer text-zinc-400 transition-colors hover:text-zinc-700"
          >
            <X className="size-4" strokeWidth={1.6} />
          </button>
        </div>

        <div className="flex flex-col gap-3 px-3 pb-4">
          <CommentGroup
            icon={<IconAgent className="size-3.5 text-zinc-700" />}
            label="Support Operations Agent"
          >
            <div className="flex flex-col gap-4">
              <CommentItem
                avatar="/sara-v4.png"
                author="Sara"
                role="Domain Expert"
                time="2h ago"
              >
                I found the issue. This request should have gone through the{" "}
                <strong className="font-normal text-zinc-950">
                  guest invite
                </strong>{" "}
                flow. The agent used <Code>add_member</Code>, which is why the
                customer got billed for a paid seat.
              </CommentItem>

              <CommentItem
                avatar="/marcus-v3.png"
                author="Marcus"
                role="Developer"
                time="1h ago"
              >
                That makes sense. @Neatlogs, can you check why it chose{" "}
                <Code>add_member</Code> instead of <Code>invite_guest</Code>?
              </CommentItem>

              <CommentItem isAI author="Neatlogs AI" time="58m ago">
                I found the likely cause. The tool descriptions are too vague.
                They explain what each tool does, but not when one should be
                used instead of the other.
              </CommentItem>

              <CommentItem isAI author="Neatlogs AI" time="56m ago">
                <Code>add_member</Code> and <Code>invite_guest</Code> both look
                like valid ways to give someone access. Nothing in the
                descriptions tells the model that external, non-billable access
                should go through <Code>invite_guest</Code>.
              </CommentItem>

              <CommentItem isAI author="Neatlogs AI" time="54m ago">
                I can make changes to the tool descriptions so the model can
                distinguish{" "}
                <strong className="font-normal text-zinc-950">
                  billable members
                </strong>{" "}
                from{" "}
                <strong className="font-normal text-zinc-950">
                  non-billable guests
                </strong>{" "}
                before making the call.
                <div className="mt-2.5">
                  <button
                    type="button"
                    className="font-ui inline-flex cursor-pointer items-center justify-center rounded-md bg-zinc-950/95 px-3 py-1.5 text-[11.5px] font-medium text-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.14)] ring-1 ring-white/10 transition-colors hover:bg-zinc-950"
                  >
                    Approve Code Fix Suggestion
                  </button>
                </div>
              </CommentItem>
            </div>
            <CommentInput />
          </CommentGroup>
        </div>
      </div>
    </div>
  );
}

function CommentGroup({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-900/10">
      <div className="flex items-center gap-2 border-b border-zinc-900/5 bg-zinc-50/70 px-3 py-2">
        {icon}
        <span className="text-[12.5px] font-normal text-zinc-900">{label}</span>
      </div>
      <div className="px-3 py-3">{children}</div>
    </div>
  );
}

function CommentItem({
  initials,
  color,
  avatar,
  author,
  role,
  time,
  quote,
  reactions,
  isAI,
  children,
}: {
  initials?: string;
  color?: string;
  avatar?: string;
  author: string;
  role?: string;
  time: string;
  quote?: string;
  reactions?: { emoji: string; count: number }[];
  isAI?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      {isAI ? (
        <Image
          src="/nl-logo.png"
          alt=""
          width={28}
          height={28}
          className="size-7 shrink-0 rounded"
        />
      ) : avatar ? (
        <Image
          src={avatar}
          alt=""
          width={28}
          height={28}
          className="size-7 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div
          className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10.5px] font-normal text-white ${color}`}
        >
          {initials}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex min-w-0 items-baseline gap-1.5">
            <span className="text-[12.5px] font-normal text-zinc-950">{author}</span>
            {role && (
              <span className="truncate text-[10.5px] font-normal text-zinc-400">
                {role}
              </span>
            )}
          </div>
          <span className="shrink-0 text-[10.5px] font-normal text-zinc-400">
            {time}
          </span>
        </div>
        {quote && (
          <div className="mt-1 border-l-2 border-violet-300 bg-violet-50/60 px-2 py-1 font-mono text-[11px] font-normal leading-relaxed text-zinc-700">
            {quote}
          </div>
        )}
        <div className="mt-1 text-[12px] font-normal leading-relaxed text-zinc-700">
          {children}
        </div>
        <div className="mt-2 flex items-center gap-1">
          {reactions?.map((r) => (
            <span
              key={r.emoji}
              className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10.5px]"
            >
              <span>{r.emoji}</span>
              <span className="font-normal text-zinc-700">{r.count}</span>
            </span>
          ))}
          <button
            type="button"
            aria-label="Add reaction"
            className="cursor-pointer rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          >
            <SmilePlus className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] font-normal text-zinc-800 ring-1 ring-zinc-900/5">
      {children}
    </code>
  );
}

function CommentInput() {
  return (
    <div className="mt-3 flex items-center gap-1.5 rounded-md border border-zinc-900/10 px-2.5 py-1.5">
      <input
        type="text"
        readOnly
        placeholder="Add a comment, @ to mention"
        className="flex-1 bg-transparent text-[11.5px] text-zinc-700 outline-none placeholder:text-zinc-400"
      />
      <button
        type="button"
        aria-label="Send"
        className="flex size-5 cursor-pointer items-center justify-center rounded bg-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-300"
      >
        <ArrowRight className="size-3" strokeWidth={2} />
      </button>
    </div>
  );
}

function WorkflowHeader({
  title,
  duration,
}: {
  title: string;
  duration: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-900/5 bg-zinc-50/70 px-4 py-2.5">
      <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-2 py-1 text-[12px] font-normal text-white shadow-sm">
        <IconWorkflow className="size-3.5 text-white" />
        Workflow
      </span>
      <span className="text-[13.5px] font-normal text-zinc-900">{title}</span>
      <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-normal tabular-nums text-zinc-500 ring-1 ring-zinc-900/10">
        {duration}
      </span>
    </div>
  );
}

function AgentHeader({
  name,
  duration,
  detections,
  cost,
  commentCount,
}: {
  name: string;
  duration: string;
  detections?: string[];
  cost?: string;
  commentCount?: number;
}) {
  const highlighted = !!commentCount && commentCount > 0;
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md px-2.5 py-1.5 ${
        highlighted
          ? "bg-violet-50/70 ring-1 ring-violet-300/60"
          : "bg-zinc-100/70"
      }`}
    >
      <span className="inline-flex items-center gap-1 rounded bg-white px-1.5 py-0.5 text-[11px] font-normal text-zinc-600 ring-1 ring-zinc-900/10">
        <IconAgent className="size-3 text-zinc-500" />
        Agent
      </span>
      <span className="text-[13px] font-normal text-zinc-900">{name}</span>
      {detections && detections.length > 0 && (
        <span className="flex flex-wrap items-center gap-1">
          {detections.map((d) => (
            <span
              key={d}
              className="rounded bg-[#F4ECD8] px-1.5 py-0.5 text-[10.5px] font-normal text-[#B48900] ring-1 ring-zinc-900/5"
            >
              {d}
            </span>
          ))}
        </span>
      )}
      <span className="rounded bg-white px-1.5 py-0.5 text-[10.5px] font-normal tabular-nums text-zinc-500 ring-1 ring-zinc-900/10">
        {duration}
      </span>
      {cost && (
        <span className="text-[11px] font-normal tabular-nums text-zinc-400">{cost}</span>
      )}
      {highlighted && (
        <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-1.5 py-0.5 text-[10.5px] font-normal text-violet-700 ring-1 ring-violet-200/70">
          <MessageSquare className="size-3" strokeWidth={1.6} />
          {commentCount} {commentCount === 1 ? "comment" : "comments"}
        </span>
      )}
    </div>
  );
}

function ToolHeader({
  name,
  duration,
}: {
  name: string;
  duration: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-zinc-100/60 px-2.5 py-1.5">
      <span className="inline-flex items-center gap-1 rounded bg-white px-1.5 py-0.5 text-[11px] font-normal text-zinc-600 ring-1 ring-zinc-900/10">
        <Wrench className="size-3 text-zinc-500" strokeWidth={1.6} />
        Tool
      </span>
      <span className="text-[13px] font-normal text-zinc-900">{name}</span>
      <span className="rounded bg-white px-1.5 py-0.5 text-[10.5px] font-normal tabular-nums text-zinc-500 ring-1 ring-zinc-900/10">
        {duration}
      </span>
    </div>
  );
}

function LLMHeader({
  model,
  duration,
  cost,
  badges,
}: {
  model: string;
  duration: string;
  cost: string;
  badges?: string[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md bg-zinc-50/80 px-2.5 py-1.5">
      <span className="inline-flex items-center gap-1 rounded bg-white px-1.5 py-0.5 text-[11px] font-normal text-zinc-600 ring-1 ring-zinc-900/10">
        <Image
          src="/claude-color.svg"
          alt=""
          width={12}
          height={12}
          className="size-3"
        />
        LLM
      </span>
      <span className="text-[13px] font-normal text-zinc-900">{model}</span>
      {badges && badges.length > 0 && (
        <span className="flex flex-wrap items-center gap-1">
          {badges.map((b) => (
            <span
              key={b}
              className="rounded bg-[#F4ECD8] px-1.5 py-0.5 text-[10.5px] font-normal text-[#B48900] ring-1 ring-zinc-900/5"
            >
              {b}
            </span>
          ))}
        </span>
      )}
      <span className="rounded bg-white px-1.5 py-0.5 text-[10.5px] font-normal tabular-nums text-zinc-500 ring-1 ring-zinc-900/10">
        {duration}
      </span>
      <span className="text-[11px] font-normal tabular-nums text-zinc-400">{cost}</span>
    </div>
  );
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1 text-[11.5px] font-normal text-zinc-600">
      {children}
    </div>
  );
}

function Body({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mt-1 text-[12px] leading-relaxed text-zinc-700 lg:max-w-[720px] ${className}`}
    >
      {children}
    </p>
  );
}

function InlineBody({ children }: { children: React.ReactNode }) {
  return <div className="ml-3 mt-1 mb-2">{children}</div>;
}

function Subtree({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    const spine = spineRef.current;
    if (!root || !spine) return;

    const update = () => {
      const branches = root.querySelectorAll<HTMLElement>(
        ":scope > [data-spine]",
      );
      if (branches.length === 0) {
        spine.style.height = "100%";
        return;
      }
      const last = branches[branches.length - 1];
      const rootTop = root.getBoundingClientRect().top;
      const lastTop = last.getBoundingClientRect().top;
      const rowCenter = Number(last.getAttribute("data-row-center")) || 0;
      spine.style.height = `${lastTop - rootTop + rowCenter}px`;
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    return () => observer.disconnect();
  }, [children]);

  return (
    <div ref={containerRef} className="relative pl-8">
      <div
        ref={spineRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 h-full w-px bg-[#d2d2d2]"
        style={{ left: 12 }}
      />
      {children}
    </div>
  );
}

function Branch({
  children,
  showCircle = true,
  collapsed = false,
}: {
  children: React.ReactNode;
  showCircle?: boolean;
  collapsed?: boolean;
}) {
  // Vertical center of the row: pill rows (Agent/Tool/LLM headers) ~32px tall;
  // step-label rows (Input/Output prompt arrows) ~16px tall.
  const rowCenter = showCircle ? 16 : 8;

  return (
    <div data-spine data-row-center={rowCenter} className="relative mb-1.5">
      {showCircle ? (
        <>
          {/* Horizontal stem from circle's right edge to the row's left edge */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ left: -12, top: 0, width: 12, height: rowCenter + 6 }}
            viewBox={`0 0 12 ${rowCenter + 6}`}
          >
            <line
              x1="0"
              y1={rowCenter}
              x2="12"
              y2={rowCenter}
              stroke="#d2d2d2"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {/* Toggle circle on the parent spine, vertically centered with the row */}
          <div
            className="absolute flex size-4 items-center justify-center rounded-full bg-white text-[#9aa0a6] ring-1 ring-[#d2d2d2]"
            style={{ left: -28, top: rowCenter - 8 }}
          >
            <svg
              viewBox="0 0 10 10"
              className="size-[7px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {collapsed ? (
                <>
                  <path d="M5 1.5v7" />
                  <path d="M1.5 5h7" />
                </>
              ) : (
                <path d="M1.5 5h7" />
              )}
            </svg>
          </div>
        </>
      ) : (
        <>
          {/* L-curve from spine to a bit before the step content (no circle for step labels) */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ left: -20, top: 0, width: 32, height: rowCenter + 6 }}
            viewBox={`0 0 32 ${rowCenter + 6}`}
          >
            <path
              d={`M 0 0 V ${rowCenter - 4} Q 0 ${rowCenter} 6 ${rowCenter} H 32`}
              fill="none"
              stroke="#d2d2d2"
              strokeWidth="1.25"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </>
      )}
      {showCircle ? children : <div className="pl-4">{children}</div>}
    </div>
  );
}

function CollapsedSummary({ parts }: { parts: string[] }) {
  // Expand pill is text-[11.5px] py-1 → ~24px tall, vertical center ~12px
  const rowCenter = 12;

  return (
    <div className="relative ml-8 -mt-0.5 mb-3 pl-4">
      {/* Horizontal stem from + circle's right edge to the expand pill's left edge */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{ left: -4, top: 0, width: 20, height: rowCenter + 4 }}
        viewBox={`0 0 20 ${rowCenter + 4}`}
      >
        <line
          x1="0"
          y1={rowCenter}
          x2="20"
          y2={rowCenter}
          stroke="#d2d2d2"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div
        className="absolute flex size-4 items-center justify-center rounded-full bg-white text-[#9aa0a6] ring-1 ring-[#d2d2d2]"
        style={{ left: -20, top: rowCenter - 8 }}
      >
        <svg
          viewBox="0 0 10 10"
          className="size-[7px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M5 1.5v7" />
          <path d="M1.5 5h7" />
        </svg>
      </div>
      <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11.5px] text-zinc-600 ring-1 ring-zinc-900/10">
        <span className="font-medium text-zinc-700">expand</span>
        {parts.map((p, i) => (
          <span key={p} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight className="size-3 text-zinc-400" aria-hidden="true" />
            )}
            <span>{p}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function IconWorkflow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="4" cy="4" r="1.6" />
      <circle cx="12" cy="11.5" r="1.6" />
      <circle cx="4" cy="11.5" r="1.6" />
      <path d="M4 5.6v4.3" />
      <path d="M5.4 5.1l5.2 5.2" />
    </svg>
  );
}

function IconAgent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5" width="10" height="8" rx="2" />
      <path d="M8 3v2" />
      <circle cx="6" cy="9" r="0.7" fill="currentColor" />
      <circle cx="10" cy="9" r="0.7" fill="currentColor" />
      <path d="M6.5 11.5h3" />
    </svg>
  );
}

function IconTool(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M10.5 2.5a3 3 0 0 0-4.2 4.2L2.5 10.5l3 3 3.8-3.8a3 3 0 0 0 4.2-4.2l-2 2-1.5-1.5z" />
    </svg>
  );
}

function IconLLM(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 2l1.4 3.4L13 7l-3.6 1.6L8 12l-1.4-3.4L3 7l3.6-1.6z" />
      <circle cx="12.5" cy="3.5" r="0.9" />
      <circle cx="3.5" cy="12.5" r="0.9" />
    </svg>
  );
}

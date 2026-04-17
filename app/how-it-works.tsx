"use client";

import {
  type ReactNode,
  type SVGProps,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const STEPS = [
  {
    id: "break",
    tag: "Break",
    title: "Know the moment something breaks.",
    body: "The second a run fails or drifts, Neatlogs fires — trace already surfaced, no log diving.",
  },
  {
    id: "read",
    tag: "Read",
    title: "A view every teammate can read.",
    body: "Plain-English summary of what the agent did. No JSON, no spans, no token math.",
  },
  {
    id: "ship",
    tag: "Ship",
    title: "One thread, broken to shipped.",
    body: "Trace, feedback, and the shipped fix all live in one context. No more forwarded messages or channel archaeology.",
  },
] as const;

const STEP_LOCK_MS = 850;

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const lastChangeAtRef = useRef(0);
  const pendingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const clearPending = () => {
      if (pendingTimeoutRef.current != null) {
        window.clearTimeout(pendingTimeoutRef.current);
        pendingTimeoutRef.current = null;
      }
    };

    const tryUpdate = () => {
      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollable = rect.height - viewportH;
      if (scrollable <= 0) return;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.max(0, Math.min(0.9999, scrolled / scrollable));
      const target = Math.min(
        STEPS.length - 1,
        Math.floor(progress * STEPS.length)
      );
      const current = activeRef.current;
      if (target === current) return;

      const now = Date.now();
      const sinceLast = now - lastChangeAtRef.current;

      if (sinceLast < STEP_LOCK_MS) {
        clearPending();
        pendingTimeoutRef.current = window.setTimeout(
          tryUpdate,
          STEP_LOCK_MS - sinceLast + 16
        );
        return;
      }

      const step = target > current ? 1 : -1;
      const next = current + step;
      activeRef.current = next;
      lastChangeAtRef.current = now;
      setActiveIndex(next);

      if (next !== target) {
        clearPending();
        pendingTimeoutRef.current = window.setTimeout(
          tryUpdate,
          STEP_LOCK_MS + 16
        );
      }
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        tryUpdate();
      });
    };

    tryUpdate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      clearPending();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const selectIndex = useCallback((i: number) => {
    const section = sectionRef.current;
    if (section && typeof window !== "undefined" && window.innerWidth >= 1024) {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable > 0) {
        const targetProgress = (i + 0.5) / STEPS.length;
        const targetY = window.scrollY + rect.top + targetProgress * scrollable;
        window.scrollTo({ top: targetY, behavior: "smooth" });
        return;
      }
    }
    activeRef.current = i;
    lastChangeAtRef.current = Date.now();
    setActiveIndex(i);
    tileRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-[#EAF3F6] py-24 sm:py-28 lg:h-[280vh] lg:py-0"
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12 lg:mb-14">
            <div className="flex items-center gap-3">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-red-500" />
              </span>
              <span className="font-pixel text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                How it works · live
              </span>
            </div>
            <h2 className="font-pixel mt-5 max-w-3xl text-balance text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-zinc-950 sm:text-5xl lg:text-[52px]">
              From broken agent{" "}
              <span className="text-zinc-500">to shipped fix.</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <Device activeIndex={activeIndex} />

            <div className="flex flex-col gap-3">
              {STEPS.map((step, i) => (
                <div
                  key={step.id}
                  ref={(el) => {
                    tileRefs.current[i] = el;
                  }}
                  data-step-index={i}
                >
                  <StepTile
                    index={i}
                    tag={step.tag}
                    title={step.title}
                    body={step.body}
                    active={activeIndex === i}
                    onSelect={() => selectIndex(i)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepTile({
  index,
  tag,
  title,
  body,
  active,
  onSelect,
}: {
  index: number;
  tag: string;
  title: string;
  body: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group relative overflow-hidden rounded-2xl border text-left outline-none transition-[border-color,background-color,transform,box-shadow] duration-[260ms] ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EAF3F6] motion-reduce:transition-none ${
        active
          ? "cursor-default border-zinc-950 bg-zinc-950 text-white shadow-[0_20px_48px_-24px_rgba(0,0,0,0.35)]"
          : "cursor-pointer border-zinc-900/10 bg-white/70 text-zinc-900 hover:-translate-y-0.5 hover:border-zinc-900/20 hover:bg-white hover:shadow-[0_12px_32px_-20px_rgba(0,0,0,0.18)]"
      }`}
    >
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`font-pixel text-[11px] uppercase tracking-[0.2em] transition-colors ${
                active ? "text-white/60" : "text-zinc-400"
              }`}
            >
              0{index + 1}
            </span>
            <span
              className={`rounded-full px-2 py-[3px] text-[10px] font-medium uppercase tracking-[0.14em] transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "bg-zinc-900/[0.04] text-zinc-700"
              }`}
            >
              {tag}
            </span>
          </div>
          <span
            aria-hidden="true"
            className={`transition-[transform,opacity] duration-300 ease-out ${
              active
                ? "translate-x-0 opacity-100"
                : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
            }`}
          >
            <IconArrowRight
              className={`size-4 ${active ? "text-white" : "text-zinc-700"}`}
            />
          </span>
        </div>
        <h3 className="mt-4 text-[17px] font-medium leading-snug text-balance sm:text-lg">
          {title}
        </h3>
        <p
          className={`mt-2 text-[13.5px] leading-relaxed ${
            active ? "text-white/70" : "text-zinc-600"
          }`}
        >
          {body}
        </p>
      </div>
    </button>
  );
}

function Device({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative rounded-[22px] bg-zinc-950 p-1.5 shadow-[0_32px_80px_-32px_rgba(12,20,40,0.35),0_16px_32px_-16px_rgba(12,20,40,0.22)] ring-1 ring-black/10 sm:p-2">
      <div className="relative overflow-hidden rounded-[16px] bg-zinc-50">
        <div className="flex h-10 items-center justify-between border-b border-black/5 bg-white/80 px-4 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span
              translate="no"
              className="font-pixel text-[10px] uppercase tracking-[0.18em] text-zinc-500"
            >
              neatlogs · trace live
            </span>
          </div>
          <span className="font-pixel text-[10px] uppercase tracking-[0.16em] text-zinc-400 [font-variant-numeric:tabular-nums]">
            0{activeIndex + 1} / 0{STEPS.length}
          </span>
        </div>

        <div className="relative min-h-[440px] overflow-hidden">
          <FrameLayer active={activeIndex === 0}>
            <BreakFrame />
          </FrameLayer>
          <FrameLayer active={activeIndex === 1}>
            <ReadFrame />
          </FrameLayer>
          <FrameLayer active={activeIndex === 2}>
            <ShipFrame />
          </FrameLayer>
        </div>
      </div>
    </div>
  );
}

function FrameLayer({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  const [replayKey, setReplayKey] = useState(0);
  const wasActive = useRef(active);

  useLayoutEffect(() => {
    if (active && !wasActive.current) {
      setReplayKey((k) => k + 1);
    }
    wasActive.current = active;
  }, [active]);

  return (
    <div
      aria-hidden={!active}
      className={`absolute inset-0 p-5 transition-opacity ease-[cubic-bezier(0.32,0.72,0,1)] will-change-[opacity] motion-reduce:transition-none sm:p-6 ${
        active
          ? "opacity-100 duration-[260ms]"
          : "pointer-events-none opacity-0 duration-[160ms]"
      }`}
    >
      <div key={replayKey}>{children}</div>
    </div>
  );
}

function BreakFrame() {
  return (
    <div className="space-y-3">
      <Stagger delay={0}>
        <div className="flex items-center justify-between">
          <span
            translate="no"
            className="font-pixel text-[10px] uppercase tracking-[0.16em] text-zinc-500"
          >
            workflow · research-agent
          </span>
          <span className="font-pixel text-[10px] uppercase tracking-[0.14em] text-red-600">
            failing · 02s ago
          </span>
        </div>
      </Stagger>

      <Stagger delay={80}>
        <AlertRow
          tone="red"
          title="Tool call timeout"
          meta="serpapi.search · 28.3s · cap 10s"
          pills={["Critical", "Slack notified"]}
        />
      </Stagger>
      <Stagger delay={160}>
        <AlertRow
          tone="amber"
          title="Unexpected output"
          meta="summarise-agent · score 0.34"
          pills={["Warning"]}
        />
      </Stagger>
      <Stagger delay={240}>
        <AlertRow
          tone="emerald"
          title="All clear"
          meta="classify-agent · 3 runs · avg 1.2s"
        />
      </Stagger>

      <Stagger delay={340}>
        <div className="mt-5 flex items-center gap-2 rounded-lg bg-zinc-900/[0.04] px-3 py-2.5">
          <IconSlack className="size-3.5 text-zinc-700" />
          <span className="font-mono text-[11px] text-zinc-600">
            #agent-ops &nbsp;·&nbsp; posted by @neatlogs-bot
          </span>
        </div>
      </Stagger>
    </div>
  );
}

function ReadFrame() {
  return (
    <div className="space-y-4">
      <Stagger delay={0}>
        <div className="flex items-center justify-between">
          <span
            translate="no"
            className="font-pixel text-[10px] uppercase tracking-[0.16em] text-zinc-500"
          >
            summary · plain english
          </span>
          <span className="rounded-full bg-zinc-900/[0.05] px-2 py-[3px] text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-700">
            run #4821
          </span>
        </div>
      </Stagger>

      <Stagger delay={100}>
        <div className="rounded-xl border border-zinc-900/10 bg-white p-4 leading-relaxed">
          <p className="text-[13.5px] text-zinc-800">
            <span className="font-medium">The agent tried to answer</span> the
            user&rsquo;s question about Q3 revenue. It searched the{" "}
            <span className="rounded bg-amber-100/70 px-1 text-amber-900">
              2019 price list
            </span>
            , then summarized the wrong document. It did not use the current
            finance source.
          </p>
        </div>
      </Stagger>

      <Stagger delay={200}>
        <div className="rounded-xl border border-zinc-900/10 bg-white/70 p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[11px] font-semibold text-violet-700">
              MK
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-medium text-zinc-900">
                  Maya Kim
                </span>
                <span className="font-pixel text-[10px] uppercase tracking-[0.14em] text-zinc-400">
                  Product
                </span>
                <span className="ml-auto text-[11px] text-zinc-400">
                  4m ago
                </span>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-700">
                This is citing the 2019 list — we rolled out new pricing in
                Feb. Source picker looks off.
              </p>
            </div>
          </div>
        </div>
      </Stagger>
    </div>
  );
}

function ShipFrame() {
  return (
    <div className="space-y-3">
      <Stagger delay={0}>
        <div className="flex items-center justify-between">
          <span
            translate="no"
            className="font-pixel text-[10px] uppercase tracking-[0.16em] text-zinc-500"
          >
            thread · one context
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-[3px] text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-700">
            resolved
          </span>
        </div>
      </Stagger>

      <Stagger delay={100}>
        <ThreadStep
          idx="01"
          icon={<IconTrace className="size-3.5" />}
          title="Trace surfaced"
          meta="research-agent · run #4821"
          time="09:12"
        />
      </Stagger>
      <Stagger delay={200}>
        <ThreadStep
          idx="02"
          icon={<IconChat className="size-3.5" />}
          title="Maya flagged the source"
          meta="&ldquo;new pricing rolled in Feb&rdquo;"
          time="09:16"
        />
      </Stagger>
      <Stagger delay={300}>
        <ThreadStep
          idx="03"
          icon={<IconBranch className="size-3.5" />}
          title="Fix shipped"
          meta="PR #231 · source-picker.ts · +12 −4"
          time="09:41"
          done
        />
      </Stagger>
    </div>
  );
}

function AlertRow({
  tone,
  title,
  meta,
  pills,
}: {
  tone: "red" | "amber" | "emerald";
  title: string;
  meta: string;
  pills?: string[];
}) {
  const accent = {
    red: "border-red-200/70 bg-red-50/60",
    amber: "border-amber-200/70 bg-amber-50/60",
    emerald: "border-emerald-200/70 bg-emerald-50/60",
  }[tone];
  const dot = {
    red: "bg-red-500",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
  }[tone];
  const pillTone = {
    red: "bg-red-100 text-red-700",
    amber: "bg-amber-100 text-amber-700",
    emerald: "bg-emerald-100 text-emerald-700",
  }[tone];
  return (
    <div className={`rounded-xl border p-3.5 ${accent}`}>
      <div className="flex items-start gap-3">
        <span className={`mt-1.5 size-2 shrink-0 rounded-full ${dot}`} />
        <div className="min-w-0 flex-1">
          <h4 className="text-[13px] font-medium text-zinc-900">{title}</h4>
          <p
            translate="no"
            className="mt-0.5 truncate font-mono text-[11px] tracking-tight text-zinc-600"
          >
            {meta}
          </p>
          {pills && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {pills.map((p, i) => (
                <span
                  key={p}
                  className={`rounded-full px-2 py-[2px] text-[10px] font-medium uppercase tracking-[0.06em] ${
                    i === 0 ? pillTone : "bg-zinc-900/[0.05] text-zinc-700"
                  }`}
                >
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ThreadStep({
  idx,
  icon,
  title,
  meta,
  time,
  done,
}: {
  idx: string;
  icon: ReactNode;
  title: string;
  meta: string;
  time: string;
  done?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-3.5 ${
        done
          ? "border-emerald-200/70 bg-emerald-50/50"
          : "border-zinc-900/10 bg-white/80"
      }`}
    >
      <span className="font-pixel mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-400">
        {idx}
      </span>
      <span
        className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${
          done ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-600"
        }`}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-[13px] font-medium text-zinc-900">{title}</h4>
          <span className="text-[11px] text-zinc-500">{time}</span>
        </div>
        <p
          className="mt-0.5 text-[12px] text-zinc-600"
          dangerouslySetInnerHTML={{ __html: meta }}
        />
      </div>
    </div>
  );
}

function Stagger({
  delay,
  children,
}: {
  delay: number;
  children: ReactNode;
}) {
  return (
    <div
      className="animate-[row-in_500ms_cubic-bezier(0.16,1,0.3,1)_both] opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function IconArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M4 10a.75.75 0 0 1 .75-.75h8.69l-2.22-2.22a.75.75 0 1 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H4.75A.75.75 0 0 1 4 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconTrace(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 6h10" />
      <path d="M4 12h14" />
      <path d="M4 18h8" />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" />
      <circle cx="21" cy="12" r="1.5" fill="currentColor" />
      <circle cx="15" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconChat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  );
}

function IconBranch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 8v8" />
      <path d="M18 11a5 5 0 0 1-5 5H8" />
    </svg>
  );
}

function IconSlack(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M5.5 15a2 2 0 1 1 0-4h2v4h-2Zm1-6a2 2 0 1 1 0-4 2 2 0 0 1 2 2v2h-2Zm4 11a2 2 0 0 1-2-2v-2h4v2a2 2 0 0 1-2 2Zm6-2a2 2 0 1 1 0-4h2a2 2 0 0 1 0 4h-2Zm-1-11a2 2 0 0 1 2 2v2h-4V7a2 2 0 0 1 2-2Z" opacity=".9" />
    </svg>
  );
}

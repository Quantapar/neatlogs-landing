"use client";

import {
  type ReactNode,
  type RefObject,
  type SVGProps,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

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
    id: "fix",
    tag: "Fix",
    title: "From trace to fix in minutes.",
    body: "Neatlogs drafts the fix — pulling context from the trace, the thread, and your codebase. You review and ship.",
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
  const navLockUntilRef = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (reducedMotion) return;
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    const clearPending = () => {
      if (pendingTimeoutRef.current != null) {
        window.clearTimeout(pendingTimeoutRef.current);
        pendingTimeoutRef.current = null;
      }
    };

    const tryUpdate = () => {
      if (Date.now() < navLockUntilRef.current) return;
      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollable = rect.height - viewportH;
      if (scrollable <= 0) return;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.max(0, Math.min(0.9999, scrolled / scrollable));
      const target = Math.min(
        STEPS.length - 1,
        Math.floor(progress * STEPS.length),
      );
      const current = activeRef.current;
      if (target === current) return;

      const now = Date.now();
      const sinceLast = now - lastChangeAtRef.current;

      if (sinceLast < STEP_LOCK_MS) {
        clearPending();
        pendingTimeoutRef.current = window.setTimeout(
          tryUpdate,
          STEP_LOCK_MS - sinceLast + 16,
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
          STEP_LOCK_MS + 16,
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
  }, [reducedMotion]);

  const selectIndex = useCallback((i: number) => {
    const section = sectionRef.current;
    activeRef.current = i;
    lastChangeAtRef.current = Date.now();
    navLockUntilRef.current = Date.now() + 900;
    setActiveIndex(i);
    const scrollBehavior: ScrollBehavior =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";
    if (section && typeof window !== "undefined" && window.innerWidth >= 1024) {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable > 0) {
        const targetProgress = (i + 0.5) / STEPS.length;
        const targetY = window.scrollY + rect.top + targetProgress * scrollable;
        window.scrollTo({ top: targetY, behavior: scrollBehavior });
        return;
      }
    }
    tileRefs.current[i]?.scrollIntoView({
      behavior: scrollBehavior,
      block: "center",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-[#FAFAFA] py-24 sm:py-28 lg:h-[360vh] lg:py-0 motion-reduce:lg:h-auto motion-reduce:lg:py-24"
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center motion-reduce:lg:static motion-reduce:lg:h-auto motion-reduce:lg:block">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12 lg:mb-14">
            <span
              translate="no"
              className="font-ui text-2xl sm:text-3xl font-semibold tracking-tight"
              style={{ color: "#E9462E" }}
            >
              How it works
            </span>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.04] tracking-tighter text-zinc-950 sm:text-5xl md:text-[56px]">
              From broken agent <span>to shipped fix.</span>
            </h2>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <Device activeIndex={activeIndex} />

            <div className="relative flex flex-col gap-3">
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
              <ScrollProgress
                sectionRef={sectionRef}
                totalSteps={STEPS.length}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollProgress({
  sectionRef,
  totalSteps,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  totalSteps: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [pathLength, setPathLength] = useState(0);

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const measure = () => setSvgHeight(node.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (pathRef.current && svgHeight > 0) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [svgHeight]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.4,
  });

  const dashOffset = useTransform(smooth, (v) => pathLength * (1 - v));
  const dotCx = useTransform(smooth, (v) => {
    if (!pathRef.current || pathLength === 0) return 3;
    return pathRef.current.getPointAtLength(v * pathLength).x;
  });
  const dotCy = useTransform(smooth, (v) => {
    if (!pathRef.current || pathLength === 0) return 0;
    return pathRef.current.getPointAtLength(v * pathLength).y;
  });

  const leftX = 3;
  const midX = 11;
  const rightX = 19;
  const diag = 10;
  const flat = 40;
  const bends: { cy: number; dir: 1 | -1 }[] = [
    { cy: svgHeight * 0.25, dir: 1 },
    { cy: svgHeight * 0.5, dir: -1 },
    { cy: svgHeight * 0.75, dir: 1 },
  ];

  const d = svgHeight
    ? [
        `M ${midX} 0`,
        ...bends.flatMap(({ cy, dir }) => {
          const outX = dir === 1 ? rightX : leftX;
          const enterY = cy - diag - flat / 2;
          const outStartY = cy - flat / 2;
          const outEndY = cy + flat / 2;
          const exitY = cy + diag + flat / 2;
          return [
            `L ${midX} ${enterY}`,
            `L ${outX} ${outStartY}`,
            `L ${outX} ${outEndY}`,
            `L ${midX} ${exitY}`,
          ];
        }),
        `L ${midX} ${svgHeight}`,
      ].join(" ")
    : "";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute -right-10 top-0 bottom-0 hidden w-[22px] lg:block"
    >
      {svgHeight > 0 && (
        <svg
          viewBox={`0 0 22 ${svgHeight}`}
          width="22"
          height={svgHeight}
          className="block"
        >
          <path
            d={d}
            stroke="rgba(9,9,11,0.12)"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="none"
          />
          <motion.path
            ref={pathRef}
            d={d}
            stroke="#09090b"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="none"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: dashOffset,
            }}
          />
          <motion.circle
            r={3.5}
            fill="#09090b"
            style={{ cx: dotCx, cy: dotCy }}
          />
          <motion.circle
            r={6}
            fill="none"
            stroke="rgba(234,243,246,1)"
            strokeWidth={3}
            style={{ cx: dotCx, cy: dotCy }}
          />
        </svg>
      )}
      <span className="sr-only">
        Scroll progress through {totalSteps} steps
      </span>
    </div>
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
  const easing = "var(--ease-snap)";
  const duration = active ? 250 : 150;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group relative block rounded-[24px] p-1.5 text-left outline-none transition-[background-color,transform,box-shadow] focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA] motion-reduce:transition-none motion-reduce:active:scale-100 ${
        active
          ? "cursor-default -translate-y-0.5 bg-[#F4F4F5] ring-1 ring-zinc-900/5 shadow-[0_26px_50px_-12px_rgba(12,20,40,0.38),0_10px_20px_-6px_rgba(12,20,40,0.22)]"
          : "cursor-pointer bg-[#F4F4F5] ring-1 ring-zinc-900/5 shadow-sm hover:-translate-y-0.5 hover:shadow-sm hover:shadow-zinc-900/5 active:scale-[0.97]"
      }`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easing,
      }}
    >
      <div className="relative rounded-[18px] bg-white ring-1 ring-zinc-200/80 shadow-sm p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
              0{index + 1}
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-900">
              {tag}
            </span>
          </div>
        </div>
        <h3 className="font-ui mt-4 text-[17px] font-medium leading-snug text-balance text-zinc-950 sm:text-lg">
          {title}
        </h3>
        <p className="font-ui mt-2 text-[13.5px] leading-relaxed text-zinc-600">
          {body}
        </p>
      </div>
    </button>
  );
}

function Device({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative rounded-[22px] border border-zinc-900/10 bg-[#FCFCFD] p-1.5 shadow-[0_30px_60px_-24px_rgba(12,20,40,0.22),0_12px_24px_-16px_rgba(12,20,40,0.14)] sm:p-2">
      <div className="relative overflow-hidden rounded-[16px] bg-zinc-50 ring-1 ring-zinc-900/10">
        <div className="flex h-10 items-center justify-between border-b border-black/5 bg-white/80 px-6 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <span
              translate="no"
              className="font-mono text-[11px] uppercase tracking-widest text-zinc-500"
            >
              neatlogs · trace
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-widest uppercase text-zinc-400 [font-variant-numeric:tabular-nums]">
            0{activeIndex + 1} / 0{STEPS.length}
          </span>
        </div>

        <div className="relative min-h-[540px] overflow-hidden">
          <FrameLayer active={activeIndex === 0}>
            <BreakFrame />
          </FrameLayer>
          <FrameLayer active={activeIndex === 1}>
            <ReadFrame />
          </FrameLayer>
          <FrameLayer active={activeIndex === 2}>
            <FixFrame />
          </FrameLayer>
          <FrameLayer active={activeIndex === 3}>
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
      className={`absolute inset-0 p-5 transition-opacity ease-snap will-change-[opacity] motion-reduce:transition-none sm:p-6 ${
        active
          ? "opacity-100 duration-[250ms]"
          : "pointer-events-none opacity-0 duration-[150ms]"
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
            className="font-mono text-[11px] uppercase tracking-widest text-zinc-500"
          >
            workflow · research-agent
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-red-600">
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
            className="font-mono text-[11px] uppercase tracking-widest text-zinc-500"
          >
            summary · plain english
          </span>
          <span className="rounded-full bg-zinc-900/[0.05] px-2 py-[3px] font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-700">
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
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Product
                </span>
                <span className="ml-auto font-mono text-[11px] text-zinc-400">
                  4m ago
                </span>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-700">
                This is citing the 2019 list — we rolled out new pricing in Feb.
                Source picker looks off.
              </p>
            </div>
          </div>
        </div>
      </Stagger>
    </div>
  );
}

function FixFrame() {
  return (
    <div className="space-y-3">
      <Stagger delay={0}>
        <div className="flex items-center justify-between">
          <span
            translate="no"
            className="font-mono text-[11px] uppercase tracking-widest text-zinc-500"
          >
            suggested fix
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-[3px] font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-700">
            AI-generated
          </span>
        </div>
      </Stagger>

      <Stagger delay={100}>
        <div className="overflow-hidden rounded-xl border border-zinc-900/10 bg-white">
          <div className="flex items-center justify-between border-b border-zinc-900/5 px-3.5 py-2">
            <span
              translate="no"
              className="font-mono text-[11px] text-zinc-700"
            >
              # source-picker.ts · research-agent
            </span>
            <span className="font-mono text-[10px] text-zinc-400">+12 −4</span>
          </div>
          <pre
            translate="no"
            className="overflow-x-auto bg-zinc-950 px-4 py-3 font-mono text-[11px] leading-[1.65] text-zinc-100"
          >
            <code>
              <span className="text-zinc-500">try</span>:{"\n"}
              {"  "}result = <span className="text-sky-300">fetch_context</span>
              (query, timeout=<span className="text-amber-200">30</span>){"\n"}
              <span className="text-zinc-500">except</span>{" "}
              <span className="text-rose-300">TimeoutError</span>:{"\n"}
              {"  "}result ={" "}
              <span className="text-sky-300">get_cached_context</span>(query)
              {"\n"}
              {"  "}log.warning(
              <span className="text-emerald-300">
                &quot;Fallback: using cache&quot;
              </span>
              )
            </code>
          </pre>
        </div>
      </Stagger>

      <Stagger delay={200}>
        <div className="rounded-xl border border-zinc-900/10 bg-white/80 p-3.5">
          <h4 className="text-[12px] font-medium text-zinc-900">
            Why this fix
          </h4>
          <p className="mt-1 text-[12px] leading-relaxed text-zinc-600">
            <span translate="no">fetch_context</span> exceeds 30s on 4% of runs.
            Adds a graceful fallback to cached data so the agent never returns
            empty.
          </p>
        </div>
      </Stagger>

      <Stagger delay={300}>
        <div className="flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2.5 text-white">
          <IconBranch className="size-3.5" />
          <span className="font-mono text-[11px]">
            Open in Cursor &nbsp;·&nbsp; review &amp; ship
          </span>
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
            className="font-mono text-[11px] uppercase tracking-widest text-zinc-500"
          >
            thread · one context
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-[3px] font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-700">
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

      <Stagger delay={400}>
        <div className="rounded-xl border border-zinc-900/10 bg-white/80 p-4">
          <div className="flex items-center justify-between">
            <span
              translate="no"
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500 font-semibold"
            >
              Broken &rarr; Shipped
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-700 font-semibold">
              29 min
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <Metric label="Trace to fix" value="29m" />
            <Metric label="People" value="3" />
            <Metric label="Channels" value="1" />
          </div>
        </div>
      </Stagger>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
        {label}
      </div>
      <div className="mt-1 text-[16px] font-semibold text-zinc-900 [font-variant-numeric:tabular-nums]">
        {value}
      </div>
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
      <span className="font-mono mt-1 text-[11px] uppercase tracking-widest text-zinc-400">
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

function Stagger({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <div
      className="animate-[row-in_500ms_var(--ease-snap)_both] opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="3" y1="15" x2="19" y2="15" />
    </svg>
  );
}

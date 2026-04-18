"use client";

import { useEffect, useRef } from "react";
import {
  AlertCircle,
  Users,
  Zap,
  Sparkles,
  RefreshCw,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { LayoutWrapper } from "./layoutWrapper";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  hasVisual?: boolean;
}

const FEATURES: Feature[] = [
  {
    id: "surface-issue",
    icon: (
      <AlertCircle className="w-6 h-6 text-zinc-700 group-hover:text-zinc-950 transition-colors" strokeWidth={1.5} />
    ),
    title: "Surface the issue",
    description:
      "Detection triggers instantly. Alerts hit Slack and email before your team notices something's wrong.",
  },
  {
    id: "shared-context",
    icon: (
      <Users className="w-6 h-6 text-zinc-700 group-hover:text-zinc-950 transition-colors" strokeWidth={1.5} />
    ),
    title: "Shared context, always",
    description:
      "Domain experts and developers see the same thread — no re-explaining what broke or why it matters.",
  },
  {
    id: "move-fast",
    icon: (
      <Zap className="w-6 h-6 text-zinc-700 group-hover:text-zinc-950 transition-colors" strokeWidth={1.5} />
    ),
    title: "Move fast",
    description:
      "From alert to aligned fix in minutes, not hours. No handoff lag. No context lost in translation.",
  },
  {
    id: "fix-with-ai",
    icon: (
      <Sparkles className="w-6 h-6 text-zinc-700 group-hover:text-zinc-950 transition-colors" strokeWidth={1.5} />
    ),
    title: "Fix it with AI",
    description:
      "Filter the relevant context, generate fix suggestions, and orchestrate your coding agent to ship.",
    hasVisual: true,
  },
  {
    id: "monitor-recurrence",
    icon: (
      <RefreshCw className="w-6 h-6 text-zinc-700 group-hover:text-zinc-950 transition-colors" strokeWidth={1.5} />
    ),
    title: "Monitor for recurrence",
    description:
      "After the fix ships, Neatlogs watches for the same pattern so you know if it comes back.",
  },
  {
    id: "built-for-ai",
    icon: (
      <Cpu className="w-6 h-6 text-zinc-700 group-hover:text-zinc-950 transition-colors" strokeWidth={1.5} />
    ),
    title: "Built for AI agents",
    description:
      "Purpose-built tracing for LangGraph, CrewAI, LangChain, and any agentic workflow your team ships.",
  },
];

const TRUST_BADGES = [
  {
    icon: <CheckCircle2 className="w-4 h-4 text-zinc-700" strokeWidth={1.5} />,
    text: "Instantly Surfaces Bugs",
  },
  {
    icon: <ShieldCheck className="w-4 h-4 text-zinc-700" strokeWidth={1.5} />,
    text: "Secure Auditing Context",
  },
  {
    icon: <Clock className="w-4 h-4 text-zinc-700" strokeWidth={1.5} />,
    text: "Minutes to Resolution",
  },
];

export const Features = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      className="w-full bg-[#EAF3F6] flex flex-col pt-8 pb-20 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28"
    >
      <LayoutWrapper showBorderAccents={false} className="pb-10 pt-2 flex-1">
        <div
          ref={containerRef}
          className="relative w-full mx-auto backdrop-blur-2xl overflow-hidden px-6 md:px-8 pb-6 md:pb-8 pt-2 md:pt-4 reveal-element"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-darken pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto mb-10 sm:mb-16 text-center">
            <span className="font-ui text-[12px] font-medium uppercase tracking-[0.15em] text-zinc-600">
              Why Neatlogs
            </span>
            <h2 className="mt-5 text-balance text-4xl sm:text-5xl md:text-[58px] leading-[1.08] tracking-tighter text-zinc-950 mx-auto font-sans">
              <span className="font-semibold">
                Most teams don't have a visibility problem.
              </span>{" "}
              <span className="text-zinc-500 font-medium tracking-tight">
                They have a handoff problem.
              </span>
            </h2>
            <p className="font-ui mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-zinc-600 sm:text-base px-4">
              The issue gets spotted in one place, discussed in another, and
              fixed in a third. Neatlogs closes that loop.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.id}
                className="group relative p-[6px] rounded-[28px] bg-zinc-950 border border-zinc-950 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.45)] transition-colors duration-500"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="h-full bg-white rounded-[22px] ring-1 ring-zinc-900/10 p-5 sm:p-6 flex flex-col shadow-[inset_0_1px_1px_rgba(255,255,255,1)] group-hover:bg-zinc-50 transition-all duration-500">
                  <div className="mb-6 flex p-3 rounded-2xl w-fit bg-zinc-50 border border-black/5 shadow-sm group-hover:scale-105 transition-transform duration-200 ease-out">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl sm:text-[22px] font-ui font-medium tracking-tight text-zinc-950 mb-2 sm:mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-zinc-600 font-sans leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            {TRUST_BADGES.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-zinc-600 font-ui text-sm"
              >
                {badge.icon}
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};

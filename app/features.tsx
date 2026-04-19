import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  Cpu,
  Lock,
  FolderDot,
  User,
} from "lucide-react";
import { LayoutWrapper } from "./layoutWrapper";

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

const CardWrapper = ({
  children,
  title,
  subtitle,
  className = "",
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-[24px] p-6 lg:p-8 shadow-sm border border-gray-200 flex flex-col h-full w-full ${className}`}
  >
    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-sm md:text-base text-gray-500 mb-6 flex-1 leading-relaxed max-w-md">
      {subtitle}
    </p>
    <div className="mt-auto items-center justify-center flex w-full">
      {children}
    </div>
  </div>
);

export const Features = () => {
  return (
    <section
      id="features"
      className="w-full bg-[#FAFAFA] flex flex-col pt-8 pb-20 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28"
    >
      <LayoutWrapper showBorderAccents={false} className="pb-10 pt-2 flex-1">
        <div className="relative w-full mx-auto backdrop-blur-2xl overflow-hidden px-6 md:px-8 pb-6 md:pb-8 pt-2 md:pt-4">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-darken pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto mb-10 sm:mb-16 text-center">
            <span
              translate="no"
              className="font-ui text-2xl sm:text-3xl font-semibold tracking-tight"
              style={{ color: "#E9462E" }}
            >
              Why Neatlogs
            </span>
            <h2 className="mt-5 text-balance text-4xl sm:text-5xl md:text-[56px] leading-[1.08] tracking-tighter text-zinc-950 mx-auto font-sans">
              <span className="font-semibold">
                Most teams don't have a visibility problem.
              </span>
              <br />
              <span className="font-semibold tracking-tight">
                They have a handoff problem.
              </span>
            </h2>
            <p className="font-ui mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-zinc-600 sm:text-base px-4">
              The issue gets spotted in one place, discussed in another, and
              fixed in a third. Neatlogs closes that loop.
            </p>
          </div>

          <div className="relative z-10 max-w-[75rem] w-full grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4 mx-auto">
            {/* Card 1: Built with AI agents */}
            <CardWrapper
              title="Built for AI agents"
              subtitle="Purpose-built tracing for LangGraph, CrewAI, LangChain, and any agentic workflow your team ships."
              className="lg:col-span-3"
            >
              <div className="w-full bg-slate-50/50 border border-gray-100 rounded-2xl p-1 lg:p-[6px] shadow-[0_2px_14px_rgba(0,0,0,0.02)] select-none">
                <div className="w-full h-full bg-white border border-gray-200 rounded-[10px] p-5 lg:p-7 shadow-sm flex flex-col relative">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-[6px] mb-8 lg:mb-10 px-1">
                    <div className="flex gap-5 sm:gap-7 text-[12px] font-medium text-gray-500">
                      <span className="text-[#E9462E] font-semibold relative after:absolute after:-bottom-[8px] after:left-0 after:h-[2px] after:w-full after:bg-[#E9462E]">
                        Logs
                      </span>
                      <span>Traces</span>
                    </div>
                    <div className="hidden sm:flex gap-4 sm:gap-6 text-[12px] font-medium text-gray-500">
                      <span>10s</span>
                      <span>1m</span>
                      <span>5m</span>
                      <span className="text-[#E9462E] font-semibold relative after:absolute after:-bottom-[8px] after:left-0 after:h-[2px] after:w-full after:bg-[#E9462E]">
                        1h
                      </span>
                      <span>24h</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full relative h-[140px] px-2 sm:px-[5%]">
                    <div className="absolute left-[70px] sm:left-[15%] right-[55%] top-1/2 -translate-y-1/2 h-[4px] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] z-0">
                      <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-[#cbd5e1]"></div>
                    </div>

                    <div className="absolute left-[54%] right-[70px] sm:right-[15%] top-1/2 -translate-y-1/2 h-[4px] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] z-0">
                      <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-[#cbd5e1]"></div>
                    </div>

                    <div className="flex flex-col items-center gap-2 bg-white relative z-10 mx-1">
                      <div className="w-[72px] h-[72px] rounded-[16px] border border-gray-200 bg-white flex items-center justify-center p-[3px]">
                        <div className="w-full h-full rounded-[13px] overflow-hidden border border-gray-100 bg-gray-50">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://i.pinimg.com/736x/91/53/5b/91535bc90a800b532116028457cdd0f9.jpg"
                            alt="Developer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <span className="text-[12px] font-bold tracking-tight text-gray-700 absolute -bottom-[26px] lowercase">
                        developer
                      </span>
                    </div>

                    <div className="flex flex-col bg-white border border-gray-200 rounded-[8px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] z-10 w-[140px] overflow-hidden mx-1">
                      <div className="px-3 py-[6px] border-b border-gray-100/80 bg-gray-50/50">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                          Frameworks
                        </span>
                      </div>
                      <div className="flex flex-col bg-white">
                        {["LangGraph", "CrewAI", "LangChain"].map(
                          (fw, idx, arr) => (
                            <div
                              key={fw}
                              className={`flex items-center gap-2.5 px-3 py-2 ${idx < arr.length - 1 ? "border-b border-gray-100/80" : ""} hover:bg-gray-50 transition-colors`}
                            >
                              <div className="w-3.5 h-3.5 rounded-[3px] bg-[#E9462E] flex items-center justify-center text-white flex-shrink-0">
                                <svg
                                  width="8"
                                  height="8"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </div>
                              <span className="text-[12px] font-medium text-gray-800">
                                {fw}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 bg-white relative z-10 mx-1">
                      <div className="w-[72px] h-[72px] rounded-[16px] border border-gray-200 bg-white flex items-center justify-center p-[3px]">
                        <div className="w-full h-full rounded-[13px] overflow-hidden border border-gray-100 bg-gray-50">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://i.pinimg.com/736x/35/c8/37/35c837bf48912b33d03c93e0d2be7c9b.jpg"
                            alt="Manager"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      </div>
                      <span className="text-[12px] font-bold tracking-tight text-gray-700 absolute -bottom-[26px] lowercase">
                        manager
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardWrapper>

            {/* Card 2: Shared context, always */}
            <CardWrapper
              title="Shared context, always"
              subtitle="Domain experts and developers see the same thread — no re-explaining what broke or why it matters."
              className="lg:col-span-2"
            >
              <div className="w-full h-[220px] -mt-6 sm:-mt-10 scale-110 flex items-center justify-center relative select-none mx-auto overflow-hidden rounded-[8px]">
                <div className="relative z-20 flex size-13 translate-y-2 items-center justify-center rounded-2xl bg-white p-1 shadow-[inset_0_2px_6px_rgba(113,113,122,0.22),inset_0_-1px_3px_rgba(113,113,122,0.1),0_2px_4px_rgba(12,20,40,0.06),0_10px_20px_-6px_rgba(12,20,40,0.18),0_22px_40px_-10px_rgba(12,20,40,0.2)] ring-1 ring-zinc-900/[0.08]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/nl-logo.png"
                    alt="Neatlogs"
                    className="size-full rounded-xl object-contain"
                  />
                </div>

                <div
                  className="absolute w-[120px] h-[120px] rounded-full border border-dashed border-gray-300 z-10 flex items-center justify-center motion-safe:animate-[spin_15s_linear_infinite] translate-y-2"
                  style={{ animationDirection: "normal" }}
                >
                  <div
                    className="absolute -top-[14px] w-7 h-7 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center motion-safe:animate-[spin_15s_linear_infinite]"
                    style={{ animationDirection: "reverse" }}
                  >
                    <User className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <div
                    className="absolute -bottom-[14px] w-7 h-7 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center motion-safe:animate-[spin_15s_linear_infinite]"
                    style={{ animationDirection: "reverse" }}
                  >
                    <User className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <div
                    className="absolute -left-[14px] w-7 h-7 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center motion-safe:animate-[spin_15s_linear_infinite]"
                    style={{ animationDirection: "reverse" }}
                  >
                    <User className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <div
                    className="absolute -right-[14px] w-7 h-7 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center motion-safe:animate-[spin_15s_linear_infinite]"
                    style={{ animationDirection: "reverse" }}
                  >
                    <User className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                </div>

                <div
                  className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-gray-200 z-0 flex items-center justify-center motion-safe:animate-[spin_25s_linear_infinite] translate-y-2"
                  style={{ animationDirection: "reverse" }}
                >
                  <div
                    className="absolute -top-[14px] w-7 h-7 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center motion-safe:animate-[spin_25s_linear_infinite]"
                    style={{ animationDirection: "normal" }}
                  >
                    <User className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <div
                    className="absolute -bottom-[14px] w-7 h-7 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center motion-safe:animate-[spin_25s_linear_infinite]"
                    style={{ animationDirection: "normal" }}
                  >
                    <User className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <div
                    className="absolute -left-[14px] w-7 h-7 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center motion-safe:animate-[spin_25s_linear_infinite]"
                    style={{ animationDirection: "normal" }}
                  >
                    <User className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <div
                    className="absolute -right-[14px] w-7 h-7 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center motion-safe:animate-[spin_25s_linear_infinite]"
                    style={{ animationDirection: "normal" }}
                  >
                    <User className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-30 pointer-events-none opacity-90"></div>
              </div>
            </CardWrapper>

            {/* Card 3: Surface the issue */}
            <CardWrapper
              title="Surface the issue"
              subtitle="Detection triggers instantly. Alerts hit Slack and email before your team notices something's wrong."
              className="lg:col-span-2"
            >
              <div className="w-full flex items-center justify-center relative min-h-[220px] max-w-[400px] select-none mx-auto px-2">
                <div className="flex flex-col bg-white border border-gray-200 rounded-[8px] shadow-sm z-10 w-[120px] flex-shrink-0 overflow-hidden">
                  <div className="px-3 border-b border-gray-100 bg-white">
                    <span className="text-[9px] py-2.5 font-bold text-gray-500 uppercase tracking-tighter block">
                      Detect
                    </span>
                  </div>
                  <div className="flex flex-col bg-white">
                    {["Error", "Anomaly", "Latency"].map((item, idx, arr) => (
                      <div
                        key={item}
                        className={`flex items-center gap-2.5 px-3 py-2.5 bg-white ${idx < arr.length - 1 ? "border-b border-gray-100" : ""} hover:bg-gray-50 transition-colors`}
                      >
                        <div className="w-[14px] h-[14px] rounded-[3px] bg-[#E9462E] flex items-center justify-center text-white flex-shrink-0">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-[11px] font-medium tracking-tighter text-gray-800">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center mx-0 z-0 relative">
                  <div className="w-full flex items-center relative -top-0.5">
                    <div className="h-[1.5px] bg-[#e0e0e0] w-full"></div>
                    <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px] border-l-[#e0e0e0] relative -left-px"></div>
                  </div>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <div className="w-[52px] h-[52px] rounded-[8px] border border-gray-200 shadow-sm flex items-center justify-center bg-white text-gray-400">
                    <Cpu className="w-[32px] h-[32px] stroke-[1.5]" />
                  </div>
                  <div className="absolute -top-[5px] -right-[5px] w-5 h-5 rounded-full bg-[#fef08a] border border-[#fde047] flex items-center justify-center text-[10px] font-bold text-gray-800 shadow-sm">
                    1
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center mx-0 z-0 relative">
                  <div className="w-full flex items-center relative -top-0.5">
                    <div className="h-[1.5px] bg-[#e0e0e0] w-full"></div>
                    <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px] border-l-[#e0e0e0] relative -left-px"></div>
                  </div>
                </div>

                <div className="flex flex-col bg-white border border-gray-200 rounded-[8px] shadow-sm z-10 w-[130px] flex-shrink-0 overflow-hidden">
                  <div className="px-3 border-b border-gray-100 bg-white">
                    <span className="text-[9px] py-2.5 font-bold text-gray-500 uppercase tracking-tighter block">
                      Notify
                    </span>
                  </div>
                  <div className="flex flex-col bg-white">
                    {["Slack", "Email", "Webhook"].map((item, idx, arr) => (
                      <div
                        key={item}
                        className={`flex items-center gap-2 px-3 py-2.5 bg-white ${idx < arr.length - 1 ? "border-b border-gray-100" : ""} hover:bg-gray-50 transition-colors`}
                      >
                        <span className="text-[11px] font-medium tracking-tighter text-gray-800 truncate">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardWrapper>

            {/* Card 4: Monitor for recurrence */}
            <CardWrapper
              title="Monitor for recurrence"
              subtitle="After the fix ships, Neatlogs watches for the same pattern so you know if it comes back."
              className="lg:col-span-3"
            >
              <div className="w-full bg-slate-50/50 border border-gray-100 rounded-2xl p-1 lg:p-[6px] shadow-[0_2px_14px_rgba(0,0,0,0.02)] select-none">
                <div className="w-full h-full bg-white border border-gray-200 rounded-[10px] p-5 lg:p-7 shadow-sm flex flex-col relative min-h-[220px]">
                  <div className="w-full h-full flex items-center justify-between relative px-2 sm:px-[5%] z-10 flex-1">
                    <div className="absolute inset-x-2 sm:inset-x-[2%] inset-y-0 pointer-events-none z-0">
                      <div className="absolute left-[130px] sm:left-[140px] right-[55%] top-1/2 w-auto h-[4px] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] -translate-y-1/2">
                        <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-[#cbd5e1]"></div>
                      </div>

                      <div className="absolute left-[54%] right-[100px] top-1/2 h-[4px] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] -translate-y-1/2 z-0"></div>

                      <div className="absolute right-[100px] top-[28%] bottom-[28%] w-[4px] bg-[repeating-linear-gradient(180deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] -translate-y-[2px]"></div>

                      <div className="absolute right-[65px] h-[4px] w-[35px] top-[28%] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] -translate-y-[2px]">
                        <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-[#cbd5e1]"></div>
                      </div>

                      <div className="absolute right-[65px] h-[4px] w-[35px] bottom-[28%] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] translate-y-[2px]">
                        <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-[#cbd5e1]"></div>
                      </div>
                    </div>

                    <div className="w-[110px] sm:w-[130px] h-[90px] sm:h-[110px] bg-white border border-gray-100 rounded-[10px] shadow-sm p-1.5 z-10 grid grid-cols-6 grid-rows-5 gap-1 relative mx-1">
                      {Array.from({ length: 30 }).map((_, i) => {
                        const isDark = [2, 14, 23, 28].includes(i);
                        const isMedium = [1, 9, 18, 20, 29].includes(i);
                        const isLight = [3, 7, 10, 15, 24].includes(i);
                        const isBlinking = isDark || isMedium || isLight;
                        const seed = i * 0.137;
                        const dur = 1 + ((seed * 7) % 2);
                        const delay = (seed * 3) % 1;
                        return (
                          <div
                            key={i}
                            className={`rounded-[2px] ${
                              isDark
                                ? "bg-gray-300"
                                : isMedium
                                  ? "bg-gray-200"
                                  : isLight
                                    ? "bg-gray-100"
                                    : "bg-gray-50/50"
                            } ${isBlinking ? "motion-safe:animate-pulse" : ""}`}
                            style={{
                              animationDuration: `${dur}s`,
                              animationDelay: `${delay}s`,
                            }}
                          ></div>
                        );
                      })}
                    </div>

                    <div className="relative z-10 bg-white rounded-full p-1 mx-2">
                      <div className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-[10px] border border-gray-200 shadow-sm flex items-center justify-center bg-gray-50 text-gray-400">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                          <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                          <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                          <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                      </div>
                      <div className="absolute -top-[5px] -right-[5px] w-5 h-5 rounded-full bg-[#fef08a] border border-[#fde047] flex items-center justify-center text-[10px] font-bold text-gray-800 shadow-sm z-20">
                        1
                      </div>
                    </div>

                    <div className="flex flex-col justify-between h-[150px] bg-transparent z-10 py-1 relative mx-1">
                      <div className="flex flex-col items-center gap-2 relative bg-white">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[10px] border border-gray-100 shadow-sm flex items-center justify-center bg-white text-gray-400 z-10">
                          <FolderDot className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <span className="text-[10px] font-semibold tracking-tighter text-gray-600 absolute -bottom-5 whitespace-nowrap">
                          Same error
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-2 relative bg-white">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[10px] border border-gray-100 shadow-sm flex items-center justify-center bg-white text-gray-400 z-10">
                          <Lock className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <span className="text-[10px] font-semibold tracking-tighter text-gray-600 absolute -bottom-5 whitespace-nowrap">
                          Regression
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWrapper>
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

import { Cpu, Lock, FolderDot, User, Bell } from "lucide-react";
import { LayoutWrapper } from "./layoutWrapper";
import { FlickeringGrid } from "./flow";

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
    className={`flex flex-col h-full w-full sm:bg-white sm:rounded sm:p-6 lg:p-8 sm:shadow-sm sm:border sm:border-gray-200 ${className}`}
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
      className="relative z-10 -mt-48 w-full bg-[#FAFAFA] flex flex-col pt-8 pb-20 sm:-mt-64 sm:pt-12 sm:pb-24 lg:-mt-80 lg:pt-16 lg:pb-28"
    >
      <LayoutWrapper showBorderAccents={false} className="pb-10 pt-2 flex-1">
        <div className="relative w-full mx-auto backdrop-blur-2xl overflow-hidden px-6 md:px-8 pb-6 md:pb-8 pt-2 md:pt-4">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-darken pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto mb-10 sm:mb-16 text-center">
            <h2 className="text-balance text-[22px] sm:text-5xl md:text-[56px] leading-[1.2] sm:leading-[1.08] tracking-tight sm:tracking-tighter text-zinc-950 mx-auto">
              <span className="font-pixel-circle">
                most teams don't have<br className="sm:hidden" /> a visibility problem
              </span>
              <br />
              <span className="font-semibold tracking-tight font-sans">
                they have a handoff problem
              </span>
            </h2>
            <p className="font-ui mx-auto mt-6 max-w-2xl text-pretty text-[15px] font-medium leading-relaxed text-zinc-700 sm:text-base px-4">
              the issue gets spotted in one place, discussed in another, and
              fixed in a third. neatlogs closes that loop
            </p>
          </div>

          <div className="relative z-10 max-w-[75rem] w-full grid grid-cols-1 lg:grid-cols-5 gap-10 sm:gap-6 lg:gap-4 mx-auto">
            {/* Card 1: Built with AI agents */}
            <CardWrapper
              title="Built for AI agents"
              subtitle="Purpose-built tracing for LangGraph, CrewAI, LangChain, and any agentic workflow your team ships."
              className="lg:col-span-3"
            >
              <div className="w-full bg-slate-50/50 border border-gray-100 rounded-2xl p-1 lg:p-[6px] shadow-[0_2px_14px_rgba(0,0,0,0.02)] select-none">
                <div className="w-full h-full bg-white border border-gray-200 rounded-[10px] p-3 sm:p-5 lg:p-7 shadow-sm flex flex-col relative">
                  <div className="flex items-center justify-between w-full relative h-[110px] sm:h-[140px] px-2 sm:px-[5%]">
                    <div className="absolute left-[70px] sm:left-[15%] right-[55%] top-1/2 -translate-y-1/2 h-[4px] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] z-0">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#E9462E_0px,#E9462E_2px,transparent_2px,transparent_5px)] motion-safe:animate-[line-fill-right_5s_ease-in-out_infinite] motion-reduce:hidden"
                      />
                    </div>

                    <div className="absolute left-[54%] right-[70px] sm:right-[15%] top-1/2 -translate-y-1/2 h-[4px] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] z-0">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#E9462E_0px,#E9462E_2px,transparent_2px,transparent_5px)] motion-safe:animate-[line-fill-left_5s_ease-in-out_infinite] motion-reduce:hidden"
                      />
                    </div>

                    <div className="flex flex-col items-center gap-2 bg-white relative z-10 mx-1">
                      <div className="w-[56px] h-[56px] sm:w-[72px] sm:h-[72px] rounded-[12px] sm:rounded-[16px] border border-gray-200 bg-white flex items-center justify-center p-[3px]">
                        <div className="w-full h-full rounded-[10px] sm:rounded-[13px] overflow-hidden border border-gray-100 bg-gray-50">
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

                    <div className="flex flex-col bg-white border border-gray-200 rounded-[8px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] z-10 w-[114px] sm:w-[140px] overflow-hidden mx-1 scale-[0.5] sm:scale-100 origin-center">
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
                      <div className="w-[56px] h-[56px] sm:w-[72px] sm:h-[72px] rounded-[12px] sm:rounded-[16px] border border-gray-200 bg-white flex items-center justify-center p-[3px]">
                        <div className="w-full h-full rounded-[10px] sm:rounded-[13px] overflow-hidden border border-gray-100 bg-gray-50">
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
                <div className="relative z-20 flex size-13 translate-y-2 items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/nl-logo.png"
                    alt="Neatlogs"
                    className="size-full rounded object-contain"
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

                <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/40 to-transparent sm:from-white sm:via-white/40 z-30 pointer-events-none opacity-90"></div>
              </div>
            </CardWrapper>

            {/* Card 3: Surface the issue */}
            <CardWrapper
              title="Surface the issue"
              subtitle="Detection triggers instantly. Alerts hit Slack and email before your team notices something's wrong."
              className="lg:col-span-2"
            >
              <div className="w-full flex items-center justify-center relative min-h-[170px] sm:min-h-[220px] max-w-[400px] select-none mx-auto px-2">
                <div className="flex flex-col bg-white border border-gray-200 rounded-[8px] shadow-sm z-10 w-[100px] sm:w-[120px] flex-shrink-0 overflow-hidden scale-[0.85] sm:scale-100 origin-center">
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
                  <div className="relative w-full h-[4px] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] motion-safe:animate-[chase-right_1.4s_linear_infinite]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 motion-safe:animate-[chase-right_1.4s_linear_infinite] motion-reduce:hidden"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #94A3B8 0px, #94A3B8 2px, transparent 2px)",
                        backgroundSize: "10px 100%",
                        backgroundRepeat: "repeat-x",
                      }}
                    />
                  </div>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <div className="w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-[8px] border border-gray-200 shadow-sm flex items-center justify-center bg-[#F9FAFB] text-gray-400">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="sm:w-[24px] sm:h-[24px]"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                      <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                      <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center mx-0 z-0 relative">
                  <div className="relative w-full h-[4px] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] motion-safe:animate-[chase-right_1.4s_linear_infinite]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 motion-safe:animate-[chase-right_1.4s_linear_infinite] motion-reduce:hidden"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #94A3B8 0px, #94A3B8 2px, transparent 2px)",
                        backgroundSize: "10px 100%",
                        backgroundRepeat: "repeat-x",
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col bg-white border border-gray-200 rounded-[8px] shadow-sm z-10 w-[108px] sm:w-[130px] flex-shrink-0 overflow-hidden scale-[0.85] sm:scale-100 origin-center">
                  <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100 bg-white">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">
                      Notify
                    </span>
                    <Bell className="size-3 text-gray-400" strokeWidth={1.8} />
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
              title="monitor for recurrence"
              subtitle="after the fix ships, neatlogs watches for the same pattern so you know if it comes back"
              className="lg:col-span-3"
            >
              <div className="w-full bg-slate-50/50 border border-gray-100 rounded-2xl p-1 lg:p-[6px] shadow-[0_2px_14px_rgba(0,0,0,0.02)] select-none">
                <div className="w-full h-full bg-white border border-gray-200 rounded-[10px] p-3 sm:p-5 lg:p-7 shadow-sm flex flex-col relative min-h-[180px] sm:min-h-[220px]">
                  <div className="w-full h-full flex items-center justify-between relative px-2 sm:px-[5%] z-10 flex-1">
                    <div className="absolute inset-x-2 sm:inset-x-[2%] inset-y-0 pointer-events-none z-0">
                      <div className="absolute left-[36px] sm:left-[80px] right-[48%] top-1/2 w-auto h-[4px] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] -translate-y-1/2 motion-safe:animate-[chase-right_1.4s_linear_infinite]">
                        <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-[#cbd5e1]"></div>
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 motion-safe:animate-[chase-right_1.4s_linear_infinite] motion-reduce:hidden"
                          style={{
                            backgroundImage:
                              "linear-gradient(90deg, #94A3B8 0px, #94A3B8 2px, transparent 2px)",
                            backgroundSize: "10px 100%",
                            backgroundRepeat: "repeat-x",
                          }}
                        />
                      </div>

                      <div className="absolute left-[54%] right-[104px] top-1/2 h-[4px] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] -translate-y-1/2 z-0 motion-safe:animate-[chase-right_1.4s_linear_infinite]">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 motion-safe:animate-[chase-right_1.4s_linear_infinite] motion-reduce:hidden"
                          style={{
                            backgroundImage:
                              "linear-gradient(90deg, #94A3B8 0px, #94A3B8 2px, transparent 2px)",
                            backgroundSize: "10px 100%",
                            backgroundRepeat: "repeat-x",
                          }}
                        />
                      </div>

                      <div className="absolute right-[100px] top-[calc(50%+5px)] bottom-[28%] w-[4px] bg-[repeating-linear-gradient(180deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] -translate-y-[2px] motion-safe:animate-[chase-down_1.4s_linear_infinite]">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 motion-safe:animate-[chase-down_1.4s_linear_infinite] motion-reduce:hidden"
                          style={{
                            backgroundImage:
                              "linear-gradient(180deg, #94A3B8 0px, #94A3B8 2px, transparent 2px)",
                            backgroundSize: "100% 10px",
                            backgroundRepeat: "repeat-y",
                          }}
                        />
                      </div>

                      <div className="absolute right-[100px] top-[28%] bottom-[calc(50%+5px)] w-[4px] bg-[repeating-linear-gradient(180deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] translate-y-[2px] motion-safe:animate-[chase-up_1.4s_linear_infinite]">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 motion-safe:animate-[chase-up_1.4s_linear_infinite] motion-reduce:hidden"
                          style={{
                            backgroundImage:
                              "linear-gradient(180deg, #94A3B8 0px, #94A3B8 2px, transparent 2px)",
                            backgroundSize: "100% 10px",
                            backgroundRepeat: "repeat-y",
                          }}
                        />
                      </div>

                      <div className="absolute right-[40px] h-[4px] w-[60px] top-[28%] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] -translate-y-[2px] motion-safe:animate-[chase-right_1.4s_linear_infinite]">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 motion-safe:animate-[chase-right_1.4s_linear_infinite] motion-reduce:hidden"
                          style={{
                            backgroundImage:
                              "linear-gradient(90deg, #94A3B8 0px, #94A3B8 2px, transparent 2px)",
                            backgroundSize: "10px 100%",
                            backgroundRepeat: "repeat-x",
                          }}
                        />
                      </div>

                      <div className="absolute right-[40px] h-[4px] w-[60px] bottom-[28%] bg-[repeating-linear-gradient(90deg,#e5e7eb_0px,#e5e7eb_2px,transparent_2px,transparent_5px)] translate-y-[2px] motion-safe:animate-[chase-right_1.4s_linear_infinite]">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 motion-safe:animate-[chase-right_1.4s_linear_infinite] motion-reduce:hidden"
                          style={{
                            backgroundImage:
                              "linear-gradient(90deg, #94A3B8 0px, #94A3B8 2px, transparent 2px)",
                            backgroundSize: "10px 100%",
                            backgroundRepeat: "repeat-x",
                          }}
                        />
                      </div>
                    </div>

                    <div className="relative z-10 bg-white rounded-full p-1 mx-2 scale-[0.65] sm:scale-100 origin-center">
                      <div className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-[10px] border border-gray-200 shadow-sm flex items-center justify-center bg-gray-50 text-gray-400 overflow-hidden p-2.5 sm:p-1.5">
                        <svg
                          viewBox="0 0 40 34"
                          fill="none"
                          className="w-full h-full"
                          aria-hidden="true"
                        >
                          <rect
                            x="3.5"
                            y="3.5"
                            width="33"
                            height="22"
                            rx="2"
                            fill="white"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                          <line
                            x1="16"
                            y1="31"
                            x2="24"
                            y2="31"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                          />
                          <line
                            x1="20"
                            y1="25.5"
                            x2="20"
                            y2="31"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinejoin="round"
                            d="M8.5 14.5 Q 20 8, 31.5 14.5 Q 20 21, 8.5 14.5 Z"
                          >
                            <animate
                              attributeName="d"
                              values="M8.5 14.5 Q 20 8, 31.5 14.5 Q 20 21, 8.5 14.5 Z;M8.5 14.5 Q 20 8, 31.5 14.5 Q 20 21, 8.5 14.5 Z;M8.5 14.5 Q 20 13.3, 31.5 14.5 Q 20 14.7, 8.5 14.5 Z;M8.5 14.5 Q 20 8, 31.5 14.5 Q 20 21, 8.5 14.5 Z"
                              keyTimes="0;0.88;0.94;1"
                              dur="2.2s"
                              repeatCount="indefinite"
                            />
                          </path>
                          <circle cx="20" cy="14.5" r="2.8" fill="currentColor">
                            <animate
                              attributeName="r"
                              values="2.8;2.8;0;2.8"
                              keyTimes="0;0.88;0.94;1"
                              dur="2.2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                          <circle cx="20.8" cy="13.7" r="0.7" fill="white">
                            <animate
                              attributeName="r"
                              values="0.7;0.7;0;0.7"
                              keyTimes="0;0.88;0.94;1"
                              dur="2.2s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        </svg>
                      </div>
                    </div>

                    <div className="w-[110px] sm:w-[130px] h-[90px] sm:h-[110px] bg-white border border-gray-100 rounded-[10px] shadow-sm z-10 relative mx-1 overflow-hidden scale-[0.6] sm:scale-100 origin-center">
                      <FlickeringGrid />
                      <div className="relative z-10 flex h-full w-full items-center justify-center">
                        <div className="flex size-9 sm:size-11 items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/nl-logo.png"
                            alt="Neatlogs"
                            className="size-full rounded object-contain"
                            style={{ filter: "invert(42%)" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between h-[150px] bg-transparent z-10 py-1 relative mx-1">
                      <div className="flex flex-col items-center gap-2 relative bg-white translate-y-[10px]">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[10px] border border-gray-100 shadow-sm flex items-center justify-center bg-white text-gray-400 z-10 scale-[0.65] sm:scale-100 origin-center">
                          <FolderDot className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                        </div>
                        <span className="text-[10px] font-semibold tracking-tighter text-gray-600 absolute -bottom-3 whitespace-nowrap">
                          Same error
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-2 relative bg-white -translate-y-[10px]">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[10px] border border-gray-100 shadow-sm flex items-center justify-center bg-white text-gray-400 z-10 scale-[0.65] sm:scale-100 origin-center">
                          <Lock className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                        </div>
                        <span className="text-[10px] font-semibold tracking-tighter text-gray-600 absolute -bottom-3 whitespace-nowrap">
                          Regression
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWrapper>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};

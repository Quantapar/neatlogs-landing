"use client";

function CheckIcon({ className, solid = false }: { className?: string; solid?: boolean }) {
  if (solid) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#18181B" />
        <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9.5" stroke="#52525B" strokeWidth="1.5" />
      <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="w-full bg-[#FAFAFA] border-t border-zinc-900/5 pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 md:px-8 flex flex-col items-center">
      <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
        <span
          translate="no"
          className="font-ui text-2xl sm:text-3xl font-semibold tracking-tight"
          style={{ color: "#E9462E" }}
        >
          Pricing
        </span>
        <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tighter text-zinc-950 sm:text-5xl md:text-[56px]">
          Start free. Scale when ready.
        </h2>
        <p className="font-ui mt-4 text-pretty text-lg text-zinc-600">
          Every team gets full access to start. Upgrade when your AI agents are in production.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6 antialiased">
        {/* OPEN Plan (Free) */}
        <div className="flex flex-col rounded-[28px] bg-[#F4F4F5] p-1.5 ring-1 ring-zinc-900/5 shadow-sm">
          <div className="flex flex-col px-5 py-4 sm:px-7 sm:pt-6 sm:pb-6 h-[212px] rounded-[20px] bg-white ring-1 ring-zinc-200/80 shadow-sm relative">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">OPEN</h3>
              <div className="mt-2.5 flex items-baseline leading-none">
                <span className="text-[30px] sm:text-[36px] font-bold tracking-tight text-zinc-950">Free</span>
              </div>
              <p className="mt-2.5 text-[13.5px] font-medium text-zinc-600">No credit card required</p>
            </div>
            <button type="button" className="font-ui mt-auto w-full cursor-pointer rounded-[12px] bg-zinc-950 py-3 px-4 text-[14px] font-semibold text-white shadow-md transition-[transform,background-color] duration-150 ease-snap hover:bg-zinc-800 hover-hover:hover:scale-[1.02] active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2">
              Get Started
            </button>
          </div>

          <div className="flex-1 mt-1.5 rounded-[22px] bg-white ring-1 ring-zinc-200/80 shadow-sm px-5 py-5 sm:px-7 sm:py-6">
            <ul className="flex flex-col gap-y-2.5">
              {[
                "All platform features (with limits)",
                "50k events / month",
                "30 days data access",
                "10 users",
                "10 projects",
                "1 team"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[13.5px] font-medium text-zinc-700">
                  <CheckIcon className="size-[16px] shrink-0" solid={true} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ENTERPRISE Plan */}
        <div className="flex flex-col rounded-[28px] bg-[#3f3f46] p-1.5 shadow-2xl relative">
          <div className="flex flex-col px-5 py-4 sm:px-7 sm:pt-6 sm:pb-6 h-[212px] rounded-[20px] bg-[#18181b] relative">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">ENTERPRISE</h3>
                <span className="rounded-full bg-[#FAFAFA]/10 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-zinc-300 uppercase">
                  Recommended
                </span>
              </div>
              <div className="mt-2.5 flex items-baseline leading-none">
                <span className="text-[30px] sm:text-[36px] font-bold tracking-tight text-white">Custom</span>
              </div>
              <p className="mt-2.5 text-[13.5px] font-medium text-zinc-400">For large teams</p>
            </div>
            <button type="button" className="font-ui mt-auto w-full cursor-pointer rounded-[12px] bg-white py-3 px-4 text-[14px] font-semibold text-zinc-950 transition-transform duration-150 ease-snap hover-hover:hover:scale-[1.02] active:scale-[0.97] motion-reduce:active:scale-100 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Book a Call
            </button>
          </div>

          <div className="flex-1 mt-1.5 rounded-[22px] bg-[#222225] border border-white/5 px-5 py-5 sm:px-7 sm:py-6">
            <p className="font-mono text-[12px] text-zinc-400 mb-4">Everything in Free, plus:</p>
            <ul className="flex flex-col gap-y-2.5">
              {[
                "Unlimited traces",
                "Unlimited users & teams",
                "Unlimited projects",
                "On-prem installation",
                "Dedicated Support Engineer",
                "Uptime & Support SLA",
                "AI features"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[13.5px] font-medium text-zinc-200">
                  <CheckIcon className="size-[16px] shrink-0" solid={false} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

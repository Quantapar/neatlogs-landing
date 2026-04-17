import Image from "next/image";
import Link from "next/link";
import { HowItWorks } from "./how-it-works";
import { MediaPlayer } from "./media-player";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-[#EAF3F6]">
      <div className="relative w-full aspect-3/2 overflow-hidden">
        <Image
          src="/hero-sf.png"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-linear-to-b from-transparent to-[#EAF3F6]"
        />

        <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-[6%] sm:pt-[7%]">
          <span className="font-pixel text-[11px] uppercase tracking-[0.18em] text-zinc-700">
            For teams building <span translate="no">AI</span> agents
          </span>

          <h1 className="font-pixel mt-4 max-w-4xl text-balance text-center text-4xl font-medium leading-[1.08] tracking-[-0.01em] text-zinc-950 sm:text-5xl md:text-6xl lg:text-7xl">
            From feedback to fix.
            <br />
            <span className="text-zinc-500">In minutes, not weeks.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-center text-base leading-relaxed text-zinc-700 sm:text-lg">
            The shared workspace where your team debugs{" "}
            <span translate="no">AI</span> agents together. No Slack threads.
            No trace archaeology.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="/demo"
              className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset,0_1px_2px_rgba(0,0,0,0.18)] transition-[transform,background-color] duration-150 ease-out touch-manipulation hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EAF3F6] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              Book a Demo
            </Link>
            <Link
              href="/start"
              className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full border border-zinc-900/10 bg-white/80 px-6 text-sm font-medium text-zinc-900 backdrop-blur-sm transition-[transform,background-color,border-color] duration-150 ease-out touch-manipulation hover:border-zinc-900/20 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EAF3F6] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              Get Started
            </Link>
          </div>
        </section>
      </div>

      <MediaPlayer />
      <HowItWorks />
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Features } from "./features";
import { Flow } from "./flow";
import { HowItWorks } from "./how-it-works";
import { MediaPlayer } from "./media-player";
import { MeetNeatlogs } from "./meet-neatlogs";
import { Integrations } from "./integrations";
import { Reviews } from "./reviews";
import { Pricing } from "./pricing";
import { FAQ } from "./faq";
import Footer2 from "./footer";
import { HeroHeadline } from "./hero-headline";

export default function () {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-[#FAFAFA]">
      <div className="relative w-full aspect-3/2 overflow-hidden">
        <Image
          src="/sfbg.png"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-linear-to-b from-transparent to-[#FAFAFA]"
        />

        <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-[11%] sm:pt-[13%]">
          <span className="font-ui text-[12px] font-medium uppercase tracking-[0.14em] text-zinc-700">
            For teams building <span translate="no">AI</span> agents
          </span>

          <HeroHeadline />

          <p className="font-ui mt-6 max-w-xl text-pretty text-center text-base leading-relaxed text-zinc-700 sm:text-lg">
            The shared workspace where your team debugs{" "}
            <span translate="no">AI</span> agents together. No Slack threads. No
            trace archaeology.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="/demo"
              className="font-ui inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-zinc-950/80 px-6 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)] ring-1 ring-white/15 backdrop-blur-xs transition-[transform,background-color] duration-150 ease touch-manipulation hover:bg-zinc-950/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              Book a Demo
            </Link>
            <Link
              href="/start"
              className="font-ui inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-(--glass-bg) px-6 text-sm font-medium text-zinc-950 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-zinc-900/10 backdrop-blur-xs transition-[transform,background-color] duration-150 ease touch-manipulation hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              Get Started
            </Link>
          </div>
        </section>
      </div>

      <MediaPlayer />
      <MeetNeatlogs />
      <Features />
      <HowItWorks />
      <Flow />
      <Integrations />
      <Reviews />
      <Pricing />
      <FAQ />
      <Footer2 />
    </main>
  );
}

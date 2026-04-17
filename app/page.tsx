import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#EAF3F6]">
      <Image
        src="/hero-sf.png"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-contain object-bottom"
      />

      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-20 pb-28 sm:pt-24 md:pt-28">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-700">
          For teams building AI agents
        </span>

        <h1 className="mt-5 max-w-3xl text-center text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl md:text-6xl lg:text-7xl">
          from feedback to fix
          <br className="hidden sm:block" />
          <span className="text-zinc-500"> in minutes.</span>
        </h1>

        <p className="mt-6 max-w-xl text-center text-base leading-relaxed text-zinc-700 sm:text-lg">
          Surface the issue, align on what broke, and fix it with AI.
        </p>

        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <Link
            href="/demo"
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset,0_1px_2px_rgba(0,0,0,0.18)] transition-[transform,background-color] duration-150 ease-out hover:bg-zinc-800 active:scale-[0.97]"
          >
            Book a demo
          </Link>
          <Link
            href="/start"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-900/10 bg-white/80 px-6 text-sm font-medium text-zinc-900 backdrop-blur-sm transition-[transform,background-color,border-color] duration-150 ease-out hover:border-zinc-900/20 hover:bg-white active:scale-[0.97]"
          >
            Get started
          </Link>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export function CTA() {
  return (
    <section className="w-full bg-[#FAFAFA] px-6 pt-4 pb-20 sm:pt-6 sm:pb-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
        <div>
          <h2 className="text-balance text-[28px] font-semibold tracking-tight text-zinc-950 sm:text-5xl sm:tracking-tighter md:text-[56px]">
            Start debugging together.
          </h2>
          <p className="font-ui mt-4 text-pretty text-lg text-zinc-600">
            Free to start. No credit card required.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:shrink-0">
          <Link
            href="/demo"
            className="font-ui inline-flex h-11 cursor-pointer items-center justify-center rounded-full border border-zinc-900/15 bg-white px-6 text-sm font-medium text-zinc-950 shadow-sm transition-[transform,background-color] duration-150 ease-snap hover-hover:hover:bg-zinc-50 active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/70 focus-visible:ring-offset-2"
          >
            Book a demo
          </Link>
          <Link
            href="/signup"
            className="font-ui inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-medium text-white shadow-md transition-[transform,background-color] duration-150 ease-snap hover:bg-zinc-800 hover-hover:hover:scale-[1.02] active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}

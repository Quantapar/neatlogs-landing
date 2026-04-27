import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Waitlist — Neatlogs",
  description: "Sign up to get early access to Neatlogs.",
};

const NOTION_FORM_URL =
  "https://magnificent-lycra-b35.notion.site/34c30dad43af80bfadc2c3a3a0d9df40";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] pt-24 pb-24 sm:pt-28 lg:pt-32">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Link
          href="/"
          className="font-ui inline-flex items-center gap-1.5 text-[14px] font-medium text-zinc-600 transition-colors hover:text-zinc-950"
        >
          ← Back to home
        </Link>

        <h1 className="mt-10 text-balance text-4xl font-semibold leading-[1.04] tracking-tighter text-zinc-950 sm:text-5xl">
          Join the waitlist
        </h1>
        <p className="font-ui mt-4 max-w-xl text-[15px] text-zinc-600 sm:text-base">
          Tell us a bit about you and we&rsquo;ll be in touch as soon as your
          spot opens up.
        </p>

        <div className="mt-10 overflow-hidden rounded-lg border border-zinc-900/10 bg-white shadow-[0_10px_30px_-12px_rgba(12,20,40,0.08)]">
          <iframe
            src={NOTION_FORM_URL}
            title="Neatlogs waitlist form"
            className="block h-[1200px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </main>
  );
}

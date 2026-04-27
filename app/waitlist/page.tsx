import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Waitlist — Neatlogs",
  description: "Sign up to get early access to Neatlogs.",
};

const NOTION_EMBED_URL =
  "https://magnificent-lycra-b35.notion.site/ebd//34c30dad43af80bfadc2c3a3a0d9df40";

export default function WaitlistPage() {
  return (
    <main className="page-reveal min-h-screen w-full bg-[#FAFAFA] pt-24 pb-12 sm:pt-28 lg:pt-32">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <Link
          href="/"
          className="font-ui inline-flex items-center gap-1.5 text-[14px] font-medium text-zinc-600 transition-[color,transform] duration-150 ease-out hover:text-zinc-950 active:scale-[0.97] motion-reduce:active:scale-100"
        >
          ← Back to home
        </Link>

        <div className="mt-8 overflow-hidden rounded-xl border border-zinc-900/10 bg-white shadow-[0_10px_30px_-12px_rgba(12,20,40,0.08)]">
          <iframe
            src={NOTION_EMBED_URL}
            title="Neatlogs waitlist"
            className="block h-[1100px] w-full border-0 sm:h-[1200px]"
            loading="lazy"
            allow="fullscreen"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </main>
  );
}

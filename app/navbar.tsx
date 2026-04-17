"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#integrations", label: "Integrations" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "/docs", label: "Docs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 w-full border-b border-zinc-900/5 bg-[#F4FAFD]">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:h-[68px] sm:px-7 lg:px-10">
        <Link
          href="/"
          aria-label="Neatlogs home"
          className="group flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl outline-none -mx-1 px-1 py-1 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4FAFD]"
        >
          <Image
            src="/nl-logo.png"
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition-transform duration-200 ease-out group-hover:-rotate-3 motion-reduce:transition-none"
            priority
          />
          <span className="font-pixel text-lg font-medium tracking-tight text-zinc-950 hidden sm:inline sm:text-xl">
            neatlogs
          </span>
          <span className="sr-only sm:hidden">Neatlogs</span>
        </Link>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex lg:gap-9"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="cursor-pointer text-sm font-medium text-zinc-700 transition-colors duration-150 hover:text-zinc-950"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <Link
            href="/demo"
            className="group inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full px-4 text-sm font-medium text-zinc-800 transition-[transform,color,background-color] duration-150 ease-out touch-manipulation hover:bg-zinc-900/5 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4FAFD] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            Book a Demo
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-3.5 text-zinc-500 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-zinc-900 motion-reduce:transition-none"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4 10a.75.75 0 0 1 .75-.75h8.69l-2.22-2.22a.75.75 0 1 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H4.75A.75.75 0 0 1 4 10Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset,0_1px_2px_rgba(0,0,0,0.18)] transition-[transform,background-color] duration-150 ease-out touch-manipulation hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4FAFD] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-zinc-900/10 bg-white/70 text-zinc-900 backdrop-blur-sm transition-colors duration-150 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4FAFD] md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
            aria-hidden="true"
          >
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-zinc-900/5 bg-[#F4FAFD] md:hidden"
      >
        <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-white/60 hover:text-zinc-950"
            >
              {label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-zinc-900/5 pt-3">
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-zinc-900/10 bg-white/80 px-5 text-sm font-medium text-zinc-900 hover:bg-white"
            >
              Book a Demo
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-3.5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4 10a.75.75 0 0 1 .75-.75h8.69l-2.22-2.22a.75.75 0 1 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H4.75A.75.75 0 0 1 4 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

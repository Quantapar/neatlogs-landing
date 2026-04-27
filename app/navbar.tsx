"use client";

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
  disabled?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { href: "https://docs.neatlogs.com", label: "Docs", external: true },
  {
    href: "https://www.notion.so/Open-Roles-Neatlogs-56f30dad43af832db26f812c6fc0207b",
    label: "Careers",
    external: true,
  },
  { href: "/changelog", label: "Changelog", disabled: true },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Window dimensions read into state so server-render and client-first-render
  // produce identical output (avoids hydration mismatch on non-home pages
  // where progress=1 immediately uses these values). Real values get filled in
  // after mount, then updated on resize.
  const [viewport, setViewport] = useState({ width: 1280, height: 800 });
  useEffect(() => {
    const update = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  // Continuous 0..1 progress tied to scroll: stays 0 over the hero, ramps to 1
  // as the user scrolls roughly half a viewport past the sticky-release point.
  // Drives the bg fade + the nav's translateX so the links physically slide
  // from center to right-cluster in lockstep with scroll. On non-home pages
  // there's no hero, so we lock progress at 1 to keep the navbar opaque from
  // scroll=0 instead of the transparent home-page intro state.
  const { scrollY } = useScroll();
  // Scroll-derived 0..1 — only meaningful on the home page where there's a hero
  // to scroll past. On other routes we don't read this; the route-driven value
  // takes over.
  const scrollProgress = useTransform(scrollY, (y) => {
    const vh = viewport.height;
    const start = vh * 1.4;
    const end = vh * 1.9;
    return Math.max(0, Math.min(1, (y - start) / (end - start)));
  });
  // Route-driven 0..1 — animates between 0 (home) and 1 (any other page) so the
  // navbar bg doesn't snap on navigation. 220ms ease-out matches the rest of
  // the navbar's motion language.
  const routeProgress = useMotionValue(isHome ? 0 : 1);
  useEffect(() => {
    const controls = animate(routeProgress, isHome ? 0 : 1, {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [isHome, routeProgress]);
  // Final progress = max of scroll and route, so on home the scroll behavior
  // works exactly like before, and on other routes we sit at 1.
  const progress = useTransform(
    [scrollProgress, routeProgress],
    ([s, r]: number[]) => Math.max(s, r),
  );

  const bgAlpha = useTransform(progress, [0, 1], [0, 0.85]);
  const backgroundColor = useMotionTemplate`rgba(255, 255, 255, ${bgAlpha})`;
  const blurPx = useTransform(progress, [0, 1], [0, 12]);
  const backdropFilter = useMotionTemplate`blur(${blurPx}px)`;
  // Hairline under the navbar fades in together with the bg wash — no line at
  // page top, gently appears as the white blur layer becomes visible.
  const borderAlpha = useTransform(progress, [0, 1], [0, 0.1]);
  const borderBottomColor = useMotionTemplate`rgba(9, 9, 11, ${borderAlpha})`;

  const maxWidthMv = useTransform(progress, (p) => {
    return 1280 + (viewport.width - 1280) * p;
  });
  const maxWidth = useMotionTemplate`${maxWidthMv}px`;

  const padBase = useTransform(progress, [0, 1], [20, 24]);
  const padSm = useTransform(progress, [0, 1], [28, 40]);
  const padLg = useTransform(progress, [0, 1], [40, 56]);
  const navPadBase = useMotionTemplate`${padBase}px`;
  const navPadSm = useMotionTemplate`${padSm}px`;
  const navPadLg = useMotionTemplate`${padLg}px`;

  // On scroll: nav links slide from viewport center to their natural slot
  // (just left of the right-side button cluster). The wrapper width itself
  // animates from max-w-7xl (1280) to full viewport, so the natural slot
  // moves with it — the offset has to track the *current* wrapper width,
  // not the start width, otherwise links drift mid-scroll on viewports
  // wider than 1280.
  const navOffsetX = useTransform(progress, (p) => {
    const vw = viewport.width;
    const wrapperW = Math.min(vw, 1280 + (vw - 1280) * p);
    const wrapperLeft = (vw - wrapperW) / 2;
    const padding = vw >= 1024 ? 40 + (56 - 40) * p : vw >= 640 ? 28 + (40 - 28) * p : 20 + (24 - 20) * p;
    const buttonsApprox = 280; // Book a Demo + Join the Waitlist + inner gap
    const navApprox = 200; // 3 links + gaps
    const clusterGap = 36; // gap between nav and buttons (matches lg:gap-9)
    const naturalNavCenterX =
      wrapperLeft +
      wrapperW -
      padding -
      buttonsApprox -
      clusterGap -
      navApprox / 2;
    const distanceToCenter = vw / 2 - naturalNavCenterX;
    return (1 - p) * distanceToCenter;
  });

  return (
    <motion.header
      style={{ backgroundColor, backdropFilter }}
      className="fixed inset-x-0 top-0 z-50 w-full"
    >
      <motion.div
        style={{ borderBottomColor }}
        className="border-b border-transparent"
      >
      <motion.div
        style={
          {
            maxWidth,
            "--nav-pad": navPadBase,
            "--nav-pad-sm": navPadSm,
            "--nav-pad-lg": navPadLg,
          } as unknown as CSSProperties
        }
        className="relative mx-auto flex h-16 w-full items-center justify-between gap-4 px-(--nav-pad) sm:h-17 sm:px-(--nav-pad-sm) lg:px-(--nav-pad-lg)"
      >
        <Link
          href="/"
          aria-label="Neatlogs home"
          className="group flex shrink-0 cursor-pointer items-center rounded-xl outline-none -mx-1 px-1 py-1 transition-transform duration-150 ease-out active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[#A4A8C5]"
        >
          <Image
            src="/nl-wordmark.png"
            alt="neatlogs"
            width={258}
            height={57}
            priority
            className="h-6 w-auto rounded sm:h-7"
          />
        </Link>

        <div className="hidden shrink-0 items-center gap-7 md:flex lg:gap-9">
          <motion.nav
            aria-label="Primary"
            style={{ x: navOffsetX }}
            className="flex items-center gap-7 lg:gap-9"
            suppressHydrationWarning
          >
            {NAV_LINKS.map(({ href, label, external, disabled }) =>
              disabled ? (
                <span
                  key={href}
                  aria-disabled="true"
                  className="font-ui pointer-events-none whitespace-nowrap text-sm font-medium text-zinc-400"
                >
                  {label}
                </span>
              ) : external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui cursor-pointer whitespace-nowrap text-sm font-medium text-zinc-700 transition-[color,transform] duration-150 ease-out hover:text-zinc-950 active:scale-[0.97] motion-reduce:active:scale-100"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="font-ui cursor-pointer whitespace-nowrap text-sm font-medium text-zinc-700 transition-[color,transform] duration-150 ease-out hover:text-zinc-950 active:scale-[0.97] motion-reduce:active:scale-100"
                >
                  {label}
                </Link>
              ),
            )}
          </motion.nav>

          <div className="flex items-center gap-2">
            <a
              href="https://calendly.com/ajay-yadav-neatlogs/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui group inline-flex h-10 cursor-pointer items-center gap-1.5 rounded bg-(--glass-bg) px-4 text-sm font-medium text-zinc-950 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-zinc-900/10 backdrop-blur-xs transition-[transform,background-color] duration-150 ease-out touch-manipulation hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#A4A8C5] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              Book a Demo
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-3.5 text-zinc-500 transition-transform duration-200 ease-out hover-hover:group-hover:translate-x-0.5 group-hover:text-zinc-900 motion-reduce:transition-none"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4 10a.75.75 0 0 1 .75-.75h8.69l-2.22-2.22a.75.75 0 1 1 1.06-1.06l3.5 3.5a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 1 1-1.06-1.06l2.22-2.22H4.75A.75.75 0 0 1 4 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <Link
              href="/waitlist"
              className="font-ui inline-flex h-10 cursor-pointer items-center justify-center rounded bg-zinc-950/80 px-5 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)] ring-1 ring-white/15 backdrop-blur-xs transition-[transform,background-color] duration-150 ease-out touch-manipulation hover:bg-zinc-950/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[#A4A8C5] active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded bg-(--glass-bg) text-zinc-900 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-zinc-900/10 backdrop-blur-xs transition-[background-color,transform] duration-150 hover-hover:hover:bg-white/8 active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#A4A8C5] md:hidden"
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
      </motion.div>
      </motion.div>

      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-[280ms] ease-snap md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`mx-4 -mt-1 rounded bg-(--glass-bg) ring-1 ring-zinc-900/10 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-md transition-[opacity,transform] duration-[220ms] ease-snap ${
              open
                ? "opacity-100 translate-y-0"
                : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-0.5 p-4">
              {NAV_LINKS.map(({ href, label, external, disabled }) =>
                disabled ? (
                  <span
                    key={href}
                    aria-disabled="true"
                    className="font-ui pointer-events-none rounded-lg px-3 py-3 text-[15px] font-medium text-zinc-400"
                  >
                    {label}
                  </span>
                ) : external ? (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="font-ui cursor-pointer rounded-lg px-3 py-3 text-[15px] font-medium text-zinc-700 transition-[color,background-color,transform] duration-150 ease-snap hover:bg-zinc-900/[0.04] hover:text-zinc-950 active:scale-[0.97] motion-reduce:active:scale-100"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="font-ui cursor-pointer rounded-lg px-3 py-3 text-[15px] font-medium text-zinc-700 transition-[color,background-color,transform] duration-150 ease-snap hover:bg-zinc-900/[0.04] hover:text-zinc-950 active:scale-[0.97] motion-reduce:active:scale-100"
                  >
                    {label}
                  </Link>
                ),
              )}
              <div className="mt-4 flex flex-col gap-2.5 border-t border-zinc-900/[0.06] pt-4">
                <a
                  href="https://calendly.com/ajay-yadav-neatlogs/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="font-ui inline-flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded border border-zinc-900/10 bg-white/80 px-5 text-sm font-medium text-zinc-900 transition-[background-color,transform] duration-150 ease-snap hover:bg-white active:scale-[0.97] motion-reduce:active:scale-100"
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
                </a>
                <Link
                  href="/waitlist"
                  onClick={() => setOpen(false)}
                  className="font-ui inline-flex h-11 cursor-pointer items-center justify-center rounded bg-zinc-950/80 px-6 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)] ring-1 ring-white/15 backdrop-blur-xs transition-[transform,background-color] duration-150 ease-snap touch-manipulation hover-hover:hover:bg-zinc-950/90 active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
                >
                  Join the Waitlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

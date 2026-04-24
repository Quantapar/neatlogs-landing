"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  easeOut,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { HeroIntro } from "./hero-intro";

// Parallax rule of thumb: farther = slower, closer = faster. `distance` is
// the pixel amount a layer moves UP as the user scrolls through the hero
// (scrollYProgress 0 → 1). Sky moves the least, ground the most.
// All layers derive from a single *spring-smoothed* scrollYProgress — one
// physics simulation drives every layer, which is cheaper than smoothing each
// value individually and matches Motion's parallax tutorial.
function useParallax(
  value: MotionValue<number>,
  distance: number,
  startAt: number = 0,
) {
  // Linear map past `startAt` — delayed layers pick up immediately, so by the
  // time the user has scrolled a touch past BG_START the parallax reads as
  // "normal" rather than easing in from a near-stop.
  return useTransform(value, [startAt, 1], [0, -distance]);
}

export function HeroScene() {
  const heroRef = useRef<HTMLDivElement>(null);
  // Respect users who request reduced motion — movement-heavy parallax can
  // trigger motion sickness. When reduced motion is on, every layer's distance
  // collapses to 0 so the scene is static but all other visuals (fog drift,
  // image content) are preserved.
  const shouldReduceMotion = useReducedMotion();
  const scale = shouldReduceMotion ? 0 : 1;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // One spring to rule them all — smooths the raw scroll into a soothing
  // physics-driven value. Higher damping + lower mass = tight follow with no
  // visible oscillation, which is what you want for scroll-linked animation.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 45,
    mass: 0.3,
    restDelta: 0.0005,
  });

  // Depth-graded speeds — ratios picked so each layer moves noticeably slower
  // than the one in front of it. Sky creeps, skyline floats, fog drifts.
  // Ground moves from scroll start with a lively travel; every other layer
  // stays locked until the ground is 20% through its travel, then catches up
  // gently (easeInOut) so by ~30% scroll the full parallax is back to its
  // normal rhythm. Until BG_START, the scroll effectively hijacks into a
  // reveal: only the land rises, covering everything behind it.
  // Ground rises by ~80% of the land image's height during the hijack.
  // 400px is roughly 80% of the visible portion of the image at a typical
  // desktop viewport — enough that the land reads as fully scrolled up
  // before the hijack releases and normal scrolling resumes.
  const groundDistance = 400;
  const BG_START = 0.6;
  const skyY = useParallax(smoothProgress, 8 * scale, BG_START);
  const warmDriftY = useParallax(smoothProgress, 26 * scale, BG_START);
  // Buildings + bridge get a subtle head-start parallax (no BG_START gate) so
  // the user sees some motion from scroll 0. Buildings move slowly; the bridge
  // moves a touch faster. Both eventually get covered as the land rises past.
  const skylineY = useParallax(smoothProgress, 42 * scale);
  const skylineMistY = useParallax(smoothProgress, 48 * scale);
  const blueDriftY = useParallax(smoothProgress, 50 * scale, BG_START);
  const midBayFogY = useParallax(smoothProgress, 65 * scale, BG_START);
  const mainBayFogY = useParallax(smoothProgress, 78 * scale, BG_START);
  const bridgeBaseDriftY = useParallax(smoothProgress, 90 * scale);
  const bridgeY = useParallax(smoothProgress, 105 * scale);
  const liveBridgeMistY = useParallax(smoothProgress, 115 * scale);

  // Ground completes its rise during the sticky phase, then locks. `easeOut`
  // smooths the approach to the lock point so the land decelerates gracefully
  // into its final position instead of slamming to a stop at BG_START (which
  // reads as jerk on fast scroll).
  const groundY = useTransform(
    smoothProgress,
    [0, BG_START, 1],
    [0, -groundDistance * scale, -groundDistance * scale],
    { ease: easeOut },
  );

  // Focus swap driven by scroll: at rest the land is softly blurred and the
  // bridge is sharp (bridge = focal point). As the land starts moving, blur
  // transfers onto the bridge so the land reads crisp and the bridge recedes.
  const groundBlurPx = useTransform(smoothProgress, [0, 0.12], [1.6, 0]);
  const groundFilter = useTransform(groundBlurPx, (v) => `blur(${v}px)`);
  const bridgeBlurPx = useTransform(smoothProgress, [0, 0.12], [0, 1.6]);
  const bridgeFilter = useTransform(bridgeBlurPx, (v) => `blur(${v}px)`);
  // Buildings pick up a softer blur once the land is on its way up — subtler
  // than the bridge's fade-out so the skyline doesn't disappear into the fog
  // before the bridge does.
  const skylineBlurPx = useTransform(smoothProgress, [0, 0.12], [0.5, 1.0]);
  const skylineFilter = useTransform(skylineBlurPx, (v) => `blur(${v}px)`);

  return (
    // Outer = 250vh scroll track. Inner `sticky top-0` pins for 150vh of scroll
    // (progress 0 → 0.6) during which the land rises 80% of its height while
    // the viewport stays locked. Once sticky releases, the page scrolls
    // normally — bridge/sky parallax into view as the inner slides upward.
    <div ref={heroRef} className="relative w-full h-[250vh]">
      <div className="sticky top-0 w-full min-h-[680px] overflow-hidden md:min-h-0 md:h-screen md:max-h-[920px]">
      {/* Layer 1: Sky wash — furthest back, slowest parallax. */}
      <motion.div
        className="absolute inset-0"
        style={{ y: skyY }}
        aria-hidden="true"
      >
        <Image
          src="/scene/sky-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Distant city skyline — small + far-away on the left, veiled by the fog layers that come after it. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[9%] right-[-4%] top-[43%] h-[42%] sm:left-[11%] sm:right-[-3%] sm:h-[41%] lg:left-[13%] lg:right-[-1%] lg:h-[40%]"
        style={{
          opacity: 0.55,
          filter: skylineFilter,
          y: skylineY,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/scene/skyline-v4.png"
          alt=""
          className="h-full w-full object-contain object-bottom-right"
        />
      </motion.div>

      {/* === LAYER 1: MAIN BAY FOG — wide, dense, sits under the bridge deck === */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[84%] h-[16%] mix-blend-screen motion-reduce:hidden motion-safe:animate-[fog-breath_10s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 95% 60% at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(240,244,250,0.6) 55%, rgba(255,255,255,0) 95%)",
          filter: "blur(7px)",
          y: mainBayFogY,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[83%] h-[15%] overflow-hidden mix-blend-screen motion-reduce:hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 15%, #000 35%, #000 65%, rgba(0,0,0,0.55) 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 15%, #000 35%, #000 65%, rgba(0,0,0,0.55) 85%, transparent 100%)",
          y: mainBayFogY,
        }}
      >
        <div className="flex h-full w-[200%] motion-safe:animate-[fog-drift_32s_ease-in-out_infinite]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center scale-y-125"
            style={{
              filter: "blur(3px) saturate(0.7) brightness(1.25) contrast(1.15)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center scale-y-125"
            style={{
              filter: "blur(3px) saturate(0.7) brightness(1.25) contrast(1.15)",
            }}
          />
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[86%] h-[14%] overflow-hidden mix-blend-screen motion-reduce:hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, #000 45%, #000 65%, rgba(0,0,0,0.45) 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, #000 45%, #000 65%, rgba(0,0,0,0.45) 85%, transparent 100%)",
          y: mainBayFogY,
        }}
      >
        <div
          className="flex h-full w-[200%] opacity-80 motion-safe:animate-[fog-drift_64s_ease-in-out_infinite]"
          style={{ animationDelay: "-22s", animationDirection: "reverse" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center -scale-x-100 scale-y-150"
            style={{
              filter: "blur(8px) saturate(0.6) brightness(1.22) contrast(1.1)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center -scale-x-100 scale-y-150"
            style={{
              filter: "blur(8px) saturate(0.6) brightness(1.22) contrast(1.1)",
            }}
          />
        </div>
      </motion.div>

      {/* === LAYER 2: SKYLINE MIST — thin, distant band behind the skyline base === */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[76%] h-[8%] mix-blend-screen motion-reduce:hidden motion-safe:animate-[fog-breath_14s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% 50%, rgba(255,255,255,0.6) 0%, rgba(240,244,250,0.35) 58%, rgba(255,255,255,0) 98%)",
          filter: "blur(6px)",
          y: skylineMistY,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[75%] h-[9%] overflow-hidden mix-blend-screen motion-reduce:hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 20%, #000 45%, #000 65%, rgba(0,0,0,0.45) 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 20%, #000 45%, #000 65%, rgba(0,0,0,0.45) 85%, transparent 100%)",
          y: skylineMistY,
        }}
      >
        <div
          className="flex h-full w-[200%] opacity-70 motion-safe:animate-[fog-drift_54s_ease-in-out_infinite]"
          style={{ animationDelay: "-18s" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center scale-y-100"
            style={{
              filter: "blur(4px) saturate(0.65) brightness(1.2) contrast(1.08)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center scale-y-100"
            style={{
              filter: "blur(4px) saturate(0.65) brightness(1.2) contrast(1.08)",
            }}
          />
        </div>
      </motion.div>

      {/* === LAYER 3: MID-BAY DRIFT === */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[79%] h-[10%] mix-blend-screen motion-reduce:hidden motion-safe:animate-[fog-breath_12s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(255,255,255,0.85) 0%, rgba(240,244,250,0.55) 55%, rgba(255,255,255,0) 98%)",
          filter: "blur(8px)",
          y: midBayFogY,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[78%] h-[13%] overflow-hidden mix-blend-screen motion-reduce:hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, #000 45%, #000 65%, rgba(0,0,0,0.5) 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, #000 45%, #000 65%, rgba(0,0,0,0.5) 85%, transparent 100%)",
          y: midBayFogY,
        }}
      >
        <div
          className="flex h-full w-[200%] motion-safe:animate-[fog-drift_42s_ease-in-out_infinite]"
          style={{ animationDelay: "-12s" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center scale-y-150"
            style={{
              filter: "blur(3px) saturate(0.7) brightness(1.28) contrast(1.1)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center scale-y-150"
            style={{
              filter: "blur(3px) saturate(0.7) brightness(1.28) contrast(1.1)",
            }}
          />
        </div>
      </motion.div>

      {/* === LAYER 3a: WARM CREAM DRIFT === */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[71%] h-[14%] overflow-hidden motion-reduce:hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.4) 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.4) 85%, transparent 100%)",
          y: warmDriftY,
        }}
      >
        <div
          className="h-full w-[200%] motion-safe:animate-[fog-drift_70s_linear_infinite]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(252,251,238,0.55) 20%, rgba(252,251,238,0.72) 50%, rgba(252,251,238,0.55) 80%, transparent 100%)",
            animationDelay: "-18s",
          }}
        />
      </motion.div>

      {/* === LAYER 3b: BRIDGE-BASE DRIFT === */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[88%] right-[2%] h-[8%] w-[60%] overflow-hidden mix-blend-screen motion-reduce:hidden sm:right-[4%] sm:w-[52%] lg:right-[6%] lg:w-[46%]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 22%, #000 50%, rgba(0,0,0,0.5) 80%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 10%, #000 22%, #000 80%, rgba(0,0,0,0.45) 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 22%, #000 50%, rgba(0,0,0,0.5) 80%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 10%, #000 22%, #000 80%, rgba(0,0,0,0.45) 92%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
          y: bridgeBaseDriftY,
        }}
      >
        <div
          className="flex h-full w-[200%] motion-safe:animate-[fog-drift_22s_ease-in-out_infinite]"
          style={{ animationDelay: "-6s", animationDirection: "reverse" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center scale-y-110"
            style={{
              filter: "blur(3px) saturate(0.7) brightness(1.25) contrast(1.1)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center scale-y-110"
            style={{
              filter: "blur(3px) saturate(0.7) brightness(1.25) contrast(1.1)",
            }}
          />
        </div>
      </motion.div>

      {/* Layer 4: Bridge */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[54%] right-[-6%] h-[43%] w-[64%] sm:right-[-4%] sm:w-[58%] lg:right-[-2%] lg:w-[54%]"
        style={{ y: bridgeY, filter: bridgeFilter }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/scene/bridge-v3.png"
          alt=""
          className="h-full w-full object-contain"
          style={{ objectPosition: "right bottom" }}
        />
      </motion.div>

      {/* === LAYER 4a: LEFT-END BRIDGE MIST — cloud wave that stretches from
           the bridge's trailing deck across the open sky, filling the gap that
           opens up when the ground parallaxes upward on scroll. === */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[77%] right-[30%] h-[12%] w-[68%] overflow-hidden mix-blend-screen motion-reduce:hidden sm:right-[32%] sm:w-[66%] lg:right-[34%] lg:w-[64%]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 6%, rgba(0,0,0,0.75) 18%, #000 32%, #000 58%, rgba(0,0,0,0.7) 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 6%, rgba(0,0,0,0.75) 18%, #000 32%, #000 58%, rgba(0,0,0,0.7) 78%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
          y: liveBridgeMistY,
        }}
      >
        <div
          className="flex h-full w-[200%] motion-safe:animate-[fog-drift_38s_linear_infinite]"
          style={{ animationDelay: "-14s", animationDirection: "reverse" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center"
            style={{ filter: "blur(1.8px) saturate(0.6) brightness(1.3)" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center"
            style={{ filter: "blur(1.8px) saturate(0.6) brightness(1.3)" }}
          />
        </div>
      </motion.div>

      {/* === LAYER 4b: LIVE BRIDGE MIST === */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[85%] right-[0%] h-[14%] w-[76%] overflow-hidden mix-blend-screen motion-reduce:hidden sm:right-[2%] sm:w-[68%] lg:right-[4%] lg:w-[60%]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 30%, #000 70%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 10%, #000 28%, #000 72%, rgba(0,0,0,0.5) 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 30%, #000 70%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 10%, #000 28%, #000 72%, rgba(0,0,0,0.5) 90%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
          y: liveBridgeMistY,
        }}
      >
        <div
          className="flex h-full w-[200%] motion-safe:animate-[fog-drift_24s_linear_infinite]"
          style={{ animationDelay: "-3s" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center scale-y-125"
            style={{
              filter:
                "blur(2.5px) saturate(0.75) brightness(1.32) contrast(1.18)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center scale-y-125"
            style={{
              filter:
                "blur(2.5px) saturate(0.75) brightness(1.32) contrast(1.18)",
            }}
          />
        </div>
      </motion.div>

      {/* === LAYER 4c: SKY-BLUE DRIFT === */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[76%] h-[13%] overflow-hidden motion-reduce:hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 85%, transparent 100%)",
          y: blueDriftY,
        }}
      >
        <div
          className="h-full w-[200%] motion-safe:animate-[fog-drift_95s_ease-in-out_infinite]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(168,204,230,0.2) 22%, rgba(176,212,235,0.28) 50%, rgba(168,204,230,0.2) 78%, transparent 100%)",
            animationDelay: "-30s",
            animationDirection: "reverse",
          }}
        />
      </motion.div>

      {/* Layer 5: Ground — hills in foreground, closest to viewer. Parallaxes
           fastest. Sits at z-20 so as it rises it covers the HeroIntro text
           (z-10) — the text hides behind the hills as the land scrolls up. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="/scene/land-v1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-48%] z-20 h-auto w-full"
        style={{
          y: groundY,
          filter: groundFilter,
          willChange: "filter, transform",
        }}
      />

      {/* SVG color-matrix filter kept for reuse. */}
      <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0">
        <defs>
          <filter id="defringe-purple" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="1 0.55 -0.5 0 0
                      0.1 0.85 -0.1 0 0.02
                      0 0.1 0.5 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Overlays — kept static (not parallaxed) so they stay locked to the viewport. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,rgba(250,250,250,0.32),transparent_72%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[32%] bg-[linear-gradient(to_bottom,transparent_0%,rgba(252,248,238,0.06)_18%,rgba(252,249,240,0.18)_34%,rgba(252,250,243,0.36)_50%,rgba(253,251,247,0.58)_66%,rgba(253,252,250,0.8)_80%,rgba(252,252,251,0.94)_92%,#FAFAFA_100%)]"
      />

      <HeroIntro scrollProgress={smoothProgress} />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { HeroIntro } from "./hero-intro";

// Parallax rule of thumb: farther = slower, closer = faster. Each layer's
// distance is the pixel amount it moves UP as the user scrolls through the
// hero (scrollYProgress 0 → 1). Sky moves the least, ground the most.
// All layers derive from a single *spring-smoothed* scrollYProgress — one
// physics simulation drives every layer, which matches the Motion tutorial's
// pattern and is cheaper than smoothing each value individually.
function useParallax(progress: MotionValue<number>, distance: number) {
  return useTransform(progress, [0, 1], [0, -distance]);
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
  // physics-driven value. Values lifted straight from the Motion tutorial.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Depth-graded speeds, sorted back → front (slow → fast). The layer closest
  // to the viewer (ground foliage) moves the most, the sky barely creeps.
  // Spread is wide (~14× between slowest and fastest) so the effect actually
  // reads — anything tighter feels static. Bridge + live-bridge-mist are
  // tethered to groundDistance so they drift as a cohesive group.
  const groundDistance = 290;
  const skyY = useParallax(smoothProgress, 20 * scale);
  const skylineY = useParallax(smoothProgress, (groundDistance - 45) * scale);
  const skylineMistY = useParallax(smoothProgress, (groundDistance - 30) * scale);
  const warmDriftY = useParallax(smoothProgress, 80 * scale);
  const blueDriftY = useParallax(smoothProgress, 115 * scale);
  const midBayFogY = useParallax(smoothProgress, 150 * scale);
  const mainBayFogY = useParallax(smoothProgress, 185 * scale);
  const bridgeBaseDriftY = useParallax(smoothProgress, (groundDistance - 80) * scale);
  const bridgeY = useParallax(smoothProgress, (groundDistance - 60) * scale);
  const liveBridgeMistY = useParallax(smoothProgress, (groundDistance - 35) * scale);
  const groundY = useParallax(smoothProgress, groundDistance * scale);

  // Bottom white guard — invisible at rest so the scene reads clean, fades in
  // as the ground parallaxes up so the sky's warm wash doesn't leak through
  // the newly-exposed bottom of the hero.
  const bottomGuardOpacity = useTransform(smoothProgress, [0, 0.3, 1], [0, 0, 1]);

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-[680px] overflow-hidden md:min-h-0 md:h-screen md:max-h-[920px]"
    >
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

      {/* Bottom white guard — sits in front of the sky. As scroll progresses
          and the ground parallaxes up, this fade-in masks the pink/cream sky
          wash that would otherwise leak through the exposed bottom. Every
          subsequent scene layer (fog, bridge, ground) paints on top of this,
          so nothing is obscured at rest. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
        style={{
          opacity: bottomGuardOpacity,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 42%, rgba(255,255,255,1) 82%)",
        }}
      />

      {/* Distant city skyline — small + far-away on the left, veiled by the fog layers that come after it. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[9%] right-[-4%] top-[43%] h-[42%] sm:left-[11%] sm:right-[-3%] sm:h-[41%] lg:left-[13%] lg:right-[-1%] lg:h-[40%]"
        style={{
          opacity: 0.55,
          filter: "blur(0.5px)",
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
              filter:
                "blur(3px) saturate(0.7) brightness(1.25) contrast(1.15)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center scale-y-125"
            style={{
              filter:
                "blur(3px) saturate(0.7) brightness(1.25) contrast(1.15)",
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
              filter:
                "blur(8px) saturate(0.6) brightness(1.22) contrast(1.1)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center -scale-x-100 scale-y-150"
            style={{
              filter:
                "blur(8px) saturate(0.6) brightness(1.22) contrast(1.1)",
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
              filter:
                "blur(4px) saturate(0.65) brightness(1.2) contrast(1.08)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center scale-y-100"
            style={{
              filter:
                "blur(4px) saturate(0.65) brightness(1.2) contrast(1.08)",
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
              filter:
                "blur(3px) saturate(0.7) brightness(1.28) contrast(1.1)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/clouds-strip.png"
            alt=""
            className="h-full w-1/2 object-cover object-center scale-y-150"
            style={{
              filter:
                "blur(3px) saturate(0.7) brightness(1.28) contrast(1.1)",
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
        style={{ y: bridgeY }}
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

      {/* Layer 5: Ground — hills in foreground, closest to viewer. Parallaxes fastest. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src="/scene/ground-v5.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-19%] h-auto w-full"
        style={{ y: groundY }}
      />

      {/* SVG color-matrix filter kept for reuse. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0"
      >
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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[10%] bg-[linear-gradient(to_bottom,transparent_0%,rgba(250,250,250,0.7)_70%,#FAFAFA_100%)]"
      />

      <HeroIntro />
    </div>
  );
}

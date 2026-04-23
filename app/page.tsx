import Image from "next/image";
import { Features } from "./features";
import { Flow } from "./flow";
import { HowItWorks } from "./how-it-works";
import { MediaPlayer } from "./media-player";
import { CycleLoop } from "./loop";
import { MeetNeatlogs } from "./meet-neatlogs";
import { Integrations } from "./integrations";
import { Reviews } from "./reviews";
import { Pricing } from "./pricing";
import { FAQ } from "./faq";
import Footer2 from "./footer";
import { HeroIntro } from "./hero-intro";
import { CTA } from "./cta";

export default function () {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-[#FAFAFA]">
      <div className="relative w-full min-h-[680px] overflow-hidden md:min-h-0 md:h-screen md:max-h-[920px]">
        {/* Layer 1: Sky wash — furthest back */}
        <Image
          src="/scene/sky-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Distant city skyline — small + far-away on the left, veiled by the fog layers that come after it. Transparent PNG so no blend mode needed. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[9%] right-[-4%] top-[40%] h-[42%] sm:left-[11%] sm:right-[-3%] sm:h-[41%] lg:left-[13%] lg:right-[-1%] lg:h-[40%]"
          style={{
            opacity: 0.55,
            filter: "blur(0.5px)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/skyline-v4.png"
            alt=""
            className="h-full w-full object-contain object-bottom-right"
          />
        </div>

        {/* Atmospheric fog — two distinct layers to match the reference:
             1. MAIN bay fog: starts at the foreground land, sits under the bridge deck, wide — veils the water + bridge base
             2. SKYLINE mist: thin band at the skyline base, higher up */}

        {/* === LAYER 1: MAIN BAY FOG — wide, dense, sits under the bridge deck === */}

        {/* Underglow — big soft haze that defines the band */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[84%] h-[16%] mix-blend-screen motion-reduce:hidden motion-safe:animate-[fog-breath_10s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 95% 60% at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(240,244,250,0.6) 55%, rgba(255,255,255,0) 95%)",
            filter: "blur(7px)",
          }}
        />

        {/* Front wisps — dense, fast drift */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[83%] h-[15%] overflow-hidden mix-blend-screen motion-reduce:hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 15%, #000 35%, #000 65%, rgba(0,0,0,0.55) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 15%, #000 35%, #000 65%, rgba(0,0,0,0.55) 85%, transparent 100%)",
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
        </div>

        {/* Back wisps — slow, mirrored, wider + softer for depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[86%] h-[14%] overflow-hidden mix-blend-screen motion-reduce:hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, #000 45%, #000 65%, rgba(0,0,0,0.45) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, #000 45%, #000 65%, rgba(0,0,0,0.45) 85%, transparent 100%)",
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
        </div>

        {/* === LAYER 2: SKYLINE MIST — thin, distant band behind the skyline base === */}

        {/* Underglow — subtle brighten around the skyline base */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[76%] h-[8%] mix-blend-screen motion-reduce:hidden motion-safe:animate-[fog-breath_14s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 100% 70% at 50% 50%, rgba(255,255,255,0.6) 0%, rgba(240,244,250,0.35) 58%, rgba(255,255,255,0) 98%)",
            filter: "blur(6px)",
          }}
        />

        {/* Thin wisps — slow drift at skyline level */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[75%] h-[9%] overflow-hidden mix-blend-screen motion-reduce:hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 20%, #000 45%, #000 65%, rgba(0,0,0,0.45) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 20%, #000 45%, #000 65%, rgba(0,0,0,0.45) 85%, transparent 100%)",
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
        </div>

        {/* === LAYER 3: MID-BAY DRIFT — fills the empty middle, stays fully off the bridge === */}

        {/* Underglow to brighten the middle band */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[79%] h-[10%] mix-blend-screen motion-reduce:hidden motion-safe:animate-[fog-breath_12s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(255,255,255,0.85) 0%, rgba(240,244,250,0.55) 55%, rgba(255,255,255,0) 98%)",
            filter: "blur(8px)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[78%] h-[13%] overflow-hidden mix-blend-screen motion-reduce:hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, #000 45%, #000 65%, rgba(0,0,0,0.5) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 20%, #000 45%, #000 65%, rgba(0,0,0,0.5) 85%, transparent 100%)",
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
        </div>

        {/* === LAYER 3a: WARM CREAM DRIFT — a soft #FCFBEE wash drifting across the bay for warmth. Pure CSS, linear drift for consistent speed. === */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[71%] h-[14%] overflow-hidden motion-reduce:hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.4) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.4) 85%, transparent 100%)",
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
        </div>

        {/* === LAYER 3b: BRIDGE-BASE DRIFT — small fog band under the bridge deck, rendered behind the bridge so the structure isn't brightened. Adds movement in the bridge zone. === */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[88%] right-[2%] h-[8%] w-[60%] overflow-hidden mix-blend-screen motion-reduce:hidden sm:right-[4%] sm:w-[52%] lg:right-[6%] lg:w-[46%]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 22%, #000 50%, rgba(0,0,0,0.5) 80%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 10%, #000 22%, #000 80%, rgba(0,0,0,0.45) 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 22%, #000 50%, rgba(0,0,0,0.5) 80%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 10%, #000 22%, #000 80%, rgba(0,0,0,0.45) 92%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
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
                filter:
                  "blur(3px) saturate(0.7) brightness(1.25) contrast(1.1)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scene/clouds-strip.png"
              alt=""
              className="h-full w-1/2 object-cover object-center scale-y-110"
              style={{
                filter:
                  "blur(3px) saturate(0.7) brightness(1.25) contrast(1.1)",
              }}
            />
          </div>
        </div>

        {/* Layer 4: Bridge — on top of all fog so the fog never brightens the bridge. Anchored to the right; right tower + deck end over the two pillars on the right hill. Ground layer (above bridge in z-order) clips the overlap. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[54%] right-[-6%] h-[43%] w-[64%] sm:right-[-4%] sm:w-[58%] lg:right-[-2%] lg:w-[54%]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/bridge-v3.png"
            alt=""
            className="h-full w-full object-contain"
            style={{ objectPosition: "right bottom" }}
          />
        </div>

        {/* === LAYER 4b: LIVE BRIDGE MIST — fog wisp that crosses IN FRONT of the bridge (rendered after it) for a living-scene feel. Mix-blend-screen so it reads as light fog, not a solid overlay. === */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[85%] right-[0%] h-[14%] w-[76%] overflow-hidden mix-blend-screen motion-reduce:hidden sm:right-[2%] sm:w-[68%] lg:right-[4%] lg:w-[60%]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 30%, #000 70%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 10%, #000 28%, #000 72%, rgba(0,0,0,0.5) 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 30%, #000 70%, transparent 100%), linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 10%, #000 28%, #000 72%, rgba(0,0,0,0.5) 90%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
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
        </div>

        {/* === LAYER 4c: SKY-BLUE DRIFT — very faint cool-blue wash that slowly drifts across the bay to suggest air movement behind the fog. Pure CSS, no texture. === */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[76%] h-[13%] overflow-hidden motion-reduce:hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.35) 85%, transparent 100%)",
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
        </div>

        {/* Layer 5: Ground — hills in foreground, closest to viewer. Using natural aspect ratio (h-auto) so the image isn't zoom-cropped by a forced container height. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/scene/ground-v5.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[-19%] h-auto w-full"
        />

        {/* SVG color-matrix filter: defringes AI magenta artifacts AND shifts the greens toward a warm olive (#A3A267). Red row picks up green to push foliage toward yellow-olive; blue row is heavily attenuated to kill purple cast and cool tones. */}
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

        {/* Soft top-down vignette to keep hero text readable */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,_rgba(250,250,250,0.32),_transparent_72%)]"
        />

        {/* Bottom blend into page bg */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[10%] bg-[linear-gradient(to_bottom,transparent_0%,rgba(250,250,250,0.7)_70%,#FAFAFA_100%)]"
        />

        <HeroIntro />
      </div>

      {/* <MediaPlayer /> — temporarily replaced by CycleLoop */}
      <CycleLoop />
      <MeetNeatlogs />
      <Features />
      <HowItWorks />
      <Flow />
      <Integrations />
      <Reviews />
      <Pricing />
      <CTA />
      <FAQ />
      <Footer2 />
    </main>
  );
}

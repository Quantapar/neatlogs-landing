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

        {/* Watercolor cloud wash — two continuous strip layers above the headline. Capped above top-[11%] so the text underneath stays readable. */}

        {/* Layer A: taller so the whole cloud body fits without cropping; feathered top + bottom so neither edge reads as a hard line. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[10%] h-[18%] overflow-hidden motion-reduce:hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 12%, #000 32%, #000 62%, rgba(0,0,0,0.55) 84%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 12%, #000 32%, #000 62%, rgba(0,0,0,0.55) 84%, transparent 100%)",
          }}
        >
          <div className="flex h-full w-[200%] opacity-80 motion-safe:animate-[clouds-drift_180s_linear_infinite]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scene/clouds-wash.png"
              alt=""
              className="h-full w-1/2 shrink-0 object-cover object-bottom"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scene/clouds-wash.png"
              alt=""
              className="h-full w-1/2 shrink-0 object-cover object-bottom"
            />
          </div>
        </div>

        {/* Layer B: offset speed + direction, mirrored, for parallax. Kept even thinner and higher so it never runs into the headline. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[7%] h-[14%] overflow-hidden motion-reduce:hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 25%, #000 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 25%, #000 70%, transparent 100%)",
          }}
        >
          <div
            className="flex h-full w-[200%] opacity-55 motion-safe:animate-[clouds-drift_140s_linear_infinite]"
            style={{ animationDelay: "-65s", animationDirection: "reverse" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scene/clouds-wash.png"
              alt=""
              className="h-full w-1/2 shrink-0 object-cover object-bottom -scale-x-100"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scene/clouds-wash.png"
              alt=""
              className="h-full w-1/2 shrink-0 object-cover object-bottom -scale-x-100"
            />
          </div>
        </div>

        {/* Distant city skyline — small + far-away on the left, veiled by the fog layers that come after it. Transparent PNG so no blend mode needed. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[4%] top-[58%] h-[10%] w-[38%] sm:left-[6%] sm:h-[11%] sm:w-[30%] lg:left-[8%] lg:h-[12%] lg:w-[26%]"
          style={{
            opacity: 0.45,
            filter: "blur(0.5px)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/skyline-v3.png"
            alt=""
            className="h-full w-full object-contain object-bottom"
          />
        </div>

        {/* Layer 3: Bridge — anchored to the right; right tower + deck end over the two pillars on the right hill. Ground layer (above bridge in z-order) clips the overlap. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[54%] right-[-6%] h-[30%] w-[88%] sm:right-[-4%] sm:w-[76%] lg:right-[-2%] lg:w-[68%]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/bridge-v2.png"
            alt=""
            className="h-full w-full object-contain object-right"
          />
        </div>

        {/* Atmospheric fog — three dense, fast-moving layers at the bridge foot */}

        {/* Soft underglow band — breathes opacity */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[71%] h-[16%] mix-blend-screen motion-reduce:hidden motion-safe:animate-[fog-breath_10s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(240,244,250,0.7) 40%, rgba(255,255,255,0) 80%)",
            filter: "blur(6px)",
          }}
        />

        {/* Front wisps — dense, fast left drift */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[70%] h-[15%] overflow-hidden mix-blend-screen motion-reduce:hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 18%, #000 40%, #000 65%, rgba(0,0,0,0.5) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 18%, #000 40%, #000 65%, rgba(0,0,0,0.5) 85%, transparent 100%)",
          }}
        >
          <div className="flex h-full w-[200%] motion-safe:animate-[fog-drift_75s_ease-in-out_infinite]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scene/clouds-strip.png"
              alt=""
              className="h-full w-1/2 object-cover object-center scale-y-125"
              style={{ filter: "blur(4px) saturate(0.6) brightness(1.15)" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scene/clouds-strip.png"
              alt=""
              className="h-full w-1/2 object-cover object-center scale-y-125"
              style={{ filter: "blur(4px) saturate(0.6) brightness(1.15)" }}
            />
          </div>
        </div>

        {/* Mid wisps — medium speed, mirrored, opposite direction */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[74%] h-[14%] overflow-hidden mix-blend-screen motion-reduce:hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 20%, #000 45%, #000 65%, rgba(0,0,0,0.45) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 20%, #000 45%, #000 65%, rgba(0,0,0,0.45) 85%, transparent 100%)",
          }}
        >
          <div
            className="flex h-full w-[200%] opacity-90 motion-safe:animate-[fog-drift_110s_ease-in-out_infinite]"
            style={{ animationDelay: "-43s", animationDirection: "reverse" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scene/clouds-strip.png"
              alt=""
              className="h-full w-1/2 object-cover object-center -scale-x-100 scale-y-110"
              style={{ filter: "blur(7px) saturate(0.5) brightness(1.18)" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scene/clouds-strip.png"
              alt=""
              className="h-full w-1/2 object-cover object-center -scale-x-100 scale-y-110"
              style={{ filter: "blur(7px) saturate(0.5) brightness(1.18)" }}
            />
          </div>
        </div>

        {/* Back wisps — softest & widest, slow, hangs lower */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[78%] h-[14%] overflow-hidden mix-blend-screen motion-reduce:hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 22%, #000 45%, #000 65%, rgba(0,0,0,0.4) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 22%, #000 45%, #000 65%, rgba(0,0,0,0.4) 85%, transparent 100%)",
          }}
        >
          <div
            className="flex h-full w-[200%] opacity-75 motion-safe:animate-[fog-drift_160s_ease-in-out_infinite]"
            style={{ animationDelay: "-22s" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scene/clouds-strip.png"
              alt=""
              className="h-full w-1/2 object-cover object-center scale-y-150"
              style={{ filter: "blur(12px) saturate(0.4) brightness(1.2)" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scene/clouds-strip.png"
              alt=""
              className="h-full w-1/2 object-cover object-center scale-y-150"
              style={{ filter: "blur(12px) saturate(0.4) brightness(1.2)" }}
            />
          </div>
        </div>

        {/* Layer 5: Ground — hills in foreground, closest to viewer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] sm:h-[52%]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/scene/ground-v2.png"
            alt=""
            className="h-full w-full object-cover object-bottom"
          />
        </div>

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

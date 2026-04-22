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
        <Image
          src="/sfbg-v11.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />

        {/* Puffy pinkish clouds — sparse, two layers with wide gaps between groups */}

        {/* Layer A: high, slow, smaller. Three clouds per seamless period with irregular gaps. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[8%] h-[13%] overflow-hidden motion-reduce:hidden"
        >
          <div className="flex h-full w-[400%] opacity-75 motion-safe:animate-[clouds-drift_220s_linear_infinite]">
            <div className="flex h-full w-1/2 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scene/clouds-puffy.png" alt="" className="h-full w-[18%] object-contain object-left scale-75" />
              <div className="w-[20%]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scene/clouds-puffy.png" alt="" className="h-full w-[14%] object-contain object-left scale-90 -scale-x-100" />
              <div className="w-[22%]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scene/clouds-puffy.png" alt="" className="h-full w-[16%] object-contain object-left scale-[0.85]" />
              <div className="w-[10%]" />
            </div>
            <div className="flex h-full w-1/2 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scene/clouds-puffy.png" alt="" className="h-full w-[18%] object-contain object-left scale-75" />
              <div className="w-[20%]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scene/clouds-puffy.png" alt="" className="h-full w-[14%] object-contain object-left scale-90 -scale-x-100" />
              <div className="w-[22%]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scene/clouds-puffy.png" alt="" className="h-full w-[16%] object-contain object-left scale-[0.85]" />
              <div className="w-[10%]" />
            </div>
          </div>
        </div>

        {/* Layer B: mid, medium speed, mirrored, offset gap so clouds don't align with layer A */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[16%] h-[15%] overflow-hidden motion-reduce:hidden"
        >
          <div
            className="flex h-full w-[500%] motion-safe:animate-[clouds-drift_150s_linear_infinite]"
            style={{ animationDelay: "-67s" }}
          >
            <div className="flex h-full w-1/2 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scene/clouds-puffy.png" alt="" className="h-full w-[16%] object-contain object-left" />
              <div className="w-[18%]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scene/clouds-puffy.png" alt="" className="h-full w-[14%] object-contain object-left -scale-x-100" />
              <div className="w-[20%]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scene/clouds-puffy.png" alt="" className="h-full w-[18%] object-contain object-left scale-95" />
              <div className="w-[14%]" />
            </div>
            <div className="flex h-full w-1/2 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scene/clouds-puffy.png" alt="" className="h-full w-[16%] object-contain object-left" />
              <div className="w-[18%]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scene/clouds-puffy.png" alt="" className="h-full w-[14%] object-contain object-left -scale-x-100" />
              <div className="w-[20%]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scene/clouds-puffy.png" alt="" className="h-full w-[18%] object-contain object-left scale-95" />
              <div className="w-[14%]" />
            </div>
          </div>
        </div>

        {/* Atmospheric fog at the foot of the bridge — soft underglow + two blurred wisp layers */}

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

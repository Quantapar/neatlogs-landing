import Image from "next/image";
import { Features } from "./features";
import { Flow } from "./flow";
import { HowItWorks } from "./how-it-works";
import { MediaPlayer } from "./media-player";
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
      <div className="relative w-full min-h-[680px] overflow-hidden md:min-h-0 md:aspect-3/2">
        <Image
          src="/hero-bg-bay.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,_rgba(250,250,250,0.42),_transparent_72%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[6%] bg-linear-to-b from-transparent to-[#FAFAFA]"
        />

        <HeroIntro />
      </div>

      <MediaPlayer />
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

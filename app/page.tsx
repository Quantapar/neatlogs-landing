import { Features } from "./features";
import { Flow } from "./flow";
import { HowItWorks } from "./how-it-works";
import { CycleLoop } from "./loop";
import { MeetNeatlogs } from "./meet-neatlogs";
import { Integrations } from "./integrations";
// import { Reviews } from "./reviews";
import { Pricing } from "./pricing";
import { FAQ } from "./faq";
import Footer2 from "./footer";
import { CTA } from "./cta";
import { HeroScene } from "./hero-scene";

export default function () {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-[#FAFAFA]">
      <HeroScene />

      {/* <MediaPlayer /> — temporarily replaced by CycleLoop */}
      <CycleLoop />
      <MeetNeatlogs />
      <Features />
      <HowItWorks />
      <Flow />
      <Integrations />
      {/* <Reviews /> */}
      <Pricing />
      <CTA />
      <FAQ />
      <Footer2 />
    </main>
  );
}

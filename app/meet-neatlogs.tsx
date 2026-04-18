"use client";

import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { type ReactNode, useRef } from "react";
import { Reveal } from "./reveal";

const ACCENT = "#E8462F";

export function MeetNeatlogs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative" }}
      className="bg-[#EAF3F6] pt-10 pb-24 sm:pt-14 sm:pb-28 lg:pt-16 lg:pb-36"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <span
          translate="no"
          className="text-2xl sm:text-3xl font-semibold tracking-tight"
          style={{ color: ACCENT }}
        >
          <Reveal progress={scrollYProgress} from={0.14} to={0.2}>
            Meet Neatlogs
          </Reveal>
        </span>

        <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-[72px]">
          <span className="text-zinc-500">
            <Reveal
              progress={scrollYProgress}
              from={0.2}
              to={0.3}
              style={{ color: "rgb(113,113,122)" }}
              baseColor="#ADB2B7"
            >
              Code got GitHub.
            </Reveal>
          </span>
          <br />
          <span className="text-zinc-500">
            <Reveal
              progress={scrollYProgress}
              from={0.3}
              to={0.38}
              style={{ color: "rgb(113,113,122)" }}
              baseColor="#ADB2B7"
            >
              Design got Figma.
            </Reveal>
          </span>
          <br />
          <span className="text-zinc-950">
            <Reveal
              progress={scrollYProgress}
              from={0.38}
              to={0.46}
              style={{ color: "rgb(9,9,11)" }}
              baseColor="#ADB2B7"
            >
              Agents get Neatlogs.
            </Reveal>
          </span>
        </h2>

        <div className="relative mt-20 sm:mt-24 lg:mt-28">
          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-8">
            <FolderCard
              number="#1"
              label="Code got"
              brand="GITHUB"
              image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop"
              icon="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            />
            <FolderCard
              number="#2"
              label="Design got"
              brand="FIGMA"
              image="https://images.unsplash.com/photo-1616140683647-81bd2cd7dccc?q=80&w=600&auto=format&fit=crop"
              icon="https://cdn.iconscout.com/icon/free/png-256/free-figma-3521426-2944870.png"
            />
            <FolderCard
              number="#3"
              label="Agents get"
              brand="NEATLOGS"
              image="https://i.pinimg.com/1200x/1e/e1/58/1ee15873cbfdbdf4d0a812538a2ae05b.jpg"
              icon="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            />
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-xl text-balance text-[15px] leading-relaxed text-zinc-600 sm:mt-16 sm:text-base">
          <Reveal progress={scrollYProgress} from={0.66} to={0.8}>
            One shared room for the people who build agents and the people who
            know what they&rsquo;re supposed to do.
          </Reveal>
        </p>
      </div>
    </section>
  );
}



function FolderCard({
  number,
  label,
  brand,
  image,
  icon,
}: {
  number: string;
  label: string;
  brand: string;
  image: string;
  icon: string;
}) {
  return (
    <div className="group relative w-full h-[260px] lg:h-[250px] xl:h-[280px] bg-[#0c0c0c] rounded-[48px] p-2 xl:p-3 shadow-2xl transition-all duration-500 ease-out hover:-translate-y-4 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
      {/* Inner Bounds Container */}
      <div className="relative w-full h-full rounded-[36px] xl:rounded-[40px] overflow-hidden bg-black isolate">
        
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full transition-transform duration-700">
          <img 
            src={image} 
            alt="Background" 
            className="w-full h-full object-cover opacity-100" 
          />
        </div>

        {/* Folder SVG Overlay */}
        {/* The viewBox corresponds exactly to the geometry of the gray folder section */}
        <svg 
          width="100%" 
          height="140" 
          viewBox="0 0 336 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-full z-10"
          preserveAspectRatio="none"
        >
          <path 
            d="M 0 36 Q 0 14 22 14 L 140 14 C 165 14 165 54 190 54 L 314 54 Q 336 54 336 76 L 336 180 L 0 180 Z" 
            fill="#222222" 
          />
        </svg>

        {/* Folder Content Texts */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between pt-[116px] lg:pt-[106px] xl:pt-[132px]">
          <div className="px-4 text-left w-full">
            <h2 className="text-white text-[16px] xl:text-[18px] font-semibold tracking-tight transition-all duration-300 opacity-80 group-hover:opacity-100">
              {number}
            </h2>
          </div>

          {/* Bottom Row Details */}
          <div className="flex items-baseline justify-between px-3 pb-2">
            <div className="flex flex-col items-start w-full">
              <p className="text-white text-[15px] xl:text-[18px] pl-1 -mb-1 xl:-mb-2 font-normal text-opacity-90">{label}</p>               
              <div className="flex w-full items-end justify-between pr-2">
                <span className="text-white opacity-25 text-[34px] lg:text-[34px] xl:text-[44px] font-bold tracking-tighter leading-none truncate">
                  {brand}
                </span>
                <img 
                  src={icon} 
                  alt="Icon" 
                  className="h-[36px] w-[36px] xl:h-[48px] xl:w-[48px] object-contain brightness-0  invert opacity-25 mb-1 lg:mb-2 shrink-0"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

const reviewsData = [
  {
      review: "I delegated our AI agent logs to Neatlogs so they take care our trace tracking.",
      name: "Harkirat Singh",
      imageUrl: "https://preview.redd.it/hello-r-jee-im-harkirat-singh-air-658-in-jee-iit-roorkee-v0-b369l2auvabd1.jpg?width=960&format=pjpg&auto=webp&s=1f89b2b36725a0079320eb15574b821178df81c6"
  },
 {
      review: "Flawless tracking of agent runs, a testament to deep context logging.",
      name: "Lucas Wright",
      imageUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop"
  },
  {
      review: "The direct balance between agent traces and code editors brings joy.",
      name: "Sarah Jenkins",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  },
  {
      review: "I love the shared trace workspace. debuggs flow apart from generic logs.",
      name: "David Kim",
      imageUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200&auto=format&fit=crop"
  },
  {
      review: "Simple yet powerful context sharing that perfectly highlight",
      name: "Anita Borg",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop"
  },
  {
      review: "Clean and minimal trace timelines keep the actual AI reasoning as the main hero.",
      name: "Oliver Reese",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  },
];

const ReviewCard = ({ data }: { data: typeof reviewsData[0] }) => {
  return (
      <div className="flex gap-2 scale-100">
          <div className="">
              <div className="flex">
                  <svg width="75" height="69" viewBox="0 0 75 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M75 23C51.804 23 33 41.804 33 65V69H0C6.76561e-07 30.8924 30.8924 6.76473e-07 69 0H75V23Z" fill="black" />
                  </svg>
                  <div className="text-left z-10 w-auto">
                      <h2 className="text-1xl  leading-[1.08] font-light fonte tracking-tight text-[#0A0A0A] m-2 max-w-[19ch]">
                          {data.review}
                      </h2>
                  </div>
              </div>
              <div className="flex gap-2">
                  <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                      <rect width="75" height="75" fill="black" />
                  </svg>
                  <div>
                      <div className="flex gap-2">
                      <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                          <rect width="75" height="75" fill="black" />
                      </svg>
                      <div className="w-[75px] h-[75px] shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                              alt={data.name}
                              src={data.imageUrl}
                              className="w-full h-full object-cover saturate-0 rounded-none mix-blend-multiply"
                          />
                          <div className="text-sm leading-none text-left mt-1 font-medium tracking-tight text-[#0A0A0A]">{data.name}</div>
                      </div>
                      </div>
                      <svg width="75" height="69" viewBox="0 0 75 69" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                          <path d="M0 46C23.196 46 42 27.196 42 4V0L75 0C75 38.1077 44.1077 69 6 69H0V46Z" fill="black" />
                      </svg>
                  </div>
              </div>

          </div>
      </div>
  );
};

export const Reviews = () => {
  const reducedMotion = useReducedMotion();
  return (
      <section className="w-full bg-[#FAFAFA] pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 md:px-8 flex flex-col items-center overflow-hidden border-t border-zinc-900/5">
          <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
              <span className="font-ui text-[12px] font-medium uppercase tracking-[0.14em] text-zinc-600">
                REVIEWS
              </span>
              <h2 className="mt-4 text-balance text-4xl font-medium tracking-tighter text-zinc-950 sm:text-5xl md:text-[56px]">
                  Don't just take our word for it
              </h2>
          </div>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <motion.div
                  className="flex gap-16 md:gap-24 w-max"
                  animate={reducedMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
                  transition={
                      reducedMotion
                          ? { duration: 0 }
                          : { duration: 40, repeat: Infinity, ease: "linear" }
                  }
              >
                  {[...reviewsData, ...reviewsData].map((data, idx) => (
                      <div
                          key={idx}
                          aria-hidden={idx >= reviewsData.length}
                          className="shrink-0 flex items-center justify-center"
                      >
                          <ReviewCard data={data} />
                      </div>
                  ))}
              </motion.div>
          </div>
      </section>
  );
};

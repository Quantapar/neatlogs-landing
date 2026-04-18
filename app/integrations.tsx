"use client";

import { motion } from "motion/react";

const APPS = [
  {
    col: 1, row: 0,
    name: "Slack",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.044 11.235c-1.353 0-2.45-1.097-2.45-2.45s1.097-2.45 2.45-2.45 2.45 1.097 2.45 2.45v2.45H5.044zm2.45 2.45c0-1.353-1.097-2.45-2.45-2.45s-2.45 1.097-2.45 2.45 1.097 2.45 2.45 2.45h2.45v-2.45z" fill="#E01E5A"/>
        <path d="M12.765 5.044c0-1.353 1.097-2.45 2.45-2.45s2.45 1.097 2.45 2.45-1.097 2.45-2.45 2.45h-2.45V5.044zm-2.45 2.45c1.353 0 2.45-1.097 2.45-2.45s-1.097-2.45-2.45-2.45-2.45 1.097-2.45 2.45v2.45h2.45z" fill="#36C5F0"/>
        <path d="M18.956 12.765c1.353 0 2.45 1.097 2.45 2.45s-1.097 2.45-2.45 2.45-2.45-1.097-2.45-2.45v-2.45h2.45zm-2.45-2.45c0 1.353 1.097 2.45 2.45 2.45s2.45-1.097 2.45-2.45-1.097-2.45-2.45-2.45h-2.45v2.45z" fill="#2EB67D"/>
        <path d="M11.235 18.956c0 1.353-1.097 2.45-2.45 2.45s-2.45-1.097-2.45-2.45 1.097-2.45 2.45-2.45h2.45v2.45zm2.45-2.45c-1.353 0-2.45 1.097-2.45 2.45s1.097 2.45 2.45 2.45 2.45-1.097 2.45-2.45v-2.45h-2.45z" fill="#ECB22E"/>
      </svg>
    )
  },
  {
    col: 3, row: 0,
    name: "Linear",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#5E6AD2"/>
        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#5E6AD2"/>
      </svg>
    )
  },
  {
    col: 5, row: 0,
    name: "OpenAI",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5l-10 14M22 12H2M19 19L5 5M12 2a10 10 0 0 1 10 10H12z"/>
      </svg>
    )
  },
  {
    col: 0, row: 1,
    name: "Notion",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 4.5H4.5v15h15v-15z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 8v8l6-8v8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    col: 2, row: 1,
    name: "GitHub",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    )
  },
  {
    col: 4, row: 1,
    name: "Cursor",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l7.07 17 2.51-7.39L21 11.07z"/>
      </svg>
    )
  },
  {
    col: 6, row: 1,
    name: "Cohere",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    )
  },
  {
    col: 1, row: 2,
    name: "Jira",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12z" stroke="#2684FF" strokeWidth="1.5"/>
        <path d="M12 6v12M8 10l4-4 4 4" stroke="#2684FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    col: 3, row: 2,
    name: "LangChain",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.53 1.53" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.53-1.53" />
      </svg>
    )
  },
  {
    col: 5, row: 2,
    name: "Google Workspace",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.35 11.1h-9.17v2.73h5.51c-.33 1.64-1.87 2.73-3.64 2.73-2.19 0-3.96-1.74-3.96-3.96s1.77-3.96 3.96-3.96c.94 0 1.8.34 2.45.92l2.09-2.09A6.74 6.74 0 0 0 12.18 5c-3.8 0-6.88 3.08-6.88 6.88s3.08 6.88 6.88 6.88c3.55 0 6.45-2.58 6.88-6.04h.02c.07-.46.12-.93.12-1.4 0-.41-.05-.81-.13-1.22z" fill="#4285F4"/>
      </svg>
    )
  }
];

export function Integrations() {
  const ROWS = 3;
  const COLS = 7;
  
  return (
    <section id="integrations" className="relative overflow-hidden bg-[#EAF3F6] pt-8 pb-24 sm:pt-12 sm:pb-32">
      {/* Decorative background grid (optional but gives that Tailark feel) */}
      <div 
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />
      
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-zinc-600">
          INTEGRATIONS
          </span>
          <h2 className="mt-4 text-balance text-4xl font-medium tracking-tight text-zinc-950 sm:text-5xl">
            Fits into the way your team works
          </h2>
          <p className="mt-4 text-pretty text-zinc-600 sm:text-lg">
            Neatlogs plugs into your existing stack — from agent frameworks and notifications to tickets and coding agents.
          </p>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="relative isolate">
            <div 
              className="grid gap-px bg-zinc-900/5 p-px"
              style={{
                gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                width: '100%',
                maxWidth: '700px'
              }}
            >
              {Array.from({ length: ROWS * COLS }).map((_, i) => {
                const r = Math.floor(i / COLS);
                const c = i % COLS;
                const app = APPS.find(a => a.col === c && a.row === r);
                
                return (
                  <div 
                    key={i} 
                    className="relative flex aspect-square items-center justify-center bg-[#EAF3F6] sm:w-[80px]"
                  >
                    {app ? (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-14 w-14 sm:h-16 sm:w-16 cursor-pointer items-center justify-center rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)] ring-1 ring-zinc-900/5 transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                        title={app.name}
                      >
                        {app.icon}
                      </motion.div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

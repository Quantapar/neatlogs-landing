"use client";

import { motion } from "motion/react";

const APPS = [
  {
    col: 1,
    row: 0,
    name: "Slack",
    icon: (
      <img
        src="/slack.png"
        alt="Slack"
        width={28}
        height={28}
        className="rounded-md object-contain"
      />
    ),
  },
  {
    col: 3,
    row: 0,
    name: "Linear",
    icon: (
      <img
        src="/linear.png"
        alt="Linear"
        width={28}
        height={28}
        className="rounded-md object-contain"
      />
    ),
  },
  {
    col: 5,
    row: 0,
    name: "OpenAI",
    icon: (
      <img
        src="/openai.png"
        alt="OpenAI"
        width={28}
        height={28}
        className="rounded-md object-contain"
      />
    ),
  },
  {
    col: 0,
    row: 1,
    name: "Notion",
    icon: (
      <img
        src="/notion.png"
        alt="Notion"
        width={28}
        height={28}
        className="rounded-md object-contain"
      />
    ),
  },
  {
    col: 2,
    row: 1,
    name: "GitHub",
    icon: (
      <img
        src="/github.png"
        alt="GitHub"
        width={28}
        height={28}
        className="rounded-md object-contain"
      />
    ),
  },
  {
    col: 4,
    row: 1,
    name: "Cursor",
    icon: (
      <img
        src="/cursor.png"
        alt="Cursor AI"
        width={28}
        height={28}
        className="rounded-md object-contain"
      />
    ),
  },
  {
    col: 6,
    row: 1,
    name: "Anthropic",
    icon: (
      <img
        src="/anthropic.png"
        alt="Anthropic"
        width={28}
        height={28}
        className="rounded-md object-contain"
      />
    ),
  },
  {
    col: 1,
    row: 2,
    name: "Jira",
    icon: (
      <img
        src="/jira.png"
        alt="Jira"
        width={28}
        height={28}
        className="rounded-md object-contain"
      />
    ),
  },
  {
    col: 3,
    row: 2,
    name: "LangChain",
    icon: (
      <img
        src="/langchain.png"
        alt="LangChain"
        width={28}
        height={28}
        className="rounded-md object-contain"
      />
    ),
  },
  {
    col: 5,
    row: 2,
    name: "Google",
    icon: (
      <img
        src="/google.png"
        alt="Google"
        width={28}
        height={28}
        className="rounded-md object-contain"
      />
    ),
  },
];

export function Integrations() {
  const ROWS = 3;
  const COLS = 7;

  return (
    <section
      id="integrations"
      className="relative overflow-hidden bg-[#FAFAFA] pt-8 pb-24 sm:pt-12 sm:pb-32"
    >
      {/* Decorative background grid (optional but gives that Tailark feel) */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span
            translate="no"
            className="font-ui text-2xl sm:text-3xl font-semibold tracking-tight"
            style={{ color: "#E9462E" }}
          >
            Integrations
          </span>
          <h2 className="mt-5 text-balance text-4xl font-medium tracking-tighter text-zinc-950 sm:text-5xl md:text-[56px]">
            Fits into the way your team works
          </h2>
          <p className="font-ui mt-4 text-pretty text-zinc-600 sm:text-lg">
            Neatlogs plugs into your existing stack — from agent frameworks and
            notifications to tickets and coding agents.
          </p>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="relative isolate">
            <div
              className="grid gap-px bg-zinc-900/5 p-px"
              style={{
                gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                width: "100%",
                maxWidth: "700px",
              }}
            >
              {Array.from({ length: ROWS * COLS }).map((_, i) => {
                const r = Math.floor(i / COLS);
                const c = i % COLS;
                const app = APPS.find((a) => a.col === c && a.row === r);

                return (
                  <div
                    key={i}
                    className="relative flex aspect-square items-center justify-center bg-[#FAFAFA] sm:w-[80px]"
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

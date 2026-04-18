"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface FAQItemProps {
    id: string;
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
    index: number;
}

const faqs = [
    {
        question: "What frameworks and languages do you support?",
        answer: "Neatlogs is built primarily for Python and TypeScript agentic workflows. We have out-of-the-box integrations for LangGraph, CrewAI, LangChain, Vercel AI SDK, and OpenAI Agents, but our decoupled REST API allows tracing anything."
    },
    {
        question: "How is Neatlogs different from standard APM tools like Datadog?",
        answer: "Standard tools map microservices and infrastructure. Neatlogs maps reasoning. We render LLM tool calls, nested agent executions, and prompt inputs natively, so domain experts can read exactly what the AI did without writing SQL or grokking JSON blobs."
    },
    {
        question: "Can non-technical team members actually use this?",
        answer: "Yes, that's the entire point. We abstract the raw execution traces into readable timelines. Product managers and QA can freely inspect runs, flag weird behavior, and leave comments directly on the trace for engineering to fix."
    },
    {
        question: "Is our agent execution data safe and private?",
        answer: "Absolutely. We offer secure cloud hosting with strict data siloing. For Enterprise and Custom tiers, we provide VPC peering, bring-your-own-cloud (BYOC), and on-premise deployment options for strict data residency requirements."
    }
];

const FAQItem = ({
    question,
    answer,
    isOpen,
    onClick,
    index,
}: FAQItemProps) => {
    return (
        <div
            className={`mb-3 overflow-hidden rounded-[24px] ring-1 transition-[background-color,shadow,box-shadow] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform ${isOpen
                ? "bg-white/90 backdrop-blur-3xl ring-zinc-900/10 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_12px_28px_-12px_rgba(12,20,40,0.06)]"
                : "bg-white/60 backdrop-blur-3xl ring-zinc-900/5 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_14px_36px_-20px_rgba(12,20,40,0.08)] hover:bg-white/90 hover:ring-zinc-900/10"
                }`}
        >
            <button
                onClick={onClick}
                className="group relative w-full flex items-center justify-between text-left px-5 py-5 sm:px-6 sm:py-6 gap-4 cursor-pointer transition-transform duration-[200ms] ease-out active:scale-[0.99] touch-manipulation"
            >
                <div className="flex gap-4">
                    <span
                        className={`text-[11px] font-mono font-bold uppercase tracking-widest mt-1 transition-colors duration-300 ${isOpen ? "text-zinc-950" : "text-zinc-400 group-hover:text-zinc-500"
                            }`}
                    >
                        {(index + 1).toString().padStart(2, "0")}
                    </span>

                    <span
                        className={`text-[16px] sm:text-[18px] font-semibold tracking-tight leading-snug transition-colors duration-300 ${
                            isOpen ? "text-zinc-950" : "text-zinc-800"
                        }`}
                    >
                        {question}
                    </span>
                </div>

                <div
                    className={`flex items-center justify-center shrink-0 size-8 sm:size-9 rounded-full ring-1 transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen
                            ? "bg-zinc-950 ring-zinc-950 rotate-180 scale-[1.04] shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                            : "bg-zinc-900/[0.03] ring-zinc-900/10 group-hover:bg-zinc-900/[0.06] group-hover:scale-[1.04]"
                        }`}
                >
                    <svg
                        viewBox="0 0 24 24"
                        className={`size-4 transition-colors duration-[400ms] ${isOpen ? "stroke-white" : "stroke-zinc-600"
                            }`}
                        fill="none"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                    </svg>
                </div>
            </button>

            <div
                className={`grid transition-[grid-template-rows,opacity] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <div
                        className="px-5 pb-6 sm:px-6 sm:pb-7 pl-[44px] sm:pl-[48px] text-[14.5px] sm:text-[15px] leading-relaxed text-zinc-600 max-w-3xl"
                    >
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const FAQ = () => {
    const [openId, setOpenId] = useState<number | null>(null)
    const sectionRef = useRef<HTMLDivElement>(null)

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section
            id="faq"
            ref={sectionRef}
            className="bg-[#EAF3F6] py-20 sm:py-24 lg:py-32 w-full"
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="mx-auto max-w-6xl px-6 flex flex-col lg:flex-row gap-12 lg:gap-24">
                {/* Desktop Sidebar */}
                <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
                    <span className="text-[12px] font-medium uppercase tracking-[0.15em] text-zinc-600">
                      FAQ
                    </span>
                    <h2 className="mt-5 -ml-[2px] text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-zinc-950 sm:text-5xl md:text-[52px]">
                        Common <br />
                        <span className="text-zinc-500">Questions.</span>
                    </h2>

                    <p className="mt-6 max-w-[300px] text-pretty text-[15px] leading-relaxed text-zinc-600 sm:text-base">
                        You've got questions about how Neatlogs drops into your workflow. Here are the answers.
                    </p>
                </div>

                {/* FAQ Content */}
                <div className="lg:w-2/3 flex flex-col">
                    <div className="flex flex-col">
                        {faqs.map((item, idx) => (
                            <FAQItem
                                key={idx}
                                id={`faq-${idx}`}
                                index={idx}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openId === idx}
                                onClick={() => setOpenId(openId === idx ? null : idx)}
                            />
                        ))}
                    </div>

                    <div className="mt-12 rounded-[32px] ring-1 ring-zinc-900/5 bg-white/60 backdrop-blur-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_14px_36px_-20px_rgba(12,20,40,0.08)]">
                        <div>
                            <h3 className="text-[20px] font-semibold text-zinc-950 tracking-tight">
                                Still need help?
                            </h3>
                            <p className="mt-1.5 text-[14.5px] text-zinc-600">
                                We're happy to jump on a call and dive into your stack.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="group inline-flex h-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-6 text-[14.5px] font-medium text-white shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset,0_1px_2px_rgba(0,0,0,0.18)] transition-all duration-[200ms] ease-out hover:bg-zinc-800 active:scale-[0.97]"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

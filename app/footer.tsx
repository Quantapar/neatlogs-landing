import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer2() {
    return (
        <footer className="relative overflow-hidden min-h-[500px] flex flex-col justify-between bg-[#FAFAFA]">

            <div className="relative z-10 w-full pt-16 px-6 md:px-12 flex-1 flex flex-col">
                <div className="flex flex-row justify-between items-end w-full mb-8">
                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] text-black font-medium tracking-tighter leading-none">
                        Workspace.
                    </h2>
                    <p className="text-base sm:text-lg md:text-2xl text-black/80 font-normal tracking-tight pb-1 md:pb-3">
                        for your ai agents.
                    </p>
                </div>

                <div className="w-full h-[1px] bg-black/10 mb-6" />

                <div className="flex flex-col md:flex-row justify-between items-start text-[10px] sm:text-xs tracking-[0.15em] font-semibold uppercase text-black/70 font-mono">
                    <div className="flex flex-col gap-3 mb-6 md:mb-0">
                        <div className="flex gap-4 items-center">
                            <a href="#" aria-label="LinkedIn" className="cursor-pointer transition-transform duration-150 active:scale-[0.97] motion-reduce:active:scale-100">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/3840px-LinkedIn_icon.svg.png" alt="LinkedIn" className="w-4 h-4 object-contain" />
                            </a>
                            <a href="#" aria-label="X (Twitter)" className="cursor-pointer transition-transform duration-150 active:scale-[0.97] motion-reduce:active:scale-100">
                                <img src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?w=360" alt="X (Twitter)" className="w-4 h-4 object-contain" />
                            </a>
                            <a href="#" aria-label="GitHub" className="cursor-pointer transition-transform duration-150 active:scale-[0.97] motion-reduce:active:scale-100">
                                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="w-4 h-4 object-contain" />
                            </a>
                        </div>
                        <span className="text-[8px] sm:text-[9px] opacity-50 tracking-wider">
                            © NEATLOGS INC. 2026
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-x-8 gap-y-4 pt-1">
                        <a href="#" className="cursor-pointer hover:text-black flex items-center gap-1.5 group transition-transform duration-150 active:scale-[0.97] motion-reduce:active:scale-100">Features <ArrowUpRight className="w-3.5 h-3.5 text-zinc-900 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} /></a>
                        <a href="#" className="cursor-pointer hover:text-black flex items-center gap-1.5 group transition-transform duration-150 active:scale-[0.97] motion-reduce:active:scale-100">Pricing <ArrowUpRight className="w-3.5 h-3.5 text-zinc-900 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} /></a>
                        <a href="#" className="cursor-pointer hover:text-black flex items-center gap-1.5 group transition-transform duration-150 active:scale-[0.97] motion-reduce:active:scale-100">Docs <ArrowUpRight className="w-3.5 h-3.5 text-zinc-900 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} /></a>
                        <a href="#" className="cursor-pointer hover:text-black flex items-center gap-1.5 group transition-transform duration-150 active:scale-[0.97] motion-reduce:active:scale-100">Contact <ArrowUpRight className="w-3.5 h-3.5 text-zinc-900 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} /></a>
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-full flex justify-center mt-auto translate-y-[9%]">
                <h1 className="font-pixel text-[29vw] text-black font-medium leading-[0.75] tracking-tighter pointer-events-none">
                    neatlogs
                </h1>
            </div>
        </footer>
    );
}

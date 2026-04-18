"use client";

import { memo, type ReactNode } from "react";

interface LayoutWrapperProps {
    children: ReactNode;
    className?: string;
    showBorderAccents?: boolean;
}

const SideParam = {
    left: { pos: "left-0", borderPos: "-left-px", deg: "45deg" },
    right: { pos: "right-0", borderPos: "-right-px", deg: "-45deg" },
} as const;

const SideDecoration = memo(function SideDecoration({ side }: { side: "left" | "right" }) {
    const { pos, borderPos, deg } = SideParam[side];
    const innerLinePos = side === "left" ? "left-10" : "right-10";

    return (
        <>
            <div
                className={`absolute top-0 bottom-0 ${borderPos} w-px hidden lg:block`}
                style={{
                    background: "rgba(0,0,0,0.05)"
                }}
                aria-hidden="true"
            />

            <div
                className={`absolute top-0 bottom-0 w-10 ${pos} hidden lg:block overflow-hidden pointer-events-none z-50`}
                style={{
                    maskImage: "linear-gradient(to bottom, black 100%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 100%, transparent 100%)"
                }}
                aria-hidden="true"
            >
                <div
                    className="absolute inset-0 opacity-80"
                    style={{
                        backgroundImage: `repeating-linear-gradient(${deg}, transparent, transparent 8px, rgba(0,0,0,0.05) 8px, rgba(0,0,0,0.05) 9px)`
                    }}
                />
            </div>

            <div
                className={`absolute top-0 bottom-0 ${innerLinePos} w-px hidden lg:block z-50`}
                style={{
                    background: "rgba(0,0,0,0.05)"
                }}
                aria-hidden="true"
            />
        </>
    );
});

SideDecoration.displayName = "SideDecoration";

const HorizontalSeparator = memo(function HorizontalSeparator() {
    return (
        <div className="w-full h-10 relative border-y border-black/5 hidden lg:block overflow-hidden">
            <div
                className="absolute inset-0 opacity-80"
                style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,0.05) 8px, rgba(0,0,0,0.05) 9px)`
                }}
            />
        </div>
    );
});
HorizontalSeparator.displayName = "HorizontalSeparator";

const LayoutWrapper = memo(function LayoutWrapper({
    children,
    className = "",
    showBorderAccents = true,
}: LayoutWrapperProps) {
    return (
        <div className={`relative mx-auto max-w-7xl ${className}`.trim()}>
            {showBorderAccents && (
                <>
                    <SideDecoration side="left" />
                    <SideDecoration side="right" />
                </>
            )}

            <div className="px-4 sm:px-6 lg:px-10">{children}</div>
        </div>
    );
});

LayoutWrapper.displayName = "LayoutWrapper";

export { LayoutWrapper, HorizontalSeparator };
export type { LayoutWrapperProps };

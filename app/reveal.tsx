"use client";

import { motion, type MotionValue, useTransform } from "motion/react";
import { type ReactNode } from "react";

export function Reveal({
  children,
  progress,
  from,
  to,
  style,
  baseColor,
}: {
  children: string;
  progress: MotionValue<number>;
  from: number;
  to: number;
  style?: React.CSSProperties;
  baseColor?: string;
}) {
  const parts = children.split(/(\s+)/).filter((p) => p.length > 0);
  const wordCount = parts.filter((p) => !/^\s+$/.test(p)).length;
  const range = to - from;
  let wordIdx = 0;

  return (
    <>
      {parts.map((part, i) => {
        if (/^\s+$/.test(part)) return <span key={i}>{part}</span>;
        const threshold = from + ((wordIdx + 0.5) / wordCount) * range;
        wordIdx += 1;
        return (
          <Word
            key={i}
            threshold={threshold}
            progress={progress}
            style={style}
            baseColor={baseColor}
          >
            {part}
          </Word>
        );
      })}
    </>
  );
}

function Word({
  children,
  progress,
  threshold,
  style,
  baseColor,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  threshold: number;
  style?: React.CSSProperties;
  baseColor?: string;
}) {
  const opacity = useTransform(progress, (v) => (v >= threshold ? 1 : 0.5));
  const finalColor = (style?.color as string | undefined) ?? "";
  const color = useTransform(progress, (v) =>
    v >= threshold ? finalColor : baseColor ?? finalColor
  );
  const useColor = Boolean(baseColor && finalColor);
  return (
    <motion.span
      style={
        useColor ? { ...style, color, opacity } : { ...style, opacity }
      }
    >
      {children}
    </motion.span>
  );
}

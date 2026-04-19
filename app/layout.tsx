import type { Metadata } from "next";
import { Figtree, Instrument_Serif, Lora, Space_Grotesk } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { Navbar } from "./navbar";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neatlogs",
  description: "Neatlogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} ${lora.variable} ${figtree.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="relative min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistPixelSquare, GeistPixelCircle } from "geist/font/pixel";
import { Navbar } from "./navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neatlogs",
  description: "Neatlogs",
  other: {
    "darkreader-lock": "true",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#FAFAFA",
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
      className={`${GeistSans.variable} ${GeistPixelSquare.variable} ${GeistPixelCircle.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="relative min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

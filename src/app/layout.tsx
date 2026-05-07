// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// Opción A (simple): aplicar la fuente con className
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  // si prefieres mapearla a Tailwind como "font-sans", añade:
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Computational Simulations — Maria Fernanda Juarez",
  description: "Portfolio of atomistic and interfacial simulations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-full">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground palette-amber`}>
        <div className="relative z-0 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-from)] via-[var(--bg-via)] to-[var(--bg-to)]" />
      
            <div
              className="absolute -top-40 -right-32 rounded-full blur-3xl"
              style={{
                width: "var(--glow-a-size)",
                height: "var(--glow-a-size)",
                background: "var(--glow-a)",
                opacity: "var(--glow-a-opacity)",
              }}
            />
      
            <div
              className="absolute bottom-0 -left-32 rounded-full blur-3xl"
              style={{
                width: "var(--glow-b-size)",
                height: "var(--glow-b-size)",
                background: "var(--glow-b)",
                opacity: "var(--glow-b-opacity)",
              }}
            />
          </div>
      
          <SiteHeader />
      
          <main>
            {children}
          </main>
      
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

import { JetBrains_Mono } from "next/font/google";
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });


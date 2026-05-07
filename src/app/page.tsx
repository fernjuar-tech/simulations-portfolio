"use client"

import Link from "next/link";
import React, { useMemo, useState, useEffect } from "react";
import { LayoutGrid, BarChart3, GraduationCap, UserRound } from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const sections = [
  {
    title: "Research & Simulations",
    description:
      "Atomistic trajectories, interfacial dynamics, and computational simulations.",
    href: "/simulations",
    icon: LayoutGrid,
  },
  {
    title: "Data & Computational Projects",
    description:
      "Data-driven analysis of scientific simulations using Python and visualization tools.",
    href: "/data-projects",
    icon: BarChart3,
  },
  {
    title: "Teaching & Interactive Tools",
    description:
      "Interactive demos and educational tools for scientific data analysis and teaching.",
    href: "/tools",
    icon: GraduationCap,
  },
  {
    title: "About",
    description:
      "Scientific profile, CV, publications, links, and selected personal interests.",
    href: "/about",
    icon: UserRound,
  },
];

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <main className="flex items-center justify-center w-full h-[800px] md:h-[800px] text-foreground bg-no-repeat rounded-2xl overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.30), rgba(0,0,0,0.40)), url('/simulations-portfolio/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center 0%",  
  }}
    >
      <section className="mx-auto max-w-4xl px-4 pt-16 pb-20">
        <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight drop-shadow-lg">
          Maria Fernanda Juarez
        </h1>

        <p className="mt-4 text-2xl text-white/80 max-w-3xl">
          Computational Chemistry • Quantum Computing • Scientific Data Analysis
        </p>

        <p className="text-xl mt-4 max-w-3xl text-white/100 text-muted-foreground leading-relaxed">
          Computational scientist with a background in theoretical chemistry,
          electronic structure, surface science, quantum computing, and
          scientific data analysis.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.title}
                href={section.href}
                className="rounded-2xl border bg-card text-card-foreground p-6 shadow-sm transition hover:shadow-md"
              >
                <Icon className="h-6 w-6 mb-4" />

                <h2 className="text-xl font-semibold">
                  {section.title}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {section.description}
                </p>

                <p className="mt-5 text-sm font-medium">
                  Explore →
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
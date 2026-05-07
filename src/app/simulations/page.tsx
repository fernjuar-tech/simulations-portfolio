"use client"

import React, { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from 'next/link'
import Breadcrumb from "@/components/Breadcrumb";

// ---------- DATA MODEL ----------
// Replace the sample items below with your actual simulations.
// Each item can be an MP4 file (src) or an external URL (youtube/vimeo embed).
// Optional fields: thumbnail (image url), tags, date, doi, codeUrl.

const BASE_PATH = "/simulations-portfolio";
const asset = (path: string) => `${BASE_PATH}${path}`;

const SIMULATION_PROJECTS = [
  {
    id: "her-stepped-ag",
    title: "Hydrogen Evolution on Stepped Silver Surfaces",
    category: "Electrochemistry & Surface Science",
    duration: "Case study",
    thumbnail: asset("/thumbs/her-montecarlo-v3.png"),
    video: asset("/videos/her-montecarlo.mpg"),
    tags: ["HER", "Kinetic model", "Monte Carlo", "DFT", "Experiment"],
    description:
      "Multiscale electrochemical modeling combining experimental data, kinetic rate equations, Monte Carlo simulations, and DFT-based surface energetics.",
    date: "2026-05-04",
    href: "/her-stepped-silver",
    status: "available",
  },

    // placeholders
  { id: "p1", status: "placeholder" },
  { id: "p2", status: "placeholder" },
  { id: "p3", status: "placeholder" },
];

// Distinct categories derived from data
const allCategories = Array.from(
  new Set(
    SIMULATION_PROJECTS
      .filter((v): v is typeof SIMULATION_PROJECTS[number] & { category: string } =>
        v.status !== "placeholder" && typeof v.category === "string"
      )
      .map((v) => v.category)
  )
);

// ---------- HELPER COMPONENTS ----------

function ProjectCard({ item }: { item: any }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <Card
      className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <Link href={item.href}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {item.video && (
            <video
              ref={videoRef}
              src={item.video}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute left-5 bottom-5 right-5">
            <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight drop-shadow">
              {item.title}
            </h3>
          </div>
        </div>
      </Link>
    </Card>
  );
}

/* function PlayerModal({ open, onOpenChange, item }: { open: boolean; onOpenChange: (v: boolean) => void; item: any | null }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="pr-8">{item?.title}</DialogTitle>
        </DialogHeader>
        {item && (
          <div className="space-y-3">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
              {item.external ? (
                <iframe
                  src={item.external}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="h-full w-full"
                  allowFullScreen
                />
              ) : (
                <video className="h-full w-full object-cover" src={item.src} controls preload="metadata" poster={item.thumbnail} />
              )}
            </div>
            {item.description && (
              <p className="text-sm text-muted-foreground">{item.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{item.category}</Badge>
              {item.tags?.map((t: string) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              {item.src && (
                <Button asChild variant="outline" size="sm">
                  <a href={item.src} download>
                    <Download className="h-4 w-4 mr-1" /> Download MP4
                  </a>
                </Button>
              )}
              <Button variant="secondary" size="sm" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4 mr-1" /> Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} */

// ---------- MAIN COMPONENT ----------

export default function SimulationShowcase() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");
  const [sortBy, setSortBy] = useState<"newest" | "title">("newest");

  const items = SIMULATION_PROJECTS; // swap with your own data source

  const filtered = useMemo(() => {
    let out = items.filter((v) => {
      if (v.status === "placeholder") return category === "all";
  
      const q = query.trim().toLowerCase();
  
      const matchesQ =
        !q ||
        v.title?.toLowerCase().includes(q) ||
        v.category?.toLowerCase().includes(q) ||
        v.tags?.some((t: string) => t.toLowerCase().includes(q));
  
      const matchesC = category === "all" || v.category === category;
  
      return matchesQ && matchesC;
    });
  
    if (sortBy === "title") {
      out = out.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else {
      out = out.sort(
        (a, b) =>
          new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
      );
    }
  
    return out;
  }, [items, query, category, sortBy]);
  
  return (
    
    <div className="mx-auto max-w-7xl px-4 pt-10 pb-40">
          <section>
            <Breadcrumb items={[{ label: "Simulations" }]} />
          </section>
      
      {/* Hero */}
      <section className="mx-auto pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight"
        >
          Computational Simulations Portfolio
        </motion.h1>
        <p className="mt-4 text-xl md:text-xl text-muted-foreground leading-relaxed">
          A curated selection of computational chemistry projects combining atomistic simulations, electrochemical modeling, kinetic analysis, and data-driven interpretation.<br/> 
          Use the filters to explore by topic.
        </p>

        {/* Controls */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-9">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              <Button
                variant={category === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory("all")}
              >
                <Filter className="h-4 w-4 mr-1" /> All
              </Button>
              {allCategories.map((c) => (
                <Button
                  key={c}
                  variant={category === c ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="newest">Sort: Newest</option>
              <option value="title">Sort: Title A–Z</option>
            </select>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl pb-40">

{/*         <div className="text-center py-24">
          <h2 className="text-2xl font-semibold">Simulations</h2>
          <p className="mt-4 text-muted-foreground">
            This section is currently under development.
            Selected simulation projects will be available soon.
          </p>
        </div> */}
        
        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <div className="text-muted-foreground text-sm">
              No results. Adjust your filters.
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filtered.map((item) => (
                item.status === "placeholder" ? (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35 }}
                      className="aspect-video rounded-xl border border-dashed border-foreground/10 bg-background/30"
                    />              
                  ) : (

                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.35 }}
                    >
                    <ProjectCard item={item} />
                    </motion.div>          
                )
              ))}

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* <PlayerModal open={open} onOpenChange={setOpen} item={active} /> */}

    </div>
  );
}


"use client"

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle,
  Search,
  Filter,
  X,
  Clock,
  Tag,
  LayoutGrid,
  ListFilter,
  Sun,
  Moon,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// ---------- DATA MODEL ----------
// Replace the sample items below with your actual simulations.
// Each item can be an MP4 file (src) or an external URL (youtube/vimeo embed).
// Optional fields: thumbnail (image url), tags, date, doi, codeUrl.

const SAMPLE_VIDEOS = [
  {
    id: "vid-1",
    title: "Thermochemical Redox Cycle — Oxygen Exchange Dynamics",
    category: "Energy Materials",
    duration: "00:36",
    // src: "https://files.samplescdn.com/video/thermo-redox-demo.mp4", // replace
    // thumbnail: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
    src: "/videos/movie.mpg", // replace
    thumbnail: "/thumbs/Movie_m.png",
    tags: ["DFT", "MD", "Oxygen vacancies"],
    description:
      "Animated trajectory showing oxygen exchange and defect migration at elevated T; trajectories from ab initio MD mapped onto slab model.",
    date: "2025-06-10",
  },
  {
    id: "vid-2",
    title: "Grain-Boundary Sliding — Atomistic Insight",
    category: "Defects & Microstructure",
    duration: "01:12",
    // Example of a YouTube embed. Use full url; the player detects and iframes it.
    external: "https://www.youtube.com/embed/ScMzIvxBSi4",
    thumbnail: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
    tags: ["GB phase", "mechanics"],
    description:
      "Dislocation nucleation and GB phase transition under shear; stress–strain overlay.",
    date: "2024-11-03",
  },
  {
    id: "vid-3",
    title: "Electrochemical Interface — Solvent Reorganization",
    category: "Interfaces & Electrochemistry",
    duration: "00:48",
    src: "https://files.samplescdn.com/video/echem-interface.mp4", // replace
    thumbnail: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=1200&auto=format&fit=crop",
    tags: ["AIMD", "charge transfer"],
    description:
      "Time-resolved solvation reorientation and ion pairing at charged electrode model.",
    date: "2023-02-18",
  },
];

// Distinct categories derived from data
const allCategories = Array.from(new Set(SAMPLE_VIDEOS.map(v => v.category)));

// ---------- HELPER COMPONENTS ----------

function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);
  return (
    <Button variant="ghost" size="icon" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

function VideoCard({ item, onOpen }: { item: any; onOpen: (item: any) => void }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow" onClick={() => onOpen(item)}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <PlayCircle className="absolute left-3 bottom-3 h-8 w-8 text-white drop-shadow" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-base leading-tight">{item.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3 pt-0 pb-4">
          <Badge variant="secondary" className="flex items-center gap-1"><Tag className="h-3 w-3" />{item.category}</Badge>
          {item.duration && (
            <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Clock className="h-3 w-3" />{item.duration}</span>
          )}
          {item.date && (
            <span className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</span>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PlayerModal({ open, onOpenChange, item }: { open: boolean; onOpenChange: (v: boolean) => void; item: any | null }) {
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
                <video className="h-full w-full" src={item.src} controls preload="metadata" poster={item.thumbnail} />
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
}

// ---------- MAIN COMPONENT ----------

export default function SimulationShowcase() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");
  const [sortBy, setSortBy] = useState<"newest" | "title">("newest");
  const [active, setActive] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const items = SAMPLE_VIDEOS; // swap with your own data source

  const filtered = useMemo(() => {
    let out = items.filter(v => {
      const q = query.trim().toLowerCase();
      const matchesQ = !q ||
        v.title.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.tags?.some((t: string) => t.toLowerCase().includes(q));
      const matchesC = category === "all" || v.category === category;
      return matchesQ && matchesC;
    });
    if (sortBy === "title") out = out.sort((a, b) => a.title.localeCompare(b.title));
    else out = out.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
    return out;
  }, [items, query, category, sortBy]);

  const openPlayer = (it: any) => {
    setActive(it);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur bg-background/70 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5" />
            <span className="font-semibold">Simulation Showcase</span>
          </div>
          <div className="flex items-center gap-2">
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          Computational Simulations Portfolio
        </motion.h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          A curated selection of atomistic trajectories, interfacial dynamics, and microstructural processes. Use the search
          and filters to explore by topic.
        </p>

        {/* Controls */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search title, category, tags…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-4">
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
          <div className="md:col-span-2">
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

      {/* Gallery */}
      <main className="mx-auto max-w-7xl px-4 pb-16">
        <AnimatePresence initial={false}>
          {filtered.length === 0 ? (
            <div className="text-muted-foreground text-sm">No results. Adjust your filters.</div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item) => (
                <VideoCard key={item.id} item={item} onOpen={openPlayer} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <PlayerModal open={open} onOpenChange={setOpen} item={active} />

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Maria Fernanda Juarez — Simulations Portfolio</span>
          <span>
            Built with React, Tailwind, shadcn/ui & Framer Motion
          </span>
        </div>
      </footer>
    </div>
  );
}


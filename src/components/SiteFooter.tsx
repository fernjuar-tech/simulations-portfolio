export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
        <span>
          © {new Date().getFullYear()} Maria Fernanda Juarez — Professional Portfolio
        </span>

        <span>
          Computational Chemistry · Quantum Computing · Scientific Data Analysis
        </span>
        
        <span>
          Built with React, Tailwind, shadcn/ui & Framer Motion
        </span>
      </div>
    </footer>
  );
}

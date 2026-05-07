import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-10 pb-40">
      
      <section>
        <Breadcrumb items={[{ label: "Tools" }]} />
      </section>

      {/* Header */}
      <section className="mx-auto pb-10">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          Teaching & Interactive Tools
        </h1>

        <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
          Interactive tools and educational resources designed to explore
          scientific data, develop intuition, and support teaching in
          computational science and chemistry.
        </p>
      </section>

      {/* Tools */}
      <section className="mx-auto max-w-7xl pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Smoothing Demo */}
          <Link
            href="/smoothing-demo"
            className="block rounded-2xl border bg-card text-card-foreground p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">
              Data Smoothing Interactive Demo
            </h2>

            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Explore how different smoothing techniques affect noisy data,
              including moving average and Savitzky–Golay filters.
            </p>

            <p className="mt-4 text-sm font-medium">
              Try demo →
            </p>
          </Link>

          {/* Placeholder future tool */}
          <div className="rounded-2xl border border-dashed bg-card/50 p-6 text-muted-foreground">
            <h2 className="text-xl font-semibold">
              Future Interactive Tools
            </h2>

            <p className="mt-2 text-sm leading-relaxed">
              Additional educational and interactive tools will be added here,
              focusing on data analysis, simulations, and computational methods.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
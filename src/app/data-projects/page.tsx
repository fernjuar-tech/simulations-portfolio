import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function DataProjectsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-10 pb-40">
      
      <section>
        <Breadcrumb items={[{ label: "Data Projects" }]} />
      </section>

      {/* Header */}
      <section className="mx-auto pb-10">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          Data & Computational Projects
        </h1>

        <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
          A selection of data-driven analyses based on scientific simulations,
          focusing on extracting trends, building insights, and visualizing
          complex physical systems.
        </p>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-7xl pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Cobalt Oxides */}
          <Link
            href="/cobalt-oxides"
            className="block rounded-2xl border bg-card text-card-foreground p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">
              Formation Energy Trends in Cobalt Oxides
            </h2>

            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Data-driven analysis of DFT formation energies as a function of
              composition (Co/O ratio), hydrogen content, and chemical
              reservoir conditions.
            </p>

            <p className="mt-4 text-sm font-medium">
              View project →
            </p>
          </Link>

          {/* Placeholder for future project */}
          <div className="rounded-2xl border border-dashed bg-card/50 p-6 text-muted-foreground">
            <h2 className="text-xl font-semibold">
              Quantum Computing Data Analysis (VQE)
            </h2>

            <p className="mt-2 text-sm leading-relaxed">
              Analysis of electronic structure data generated with PySCF and
              variational quantum algorithms (VQE). Coming soon.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
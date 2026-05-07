import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function CobaltOxidesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-10 pb-40">

      <section>
         <Breadcrumb
           items={[
             { label: "Data Projects", href: "/data-projects" },
             { label: "Cobalt Oxides" },
           ]}
         />
      </section>
      
      <section className="mx-auto pb-10">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
        Formation Energy Trends in Cobalt Oxides
        </h1>
      </section>

      <p className="mb-6">
        This project explores how formation energy depends on composition 
        (Co/O ratio) and hydrogen content in cobalt oxide systems, based on 
        density functional theory (DFT) simulations.
      </p>

      <img 
        src="/simulations-portfolio/figures/energies_withoutSOLV.png"
        alt="Formation energy plot"
        className="rounded-xl shadow-lg mb-8 mx-auto"
      />

      <div className="max-w-5xl space-y-4">
        <p>• Formation energy varies systematically with Co/O ratio</p>
        <p>• Hydrogen content (nH) creates distinct energy groupings</p>
        <p>• Different reservoir conditions significantly shift stability</p>
      </div>

      <a 
        href="https://github.com/fernjuar-tech/cobalt-oxides-data-analysis"
        target="_blank"
        className="inline-block mt-8 underline"
      >
        View full project on GitHub
      </a>

    </main>
  );
}
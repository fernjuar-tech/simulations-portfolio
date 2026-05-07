import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-10 pb-40">
      <section>
        <Breadcrumb items={[{ label: "About" }]} />
      </section>

      <section className="mx-auto pb-10 grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Texto */}
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">About me</h2>

          <p className="text-xl mt-4 leading-relaxed">
            I am a computational scientist with a background in theoretical chemistry,
            electronic structure, surface science, and quantum computing applications
            for chemistry and materials.
          </p>
        </div>

        {/* Imagen */}
        <div className="flex justify-center md:justify-center mt-6 md:mt-12">
          <img
            src="/simulations-portfolio/images/profile.jpg"
            alt="Maria Fernanda Juarez"
            className="h-56 w-56 rounded-full object-cover border-white/20 shadow-xl"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl pb-20 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl border bg-card text-card-foreground p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Scientific Profile</h2>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            My work focuses on computational modeling of complex physical and
            chemical systems, including electronic structure calculations,
            electrochemical interfaces, atomistic simulations, and scientific
            data analysis.
          </p>
        </div>

        <div className="rounded-2xl border bg-card text-card-foreground p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Areas of Expertise</h2>

          <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
            <li>• Theoretical and computational chemistry</li>
            <li>• Density functional theory and electronic structure</li>
            <li>• Surface science and electrochemical interfaces</li>
            <li>• Quantum computing algorithms for chemistry</li>
            <li>• Python-based data analysis and visualization</li>
          </ul>
        </div>

        <div className="rounded-2xl border bg-card text-card-foreground p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Selected Links</h2>

          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link
              href="https://github.com/fernjuar-tech"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition"
            >
              GitHub →
            </Link>

            <span className="text-muted-foreground">
              ORCID / Google Scholar / CV links can be added here.
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed bg-card/50 p-6 text-muted-foreground">
          <h2 className="text-xl font-semibold">Beyond Research</h2>

          <p className="mt-3 text-sm leading-relaxed">
            This section can later include personal interests, teaching
            philosophy, outreach activities, hobbies, or selected creative
            projects.
          </p>
        </div>
      </section>
    </main>
  );
}
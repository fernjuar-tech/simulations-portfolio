import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export default function HydrogenEvolutionPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pt-10 pb-40">

      <section>
        <Breadcrumb
          items={[
            { label: "Simulations", href: "/simulations" },
            { label: "Hydrogen Evolution on Silver" },
          ]}
        />
      </section>

      <section className="relative h-[300px] mb-8 rounded-2xl overflow-hidden">
        <img
          src="/simulations-portfolio/images/her-stepped-silver/hero-stepped-silver.png"
          alt="Stepped silver surface"
          className="absolute inset-0 w-full h-full object-cover"
        />
      
        <div className="absolute inset-0 bg-black/55" />
      
        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-14 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
            Hydrogen Evolution on Stepped Silver Surfaces
          </h1>
      
          <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
            Multiscale electrochemical modeling combining experiment, kinetic rate equations,
            Monte Carlo simulations, and DFT-based surface energetics.
          </p>
        </div>
      </section>

<section className="grid md:grid-cols-2 gap-12 items-center mb-20">
  <div className="space-y-4 text-base md:text-lg text-foreground/75 leading-relaxed">
    <p>
      This project investigates the hydrogen evolution reaction (HER) on silver electrodes
      by combining experimental observations, kinetic modeling, Monte Carlo simulations,
      and density functional theory (DFT).
    </p>

    <p>
      Silver is typically considered a weak catalyst for hydrogen evolution. However,
      experimental results show that stepped surfaces exhibit significantly enhanced activity.
    </p>

    <p>
      Interestingly, this increase in reactivity cannot be explained by a simple relationship
      between the number of defects and catalytic performance.
    </p>
  </div>

  <img
    src="/simulations-portfolio/images/her-stepped-silver/experimental-her-stepped-ag.pdf"
    alt="Experimental HER on stepped silver"
    className="rounded-xl shadow-lg w-full max-w-md mx-auto"
  />
</section>

      <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
      
        {/* TEXT */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Kinetic Modeling</h2>
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
          The hydrogen evolution reaction is described using a Volmer–Heyrovsky mechanism, 
          where hydrogen adsorption and electrochemical desorption define the overall kinetics.
          </p>
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
          Starting from the classical Gerischer model, the kinetic description was extended 
          to include additional processes relevant at realistic electrochemical interfaces.
          </p>
        </div>
      
        {/* IMAGE */}
        <div>
          <img 
            src="/simulations-portfolio/images/her-stepped-silver/her-gerischer-model-v2.png"
            alt="HER mechanism"
            className="rounded-xl shadow-lg w-full max-w-md mx-auto"
          />
        </div>
      
      </section>
      
      <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
      
        {/* TEXT */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Model Extension</h2>
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
          The model was refined by incorporating surface coverage effects and the presence 
          of adsorbed anions, which dynamically block active sites and influence reaction rates.
          </p>
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
          This extension allows a more accurate description of experimental current–time 
          transients and reveals the critical role of interfacial chemistry.
          </p>
        </div>
      
        {/* IMAGE */}
        <div>
          <img 
            src="/simulations-portfolio/images/her-stepped-silver/modified-kinetic-model-v2.png"
            alt="HER mechanism"
            className="rounded-xl shadow-lg w-full max-w-md mx-auto"
          />
        </div>
      
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
      
        {/* IMAGE */}
        <div className="order-1 md:order-2">
          <img 
            src="/simulations-portfolio/images/her-stepped-silver/dft-adsorption-sites.pdf"
            alt="DFT adsorption"
            className="rounded-xl shadow-lg w-full max-w-xl mx-auto"
          />
        </div>
      
        {/* TEXT */}
        <div className="space-y-4 order-2 md:order-1 mb-20">
          <h2 className="text-2xl font-semibold">Multiscale Modeling</h2>
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
            To bridge the gap between kinetics and microscopic behavior, kinetic Monte Carlo (KMC) 
            simulations were used to explicitly model surface processes such as hydrogen diffusion, 
            lateral interactions, and reaction events.
          </p>
  
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
            In parallel, DFT calculations provide adsorption energetics and site-specific 
            information, enabling a direct connection between atomic-scale structure and 
            macroscopic observables.
          </p>
        </div>
      
      </section>

    <section className="mb-12 rounded-2xl border bg-background/70 p-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Key Insights</h2>
    
      <ul className="space-y-3 text-base md:text-lg text-foreground/75 leading-relaxed">
        <li>• Surface structure strongly influences catalytic activity</li>
        <li>• Adsorbed anions play a decisive role in reaction kinetics</li>
        <li>• Step and terrace sites exhibit distinct energetic behavior</li>
        <li>• Multiscale modeling is essential to interpret experimental data</li>
      </ul>
    </section>

      {/* Links */}
<div className="mt-8 flex flex-col gap-2 text-sm">
  <a 
    href="/simulations-portfolio/papers/her-silver-ISE2012-v2.pdf"
    target="_blank"
    className="underline underline-offset-4 hover:text-foreground"
  >
    View presentation (ISE 2012)
  </a>

{/*   <a 
    href="/simulations-portfolio/papers/stepped-silver.pdf"
    target="_blank"
    className="underline underline-offset-4 hover:text-foreground"
  >
    View related work on stepped surfaces
  </a> */}
</div>

    </main>
  );
}
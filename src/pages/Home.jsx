import LayeredHero from "../components/hero/LayeredHero";
import Reveal from "../components/motion/Reveal";
import Magnetic from "../components/ui/Magnetic";
import { scrollToId } from "../utils/scrollToId";

export default function Home() {
  return (
    <section
      id="home"
      data-tone="light"
      className="bg-surface text-ink min-h-screen px-6 pt-32 pb-20 flex items-center"
    >
      <div className="mx-auto w-full max-w-6xl">
        <span className="sr-only">Marcos Conde — Desenvolvedor Full Stack</span>

        <Reveal
          as="p"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
        >
          Olá, eu sou
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          {/*
            Hero so com tipografia por enquanto. As fotos recortadas nao
            convenceram e a decisao ficou em aberto. Para voltar ao efeito
            de camada do ref 1, e so passar as duas props:
              photo="/marcos-fundo-removido1.png" cutout={true}
          */}
          <LayeredHero />

          <div className="max-w-[30ch] lg:pb-6">
            <Reveal
              as="p"
              delay={0.15}
              className="font-mono text-[11px] uppercase leading-[1.9] tracking-[0.14em] text-muted"
            >
              Desenvolvedor full stack. Atuo em sistemas web de grande escala,
              com foco em arquitetura e sustentabilidade do código.
            </Reveal>

            <Reveal delay={0.3} className="mt-8">
              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollToId("projects")}
                  className="bg-accent px-7 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white cursor-pointer"
                >
                  Ver Projetos
                </button>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

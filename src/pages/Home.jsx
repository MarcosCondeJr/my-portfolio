import HeroName from "../components/hero/HeroName";
import HeroPortrait from "../components/hero/HeroPortrait";
import Reveal from "../components/motion/Reveal";
import Magnetic from "../components/ui/Magnetic";
import { scrollToId } from "../utils/scrollToId";

export default function Home() {
  return (
    <section
      id="home"
      data-tone="light"
      className="relative flex min-h-screen items-center overflow-hidden bg-surface px-6 pt-32 pb-20 text-ink"
    >
      {/*
        No desktop este bloco precisa ocupar a altura util inteira da secao
        (100vh menos os 13rem de pt-32 + pb-20) porque o retrato se ancora na
        base DELE. Se ele tivesse so a altura do conteudo, o -bottom-20 do
        retrato pousaria no meio da tela em vez de na dobra.
      */}
      <div className="relative mx-auto w-full max-w-6xl lg:flex lg:min-h-[calc(100vh-13rem)] lg:flex-col lg:justify-center">
        <span className="sr-only">Marcos Conde — Desenvolvedor Full Stack</span>

        <Reveal
          as="p"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
        >
          Olá, eu sou
        </Reveal>

        {/*
          items-start alinha o card pelo TOPO do nome. Alinhado pela base ele
          desceria ate a faixa dos ombros do retrato — que passa por cima dele
          — e o paragrafo ficaria coberto.
        */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_29.5%] lg:items-start">
          <div className="relative z-30">
            <HeroName />
          </div>

          <div className="relative z-10 border border-white/70 bg-white/50 p-7 shadow-[0_1rem_3rem_rgba(22,21,15,0.06)]">
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
                  className="cursor-pointer bg-accent px-7 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white"
                >
                  Ver Projetos
                </button>
              </Magnetic>
            </Reveal>
          </div>
        </div>

        <HeroPortrait />
      </div>
    </section>
  );
}

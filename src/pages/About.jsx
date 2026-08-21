import Section from "../components/layout/Section";
import Reveal from "../components/motion/Reveal";

export default function About() {
  return (
    <Section tone="light" id="about" number="02" label="Sobre" title="Quem eu sou">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div className="max-w-[58ch]">
          <Reveal as="p" className="text-lg leading-relaxed">
            Sou desenvolvedor full stack, formado em Desenvolvimento de Sistemas
            pelo SENAI e graduando em Engenharia de Software na UCSal. Trabalho
            em sistemas web de grande escala em{" "}
            <span className="text-accent">PHP</span>, criando e evoluindo
            módulos e cuidando da arquitetura e da sustentabilidade do código.
          </Reveal>

          <Reveal as="p" delay={0.1} className="mt-6 text-lg leading-relaxed">
            Também construo projetos em{" "}
            <span className="text-accent">Java e Spring Boot</span>,
            aprofundando arquitetura, padrões e segurança.
          </Reveal>

          {/* Toque 2 de 4 da musica — uma linha, nao um paragrafo. */}
          <Reveal
            as="p"
            delay={0.2}
            className="mt-10 border-l-2 border-accent pl-5 text-lg leading-relaxed text-muted"
          >
            Toco contrabaixo desde os quatorze — e foi tocando em banda que eu
            entendi o que é ritmo e o que é escutar antes de entrar.
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <img
            src="/imagem-work.jpeg"
            alt="A mesa de trabalho de Marcos Conde: dois monitores com código, teclado iluminado e luz azul ao fundo"
            className="aspect-[3/4] w-full object-cover"
          />
        </Reveal>
      </div>
    </Section>
  );
}

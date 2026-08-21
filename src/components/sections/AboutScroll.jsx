import { useRef, useState } from "react";
import Section from "../layout/Section";
import Reveal from "../motion/Reveal";
import { shouldAnimate } from "../../motion/motionTokens";
import {
  escalasDaTroca,
  opacidadesDaTroca,
  useScrollProgress,
} from "../../motion/useScrollProgress";

// Quem gruda e o CSS sticky, nao o JavaScript: o scroll do visitante nunca
// e interceptado nem cancelado. Isso importa porque scroll sequestrado por
// JS briga com a rolagem por inercia e e o que faz esse tipo de secao
// parecer travada em vez de intencional.
function podePinar() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  if (!shouldAnimate()) return false;
  // Trilho alto em tela pequena com rolagem por inercia e onde isso quebra
  // feio — a pessoa acha que o site travou e fecha.
  return window.matchMedia("(min-width: 1024px)").matches;
}

function Parada({ parada }) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
      <div className="max-w-[52ch]">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {parada.rotulo}
        </span>

        <h3 className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] uppercase leading-[0.9]">
          {parada.titulo}
        </h3>

        <p className="mt-6 text-lg leading-relaxed text-muted">{parada.texto}</p>

        {parada.tags?.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2">
            {parada.tags.map((tag) => (
              <span
                key={tag}
                className="border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.13em] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {parada.foto && (
        <img
          src={parada.foto}
          alt={parada.alt}
          className="aspect-[3/4] w-full max-w-xs object-cover md:w-72"
        />
      )}
    </div>
  );
}

export default function AboutScroll({ paradas }) {
  const trilhoRef = useRef(null);
  const [pinado] = useState(podePinar);
  const progresso = useScrollProgress(trilhoRef, pinado);

  // Caminho empilhado: tela estreita ou movimento reduzido. Nao e o efeito
  // enfraquecido — e outro caminho de codigo, escolhido na montagem.
  if (!pinado) {
    return (
      <Section tone="light" id="about" number="02" label="Sobre" title="Quem eu sou">
        <div className="space-y-24">
          {paradas.map((parada, i) => (
            <Reveal key={parada.id} delay={i * 0.05}>
              <Parada parada={parada} />
            </Reveal>
          ))}
        </div>
      </Section>
    );
  }

  const opacidades = opacidadesDaTroca(progresso, paradas.length);
  const escalas = escalasDaTroca(progresso, paradas.length);

  return (
    <section
      ref={trilhoRef}
      id="about"
      data-tone="light"
      data-trilho
      className="relative bg-surface text-ink"
      style={{ height: `${paradas.length * 130}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6">
        <div className="relative mx-auto w-full max-w-6xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            02 — Sobre
          </p>

          <div className="relative mt-10 min-h-[26rem]">
            {paradas.map((parada, i) => (
              <div
                key={parada.id}
                className="absolute inset-0 flex items-center"
                style={{
                  opacity: opacidades[i],
                  transform: `scale(${escalas[i]})`,
                  transformOrigin: "center center",
                  willChange: "transform, opacity",
                  // A parada apagada nao pode roubar clique nem hover da
                  // que esta visivel.
                  pointerEvents: opacidades[i] > 0.5 ? "auto" : "none",
                }}
              >
                <div className="w-full">
                  <Parada parada={parada} />
                </div>
              </div>
            ))}
          </div>

          {/* Sem referencia de progresso, secao travada vira desorientacao:
              a pessoa nao sabe se acabou nem quanto falta. */}
          <div className="mt-12 flex items-center gap-4">
            <div className="h-px flex-1 bg-line">
              <div
                className="h-px bg-accent transition-[width] duration-100"
                style={{ width: `${progresso * 100}%` }}
              />
            </div>
            <div className="flex gap-2">
              {paradas.map((parada, i) => (
                <span
                  key={parada.id}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    opacidades[i] > 0.5 ? "bg-accent" : "bg-line"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

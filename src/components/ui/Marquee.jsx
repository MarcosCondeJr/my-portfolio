import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { shouldAnimate } from "../../motion/motionTokens";
import { repeticoesNecessarias } from "../../utils/marquee";

export default function Marquee({ items, speed = 0.5 }) {
  const trilhaRef = useRef(null);
  const larguraCopiaRef = useRef(0);
  const [repeticoes, setRepeticoes] = useState(2);
  const texto = items.join("  ·  ") + "  ·  ";

  useLayoutEffect(() => {
    const trilha = trilhaRef.current;
    if (!trilha) return;

    let vivo = true;

    const medir = () => {
      if (!vivo || !trilha.children[0]) return;
      const largura = trilha.children[0].offsetWidth;
      if (!largura) return;
      larguraCopiaRef.current = largura;
      setRepeticoes(repeticoesNecessarias(largura, window.innerWidth));
    };

    medir();
    window.addEventListener("resize", medir);
    if (document.fonts?.ready) document.fonts.ready.then(medir);

    return () => {
      vivo = false;
      window.removeEventListener("resize", medir);
    };
  }, [texto]);

  useEffect(() => {
    const trilha = trilhaRef.current;
    if (!trilha || !shouldAnimate()) return;

    let deslocamento = 0;
    let raf = 0;
    let velocidade = 0;
    let ultimoY = window.scrollY;

    const aoRolar = () => {
      const y = window.scrollY;
      velocidade = y - ultimoY;
      ultimoY = y;
    };
    window.addEventListener("scroll", aoRolar, { passive: true });

    const passo = () => {
      // O laco reinicia a cada UMA copia, independente de quantas existam.
      const passoDoLaco = larguraCopiaRef.current;

      if (passoDoLaco > 0) {
        const impulso = Math.max(-6, Math.min(6, velocidade * 0.12));
        velocidade *= 0.9;

        deslocamento -= speed + impulso;
        if (deslocamento <= -passoDoLaco) deslocamento += passoDoLaco;
        if (deslocamento > 0) deslocamento -= passoDoLaco;

        trilha.style.transform = `translateX(${deslocamento}px)`;
      }

      raf = requestAnimationFrame(passo);
    };

    raf = requestAnimationFrame(passo);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", aoRolar);
    };
  }, [speed]);

  return (
    <div
      data-tone="light"
      aria-hidden="true"
      className="overflow-hidden bg-accent py-3"
    >
      <div
        ref={trilhaRef}
        className="flex w-max whitespace-nowrap will-change-transform"
      >
        {Array.from({ length: repeticoes }, (_, i) => (
          <span
            key={i}
            className="pr-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white"
          >
            {texto}
          </span>
        ))}
      </div>
    </div>
  );
}

import { useLayoutEffect, useRef } from "react";
import { shouldAnimate } from "../../motion/motionTokens";

export default function Marquee({ items, speed = 0.5 }) {
  const trilhaRef = useRef(null);
  const texto = items.join("  ·  ");

  useLayoutEffect(() => {
    const trilha = trilhaRef.current;
    if (!trilha || !shouldAnimate()) return;

    let deslocamento = 0;
    let metade = 0;
    let raf = 0;
    let velocidade = 0;
    let ultimoY = window.scrollY;

    // A velocidade do scroll vem de um listener proprio, nao do
    // ScrollTrigger: getVelocity e metodo de instancia, nao estatico
    // (ScrollTrigger.js:1616), e chamar ScrollTrigger.getVelocity()
    // lancava TypeError no primeiro quadro — antes do requestAnimationFrame
    // do final — matando o laco e deixando a faixa parada.
    const aoRolar = () => {
      const y = window.scrollY;
      velocidade = y - ultimoY;
      ultimoY = y;
    };
    window.addEventListener("scroll", aoRolar, { passive: true });

    const passo = () => {
      if (!metade) metade = trilha.scrollWidth / 2 || 1;

      // Limitado para nao dar solavanco, e decaindo a cada quadro para a
      // faixa voltar a velocidade base quando o scroll para.
      const impulso = Math.max(-6, Math.min(6, velocidade * 0.12));
      velocidade *= 0.9;

      deslocamento -= speed + impulso;
      if (deslocamento <= -metade) deslocamento += metade;
      if (deslocamento > 0) deslocamento -= metade;

      trilha.style.transform = `translateX(${deslocamento}px)`;
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
      <div ref={trilhaRef} className="flex w-max whitespace-nowrap will-change-transform">
        <span className="pr-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
          {texto}
          {"  ·  "}
        </span>
        <span className="pr-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
          {texto}
          {"  ·  "}
        </span>
      </div>
    </div>
  );
}

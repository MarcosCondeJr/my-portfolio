import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

    const passo = () => {
      if (!metade) metade = trilha.scrollWidth / 2 || 1;

      // Velocidade do scroll da pagina, limitada para nao dar solavanco.
      const v = ScrollTrigger.getVelocity() / 900;
      const impulso = Math.max(-6, Math.min(6, v));

      deslocamento -= speed + impulso;
      if (deslocamento <= -metade) deslocamento += metade;
      if (deslocamento > 0) deslocamento -= metade;

      trilha.style.transform = `translateX(${deslocamento}px)`;
      raf = requestAnimationFrame(passo);
    };

    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
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

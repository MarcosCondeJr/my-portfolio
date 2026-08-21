import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, shouldAnimate } from "./motionTokens";

gsap.registerPlugin(ScrollTrigger);

// Unico ponto do projeto que fala com o ScrollTrigger.
//
// REGRA INEGOCIAVEL: o estado escondido e aplicado aqui por gsap.set(),
// nunca por CSS. Se o CSS declarasse opacity:0 como padrao e o JS fosse
// quem revela, qualquer visitante cujo JavaScript nao executou veria uma
// pagina em branco. Do jeito que esta, falha de JS degrada para o site
// legivel sem animacao.
export function useReveal({ delay = 0, kind = "fade" } = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !shouldAnimate()) return;

    const ctx = gsap.context(() => {
      if (kind === "mask") {
        const linhas = el.querySelectorAll("[data-mask-line]");
        if (!linhas.length) return;
        gsap.set(linhas, { yPercent: 106 });
        gsap.to(linhas, {
          yPercent: 0,
          duration: MOTION.maskDuration,
          ease: MOTION.ease,
          stagger: MOTION.stagger,
          delay,
          scrollTrigger: { trigger: el, start: MOTION.start, once: true },
        });
        return;
      }

      gsap.set(el, { opacity: 0, y: MOTION.revealY });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: MOTION.revealDuration,
        ease: MOTION.ease,
        delay,
        scrollTrigger: { trigger: el, start: MOTION.start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, kind]);

  return ref;
}

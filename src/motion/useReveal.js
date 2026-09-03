import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MOTION, shouldAnimate } from "./motionTokens";

// REGRA INEGOCIAVEL: o estado escondido e aplicado aqui por gsap.set(),
// nunca por CSS. Se o CSS declarasse opacity:0 como padrao e o JS fosse
// quem revela, qualquer visitante cujo JavaScript nao executou veria uma
// pagina em branco. Do jeito que esta, falha de JS degrada para o site
// legivel sem animacao.
//
// O gatilho e IntersectionObserver, nao ScrollTrigger. Isso e deliberado:
// o ScrollTrigger decide se disparou a partir de um refresh global que ele
// mesmo agenda, e esse agendamento nao sobrevive ao ciclo
// montar/desmontar/montar do StrictMode — a segunda montagem escondia o
// elemento e o gatilho novo nunca disparava, deixando titulos invisiveis
// para sempre. O IntersectionObserver sempre reporta o estado inicial de
// tudo que passa por observe(), entao cada montagem se arma sozinha.
// O ScrollTrigger continua em uso onde ele e realmente necessario:
// movimento amarrado ao progresso do scroll (Marquee, BassBand).
export function useReveal({ delay = 0, kind = "fade" } = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !shouldAnimate()) return;
    if (typeof IntersectionObserver !== "function") return;

    const alvos =
      kind === "mask"
        ? Array.from(el.querySelectorAll("[data-mask-line]"))
        : [el];
    if (!alvos.length) return;

    gsap.set(
      alvos,
      kind === "mask" ? { yPercent: 106 } : { opacity: 0, y: MOTION.revealY }
    );

    let tween;

    const io = new IntersectionObserver(
      (entradas, obs) => {
        if (!entradas.some((e) => e.isIntersecting)) return;
        obs.disconnect();

        tween =
          kind === "mask"
            ? gsap.to(alvos, {
                yPercent: 0,
                duration: MOTION.maskDuration,
                ease: MOTION.ease,
                stagger: MOTION.stagger,
                delay,
              })
            : gsap.to(alvos, {
                opacity: 1,
                y: 0,
                duration: MOTION.revealDuration,
                ease: MOTION.ease,
                delay,
              });
      },
      { rootMargin: MOTION.rootMargin }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      tween?.kill();
      // Devolve o elemento ao estado limpo para que a proxima montagem
      // comece do zero. E isto que torna o efeito idempotente.
      gsap.set(alvos, { clearProps: "opacity,transform" });
    };
  }, [delay, kind]);

  return ref;
}

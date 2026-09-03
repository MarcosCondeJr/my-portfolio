import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MOTION, shouldAnimate } from "./motionTokens";

// Mesma regra do useReveal: o estado escondido e aplicado por gsap.set(),
// nunca por CSS. Se o CSS escondesse, uma falha do GSAP deixaria o modal
// aberto e vazio.
export function useModalEntrada(ativo) {
  const painelRef = useRef(null);
  const fundoRef = useRef(null);

  useLayoutEffect(() => {
    if (!ativo || !shouldAnimate()) return;

    const painel = painelRef.current;
    const fundo = fundoRef.current;
    if (!painel || !fundo) return;

    const blocos = painel.querySelectorAll("[data-stagger]");

    // So a opacidade e animada. O GSAP nao sabe interpolar backdropFilter,
    // e nao precisa: opacity compoe o resultado inteiro do elemento, entao o
    // desfoque da classe entra junto conforme o fundo aparece.
    gsap.set(fundo, { opacity: 0 });
    gsap.set(painel, { clipPath: "inset(0 0 100% 0)" });
    gsap.set(blocos, { opacity: 0, y: MOTION.revealY });

    const tl = gsap.timeline();

    tl.to(fundo, {
      opacity: 1,
      duration: MOTION.revealDuration / 2,
      ease: MOTION.ease,
    })
      .to(
        painel,
        {
          clipPath: "inset(0 0 0% 0)",
          duration: MOTION.modalMask,
          ease: MOTION.ease,
        },
        0,
      )
      .to(
        blocos,
        {
          opacity: 1,
          y: 0,
          duration: MOTION.revealDuration,
          ease: MOTION.ease,
          stagger: MOTION.stagger,
        },
        MOTION.modalMask * 0.6,
      );

    return () => {
      tl.kill();
      gsap.set([fundo, painel], { clearProps: "opacity,clipPath" });
      gsap.set(blocos, { clearProps: "opacity,transform" });
    };
  }, [ativo]);

  return { painelRef, fundoRef };
}

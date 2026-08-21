// Unica fonte de constantes de movimento. Recalibrar o ritmo do site
// inteiro e editar este arquivo.
export const MOTION = Object.freeze({
  maskDuration: 0.85,
  revealDuration: 0.6,
  stagger: 0.07,
  ease: "power3.out",
  revealY: 20,
  // Equivalente ao "top 85%" do ScrollTrigger: encolhe a base da area de
  // interseccao em 15%, entao o elemento so conta como visivel depois de
  // entrar 15% na tela.
  rootMargin: "0px 0px -15% 0px",
});

// Unico ponto do projeto que consulta prefers-reduced-motion. Nenhum
// componente deve chamar matchMedia diretamente.
export function shouldAnimate() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

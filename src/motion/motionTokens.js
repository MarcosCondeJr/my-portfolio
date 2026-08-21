// Unica fonte de constantes de movimento. Recalibrar o ritmo do site
// inteiro e editar este arquivo.
export const MOTION = Object.freeze({
  maskDuration: 0.85,
  revealDuration: 0.6,
  stagger: 0.07,
  ease: "power3.out",
  revealY: 20,
  start: "top 85%",
});

// Unico ponto do projeto que consulta prefers-reduced-motion. Nenhum
// componente deve chamar matchMedia diretamente.
export function shouldAnimate() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

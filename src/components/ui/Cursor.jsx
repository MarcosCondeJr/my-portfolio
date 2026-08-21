import { useLayoutEffect, useRef, useState } from "react";
import { shouldAnimate } from "../../motion/motionTokens";

// Os elementos nao se declaram interativos: o cursor descobre sozinho por
// delegacao de evento. Assim tudo que ja existe e tudo que for criado
// depois funciona sem precisar lembrar de marcar nada.
// Campos de texto ficam de fora de proposito — ver a excecao no index.css.
const INTERATIVOS = "a, button, [role='button'], summary";

function podeUsarCursor() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  // Um elemento perseguindo o mouse e movimento.
  if (!shouldAnimate()) return false;
  // Celular e tablet nao tem cursor: nada e carregado.
  return window.matchMedia("(pointer: fine)").matches;
}

export default function Cursor() {
  const ref = useRef(null);
  const [ativo] = useState(podeUsarCursor);

  useLayoutEffect(() => {
    if (!ativo) return;
    const el = ref.current;
    if (!el) return;

    const raiz = document.documentElement;
    // O cursor nativo so some depois que o customizado esta de pe. Se este
    // componente falhar ou for desligado, o cursor do sistema continua la.
    raiz.classList.add("cursor-custom");

    let alvoX = window.innerWidth / 2;
    let alvoY = window.innerHeight / 2;
    let x = alvoX;
    let y = alvoY;
    let raf = 0;
    let visivel = false;

    const mover = (e) => {
      alvoX = e.clientX;
      alvoY = e.clientY;
      if (!visivel) {
        // Primeiro movimento: aparece ja na posicao certa, sem deslizar
        // do canto da tela.
        x = alvoX;
        y = alvoY;
        visivel = true;
        el.classList.add("is-visible");
      }
    };

    const sair = () => {
      visivel = false;
      el.classList.remove("is-visible");
    };

    const entrar = (e) => {
      if (e.target.closest?.(INTERATIVOS)) el.classList.add("is-over");
    };

    const largar = (e) => {
      if (e.target.closest?.(INTERATIVOS)) el.classList.remove("is-over");
    };

    const passo = () => {
      x += (alvoX - x) * 0.18;
      y += (alvoY - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(passo);
    };

    const iniciar = () => {
      if (!raf) raf = requestAnimationFrame(passo);
    };

    const parar = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    window.addEventListener("mousemove", mover, { passive: true });
    document.addEventListener("mouseleave", sair);
    document.addEventListener("mouseover", entrar);
    document.addEventListener("mouseout", largar);
    // Janela sem foco nao queima quadro a toa.
    window.addEventListener("focus", iniciar);
    window.addEventListener("blur", parar);

    iniciar();

    return () => {
      parar();
      raiz.classList.remove("cursor-custom");
      window.removeEventListener("mousemove", mover);
      document.removeEventListener("mouseleave", sair);
      document.removeEventListener("mouseover", entrar);
      document.removeEventListener("mouseout", largar);
      window.removeEventListener("focus", iniciar);
      window.removeEventListener("blur", parar);
    };
  }, [ativo]);

  if (!ativo) return null;

  return <div ref={ref} aria-hidden="true" className="cursor-dot" />;
}

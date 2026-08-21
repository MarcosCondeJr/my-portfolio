import { useEffect, useState } from "react";

function limitar(v) {
  return Math.max(0, Math.min(1, v));
}

// Distribui a opacidade entre N paradas conforme o progresso do scroll.
// Fora da janela [inicio, fim] a primeira e a ultima ficam cheias, para que
// a troca aconteca no miolo da secao e nao nas bordas — se comecasse em 0,
// a segunda parada ja apareceria antes de a secao estar de fato na tela.
//
// A soma das opacidades e sempre 1: sem clarao nem apagao no cruzamento.
export function opacidadesDaTroca(progresso, total, inicio = 0.28, fim = 0.72) {
  if (total <= 1) return [1];
  const t = limitar((progresso - inicio) / (fim - inicio)) * (total - 1);
  return Array.from({ length: total }, (_, i) => limitar(1 - Math.abs(t - i)));
}

// Progresso de 0 a 1 conforme o elemento atravessa a viewport.
//
// NOTA: o Experience.jsx tem uma copia dessa logica escrita a mao. Nao foi
// migrado de proposito — ele funciona, nao fazia parte deste pedido, e
// mexer em codigo que funciona sem necessidade e como se introduz
// regressao. Consolidar e um passo separado.
export function useScrollProgress(ref, ativo = true) {
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    if (!ativo) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const atualizar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const percorrivel = el.offsetHeight - window.innerHeight;
        if (percorrivel <= 0) {
          setProgresso(0);
          return;
        }
        setProgresso(limitar(-r.top / percorrivel));
      });
    };

    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, [ref, ativo]);

  return progresso;
}

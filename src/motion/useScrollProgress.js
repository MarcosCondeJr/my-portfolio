import { useEffect, useState } from "react";

function limitar(v) {
  return Math.max(0, Math.min(1, v));
}

// Posicao atual dentro da sequencia de paradas, de 0 a total-1. Fracionaria
// durante a troca: 0.5 significa exatamente entre a primeira e a segunda.
//
// Fora da janela [inicio, fim] fica presa nos extremos, para que a troca
// aconteca no miolo da secao e nao nas bordas — se comecasse em 0, a segunda
// parada ja apareceria antes de a secao estar de fato na tela.
function posicaoDaTroca(progresso, total, inicio, fim) {
  return limitar((progresso - inicio) / (fim - inicio)) * (total - 1);
}

// A soma das opacidades e sempre 1: sem clarao nem apagao no cruzamento.
export function opacidadesDaTroca(progresso, total, inicio = 0.28, fim = 0.72) {
  if (total <= 1) return [1];
  const t = posicaoDaTroca(progresso, total, inicio, fim);
  return Array.from({ length: total }, (_, i) => limitar(1 - Math.abs(t - i)));
}

// Escala de cada parada, para a sensacao de atravessar em vez de trocar.
//
// Quem ficou para tras tem (t - i) positivo e CRESCE alem de 1; quem ainda
// vem tem negativo e chega de tras, menor que 1. Como se a camera andasse
// para a frente atravessando a primeira parada rumo a segunda.
//
// E uma expressao so para os dois casos, e por isso e continua: no ponto
// exato em que i == t, (t - i) e zero e a escala e 1, venha de qual lado
// vier. Se quem sai encolhesse, o efeito viraria profundidade simples — que
// foi a alternativa descartada.
export function escalasDaTroca(progresso, total, inicio = 0.28, fim = 0.72, amplitude = 0.06) {
  if (total <= 1) return [1];
  const t = posicaoDaTroca(progresso, total, inicio, fim);
  return Array.from({ length: total }, (_, i) =>
    Math.min(1 + amplitude, Math.max(1 - amplitude, 1 + (t - i) * amplitude))
  );
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

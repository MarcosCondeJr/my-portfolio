import { StrictMode } from "react";
import { render, cleanup } from "@testing-library/react";
import gsap from "gsap";
import MaskedHeading from "../../components/motion/MaskedHeading";
import Reveal from "../../components/motion/Reveal";

// NOTA SOBRE O QUE ESTES TESTES CONSEGUEM E NAO CONSEGUEM COBRIR
//
// O bug original — titulos que "piscavam e sumiam" — nasce da interacao
// entre o agendamento de refresh do ScrollTrigger e o ciclo
// montar/desmontar/montar do StrictMode. Os dois dependem de layout real,
// e o jsdom nao tem layout: getComputedStyle nao devolve transform, e o
// CSSPlugin do GSAP produz NaN. Verificar valores de transform aqui seria
// medir o ambiente, nao o codigo.
//
// O que se verifica entao e o CONTRATO que a correcao estabelece: toda
// montagem arma um observador novo para o elemento. Era exatamente esse
// invariante que estava sendo violado — a segunda montagem escondia o
// elemento sem armar nada que voltasse a revela-lo.
//
// A confirmacao visual continua sendo manual, no navegador.

let observadores;

class IOEspia {
  constructor(cb, options) {
    this.cb = cb;
    this.options = options;
    this.observados = [];
    this.desconectado = false;
    observadores.push(this);
  }
  observe(el) {
    this.observados.push(el);
    this.cb([{ target: el, isIntersecting: true }], this);
  }
  unobserve() {}
  disconnect() {
    this.desconectado = true;
  }
}

beforeEach(() => {
  observadores = [];
  window.IntersectionObserver = IOEspia;
  window.matchMedia = vi.fn().mockReturnValue({ matches: false });
});

afterEach(cleanup);

describe("useReveal sob StrictMode", () => {
  it("arma um observador em cada montagem do titulo mascarado", () => {
    render(
      <StrictMode>
        <MaskedHeading lines={["Trajetória"]} />
      </StrictMode>
    );

    // StrictMode monta, desmonta e monta de novo: dois observadores.
    expect(observadores.length).toBe(2);

    // O ultimo — o da montagem que ficou de pe — precisa estar observando
    // o elemento. Se ele nao existir ou nao observar nada, o titulo fica
    // escondido para sempre, que era o bug.
    const ultimo = observadores[observadores.length - 1];
    expect(ultimo.observados.length).toBe(1);
  });

  it("arma um observador em cada montagem do elemento com fade", () => {
    render(
      <StrictMode>
        <Reveal>
          <span>conteudo</span>
        </Reveal>
      </StrictMode>
    );

    expect(observadores.length).toBe(2);
    expect(observadores[observadores.length - 1].observados.length).toBe(1);
  });

  it("dispara a revelacao quando o elemento entra na tela", () => {
    const { container } = render(<MaskedHeading lines={["Trajetória"]} />);

    const linha = container.querySelector("[data-mask-line]");
    expect(gsap.getTweensOf(linha).length).toBeGreaterThan(0);
  });

  it("nao esconde nem observa nada com movimento reduzido", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });

    const { container } = render(
      <StrictMode>
        <MaskedHeading lines={["Trajetória"]} />
      </StrictMode>
    );

    const linha = container.querySelector("[data-mask-line]");
    expect(linha.style.transform).toBe("");
    expect(observadores.length).toBe(0);
    expect(gsap.getTweensOf(linha)).toHaveLength(0);
  });
});

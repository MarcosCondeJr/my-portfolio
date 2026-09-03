import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import Carousel from "../Carousel";

const TRES = ["a.png", "b.png", "c.png"];

const matchMediaOriginal = window.matchMedia;

function pedirMovimentoReduzido() {
  window.matchMedia = (query) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  });
}

function visivel(container) {
  return container.querySelector("img.opacity-100");
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  window.matchMedia = matchMediaOriginal;
});

describe("Carousel", () => {
  it("mostra o aviso de sem imagem quando a lista esta vazia", () => {
    render(<Carousel images={[]} titulo="SignDoc" />);
    expect(screen.getByText("Sem imagem do projeto")).not.toBeNull();
  });

  // Seta e autoplay sobre uma imagem so sao movimento falso.
  it("com uma imagem nao mostra controle nenhum", () => {
    const { container } = render(<Carousel images={["a.png"]} titulo="Pethouse" />);
    expect(container.querySelectorAll("button").length).toBe(0);
    expect(container.querySelector("img").getAttribute("alt")).toBe("Pethouse");
  });

  it("com varias imagens numera o alt", () => {
    render(<Carousel images={TRES} titulo="Pethouse" />);
    expect(screen.getByAltText("Pethouse — imagem 2 de 3")).not.toBeNull();
  });

  it("a seta de avancar troca a imagem visivel", () => {
    const { container } = render(<Carousel images={TRES} titulo="P" />);
    expect(visivel(container).getAttribute("src")).toBe("a.png");
    fireEvent.click(screen.getByLabelText("Próxima imagem"));
    expect(visivel(container).getAttribute("src")).toBe("b.png");
  });

  it("a seta de voltar na primeira imagem vai para a ultima", () => {
    const { container } = render(<Carousel images={TRES} titulo="P" />);
    fireEvent.click(screen.getByLabelText("Imagem anterior"));
    expect(visivel(container).getAttribute("src")).toBe("c.png");
  });

  it("o pontinho leva direto para a imagem escolhida", () => {
    const { container } = render(<Carousel images={TRES} titulo="P" />);
    fireEvent.click(screen.getByLabelText("Ir para a imagem 3"));
    expect(visivel(container).getAttribute("src")).toBe("c.png");
  });

  it("o contador acompanha a imagem atual", () => {
    render(<Carousel images={TRES} titulo="P" />);
    expect(screen.getByText("1/3")).not.toBeNull();
    fireEvent.click(screen.getByLabelText("Próxima imagem"));
    expect(screen.getByText("2/3")).not.toBeNull();
  });

  it("a seta do teclado troca a imagem", () => {
    const { container } = render(<Carousel images={TRES} titulo="P" />);
    fireEvent.keyDown(screen.getByLabelText("Próxima imagem"), { key: "ArrowRight" });
    expect(visivel(container).getAttribute("src")).toBe("b.png");
  });

  it("o autoplay avanca sozinho", () => {
    vi.useFakeTimers();
    const { container } = render(<Carousel images={TRES} titulo="P" />);
    act(() => vi.advanceTimersByTime(5000));
    expect(visivel(container).getAttribute("src")).toBe("b.png");
  });

  it("o autoplay para enquanto o ponteiro esta em cima", () => {
    vi.useFakeTimers();
    const { container } = render(<Carousel images={TRES} titulo="P" />);
    fireEvent.mouseEnter(container.firstChild);
    act(() => vi.advanceTimersByTime(15000));
    expect(visivel(container).getAttribute("src")).toBe("a.png");
  });

  it("o autoplay volta quando o ponteiro sai", () => {
    vi.useFakeTimers();
    const { container } = render(<Carousel images={TRES} titulo="P" />);
    fireEvent.mouseEnter(container.firstChild);
    fireEvent.mouseLeave(container.firstChild);
    act(() => vi.advanceTimersByTime(5000));
    expect(visivel(container).getAttribute("src")).toBe("b.png");
  });

  // A regra que mais importa: pausa e reversivel, clique manual nao. Quem
  // tomou o controle fica com ele ate o modal fechar.
  it("o autoplay nao volta depois de clique manual", () => {
    vi.useFakeTimers();
    const { container } = render(<Carousel images={TRES} titulo="P" />);
    fireEvent.click(screen.getByLabelText("Próxima imagem"));
    act(() => vi.advanceTimersByTime(30000));
    expect(visivel(container).getAttribute("src")).toBe("b.png");
  });

  // O carrossel so monta quando alguem abriu o modal de proposito, entao
  // toda imagem que ele renderiza e para ver agora. Com loading=lazy o
  // Chrome adiava a busca dentro do painel clipado pela animacao e desenhava
  // o icone de imagem quebrada — de forma intermitente, so em tela estreita.
  it("nao adia o carregamento da imagem unica", () => {
    const { container } = render(<Carousel images={["a.png"]} titulo="P" />);
    expect(container.querySelector("img").getAttribute("loading")).not.toBe(
      "lazy",
    );
  });

  it("nao adia o carregamento de nenhuma das varias imagens", () => {
    const { container } = render(<Carousel images={TRES} titulo="P" />);
    container.querySelectorAll("img").forEach((img) => {
      expect(img.getAttribute("loading")).not.toBe("lazy");
    });
  });

  it("o autoplay nao liga com movimento reduzido", () => {
    pedirMovimentoReduzido();
    vi.useFakeTimers();
    const { container } = render(<Carousel images={TRES} titulo="P" />);
    act(() => vi.advanceTimersByTime(15000));
    expect(visivel(container).getAttribute("src")).toBe("a.png");
  });
});

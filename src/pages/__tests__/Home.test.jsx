import { readFileSync } from "node:fs";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Home from "../Home";

afterEach(cleanup);

function retratoDe(container) {
  return container.querySelector('img[src="/marcos-hero.png"]');
}

// Largura e altura vivem no IHDR, sempre o primeiro pedaco do PNG: 8 bytes de
// assinatura, 4 de tamanho, 4 do nome, e entao os dois inteiros.
//
// Caminho relativo a raiz do projeto, que e de onde o vitest roda. Nao usar
// new URL(..., import.meta.url) aqui: o Vite reescreve essa forma em tempo de
// build para virar import de asset, e com caminho montado em template ele nao
// consegue resolver e devolve undefined.
function dimensoesDoPng(caminhoDaRaiz) {
  const bytes = readFileSync(caminhoDaRaiz);
  return { largura: bytes.readUInt32BE(16), altura: bytes.readUInt32BE(20) };
}

describe("Home", () => {
  it("o nome continua sendo o h1 da pagina", () => {
    render(<Home />);
    const titulo = screen.getByRole("heading", { level: 1 });
    expect(titulo.textContent).toContain("Marcos");
  });

  it("mostra o retrato", () => {
    const { container } = render(<Home />);
    expect(retratoDe(container)).not.toBeNull();
  });

  // O retrato nao acrescenta nada que o texto ja nao diga: o nome esta no h1
  // e no span sr-only logo acima. Com alt preenchido, quem usa leitor de tela
  // ouviria "Marcos Conde" tres vezes seguidas na mesma secao.
  it("o retrato nao repete o nome para quem usa leitor de tela", () => {
    const { container } = render(<Home />);
    expect(retratoDe(container).getAttribute("alt")).toBe("");
  });

  // Sem width e height o navegador so descobre a proporcao quando o arquivo
  // chega, e o conteudo pula no meio da leitura. Este e o maior arquivo que a
  // home carrega, entao e o que mais pula.
  //
  // As dimensoes sao lidas do PNG em vez de escritas aqui de proposito: o
  // recorte ja foi trocado uma vez com o numero cravado no componente, e nada
  // avisou — o atributo que existe para evitar o salto passou a causar um.
  // Lendo o arquivo, a proxima troca falha aqui.
  it("as dimensoes declaradas batem com o arquivo no disco", () => {
    const { largura, altura } = dimensoesDoPng("public/marcos-hero.png");
    const { container } = render(<Home />);
    const retrato = retratoDe(container);
    expect(retrato.getAttribute("width")).toBe(String(largura));
    expect(retrato.getAttribute("height")).toBe(String(altura));
  });

  it("o botao rola ate os projetos", () => {
    const alvo = document.createElement("div");
    alvo.id = "projects";
    document.body.appendChild(alvo);
    window.scrollTo = vi.fn();

    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /ver projetos/i }));

    expect(window.scrollTo).toHaveBeenCalled();
    alvo.remove();
  });
});

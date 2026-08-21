import { StrictMode } from "react";
import { render, cleanup } from "@testing-library/react";
import Cursor from "../Cursor";

function simularAmbiente({ movimentoReduzido = false, ponteiroFino = true } = {}) {
  window.matchMedia = vi.fn((consulta) => {
    if (consulta.includes("prefers-reduced-motion")) {
      return { matches: movimentoReduzido };
    }
    if (consulta.includes("pointer: fine")) {
      return { matches: ponteiroFino };
    }
    return { matches: false };
  });
}

afterEach(() => {
  cleanup();
  document.documentElement.classList.remove("cursor-custom");
});

describe("Cursor", () => {
  it("nao renderiza em dispositivo sem ponteiro fino", () => {
    simularAmbiente({ ponteiroFino: false });
    const { container } = render(<Cursor />);
    expect(container.querySelector(".cursor-dot")).toBeNull();
  });

  it("nao renderiza quando o usuario pede movimento reduzido", () => {
    simularAmbiente({ movimentoReduzido: true });
    const { container } = render(<Cursor />);
    expect(container.querySelector(".cursor-dot")).toBeNull();
  });

  // O teste que mais importa: se o cursor customizado nao existe, o cursor
  // do sistema TEM que continuar la. Esconder o nativo sem colocar nada no
  // lugar deixa a pessoa sem cursor nenhum.
  it("nao esconde o cursor nativo quando nao renderiza", () => {
    simularAmbiente({ ponteiroFino: false });
    render(<Cursor />);
    expect(document.documentElement.classList.contains("cursor-custom")).toBe(false);
  });

  it("renderiza e esconde o cursor nativo quando o ambiente permite", () => {
    simularAmbiente();
    const { container } = render(<Cursor />);
    expect(container.querySelector(".cursor-dot")).not.toBeNull();
    expect(document.documentElement.classList.contains("cursor-custom")).toBe(true);
  });

  it("devolve o cursor nativo ao desmontar", () => {
    simularAmbiente();
    const { unmount } = render(<Cursor />);
    unmount();
    expect(document.documentElement.classList.contains("cursor-custom")).toBe(false);
  });

  // Mesma licao do bug dos titulos: o StrictMode monta, desmonta e monta.
  // A limpeza remove a classe, entao a segunda montagem precisa recoloca-la.
  it("continua ativo depois do ciclo de montagem do StrictMode", () => {
    simularAmbiente();
    const { container } = render(
      <StrictMode>
        <Cursor />
      </StrictMode>
    );
    expect(container.querySelector(".cursor-dot")).not.toBeNull();
    expect(document.documentElement.classList.contains("cursor-custom")).toBe(true);
  });
});

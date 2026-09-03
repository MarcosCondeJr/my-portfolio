import { StrictMode } from "react";
import { render, cleanup } from "@testing-library/react";
import AboutScroll from "../AboutScroll";

const PARADAS = [
  { id: "prof", rotulo: "O profissional", titulo: "Full Stack", texto: "Texto um." },
  { id: "pess", rotulo: "O pessoal", titulo: "Músico", texto: "Texto dois." },
];

function simularAmbiente({ movimentoReduzido = false, telaLarga = true } = {}) {
  window.matchMedia = vi.fn((consulta) => {
    if (consulta.includes("prefers-reduced-motion")) {
      return { matches: movimentoReduzido };
    }
    if (consulta.includes("min-width")) {
      return { matches: telaLarga };
    }
    return { matches: false };
  });
}

afterEach(cleanup);

describe("AboutScroll", () => {
  it("vira trilho travado em tela larga com movimento normal", () => {
    simularAmbiente();
    const { container } = render(<AboutScroll paradas={PARADAS} />);
    expect(container.querySelector("[data-trilho]")).not.toBeNull();
  });

  // Trilho de 250vh num celular com rolagem por inercia e onde isso quebra
  // feio: a pessoa acha que o site travou e fecha.
  it("nao vira trilho em tela estreita", () => {
    simularAmbiente({ telaLarga: false });
    const { container } = render(<AboutScroll paradas={PARADAS} />);
    expect(container.querySelector("[data-trilho]")).toBeNull();
  });

  it("nao vira trilho com movimento reduzido", () => {
    simularAmbiente({ movimentoReduzido: true });
    const { container } = render(<AboutScroll paradas={PARADAS} />);
    expect(container.querySelector("[data-trilho]")).toBeNull();
  });

  // O conteudo nunca pode depender do mecanismo: as duas paradas precisam
  // estar no documento nos dois caminhos de codigo.
  it("mostra o conteudo das duas paradas em qualquer um dos modos", () => {
    simularAmbiente();
    const travado = render(<AboutScroll paradas={PARADAS} />);
    expect(travado.getByText("Full Stack")).toBeTruthy();
    expect(travado.getByText("Músico")).toBeTruthy();
    cleanup();

    simularAmbiente({ telaLarga: false });
    const empilhado = render(<AboutScroll paradas={PARADAS} />);
    expect(empilhado.getByText("Full Stack")).toBeTruthy();
    expect(empilhado.getByText("Músico")).toBeTruthy();
  });

  it("sobrevive ao ciclo de montagem do StrictMode", () => {
    simularAmbiente();
    const { container } = render(
      <StrictMode>
        <AboutScroll paradas={PARADAS} />
      </StrictMode>
    );
    expect(container.querySelector("[data-trilho]")).not.toBeNull();
  });
});

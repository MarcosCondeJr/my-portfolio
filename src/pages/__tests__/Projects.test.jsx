import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { projects } from "../../data/projects";
import Projects from "../Projects";

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

function verMais() {
  return screen.getAllByText(/Ver mais/)[0];
}

describe("Projects", () => {
  it("comeca sem modal", () => {
    render(<Projects />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("clicar no card abre o modal do projeto", () => {
    render(<Projects />);
    fireEvent.click(verMais());
    const dialogo = screen.getByRole("dialog");
    expect(dialogo.getAttribute("aria-label")).toBe(projects[0].title);
  });

  it("fechar tira o modal da tela", () => {
    render(<Projects />);
    fireEvent.click(verMais());
    fireEvent.click(screen.getByLabelText("Fechar"));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  // Sem isto quem navega por teclado e devolvido ao inicio do documento e
  // precisa percorrer a pagina toda de novo para chegar ao proximo projeto.
  it("fechar devolve o foco ao card que abriu", () => {
    render(<Projects />);
    const botao = verMais();
    fireEvent.click(botao);
    fireEvent.click(screen.getByLabelText("Fechar"));
    expect(document.activeElement).toBe(botao);
  });
});

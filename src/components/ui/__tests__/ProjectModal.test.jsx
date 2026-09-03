import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ProjectModal from "../ProjectModal";

const PROJETO = {
  id: "pethouse",
  title: "Pethouse",
  subtitle: "Gestão de pets para tutores",
  type: "profissional",
  images: ["capa.png"],
  problema: "Tutor perde o histórico de vacina.",
  solucao: "Um registro por pet com lembretes.",
  papel: "Frontend em React Native.",
  stack: ["React Native"],
  links: { github: "", githubEnabled: false, demo: "", demoEnabled: false },
  team: [],
};

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

function abrir(extra = {}, onClose = () => {}) {
  return render(
    <ProjectModal project={{ ...PROJETO, ...extra }} open onClose={onClose} />,
  );
}

afterEach(() => {
  cleanup();
  window.matchMedia = matchMediaOriginal;
  document.body.style.overflow = "";
});

describe("ProjectModal", () => {
  it("nao renderiza nada quando fechado", () => {
    const { container } = render(
      <ProjectModal project={PROJETO} open={false} onClose={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("nao renderiza nada sem projeto", () => {
    const { container } = render(
      <ProjectModal project={null} open onClose={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("mostra os tres blocos de texto", () => {
    abrir();
    expect(screen.getByText("Problema")).not.toBeNull();
    expect(screen.getByText("Tutor perde o histórico de vacina.")).not.toBeNull();
    expect(screen.getByText("Solução")).not.toBeNull();
    expect(screen.getByText("Um registro por pet com lembretes.")).not.toBeNull();
    expect(screen.getByText("Meu papel")).not.toBeNull();
    expect(screen.getByText("Frontend em React Native.")).not.toBeNull();
  });

  // O texto de "meu papel" e escrito pelo Marcos e entra por ultimo. Ate la
  // o bloco nao pode aparecer com o titulo orfao em cima do vazio.
  it("esconde o bloco de papel enquanto ele esta vazio", () => {
    abrir({ papel: "" });
    expect(screen.queryByText("Meu papel")).toBeNull();
  });

  it("fecha no Escape", () => {
    const onClose = vi.fn();
    abrir({}, onClose);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("fecha no botao de fechar", () => {
    const onClose = vi.fn();
    abrir({}, onClose);
    fireEvent.click(screen.getByLabelText("Fechar"));
    expect(onClose).toHaveBeenCalled();
  });

  it("fecha no clique do fundo", () => {
    const onClose = vi.fn();
    const { container } = abrir({}, onClose);
    fireEvent.click(container.querySelector("[data-fundo]"));
    expect(onClose).toHaveBeenCalled();
  });

  it("nao mostra equipe quando o projeto e solo", () => {
    abrir({ team: [] });
    expect(screen.queryByText("Equipe")).toBeNull();
  });

  it("mostra equipe quando ela existe", () => {
    abrir({ team: [{ name: "Wesley Sales", role: "Backend" }] });
    expect(screen.getByText("Wesley Sales")).not.toBeNull();
  });

  // Sem isto a pagina rola atras do modal enquanto se le o projeto.
  it("trava o scroll do body enquanto aberto", () => {
    abrir();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("devolve o scroll do body ao fechar", () => {
    const { unmount } = abrir();
    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  // O que nao pode acontecer de jeito nenhum: a animacao esconder o conteudo
  // e nao trazer de volta. Com movimento reduzido nada e escondido.
  it("com movimento reduzido o conteudo nasce visivel", () => {
    pedirMovimentoReduzido();
    const { container } = abrir();
    container.querySelectorAll("[data-stagger]").forEach((bloco) => {
      expect(bloco.style.opacity).toBe("");
    });
  });
});

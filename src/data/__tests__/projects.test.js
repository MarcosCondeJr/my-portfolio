import { projects } from "../projects";

describe("projects", () => {
  it("tem pelo menos um projeto", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it.each(projects)("$id tem images como array", (projeto) => {
    expect(Array.isArray(projeto.images)).toBe(true);
  });

  it.each(projects)("$id tem todas as images como string", (projeto) => {
    projeto.images.forEach((src) => expect(typeof src).toBe("string"));
  });

  it.each(projects)("$id descreve o problema", (projeto) => {
    expect(projeto.problema?.trim().length).toBeGreaterThan(0);
  });

  it.each(projects)("$id descreve a solucao", (projeto) => {
    expect(projeto.solucao?.trim().length).toBeGreaterThan(0);
  });

  // Este e string, mas pode ser vazio: o texto de "meu papel" e do Marcos e
  // entra por ultimo. O que o teste impede e o campo sumir.
  it.each(projects)("$id tem o campo papel", (projeto) => {
    expect(typeof projeto.papel).toBe("string");
  });

  // Os campos velhos foram substituidos por images[] e pelos tres blocos de
  // texto. Se um voltar, e projeto novo copiado de um exemplo antigo.
  it.each(projects)("$id nao carrega mais os campos velhos", (projeto) => {
    expect(projeto.image).toBeUndefined();
    expect(projeto.description).toBeUndefined();
  });
});

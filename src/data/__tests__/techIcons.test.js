import { techIcons } from "../techIcons";
import { projects } from "../projects";
import { experiences } from "../experiences";
import { skillGroups } from "../skills";

const usadas = [
  ...projects.flatMap((p) => p.stack),
  ...experiences.flatMap((e) => e.stack),
  ...skillGroups.flatMap((g) => g.items),
];

const unicas = [...new Set(usadas)].sort();

describe("techIcons", () => {
  it.each(unicas)("tem icone para a tecnologia %s", (nome) => {
    expect(techIcons[nome]).toBeDefined();
  });

  it("nao tem chaves orfas sem uso em nenhum dado", () => {
    const orfas = Object.keys(techIcons).filter((k) => !unicas.includes(k));
    expect(orfas).toEqual([]);
  });
});

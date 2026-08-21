import { opacidadesDaTroca } from "../useScrollProgress";

describe("opacidadesDaTroca", () => {
  it("mantem so a primeira parada visivel antes da transicao comecar", () => {
    expect(opacidadesDaTroca(0, 2)).toEqual([1, 0]);
    expect(opacidadesDaTroca(0.2, 2)).toEqual([1, 0]);
  });

  it("mantem so a ultima parada visivel depois da transicao terminar", () => {
    expect(opacidadesDaTroca(0.8, 2)).toEqual([0, 1]);
    expect(opacidadesDaTroca(1, 2)).toEqual([0, 1]);
  });

  it("cruza as duas na metade da transicao", () => {
    const meio = opacidadesDaTroca(0.5, 2);
    expect(meio[0]).toBeCloseTo(0.5, 1);
    expect(meio[1]).toBeCloseTo(0.5, 1);
  });

  it("soma sempre 1 entre duas paradas, sem clarao nem apagao no meio", () => {
    for (let p = 0; p <= 1; p += 0.05) {
      const soma = opacidadesDaTroca(p, 2).reduce((a, b) => a + b, 0);
      expect(soma).toBeCloseTo(1, 5);
    }
  });

  it("funciona com tres paradas, cruzando uma de cada vez", () => {
    expect(opacidadesDaTroca(0, 3)).toEqual([1, 0, 0]);
    expect(opacidadesDaTroca(1, 3)).toEqual([0, 0, 1]);
    const meio = opacidadesDaTroca(0.5, 3);
    expect(meio[1]).toBeCloseTo(1, 1);
  });

  it("devolve uma so opacidade quando ha uma parada", () => {
    expect(opacidadesDaTroca(0.5, 1)).toEqual([1]);
  });
});

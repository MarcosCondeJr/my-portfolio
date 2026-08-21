import { escalasDaTroca, opacidadesDaTroca } from "../useScrollProgress";

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

describe("escalasDaTroca", () => {
  it("comeca com a primeira em tamanho cheio e a segunda recuada", () => {
    const [a, b] = escalasDaTroca(0, 2);
    expect(a).toBeCloseTo(1, 5);
    expect(b).toBeCloseTo(0.94, 5);
  });

  it("termina com a primeira crescida e a segunda em tamanho cheio", () => {
    const [a, b] = escalasDaTroca(1, 2);
    expect(a).toBeCloseTo(1.06, 5);
    expect(b).toBeCloseTo(1, 5);
  });

  // A sensacao de "atravessar" vem daqui: quem sai NAO encolhe, cresce.
  // Se a primeira parada terminasse menor que 1, o efeito viraria o de
  // profundidade simples, que era a opcao descartada.
  it("faz a parada que sai crescer, nunca encolher", () => {
    let anterior = -Infinity;
    for (let p = 0; p <= 1; p += 0.05) {
      const [saindo] = escalasDaTroca(p, 2);
      expect(saindo).toBeGreaterThanOrEqual(anterior - 1e-9);
      anterior = saindo;
    }
    expect(anterior).toBeGreaterThan(1);
  });

  it("faz a parada que entra vir de tras ate o tamanho cheio", () => {
    let anterior = -Infinity;
    for (let p = 0; p <= 1; p += 0.05) {
      const entrando = escalasDaTroca(p, 2)[1];
      expect(entrando).toBeGreaterThanOrEqual(anterior - 1e-9);
      anterior = entrando;
    }
    expect(anterior).toBeCloseTo(1, 5);
  });

  it("cruza exatamente em 1 quando as duas estao meio a meio", () => {
    const escalas = escalasDaTroca(0.5, 2);
    expect(escalas[0]).toBeCloseTo(1.03, 2);
    expect(escalas[1]).toBeCloseTo(0.97, 2);
  });

  it("nunca sai da faixa, mesmo com muitas paradas", () => {
    for (let p = 0; p <= 1; p += 0.05) {
      escalasDaTroca(p, 5).forEach((e) => {
        expect(e).toBeGreaterThanOrEqual(0.94);
        expect(e).toBeLessThanOrEqual(1.06);
      });
    }
  });

  it("devolve uma so escala quando ha uma parada", () => {
    expect(escalasDaTroca(0.5, 1)).toEqual([1]);
  });
});

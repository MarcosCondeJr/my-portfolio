import { repeticoesNecessarias } from "../marquee";

describe("repeticoesNecessarias", () => {
  // O caso real que gerou o bug: uma copia de 440px numa tela de 1536px.
  // Com duas copias o texto acabava aos 880px — 57% da tela — e o resto
  // ficava vazio, dando a impressao de que a faixa "vinha da metade".
  it("cobre a tela mais uma copia de folga", () => {
    expect(repeticoesNecessarias(440, 1536)).toBe(5);
  });

  it("gera cobertura maior que a tela em qualquer combinacao plausivel", () => {
    const larguras = [120, 300, 440, 780, 1200];
    const telas = [360, 768, 1024, 1536, 2560, 3840];

    larguras.forEach((copia) => {
      telas.forEach((tela) => {
        const n = repeticoesNecessarias(copia, tela);
        // Precisa sobrar pelo menos uma copia alem da tela: e essa folga
        // que cobre o instante do reinicio do laco.
        expect(n * copia).toBeGreaterThanOrEqual(tela + copia);
      });
    });
  });

  it("usa duas copias quando uma so ja e mais larga que a tela", () => {
    expect(repeticoesNecessarias(2000, 1536)).toBe(2);
  });

  it("nunca desce de duas copias", () => {
    expect(repeticoesNecessarias(5000, 320)).toBe(2);
  });

  it("aguenta medida invalida sem quebrar", () => {
    expect(repeticoesNecessarias(0, 1536)).toBe(2);
    expect(repeticoesNecessarias(-10, 1536)).toBe(2);
    expect(repeticoesNecessarias(NaN, 1536)).toBe(2);
  });
});

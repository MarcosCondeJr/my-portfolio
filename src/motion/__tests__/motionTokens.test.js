import { MOTION, shouldAnimate } from "../motionTokens";

describe("shouldAnimate", () => {
  it("retorna false quando o usuario pede movimento reduzido", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    expect(shouldAnimate()).toBe(false);
  });

  it("retorna true quando o usuario nao pede movimento reduzido", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    expect(shouldAnimate()).toBe(true);
  });

  it("consulta exatamente a media query de movimento reduzido", () => {
    const espia = vi.fn().mockReturnValue({ matches: false });
    window.matchMedia = espia;
    shouldAnimate();
    expect(espia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });

  it("retorna false quando matchMedia nao existe no ambiente", () => {
    window.matchMedia = undefined;
    expect(shouldAnimate()).toBe(false);
  });
});

describe("MOTION", () => {
  it("e imutavel para que nenhum componente altere o ritmo global", () => {
    expect(Object.isFrozen(MOTION)).toBe(true);
  });

  // A mascara do modal e mais rapida que a da pagina: modal que demora a
  // abrir irrita. Sao duracoes diferentes de proposito.
  it("tem uma duracao propria para a mascara do modal", () => {
    expect(MOTION.modalMask).toBeGreaterThan(0);
    expect(MOTION.modalMask).toBeLessThan(MOTION.maskDuration);
  });
});

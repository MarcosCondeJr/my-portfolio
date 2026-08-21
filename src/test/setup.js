// O ScrollTrigger chama matchMedia no momento em que e registrado, o que
// acontece ao carregar o modulo — antes de qualquer beforeEach. Sem isto,
// qualquer teste que importe um componente de movimento quebra no import.
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  });
}

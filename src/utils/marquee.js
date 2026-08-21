// Quantas copias do texto sao necessarias para a faixa nunca ter buraco.
//
// Precisa cobrir a tela inteira MAIS uma copia de folga: a folga e o que
// preenche o lado direito no instante em que o laco reinicia. Com duas
// copias fixas, um texto de 440px numa tela de 1536px acabava aos 880px e
// deixava 656px de vazio permanente — a faixa parecia "vir da metade".
export function repeticoesNecessarias(larguraCopia, larguraTela) {
  if (!Number.isFinite(larguraCopia) || larguraCopia <= 0) return 2;
  return Math.max(2, Math.ceil(larguraTela / larguraCopia) + 1);
}

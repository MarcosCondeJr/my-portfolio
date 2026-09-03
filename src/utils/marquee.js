export function repeticoesNecessarias(larguraCopia, larguraTela) {
  if (!Number.isFinite(larguraCopia) || larguraCopia <= 0) return 2;
  return Math.max(2, Math.ceil(larguraTela / larguraCopia) + 1);
}

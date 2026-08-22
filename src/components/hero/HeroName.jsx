import MaskedHeading from "../motion/MaskedHeading";

// So a tipografia do nome.
//
// Este arquivo era o LayeredHero e carregava tambem dois modos com foto: o
// recorte subindo entre as duas palavras e um bloco retangular em duotone.
// Ambos sairam. A composicao escolhida poe o retrato numa camada propria,
// ancorada na base da secao, e nao mais entre MARCOS e CONDE — ver
// HeroPortrait. Manter modos que ninguem usa so faz o proximo leitor perder
// tempo decidindo qual esta valendo.
//
// A entrelinha decide o respiro entre as duas palavras: as maiusculas da
// Anton ocupam ~73% do tamanho da fonte, entao 0.9 deixa uns 17% de folga.
export default function HeroName() {
  const tipo = "font-display uppercase leading-[0.9] tracking-[0.01em]";

  return (
    <div className="text-[clamp(3.5rem,15vw,11rem)]">
      <MaskedHeading as="h1" lines={["Marcos"]} className={tipo} />
      <MaskedHeading
        as="p"
        lines={["Conde"]}
        delay={0.12}
        aria-hidden="true"
        className={tipo}
      />
    </div>
  );
}

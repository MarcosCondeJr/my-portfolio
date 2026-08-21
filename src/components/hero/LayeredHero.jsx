import MaskedHeading from "../motion/MaskedHeading";

// Tres modos, decididos pela prop photo:
//
//   sem photo      so tipografia, as duas palavras empilhadas
//   photo+cutout   PNG transparente sobe entre os textos e as palavras
//                  atravessam o corpo (o efeito do ref 1)
//   photo          bloco retangular entre as palavras, tratado em duotone
//
// O modo sem foto e o atual: as fotos recortadas ainda nao convenceram e a
// decisao ficou em aberto. A logica de camada continua aqui inteira — para
// voltar, basta passar photo e cutout de novo.
//
// O tamanho da fonte fica NO CONTEINER, nao nos titulos: as margens
// negativas que criam a sobreposicao estao em em, e em mede contra o
// font-size do proprio elemento. Se o tamanho ficasse so nos titulos, a
// div da foto herdaria os 16px do body e a sobreposicao seria de 3px em
// vez de ~45px — o efeito simplesmente nao apareceria.
export default function LayeredHero({ photo, alt, cutout = false }) {
  const tipo = "font-display uppercase leading-[0.82] tracking-[0.01em]";
  const temFoto = Boolean(photo);

  return (
    <div
      className={`relative text-[clamp(3.5rem,15vw,11rem)] ${
        temFoto && cutout ? "text-center" : ""
      }`}
    >
      <MaskedHeading
        as="h1"
        lines={["Marcos"]}
        className={`relative z-0 ${tipo}`}
      />

      {temFoto && (
        <div
          className={
            cutout
              ? "relative z-10 -mt-[0.28em] -mb-[0.22em] flex justify-center"
              : "relative z-10 my-8 flex justify-center"
          }
        >
          {cutout ? (
            <img
              src={photo}
              alt={alt}
              className="max-h-[62vh] w-auto object-contain"
            />
          ) : (
            <div className="w-full max-w-lg overflow-hidden bg-accent">
              <img
                src={photo}
                alt={alt}
                className="w-full object-cover grayscale mix-blend-luminosity"
              />
            </div>
          )}
        </div>
      )}

      <MaskedHeading
        as="p"
        lines={["Conde"]}
        delay={0.12}
        aria-hidden="true"
        className={`relative z-20 ${tipo}`}
      />
    </div>
  );
}

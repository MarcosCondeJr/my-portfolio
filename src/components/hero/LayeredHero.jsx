import MaskedHeading from "../motion/MaskedHeading";

// Tres planos de profundidade:
//   z-0   MARCOS   (atras)
//   z-10  foto
//   z-20  CONDE    (na frente)
//
// Com cutout=false a foto entra como bloco retangular entre as palavras:
// a composicao em tres camadas se le, mas nao ha sobreposicao real. Com
// cutout=true o PNG transparente sobe entre os textos e as palavras
// atravessam o corpo.
export default function LayeredHero({ photo, alt, cutout = false }) {
  const tipo =
    "font-display uppercase leading-[0.82] tracking-[0.01em] text-[clamp(3.5rem,15vw,11rem)]";

  return (
    <div className="relative">
      <MaskedHeading
        as="h1"
        lines={["Marcos"]}
        className={`relative z-0 ${tipo}`}
      />

      <div
        className={
          cutout
            ? "relative z-10 -mt-[0.22em] -mb-[0.16em] flex justify-center"
            : "relative z-10 my-8 flex justify-center"
        }
      >
        {cutout ? (
          <img
            src={photo}
            alt={alt}
            className="max-h-[58vh] w-auto object-contain"
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

      <p aria-hidden="true" className={`relative z-20 ${tipo}`}>
        <span className="block overflow-hidden">
          <span className="block">Conde</span>
        </span>
      </p>
    </div>
  );
}

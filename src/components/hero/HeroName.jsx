import MaskedHeading from "../motion/MaskedHeading";

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

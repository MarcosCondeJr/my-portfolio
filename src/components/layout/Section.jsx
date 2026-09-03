import Reveal from "../motion/Reveal";
import MaskedHeading from "../motion/MaskedHeading";

// Invólucro de toda secao. O data-tone e o que faz a cor de tudo que esta
// dentro se resolver sozinho — nenhum filho precisa saber em que tom esta.
export default function Section({
  tone = "light",
  id,
  number,
  label,
  title,
  children,
  className = "",
}) {
  const linhas = Array.isArray(title) ? title : title ? [title] : [];

  return (
    <section
      id={id}
      data-tone={tone}
      className={`bg-surface text-ink px-6 py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">
        {(number || label) && (
          <Reveal
            as="p"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            {number}
            {number && label ? " — " : ""}
            {label}
          </Reveal>
        )}

        {linhas.length > 0 && (
          <MaskedHeading
            lines={linhas}
            className="mt-4 font-display text-[clamp(2.25rem,6vw,4.5rem)] uppercase leading-[0.88] tracking-[0.01em]"
          />
        )}

        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}

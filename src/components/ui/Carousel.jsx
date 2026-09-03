import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { shouldAnimate } from "../../motion/motionTokens";

const INTERVALO = 5000;
const ALTURA = "h-64 sm:h-80";

export default function Carousel({ images = [], titulo = "" }) {
  const total = images.length;
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  // Pausa e reversivel; assumir o controle nao e. Depois de um clique manual
  // o autoplay nao volta, senao ele arranca a imagem de quem esta olhando.
  const [assumido, setAssumido] = useState(false);

  const avancar = useCallback(() => {
    setAtual((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    if (total < 2 || pausado || assumido || !shouldAnimate()) return;
    const id = setInterval(avancar, INTERVALO);
    return () => clearInterval(id);
  }, [total, pausado, assumido, avancar]);

  function irPara(i) {
    setAtual(i);
    setAssumido(true);
  }

  function anterior() {
    irPara((atual - 1 + total) % total);
  }

  function proxima() {
    irPara((atual + 1) % total);
  }

  function aoTeclar(e) {
    if (e.key === "ArrowLeft") anterior();
    if (e.key === "ArrowRight") proxima();
  }

  if (total === 0) {
    return (
      <div
        className={`flex ${ALTURA} w-full items-center justify-center gap-2 bg-accent text-white`}
      >
        <ImageIcon size={18} />
        <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
          Sem imagem do projeto
        </span>
      </div>
    );
  }

  if (total === 1) {
    return (
      <img
        src={images[0]}
        alt={titulo}
        className={`${ALTURA} w-full object-cover`}
      />
    );
  }

  const seta =
    "absolute top-1/2 -translate-y-1/2 cursor-pointer bg-surface/90 p-2 text-ink transition-colors hover:text-accent";

  return (
    <div
      className={`relative ${ALTURA} w-full overflow-hidden bg-accent`}
      aria-roledescription="carrossel"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      onKeyDown={aoTeclar}
    >
      {images.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt={`${titulo} — imagem ${i + 1} de ${total}`}
          aria-hidden={i !== atual}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            i === atual ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <button
        type="button"
        onClick={anterior}
        aria-label="Imagem anterior"
        className={`${seta} left-0`}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        onClick={proxima}
        aria-label="Próxima imagem"
        className={`${seta} right-0`}
      >
        <ChevronRight size={20} />
      </button>

      <p
        aria-live="polite"
        className="absolute right-3 top-3 bg-surface/90 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-ink"
      >
        {atual + 1}/{total}
      </p>

      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {images.map((src, i) => (
          <button
            key={`ponto-${src}-${i}`}
            type="button"
            onClick={() => irPara(i)}
            aria-label={`Ir para a imagem ${i + 1}`}
            aria-current={i === atual}
            className={`h-1.5 w-6 cursor-pointer ${
              i === atual ? "bg-surface" : "bg-surface/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

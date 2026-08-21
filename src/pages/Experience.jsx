import { useEffect, useRef, useState } from "react";
import { experiences } from "../data/experiences";
import { techIcons } from "../data/techIcons";
import Section from "../components/layout/Section";
import Reveal from "../components/motion/Reveal";

export default function Experience() {
  const wrapRef = useRef(null);
  const itemRefs = useRef([]);
  const [progress, setProgress] = useState(0);
  const [activeItems, setActiveItems] = useState([]);

  // Linha preenchendo (scroll)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;

        const start = vh * 0.85;
        const end = vh * 0.15;

        const total = rect.height + start - end;
        const current = start - rect.top;

        const p = Math.min(1, Math.max(0, current / total));
        setProgress(p);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Pontos "acendem" ao entrar na viewport
  useEffect(() => {
    const observers = [];

    itemRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveItems((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <Section
      tone="light"
      id="experience"
      number="03"
      label="Experiência"
      title="Trajetória"
    >
      <div ref={wrapRef} className="relative">
        {/* Linha base */}
        <div className="absolute left-0 top-0 hidden h-full w-px bg-line md:block" />

        {/* Linha preenchida */}
        <div
          className="absolute left-0 top-0 hidden w-px bg-accent md:block"
          style={{ height: `${progress * 100}%` }}
        />

        <div className="space-y-14">
          {experiences.map((exp, index) => {
            const isActive = activeItems.includes(index);

            return (
              <div
                key={exp.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="relative md:pl-12"
              >
                {/* Ponto */}
                <div
                  className={`absolute left-0 top-2 hidden h-3 w-3 -translate-x-1/2 rounded-full transition-all duration-500 md:block ${
                    isActive ? "bg-accent scale-110" : "border border-line bg-surface"
                  }`}
                />

                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {exp.period}
                </span>

                <h3 className="mt-3 font-display text-2xl uppercase leading-none md:text-3xl">
                  {exp.role}
                </h3>

                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {exp.company}
                </p>

                <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">
                  {exp.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="flex items-center gap-2 border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.13em] text-muted"
                    >
                      {techIcons[tech]}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Reveal
        as="p"
        className="mt-12 font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
      >
        Estágio em 2024 · efetivado em 2025 · mesma empresa
      </Reveal>
    </Section>
  );
}

import { useEffect, useRef, useState } from "react";
import { experiences } from "../data/experiences";
import { techIcons } from "../data/techIcons";

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

  // Pontos “acendem” ao entrar na viewport
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
    <section id="experience" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Experiência
        </h2>

        <div ref={wrapRef} className="mt-16 relative">
          {/* Linha base */}
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-black/10 dark:bg-white/10" />

          {/* Linha preenchida */}
          <div
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-px bg-blue-400/80"
            style={{
              height: `${progress * 100}%`,
              boxShadow: "0 0 18px rgba(96,165,250,0.35)",
            }}
          />

          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const isActive = activeItems.includes(index);

              return (
                <div
                  key={exp.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className="relative"
                >
                  {/* Ponto */}
                  <div
                    className={`
                      hidden md:block
                      absolute left-1/2 top-6 -translate-x-1/2
                      w-4 h-4 rounded-full border-4
                      z-10 transition-all duration-500
                      ${
                        isActive
                          ? "bg-blue-400 scale-110"
                          : "bg-zinc-300 dark:bg-zinc-700 scale-100"
                      }
                      border-white dark:border-zinc-950
                    `}
                    style={
                      isActive
                        ? { boxShadow: "0 0 25px rgba(96,165,250,0.55)" }
                        : undefined
                    }
                  />

                  <div
                    className={`md:w-1/2 ${
                      isLeft
                        ? "md:pr-12 text-right"
                        : "md:pl-12 md:ml-auto text-left"
                    }`}
                  >
                    <div
                      className="
                        rounded-2xl
                        border border-black/10 dark:border-white/10
                        bg-white/70 dark:bg-zinc-950/50
                        backdrop-blur
                        p-6
                        shadow-lg
                        hover:shadow-blue-500/10
                        transition
                      "
                    >
                      <span className="text-xs uppercase tracking-wide text-blue-400">
                        {exp.period}
                      </span>

                      <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {exp.role}
                      </h3>

                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {exp.company}
                      </p>

                      <p className="mt-4 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {exp.description}
                      </p>

                      <div
                        className={`mt-4 flex flex-wrap gap-2 ${
                          isLeft ? "justify-end" : "justify-start"
                        }`}
                      >
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="
                              px-3 py-1 text-xs
                              rounded-full
                              bg-blue-400/10 text-blue-400
                              border border-blue-400/20
                              flex gap-2 items-center
                            "
                          >
                            {techIcons[tech]}
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

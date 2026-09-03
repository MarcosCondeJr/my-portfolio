import Section from "../components/layout/Section";
import Reveal from "../components/motion/Reveal";
import { skillGroups } from "../data/skills";
import { techIcons } from "../data/techIcons";

export default function Skills() {
  return (
    <Section
      tone="light"
      id="skills"
      number="05"
      label="Habilidades"
      title="Com o que eu trabalho"
    >
      <div className="divide-y divide-line border-y border-line">
        {skillGroups.map((grupo, i) => (
          <Reveal key={grupo.category} delay={i * 0.08}>
            <div className="grid gap-4 py-7 md:grid-cols-[180px_1fr] md:items-baseline">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                {grupo.category}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {grupo.items.map((nome) => (
                  <span
                    key={nome}
                    className="flex items-center gap-2 text-xl md:text-2xl"
                  >
                    <span className="text-muted" aria-hidden="true">
                      {techIcons[nome]}
                    </span>
                    {nome}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

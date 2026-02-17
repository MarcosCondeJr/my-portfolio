import { experiences } from "../data/experiences";
import { techIcons } from "../data/techIcons";

export default function Experience() {
  return (
    <section id="experience" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Experiência
        </h2>

        <div className="mt-16 relative">

          {/* Linha vertical */}
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-white/10" />

          <div className="space-y-16">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={exp.id} className="relative">

                <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-400 border-4 border-zinc-950 z-10" />

                <div
                  className={`md:w-1/2 ${
                    isLeft
                      ? "md:pr-12 text-right"
                      : "md:pl-12 md:ml-auto text-left"
                  }`}
                >
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-lg hover:shadow-blue-500/10 transition">

                    <span className="text-xs uppercase tracking-wide text-blue-400">
                      {exp.period}
                    </span>

                    <h3 className="mt-2 text-xl font-semibold text-zinc-100">
                      {exp.role}
                    </h3>

                    <p className="text-sm text-zinc-400">
                      {exp.company}
                    </p>

                    <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="mt-4 flex flex-wrap justify-end gap-2">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-blue-400/10 text-blue-400 border flex gap-2 items-center border-blue-400/20"
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

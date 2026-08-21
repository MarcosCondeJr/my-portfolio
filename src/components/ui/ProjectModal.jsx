import { useEffect } from "react";
import { X, ExternalLink, Github, Lock, ImageIcon, Linkedin } from "lucide-react";
import { techIcons } from "../../data/techIcons";

export default function ProjectModal({ project, open, onClose }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !project) return null;

  const githubEnabled = project.links?.githubEnabled ?? !!project.links?.github;
  const demoEnabled = project.links?.demoEnabled ?? !!project.links?.demo;
  const tipo = project.type === "profissional" ? "Profissional" : "Pessoal";

  const rotulo =
    "font-mono text-[10px] uppercase tracking-[0.16em] text-muted";

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/70" />

      <div
        data-tone="light"
        className="relative flex h-[85vh] w-[95%] max-w-3xl flex-col overflow-hidden border border-line bg-surface text-ink"
      >
        <div className="relative h-52 shrink-0 bg-accent sm:h-64">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center gap-2 text-white">
              <ImageIcon size={18} />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                Sem imagem do projeto
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 cursor-pointer bg-surface p-2 text-ink"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 text-left [scrollbar-width:thin]">
          <span className={rotulo}>{tipo}</span>

          <h3 className="mt-3 font-display text-3xl uppercase leading-none sm:text-4xl">
            {project.title}
          </h3>

          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            {project.subtitle}
          </p>

          <div className="mt-10">
            <h4 className={rotulo}>Descrição do projeto</h4>
            <p className="mt-4 max-w-[68ch] leading-relaxed text-muted">
              {project.description}
            </p>
          </div>

          <div className="mt-10">
            <h4 className={rotulo}>Tecnologias</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  title={tech}
                  className="inline-flex items-center gap-2 border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.13em] text-muted"
                >
                  <span className="text-base leading-none">{techIcons[tech]}</span>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.team && project.team.length > 0 && (
            <div className="mt-10">
              <h4 className={rotulo}>Equipe</h4>

              <div className="mt-4 divide-y divide-line border-y border-line">
                {project.team.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <div>
                      <p className="font-medium text-ink">{member.name}</p>
                      {member.role && (
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.13em] text-muted">
                          {member.role}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`GitHub de ${member.name}`}
                          className="text-muted transition-colors hover:text-accent"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`LinkedIn de ${member.name}`}
                          className="text-muted transition-colors hover:text-accent"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
            {githubEnabled ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
              >
                <Github size={16} />
                GitHub
              </a>
            ) : (
              <span className="inline-flex items-center justify-center gap-2 border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted opacity-60">
                <Lock size={16} />
                Código privado
              </span>
            )}

            {demoEnabled ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white"
              >
                <ExternalLink size={16} />
                Ver demo
              </a>
            ) : (
              <span className="inline-flex items-center justify-center gap-2 border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted opacity-60">
                <ExternalLink size={16} />
                Demo indisponível
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

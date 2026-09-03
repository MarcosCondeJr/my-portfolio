import { useEffect } from "react";
import { X, ExternalLink, Github, Lock, Linkedin } from "lucide-react";
import { techIcons } from "../../data/techIcons";
import { useModalEntrada } from "../../motion/useModalEntrada";
import Carousel from "./Carousel";

const rotulo = "font-mono text-[10px] uppercase tracking-[0.16em] text-muted";
const bloco = "mt-10";
const corpo = "mt-4 max-w-[68ch] leading-relaxed text-muted";

export default function ProjectModal({ project, open, onClose }) {
  const ativo = open && !!project;
  const { painelRef, fundoRef } = useModalEntrada(ativo);

  useEffect(() => {
    if (!ativo) return;
    function aoTeclar(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [ativo, onClose]);

  useEffect(() => {
    if (!ativo) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [ativo]);

  useEffect(() => {
    if (ativo) painelRef.current?.focus();
  }, [ativo, painelRef]);

  if (!ativo) return null;

  const githubEnabled = project.links?.githubEnabled ?? !!project.links?.github;
  const demoEnabled = project.links?.demoEnabled ?? !!project.links?.demo;
  const tipo = project.type === "profissional" ? "Profissional" : "Pessoal";
  const temEquipe = project.team && project.team.length > 0;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        data-fundo
        ref={fundoRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"
      />

      <div
        ref={painelRef}
        tabIndex={-1}
        data-tone="light"
        className="relative flex h-[85vh] w-[95%] max-w-3xl flex-col overflow-hidden border border-line bg-surface text-ink outline-none"
      >
        <div className="flex-1 overflow-y-auto text-left [scrollbar-width:thin]">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-surface px-6 py-4">
            <div className="min-w-0">
              <span className={rotulo}>{tipo}</span>
              <h3 className="truncate font-display text-xl uppercase leading-none">
                {project.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="shrink-0 cursor-pointer p-2 text-ink transition-colors hover:text-accent"
            >
              <X size={20} />
            </button>
          </div>

          <div data-stagger>
            <Carousel images={project.images} titulo={project.title} />
          </div>

          <div className="p-8">
            <p
              data-stagger
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent"
            >
              {project.subtitle}
            </p>

            <div data-stagger className={bloco}>
              <h4 className={rotulo}>Problema</h4>
              <p className={corpo}>{project.problema}</p>
            </div>

            <div data-stagger className={bloco}>
              <h4 className={rotulo}>Solução</h4>
              <p className={corpo}>{project.solucao}</p>
            </div>

            {project.papel ? (
              <div data-stagger className={bloco}>
                <h4 className={rotulo}>Meu papel</h4>
                <p className={corpo}>{project.papel}</p>
              </div>
            ) : null}

            <div data-stagger className={bloco}>
              <h4 className={rotulo}>Tecnologias</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    title={tech}
                    className="inline-flex items-center gap-2 border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.13em] text-muted"
                  >
                    <span className="text-base leading-none">
                      {techIcons[tech]}
                    </span>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {temEquipe && (
              <div data-stagger className={bloco}>
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

            <div
              data-stagger
              className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4"
            >
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
    </div>
  );
}

import { Github } from "lucide-react";
import { techIcons } from "../../data/techIcons";

export default function ProjectCard({ project, onOpen, botaoRef }) {
  const githubEnabled = project.links?.githubEnabled ?? !!project.links?.github;
  const githubUrl = project.links?.github;
  const tipo = project.type === "profissional" ? "Profissional" : "Pessoal";

  return (
    <article
      onClick={() => onOpen(project)}
      className="group flex h-full cursor-pointer flex-col border border-line bg-surface transition-colors hover:border-accent"
    >
      <div className="relative h-52 overflow-hidden bg-accent">
        {project.images?.[0] ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6">
            <span className="text-center font-display text-3xl uppercase leading-none text-white">
              {project.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {tipo}
        </span>

        <h3 className="mt-3 font-display text-2xl uppercase leading-none text-ink">
          {project.title}
        </h3>

        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.13em] text-muted">
          {project.subtitle}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-lg text-muted">
          {project.stack.map((tech) => (
            <span key={tech} title={tech}>
              {techIcons[tech] ?? (
                <span className="font-mono text-[10px] uppercase">{tech}</span>
              )}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-8">
          <button
            ref={botaoRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project);
            }}
            className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.14em] text-accent"
          >
            Ver mais{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

          {githubEnabled && githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted transition-colors hover:text-accent"
              aria-label={`Repositório de ${project.title} no GitHub`}
            >
              <Github size={16} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

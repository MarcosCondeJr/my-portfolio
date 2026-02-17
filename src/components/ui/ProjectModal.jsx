import { useEffect } from "react";
import { X, ExternalLink, Github, Lock, ImageIcon, Linkedin } from "lucide-react";
import { SiAmazons3, SiLaravel, SiMongodb, SiNestjs, SiNextdotjs, SiNodedotjs, SiPhp, SiPostgresql, SiReact, SiSpring, SiSpringboot, SiTailwindcss } from "react-icons/si";
import { FaJava } from "react-icons/fa";

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

  const techIcons = {
    React: <SiReact className="text-sky-400" />,
    "Node.js": <SiNodedotjs className="text-green-500" />,
    PostgreSQL: <SiPostgresql className="text-blue-500" />,
    Tailwind: <SiTailwindcss className="text-cyan-400" />,
    "Spring": <SiSpring className="text-green-600" />,
    "React Native": <SiReact className="text-sky-400" />,
    "Spring Boot": <SiSpringboot className="text-green-600" />,
    Laravel: <SiLaravel className="text-red-500" />,
    PHP: <SiPhp className="text-indigo-400" />,
    MongoDB: <SiMongodb className="text-green-500" />,
    NestJS: <SiNestjs className="text-red-500" />,
    Next: <SiNextdotjs className="text-zinc-200" />,
    NestJs: <SiNestjs className="text-red-500" />,
    Java: <FaJava className="text-red-800" />,
    "Amazon S3": <SiAmazons3 className="text-green-500" />,
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* panel */}
      <div className="relative w-[95%] max-w-3xl h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-white dark:bg-zinc-950 shadow-2xl flex flex-col">


        {/* HEADER */}
        <div className="relative h-52 sm:h-64 shrink-0">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center">
              <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm">
                <ImageIcon size={18} />
                Sem imagem do projeto
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col items-start gap-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                    {project.title}
                  </h3>
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-400/15 text-blue-200 border border-blue-400/25 backdrop-blur">
                    {project.type === "profissional" ? "Profissional" : "Pessoal"}
                  </span>
                </div>

                <p className="text-sm text-zinc-200/90">
                  {project.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 text-white"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 flex-1 overflow-y-auto text-left [scrollbar-width:thin]">


          
          {/* DESCRIÇÃO */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Descrição do projeto
            </h4>
            <p className="mt-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* STACK */}
          <div className="mt-8">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Tecnologias
            </h4>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="
                    inline-flex items-center gap-2
                    px-3 py-1 text-xs rounded-full
                    bg-blue-400/10 text-blue-400 border border-blue-400/20
                  "
                  title={tech}
                >
                  <span className="text-base leading-none">
                    {techIcons[tech] ?? <span className="h-2 w-2 rounded-full bg-blue-400 inline-block" />}
                  </span>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.team && project.team.length > 0 && (
            <div className="mt-10">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Equipe
              </h4>

              <div className="mt-4 space-y-4">
                {project.team.map((member) => (
                  <div
                    key={member.name}
                    className="
                      flex items-center justify-between
                      p-4 rounded-xl
                      border border-black/10 dark:border-white/10
                      bg-white/5 dark:bg-white/5
                    "
              >
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {member.name}
                  </p>
                  {member.role && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
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
                      className="text-blue-400 hover:opacity-80 transition"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:opacity-80 transition"
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

          {/* LINKS */}
          <div className="mt-10 flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-4">
            {githubEnabled ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:border-blue-400/40 hover:bg-black/5 dark:hover:bg-white/10 transition text-sm"
              >
                <Github size={16} />
                GitHub
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-black/10 dark:border-white/10 text-zinc-400 dark:text-zinc-600 text-sm">
                <Lock size={16} />
                Código privado
              </div>
            )}

            {demoEnabled ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-400 text-white hover:bg-blue-500 transition text-sm"
              >
                <ExternalLink size={16} />
                Ver demo
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-400/20 text-blue-400 border border-blue-400/20 text-sm">
                <ExternalLink size={16} />
                Demo indisponível
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

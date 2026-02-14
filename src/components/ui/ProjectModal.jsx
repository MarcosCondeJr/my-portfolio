import { useEffect } from "react";
import { X, ExternalLink, Github, Lock } from "lucide-react";

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

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* panel */}
      <div className="relative w-[95%] max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-white dark:bg-zinc-950 shadow-2xl">

        {/* HEADER */}
        <div className="sticky top-0 bg-white dark:bg-zinc-950 p-6 border-b border-black/10 dark:border-white/10 flex justify-between items-start">

        <div className="flex flex-col items-start">
          <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h3>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {project.subtitle}
          </p>

          <span className="mt-3 inline-flex items-center px-3 py-1 text-xs rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20">
            {project.type === "profissional" ? "Profissional" : "Pessoal"}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition"
        >
          <X size={18} />
        </button>
      </div>


        {/* BODY */}
        <div className="p-6 overflow-y-auto max-h-[65vh]">

          {/* Descrição */}
          <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {project.description}
          </p>

          {/* Destaques */}
          <div className="mt-8">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Destaques
            </h4>

            <ul className="mt-4 space-y-3">
              {project.highlights?.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div className="mt-8">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Stack
            </h4>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mt-10 flex flex-wrap gap-4">
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

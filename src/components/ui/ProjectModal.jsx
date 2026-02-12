import { useEffect } from "react";
import { X, ExternalLink, Github } from "lucide-react";

export default function ProjectModal({ project, open, onClose }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !project) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      {/* backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Fechar modal"
      />

      {/* panel */}
      <div className="absolute left-1/2 top-1/2 w-[92%] max-w-2xl -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-2xl border border-white/10 bg-white dark:bg-zinc-950 shadow-2xl">
          <div className="p-6 border-b border-black/10 dark:border-white/10 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {project.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition"
              aria-label="Fechar"
            >
              <X size={18} className="text-zinc-700 dark:text-zinc-300" />
            </button>
          </div>

          <div className="p-6">
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.description}
            </p>

            <h4 className="mt-6 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Destaques
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
              {project.highlights?.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <h4 className="mt-6 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Stack
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:border-blue-400/40 hover:bg-black/5 dark:hover:bg-white/10 transition text-sm"
                >
                  <Github size={16} />
                  GitHub
                </a>
              )}

              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition text-sm"
                >
                  <ExternalLink size={16} />
                  Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="
        group text-left
        rounded-2xl border border-black/10 dark:border-white/10
        bg-white/70 dark:bg-zinc-950/60 backdrop-blur
        p-6
        transition-all
        hover:-translate-y-1 hover:shadow-xl
        hover:border-blue-400/40
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {project.subtitle}
          </p>
        </div>

        <span className="text-xs font-medium text-blue-400">
          Ver detalhes →
        </span>
      </div>

      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="
              px-3 py-1 text-xs rounded-full
              bg-blue-400/10 text-blue-400
              border border-blue-400/20
            "
          >
            {tech}
          </span>
        ))}
      </div>
    </button>
  );
}

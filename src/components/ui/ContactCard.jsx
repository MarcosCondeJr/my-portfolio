export default function ContactCard({
  icon: Icon,
  title,
  description,
  href,
  action,
}) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="
        group block
        rounded-2xl border border-black/10 dark:border-white/10
        bg-white dark:bg-zinc-950
        p-6
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
        hover:border-blue-400/50
      "
    >
      <div className="flex items-center gap-4">
        {/* Ícone */}
        <div
          className="
            p-3 rounded-xl
            bg-blue-400/10 text-blue-400
            transition
            group-hover:bg-blue-400 group-hover:text-white
          "
        >
          <Icon size={20} />
        </div>

        {/* Conteúdo */}
        <div className="flex-1 flex flex-col items-center text-center">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>

          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>

          {action && (
            <span className="mt-3 inline-block text-xs font-medium text-blue-400">
              {action}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

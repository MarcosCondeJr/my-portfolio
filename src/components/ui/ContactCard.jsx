export default function ContactCard({
  icon: Icon,
  title,
  description,
  href,
  action,
}) {
  const externo = href?.startsWith("http");

  return (
    <a
      href={href}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noreferrer" : undefined}
      className="group block h-full border border-line p-7 transition-colors hover:border-accent"
    >
      <span className="text-accent">
        <Icon size={20} />
      </span>

      <h3 className="mt-5 font-display text-xl uppercase leading-none text-ink">
        {title}
      </h3>

      <p className="mt-3 text-sm text-muted">{description}</p>

      {action && (
        <span className="mt-5 inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
          {action} →
        </span>
      )}
    </a>
  );
}

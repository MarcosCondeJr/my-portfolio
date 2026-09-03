export default function SocialPill({ href, label, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="p-2 text-ink transition-colors hover:text-accent"
    >
      <Icon size={18} />
    </a>
  );
}

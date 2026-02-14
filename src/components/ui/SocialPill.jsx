import Magnetic from "./Magnetic";

export default function SocialPill({ href, label, Icon }) {
  const glassItem =
    "bg-transparence dark:border-white/10";

  return (
    <Magnetic strength={22}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className={`
          group flex items-center
           ${glassItem}
          hover:border-blue-400/30
          transition
          px-2
        `}
      >
        
        <span
          className="
            overflow-hidden
            max-w-0 opacity-0
            group-hover:max-w-[120px] group-hover:opacity-100
            transition-all duration-200
            text-xs font-semibold
            text-zinc-700 dark:text-zinc-200
            pr-0 group-hover:pr-2
            whitespace-nowrap
          "
        >
          {label}
        </span>

        <span
          className="
            p-2 rounded-xl
            text-blue-400
            transition
            bg-transparent
            group-hover:bg-blue-400/10
          "
        >
          <Icon size={18} />
        </span>
      </a>
    </Magnetic>
  );
}

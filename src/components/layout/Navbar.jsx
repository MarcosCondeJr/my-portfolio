import { Github, Linkedin } from "lucide-react";
import { scrollToId } from "../../utils/scrollToId";
import SocialPill from "../ui/SocialPill";

const LINKS = [
  { id: "about", label: "Sobre" },
  { id: "experience", label: "Experiência" },
  { id: "projects", label: "Projetos" },
  { id: "contact", label: "Contato" },
];

export default function Navbar() {
  return (
    <header
      data-tone="light"
      className="fixed top-0 left-0 z-50 w-full border-b border-line bg-surface"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <button
          type="button"
          onClick={() => scrollToId("home")}
          aria-label="Ir para o topo"
          className="cursor-pointer font-display text-xl uppercase tracking-[0.02em] text-ink"
        >
          MC
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToId(link.id)}
              className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <SocialPill
            href="https://github.com/marcoscondejr"
            label="GitHub"
            Icon={Github}
          />
          <SocialPill
            href="https://www.linkedin.com/in/marcos-conde-481627285/"
            label="LinkedIn"
            Icon={Linkedin}
          />
        </div>
      </nav>
    </header>
  );
}

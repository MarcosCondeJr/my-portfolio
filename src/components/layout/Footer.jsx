import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer data-tone="dark" className="bg-surface px-6 pb-14 text-ink">
      <div className="mx-auto max-w-6xl border-t border-line pt-10">
        {/* Toque 4 de 4 da musica — fecha o arco aberto no hero. */}
        <p className="max-w-[42ch] font-display text-2xl uppercase leading-[1.05] md:text-3xl">
          Código durante a semana.
          <br />
          Contrabaixo no fim dela.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            © {ano} Marcos Conde · Salvador, BA
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/marcoscondejr"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-accent"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/marcos-conde-481627285/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-accent"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

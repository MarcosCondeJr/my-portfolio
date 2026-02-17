import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="max-w-11/12 mx-auto border-t border-black/10  dark:border-white/10">
      <div className="px-1 sm:px-1 py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          
          <p className="text-center sm:text-left">
            © {year} Marcos Conde. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/marcoscondejr"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300
                         hover:text-blue-400 dark:hover:text-blue-400
                         hover:bg-black/5 dark:hover:bg-white/10
                         transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} color="#60A5FA"/>
            </a>

            <a
              href="https://www.linkedin.com/in/marcos-conde-481627285/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300
                         hover:text-blue-400 dark:hover:text-blue-400
                         hover:bg-black/5 dark:hover:bg-white/10
                         transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} color="#60A5FA"/>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

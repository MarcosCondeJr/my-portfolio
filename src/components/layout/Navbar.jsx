import { Github, Languages, Linkedin, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("pt-BR"); 
  const [langOpen, setLangOpen] = useState(false);

  const langRef = useRef(null);

  function scrollToId(id) {
    setLangOpen(false);

    const el = document.getElementById(id);
    if (!el) return;

    const navOffset = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  function setLanguage(newLang) {
    setLang(newLang);
    setLangOpen(false);
  }

  const glass =
    "backdrop-blur-md bg-white/60 dark:bg-zinc-950/40 border border-black/10 dark:border-white/10";

  const iconBtn =
    "p-2 rounded-xl text-zinc-700 dark:text-white hover:text-blue-400 transition";

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-2 pt-2">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        {/* <div className="backdrop-blur-md bg-zinc-200/40 dark:bg-zinc-950/40 border border-white/10 rounded-2xl px-4 sm:px-6 py-3 transition-colors"> */}
        <div className="grid grid-cols-2 items-center">
          <button
            onClick={() => scrollToId("home")}
            className={`
              ${glass}
              justify-self-start
              h-11 w-11
              rounded-full
              flex items-center justify-center
              font-extrabold
              text-blue-400
              shadow-sm
              hover:shadow-md
              transition
            `}
            aria-label="Ir para Home"
            type="button"
          >
            MC
          </button>

          {/* DIREITA */}
          <div className="justify-self-end">
            {/* Desktop */}
            <div
              className={`${glass} hidden md:flex items-center gap-1 rounded-2xl px-2 py-1 shadow-sm`}
            >
              {/* Idioma */}
              <div className="relative" ref={langRef}>
                {langOpen && (
                  <div className="absolute right-0 mt-3 w-40 rounded-xl border border-white/10 bg-zinc-900/90 backdrop-blur-md shadow-lg overflow-hidden">
                    <button
                      onClick={() => setLanguage("pt-BR")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 ${
                        lang === "pt-BR" ? "text-blue-400" : "text-zinc-200"
                      }`}
                    >
                      🇧🇷 Português (BR)
                    </button>
                    <button
                      onClick={() => setLanguage("en-US")}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 ${
                        lang === "en-US" ? "text-blue-400" : "text-zinc-200"
                      }`}
                    >
                      🇺🇸 English (US)
                    </button>
                  </div>
                )}
              </div>

              {/* Tema */}
              <button
                onClick={toggleTheme}
                className={iconBtn}
                aria-label="Mudar tema"
                type="button"
              >
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {/* Divisor */}
              <div className="h-6 w-px bg-black/10 dark:bg-white/10 mx-1" />

              <a
                href="https://github.com/marcoscondejr"
                target="_blank"
                rel="noreferrer"
                className={`${iconBtn} flex`}
                aria-label="GitHub"
              >
                <Github size={18} className="text-blue-400" />
              </a>

              <a
                href="https://www.linkedin.com/in/marcos-conde-481627285/"
                target="_blank"
                rel="noreferrer"
                className={`${iconBtn} flex`}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-blue-400" />
              </a>
            </div>

          <div className={`${glass} md:hidden flex items-center gap-1 rounded-2xl px-2 py-1 shadow-sm`}>
              <button
                onClick={toggleTheme}
                className={iconBtn}
                aria-label="Mudar tema"
                type="button"
              >
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <div className="h-6 w-px bg-black/10 dark:bg-white/10 mx-1" />

              <a
                href="https://github.com/marcoscondejr"
                target="_blank"
                rel="noreferrer"
                className={`${iconBtn} flex`}
                aria-label="GitHub"
              >
                <Github size={18} className="text-blue-400" />
              </a>

              <a
                href="https://www.linkedin.com/in/marcos-conde-481627285/"
                target="_blank"
                rel="noreferrer"
                className={`${iconBtn} flex`}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-blue-400" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

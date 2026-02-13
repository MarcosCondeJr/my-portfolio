import { Github, Languages, Linkedin, Menu, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("pt-BR"); 
  const [langOpen, setLangOpen] = useState(false);

  const langRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

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

  const isPT = lang === "pt-BR";

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="backdrop-blur-md bg-zinc-200/40 dark:bg-zinc-950/40 border border-white/10 rounded-2xl px-4 sm:px-6 py-3 transition-colors">
          <div className="grid grid-cols-2 md:grid-cols-3 items-center">
            <a
              onClick={() => scrollToId("home")}
              className="justify-self-start text-blue-400 text-base sm:text-lg font-bold"
            >
              MC
            </a>

            {/* CENTRO (desktop) */}
            <ul className="hidden md:flex gap-10 text-sm justify-self-center text-zinc-200">
              <li
                onClick={() => scrollToId("projects")}
                className="hover:text-blue-400 cursor-pointer text-zinc-700  dark:text-white  xtransition"
              >
                {isPT ? "Projetos" : "Projects"}
              </li>
              <li
                onClick={() => scrollToId("about")}
                className="hover:text-blue-400 cursor-pointer text-zinc-700  dark:text-white"
              >
                {isPT ? "Sobre" : "About"}
              </li>
              <li
                onClick={() => scrollToId("contact")}
                className="hover:text-blue-400 cursor-pointer text-zinc-700  dark:text-white"
              >
                {isPT ? "Contato" : "Contact"}
              </li>
            </ul>

            {/* DIREITA (desktop) */}
            <div className="hidden md:flex gap-4 justify-self-end items-center text-zinc-200">
              {/* Dropdown idioma */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  className="flex items-center gap-2 dark:text-white text-zinc-700 hover:text-blue-400 transition"
                  aria-label="Mudar idioma"
                >
                  <Languages size={18} />
                  <span className="text-xs font-medium">
                    {isPT ? "BR" : "US"}
                  </span>
                </button>

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
                className="hover:text-blue-400 dark:text-white text-zinc-700 transition"
                aria-label="Mudar tema"
              >
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {/* Links */}
              <a
                href="https://github.com/marcoscondejr"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
                aria-label="GitHub"
              >
                <Github size={18} color="#60A5FA" />
              </a>
              <a
                href="https://www.linkedin.com/in/marcos-conde-481627285/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} color="#60A5FA" />
              </a>
            </div>

            <div className="md:hidden flex items-center justify-end-safe gap-3 text-zinc-200">
              <button
                onClick={toggleTheme}
                className="hover:text-blue-400 transition"
                aria-label="Mudar tema"
              >
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <a
                href="https://github.com/marcoscondejr"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
                aria-label="GitHub"
              >
                <Github size={18} color="#60A5FA" />
              </a>
              <a
                href="https://www.linkedin.com/in/marcos-conde-481627285/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} color="#60A5FA" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

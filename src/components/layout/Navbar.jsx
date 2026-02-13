import { Github, Languages, Linkedin, Menu, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark"); // "dark" | "light"
  const [lang, setLang] = useState("pt-BR"); // "pt-BR" | "en-US"
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

  function scrollToId(id) {
    setMenuOpen(false);
    setLangOpen(false);

    const el = document.getElementById(id);
    if (!el) return;

    const navOffset = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

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
          <div className="grid grid-cols-3 items-center">
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

            <div className="md:hidden justify-self-end flex items-center gap-3 text-zinc-200">
              <button
                onClick={toggleTheme}
                className="hover:text-blue-400 transition"
                aria-label="Mudar tema"
              >
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="hover:text-blue-400 transition"
                aria-label="Abrir menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 border-t border-white/10 pt-4 text-zinc-200">
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => scrollToId("projects")}
                  className="text-left px-2 py-2 rounded-lg hover:bg-white/10 transition"
                >
                  {isPT ? "Projetos" : "Projects"}
                </button>
                <button
                  onClick={() => scrollToId("about")}
                  className="text-left px-2 py-2 rounded-lg hover:bg-white/10 transition"
                >
                  {isPT ? "Sobre" : "About"}
                </button>
                <button
                  onClick={() => scrollToId("contact")}
                  className="text-left px-2 py-2 rounded-lg hover:bg-white/10 transition"
                >
                  {isPT ? "Contato" : "Contact"}
                </button>

                {/* Idioma no mobile */}
                <div className="mt-2">
                  <div className="text-xs uppercase tracking-wider text-zinc-400 px-2 mb-2">
                    {isPT ? "Idioma" : "Language"}
                  </div>
                  <div className="flex gap-2 px-2">
                    <button
                      onClick={() => setLanguage("pt-BR")}
                      className={`flex-1 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition ${
                        lang === "pt-BR" ? "text-blue-400" : ""
                      }`}
                    >
                      🇧🇷 BR
                    </button>
                    <button
                      onClick={() => setLanguage("en-US")}
                      className={`flex-1 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition ${
                        lang === "en-US" ? "text-blue-400" : ""
                      }`}
                    >
                      🇺🇸 US
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex gap-4 px-2">
                  <a
                    href="https://linkedin.com/in/seu-linkedin"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-400 transition"
                  >
                    <Linkedin size={18} color="#60A5FA"/>
                  </a>
                  <a
                    href="https://github.com/seu-github"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-400 transition"
                  >
                    <Github size={18} color="60A5FA"/>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

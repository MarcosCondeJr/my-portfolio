import { Github, Linkedin, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { scrollToId } from "../../utils/scrollToId";
import SocialPill from "../ui/SocialPill";
import Magnetic from "../ui/Magnetic";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("pt-BR"); 
  const [langOpen, setLangOpen] = useState(false);

  const langRef = useRef(null);

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
    "p-2 rounded-xl text-zinc-700 dark:text-white hover:text-blue-400 cursor-pointer transition";

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-2 pt-2">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-2 items-center">
          <Magnetic strength={30}>
            <button
              onClick={() => scrollToId("home")}
              className={`
                group
                ${glass}
                justify-self-start
                flex items-center
                rounded-2xl
                overflow-hidden
                px-3 py-1
                transition-all duration-300
                hover:shadow-md
              `}
              aria-label="Ir para Home"
              type="button"
            >
              {/* MC */}
              <span
                className="
                  flex items-center justify-center
                  h-8 w-8
                  font-extrabold
                  text-blue-400
                "
              >
                MC
              </span>

              <span
                className="
                  ml-0
                  max-w-0
                  opacity-0
                  overflow-hidden
                  whitespace-nowrap
                  text-sm font-semibold
                  text-zinc-800 dark:text-zinc-200
                  transition-all duration-300
                  group-hover:max-w-[160px]
                  group-hover:opacity-100
                  group-hover:ml-2
                "
              >
                Marcos Conde
              </span>
            </button>
          </Magnetic>

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
          </div>
        </div>
      </nav>
    </header>
  );
}

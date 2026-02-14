import { Github } from "lucide-react";
import { FaJava } from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiTailwindcss,
  SiSpring,
  SiLaravel,
  SiPhp,
  SiMongodb,
  SiNestjs
} from "react-icons/si";

const techIcons = {
  Java: <FaJava />,
  React: <SiReact/>,
  "Node.js": <SiNodedotjs />,
  PostgreSQL: <SiPostgresql/>,
  Tailwind: <SiTailwindcss/>,
  Spring: <SiSpring />,
  Laravel: <SiLaravel />,
  PHP: <SiPhp  />,
  MongoDB: <SiMongodb  />,
  NestJs: <SiNestjs />
};

export default function ProjectCard({ project, onOpen }) {

  const githubEnabled = project.links?.githubEnabled ?? !!project.links?.github;
  const githubUrl = project.links?.github;

  return (
    <div
      onClick={() => onOpen(project)}
      className="
        group cursor-pointer overflow-hidden
        rounded-2xl border border-black/10 dark:border-white/10
        bg-white dark:bg-zinc-950
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl
      "
    >
      {/* IMAGEM / HERO */}
      <div className="relative h-52 overflow-hidden">
        <div
          className="
            absolute top-4 left-4 z-1
            inline-flex items-center gap-2
            rounded-xl px-2 py-1
            text-xs font-semibold
            backdrop-blur-md
            bg-white/10
            border border-blue-400/40
            text-white
            shadow-sm
          "
        >
          <span
            className={`h-2 w-2 rounded-full ${
              project.type === "profissional" ? "bg-purple-700" : "bg-blue-400"
            }`}
          />
          <p className={`${
              project.type === "profissional" ? "text-purple-400" : "text-blue-400"
            }`}>
            {project.type === "profissional" ? "Profissional" : "Pessoal"}
          </p>
        </div>
        
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/10" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55 group-hover:bg-black/65 transition" />

        {/* Conteúdo overlay (título + subtítulo + ícones) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h3 className="text-2xl font-extrabold text-white">
            {project.title}
          </h3>

          <p className="mt-2 text-sm text-zinc-200">
            {project.subtitle}
          </p>

          {/* Ícones logo abaixo do subtítulo */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xl">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="opacity-90 hover:opacity-100 transition"
                title={tech}
              >
                {techIcons[tech] ?? (
                  <span className="text-zinc-200 text-xs">{tech}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="p-3 flex flex-row justify-between gap-4">

      <button
        type="button"
        onClick={() => onOpen(project)}
        className="
          group relative overflow-hidden
          inline-flex items-center gap-2
          px-4 py-1
          rounded-xl
          text-sm font-medium
          text-blue-400
          bg-blue-400/10
          border border-blue-400/20
          hover:bg-blue-400/20
          hover:border-blue-400/40
          transition-all duration-300
        "
      >
      <span
        className="
          pointer-events-none absolute inset-0
          before:absolute before:inset-y-0 before:left-0
          before:w-20
          before:bg-gradient-to-r before:from-transparent before:via-blue-200/40 before:to-transparent
          before:-translate-x-[150%]
          before:skew-x-16
          before:transition-transform before:duration-800
          group-hover:before:translate-x-[320%]
        "
      />

      <span className="relative">Ver mais</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>

        {githubEnabled && githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()} 
            className="
              inline-flex items-center gap-2
              px-3 py-1
              rounded-xl
               border-black/10 dark:border-white/10
              text-zinc-700 dark:text-zinc-200
              hover:text-blue-400 hover:border-blue-400/40
              hover:bg-black/5 dark:hover:border dark:hover:border-blue-400/20
              transition
              text-sm
            "
            aria-label="Repositório no GitHub"
          >
            <Github size={16} className="text-blue-400" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

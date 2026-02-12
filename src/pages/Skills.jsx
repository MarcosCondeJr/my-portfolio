import { FaJava } from "react-icons/fa";
import { 
    SiGit, 
    SiGithub, 
    SiLaravel, 
    SiMongodb,
    SiNestjs, 
    SiNodedotjs, 
    SiPhp, 
    SiPostgresql, 
    SiReact, 
    SiSpring, 
    SiTailwindcss 
} from "react-icons/si";


export default function Skills() {
  const skills = [
    { name: "Java", icon: FaJava},
    { name: "Spring", icon: SiSpring },
    { name: "PHP", icon: SiPhp },
    { name: "Laravel", icon: SiLaravel },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Nest.js", icon: SiNestjs },
    { name: "React", icon: SiReact },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "Git", icon: SiGit },
    { name: "GitHub", icon: SiGithub },
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 py-24">

        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Habilidades
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <div
                key={index}
                className="
                  group
                  flex flex-col items-center justify-center
                  p-6
                  rounded-2xl
                  border border-zinc-200 dark:border-zinc-800
                  bg-white dark:bg-zinc-900
                  transition-all
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >
                <Icon
                  size={40}
                  className="
                    text-zinc-700 dark:text-zinc-300
                    transition
                    group-hover:text-blue-400
                  "
                />

                <span className="mt-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

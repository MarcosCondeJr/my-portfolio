import { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ui/ProjectCard";
import ProjectModal from "../components/ui/ProjectModal";

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  function handleOpen(project) {
    setSelected(project);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setSelected(null);
  }

  return (
    <section id="projects" className="min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 py-24 w-full felx flex-col">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Projetos
          </span>
        </h2>

        <h3 className="pt-16 flex text-zinc-600 dark:text-white">
          - Destaques
        </h3>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={handleOpen} />
          ))}
        </div>

        <ProjectModal project={selected} open={open} onClose={handleClose} />
      </div>
    </section>
  );
}

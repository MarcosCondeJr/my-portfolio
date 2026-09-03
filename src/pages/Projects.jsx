import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ui/ProjectCard";
import ProjectModal from "../components/ui/ProjectModal";
import Section from "../components/layout/Section";
import Reveal from "../components/motion/Reveal";

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const botoes = useRef(new Map());
  const abertoPor = useRef(null);

  function handleOpen(project) {
    abertoPor.current = project.id;
    setSelected(project);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setSelected(null);
  }

  useEffect(() => {
    if (open || !abertoPor.current) return;
    botoes.current.get(abertoPor.current)?.focus();
    abertoPor.current = null;
  }, [open]);

  function refDoBotao(id) {
    return (node) => {
      if (node) botoes.current.set(id, node);
      else botoes.current.delete(id);
    };
  }

  return (
    <Section
      tone="dark"
      id="projects"
      number="04"
      label="Projetos"
      title="O que eu construí"
    >
      <div className="grid gap-8 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08} className="h-full">
            <ProjectCard
              project={p}
              onOpen={handleOpen}
              botaoRef={refDoBotao(p.id)}
            />
          </Reveal>
        ))}
      </div>

      <ProjectModal project={selected} open={open} onClose={handleClose} />
    </Section>
  );
}

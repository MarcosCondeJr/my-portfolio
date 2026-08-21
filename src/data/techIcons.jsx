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
  SiNestjs,
  SiAmazons3,
  SiGit,
  SiGithub,
} from "react-icons/si";

// Fonte unica de icones de tecnologia. ProjectCard, ProjectModal, Skills e
// Experience importam daqui. As chaves precisam bater exatamente com as
// strings usadas em projects.js, experiences.js e skills.js — o teste em
// __tests__/techIcons.test.js garante isso nos dois sentidos.
//
// Sem cor fixa: os icones herdam currentColor para funcionar tanto nas
// secoes claras quanto nas escuras.
export const techIcons = {
  Java: <FaJava />,
  Spring: <SiSpring />,
  PHP: <SiPhp />,
  Laravel: <SiLaravel />,
  "Node.js": <SiNodedotjs />,
  NestJs: <SiNestjs />,
  React: <SiReact />,
  "React Native": <SiReact />,
  Tailwind: <SiTailwindcss />,
  PostgreSQL: <SiPostgresql />,
  MongoDB: <SiMongodb />,
  "Amazon S3": <SiAmazons3 />,
  Git: <SiGit />,
  GitHub: <SiGithub />,
};

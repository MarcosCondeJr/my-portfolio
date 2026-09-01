import AboutScroll from "../components/sections/AboutScroll";

const PARADAS = [
  {
    id: "profissional",
    rotulo: "O profissional",
    titulo: "Full Stack",
    texto:
      "Formado em Desenvolvimento de Sistemas pelo SENAI e graduando em Engenharia de Software na UCSal. Trabalho em sistemas web de grande escala em PHP, criando e evoluindo módulos e cuidando da arquitetura e da sustentabilidade do código. Também construo projetos em Java e Spring Boot, aprofundando padrões e segurança.",
    tags: ["PHP", "Java", "Spring", "React", "PostgreSQL"],
    foto: "/img-marcos-03.jpeg",
    alt: "Marcos Conde na mesa de trabalho, com monitores de código ao fundo",
  },
  {
    id: "pessoal",
    rotulo: "O pessoal",
    titulo: "Músico",
    texto:
      "Toco desde os dez anos — e foi tocando em banda que eu entendi o que é ritmo e o que é escutar antes de entrar. Duas coisas que uso todo dia em código: saber a hora de segurar a base e a hora de aparecer.",
    tags: ["Música", "Salvador, BA"],
    foto: "/marcos-pessoal-contrabaixo.jpeg",
    alt: "Marcos Conde tocando ao ar livre",
  },
];

export default function About() {
  return <AboutScroll paradas={PARADAS} />;
}

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
      "Comecei aos oito anos, na bateria. Passei pelo violão até chegar ao contrabaixo, que toco na igreja há sete anos. É o instrumento que menos aparece e o que segura tudo de pé — foi nele que me encontrei. Ouvir ou tocar, música é das coisas que eu mais gosto na vida.",
    tags: ["Contrabaixo", "Cristão", "Salvador, BA"],
    foto: "/marcos-pessoal-contrabaixo.jpeg",
    alt: "Marcos Conde tocando ao ar livre",
  },
];

export default function About() {
  return <AboutScroll paradas={PARADAS} />;
}

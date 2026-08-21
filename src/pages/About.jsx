import AboutScroll from "../components/sections/AboutScroll";

// As duas paradas do "quem eu sou". O contraste entre as fotos e metade do
// efeito: a do trabalho e noturna, fria e azulada; a do contrabaixo e de
// dia, quente e colorida. Ao rolar, o painel vai literalmente do escuro
// para o claro.
const PARADAS = [
  {
    id: "profissional",
    rotulo: "O profissional",
    titulo: "Full Stack",
    texto:
      "Formado em Desenvolvimento de Sistemas pelo SENAI e graduando em Engenharia de Software na UCSal. Trabalho em sistemas web de grande escala em PHP, criando e evoluindo módulos e cuidando da arquitetura e da sustentabilidade do código. Também construo projetos em Java e Spring Boot, aprofundando padrões e segurança.",
    tags: ["PHP", "Java", "Spring", "React", "PostgreSQL"],
    foto: "/imagem-work.jpeg",
    alt: "A mesa de trabalho de Marcos Conde: dois monitores com código e luz azul ao fundo",
  },
  {
    id: "pessoal",
    rotulo: "O pessoal",
    titulo: "Contrabaixista",
    texto:
      "Toco contrabaixo desde os quatorze — e foi tocando em banda que eu entendi o que é ritmo e o que é escutar antes de entrar. Duas coisas que uso todo dia em código: saber a hora de segurar a base e a hora de aparecer.",
    tags: ["Música", "Salvador, BA"],
    foto: "/marcos-pessoal-contrabaixo.jpeg",
    alt: "Marcos Conde tocando contrabaixo ao ar livre",
  },
];

export default function About() {
  return <AboutScroll paradas={PARADAS} />;
}

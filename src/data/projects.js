export const projects = [
  {
    id: "pethouse",
    title: "Pethouse",
    subtitle: "Gestão de pets para tutores",
    description:
  "A PetHouse é uma aplicação desenvolvida para facilitar a gestão da saúde e bem-estar de pets, oferecendo aos tutores uma forma organizada e prática de acompanhar informações essenciais. O sistema permite registrar vacinas, medicamentos, consultas veterinárias e histórico de cuidados, além de disponibilizar lembretes inteligentes que ajudam a manter a rotina do pet sempre atualizada. A solução foi construída em equipe, com foco em usabilidade, organização de dados e experiência intuitiva.",
    type: "profissional",
    stack: ["React Native", "NestJs", "PostgreSQL", "Tailwind"],
    links: {
      github: "https://github.com/marcoscondejr",
      githubEnabled: false,
      demo: "",
      demoEnabled: false,
    },
    image: 'capa-projeto-pethouse.png',
    team: [
    {
      name: "Wesley Sales",
      role: "Desenvolvedor Backend",
      github: "https://github.com/WesleySales",
      linkedin: "https://www.linkedin.com/in/wesley-v-sales/",
    },
    {
      name: "Mauri Volpato",
      role: "Desenvolvedor Frontend",
      github: "",
      linkedin: "",
    },
    {
      name: "Yngred Soares",
      role: "Desenvolvedora Frontend",
      github: "",
      linkedin: "",
    }
  ]
  },
  {
    id: "condefinance",
    title: "CondeFinance",
    subtitle: "Sistema de gestão financeira",
description:
  "O CondeFinance é um sistema de gestão financeira pessoal desenvolvido para proporcionar controle total sobre receitas e despesas. A aplicação permite organizar contas, categorias e lançamentos financeiros, oferecendo uma visão clara da saúde financeira do usuário. O projeto foi construído com foco em organização, performance e boas práticas de arquitetura backend, além de uma interface moderna e responsiva.",
    type: "pessoal",
    stack: ["Java", "Spring", "PostgreSQL", "React", "Tailwind"],
    links: {
      github: "https://github.com/MarcosCondeJr/conde-finance-api",
      githubEnabled: true,
      demo: "",
      demoEnabled: false,
    },
    image: null,
    team: []
  },
  {
    id: "signdoc",
    title: "SignDoc API",
    subtitle: "Assinatura digital de documentos",
description:
  "A SignDoc API é uma solução backend para assinatura digital de documentos, desenvolvida com foco em segurança, integridade e conformidade com o padrão PAdES. A aplicação permite validar certificados digitais (PFX/P12), realizar assinaturas criptográficas em PDFs e armazenar documentos de forma segura. O projeto foi estruturado com arquitetura escalável e integração com serviços de armazenamento em nuvem.",
    type: "profissional",
    stack: ["Java", "Spring", "PostgreSQL", "Amazon S3"],
    links: {
      github: "",
      githubEnabled: false,
      demo: "",
      demoEnabled: false,
    },
    image: null,
    team: []
  },
];

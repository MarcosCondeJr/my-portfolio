export const projects = [
  {
    id: "pethouse",
    title: "Pethouse",
    subtitle: "Gestão de pets para tutores",
    images: ["capa-projeto-pethouse.png"],
    problema:
      "Tutor de pet acompanha vacina, remédio e consulta em papel, caderno e memória. Não existe um lugar só, e a dose atrasada costuma aparecer quando já atrasou.",
    solucao:
      "Aplicativo que reúne vacinas, medicamentos, consultas e histórico de cuidados num registro por pet, com lembretes que avisam antes da próxima dose.",
    papel:
      "Desenvolvi junto com o Wesley, tanto na API quanto no frontend. A estrutura do projeto e a escolha de linguagens e ferramentas saíram de nós dois, antes de qualquer linha de código.",
    type: "profissional",
    stack: ["React Native", "NestJs", "PostgreSQL", "Tailwind"],
    links: {
      github: "https://github.com/marcoscondejr",
      githubEnabled: false,
      demo: "",
      demoEnabled: false,
    },
    team: [
      {
        name: "Wesley Sales",
        role: "Desenvolvedor Backend",
        github: "https://github.com/WesleySales",
        linkedin: "https://www.linkedin.com/in/wesley-v-sales/",
      },
      {
        name: "Mauri Volpato",
        role: "Product Owner (PO)",
        github: "",
        linkedin: "",
      },
      {
        name: "Yngred Soares",
        role: "Product Manager (PM)",
        github: "",
        linkedin: "",
      },
    ],
  },
  {
    id: "condefinance",
    title: "CondeFinance",
    subtitle: "Sistema de gestão financeira",
    images: ["LOGIN-CONDE-FINANCE.png"],
    problema:
      "Controle financeiro pessoal espalhado entre planilha, extrato do banco e cabeça. No fim do mês fica difícil responder para onde o dinheiro foi.",
    solucao:
      "Sistema que organiza contas, categorias e lançamentos num lugar só, com visão clara de entrada e saída e uma interface responsiva.",
    papel: "",
    type: "pessoal",
    stack: ["Java", "Spring", "PostgreSQL", "React", "Tailwind"],
    links: {
      github: "https://github.com/MarcosCondeJr/conde-finance-api",
      githubEnabled: true,
      demo: "https://condefinance.marcoscondejr.com.br",
      demoEnabled: true,
    },
    team: [],
  },
  {
    id: "signdoc",
    title: "SignDoc API",
    subtitle: "Assinatura de documentos com certificados digitais",
    images: [],
    problema:
      "Assinar documento com validade jurídica exige certificado digital, conformidade com o padrão PAdES e guarda segura do arquivo. Montar isso do zero em cada aplicação é caro e fácil de errar.",
    solucao:
      "API que valida certificados PFX/P12, assina PDFs criptograficamente no padrão PAdES e guarda os documentos em armazenamento em nuvem.",
    papel: "",
    type: "profissional",
    stack: ["Java", "Spring", "PostgreSQL", "Amazon S3"],
    links: {
      github: "",
      githubEnabled: false,
      demo: "",
      demoEnabled: false,
    },
    team: [],
  },
];

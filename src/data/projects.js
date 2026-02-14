export const projects = [
  {
    id: "pethouse",
    title: "Pethouse",
    subtitle: "Gestão de pets para tutores",
    description: "Aplicativo",
    type: "profissional",
    stack: ["React", "NestJs", "PostgreSQL", "Tailwind"],
    highlights: [
      "CRUD completo de produtos e movimentações",
      "Relatórios por período e por categoria",
      "Autenticação e permissões",
    ],
    links: {
      github: "https://github.com/marcoscondejr",
      githubEnabled: false,
      demo: "",
      demoEnabled: false,
    },
    image: 'capa-projeto-pethouse.png',
  },
  {
    id: "condefinance",
    title: "CondeFinance",
    subtitle: "Sistema de gestão financeira",
    description:
      "API para assinar documentos (PDF) com validação de certificado e fluxo de assinatura.",
    type: "pessoal",
    stack: ["Java", "Spring", "PostgreSQL", "React", "Tailwind"],
    highlights: [
      "Assinatura PAdES com PDFBox",
      "Validação de certificado (PFX/P12)",
      "Armazenamento em S3/Spaces",
    ],
    links: {
      github: "https://github.com/MarcosCondeJr/conde-finance-api",
      githubEnabled: true,
      demo: "",
      demoEnabled: false,
    },
    image: null,
  },
  {
    id: "signdoc",
    title: "SignDoc API",
    subtitle: "API de assinatura digital",
    description:
      "API para assinar documentos (PDF) com validação de certificado e fluxo de assinatura.",
    type: "profissional",
    stack: ["Java", "Spring", "PostgreSQL"],
    highlights: [
      "Assinatura PAdES com PDFBox",
      "Validação de certificado (PFX/P12)",
      "Armazenamento em S3/Spaces",
    ],
    links: {
      github: "",
      githubEnabled: false,
      demo: "",
      demoEnabled: false,
    },
    image: null,
  },
];

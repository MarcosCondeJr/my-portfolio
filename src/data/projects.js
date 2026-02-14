export const projects = [
  {
    id: "pethouse",
    title: "Pethouse",
    subtitle: "Gestão de pets para tutores",
    description: "Aplicativo",
    type: "pessoal",
    stack: ["React", "Node.js", "PostgreSQL", "Tailwind"],
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
      githubEnabled: false, // repo privado / NDA
      demo: "",
      demoEnabled: false,
    },
    image: null,
  },
];

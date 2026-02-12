export const projects = [
  {
    id: "stockflow",
    title: "StockFlow",
    subtitle: "Controle de estoque para loja de cosméticos",
    description:
      "Sistema de controle de estoque com entrada/saída, vendas, histórico e relatórios.",
    stack: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    highlights: [
      "CRUD completo de produtos e movimentações",
      "Relatórios por período e por categoria",
      "Autenticação e permissões",
    ],
    links: {
      github: "https://github.com/marcoscondejr",
      demo: "", // opcional
    },
    image: null, // depois você pode colocar um import ou url
  },
  {
    id: "signdoc",
    title: "SignDoc API",
    subtitle: "API de assinatura digital",
    description:
      "API para assinar documentos (PDF) com validação de certificado e fluxo de assinatura.",
    stack: ["Java", "Spring", "PostgreSQL"],
    highlights: [
      "Assinatura PAdES com PDFBox",
      "Validação de certificado (PFX/P12)",
      "Armazenamento em S3/Spaces",
    ],
    links: {
      github: "https://github.com/marcoscondejr",
      demo: "",
    },
    image: null,
  },
];

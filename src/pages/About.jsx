export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center"
    >
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">

        {/* FOTO */}
        <div className="relative flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            
            {/* Glow atrás da imagem */}
            <div className="absolute inset-0 rounded-2xl bg-blue-400/20 blur-2xl"></div>

            {/* Imagem */}
            <img
              src="/img-marcos-03.jpeg"
              alt="Marcos Conde"
              className="relative w-full h-full object-cover rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl"
            />
          </div>
        </div>

        {/* TEXTO */}
        <div>
            <h2
                className="
                    text-3xl
                    md:text-4xl
                    font-extrabold
                    tracking-tight
                "
                >
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Sobre Mim
                </span>
            </h2>

          <p className="mt-6 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Sou desenvolvedor FullStack com foco em construir aplicações modernas,
            performáticas e bem estruturadas. Tenho experiência com desenvolvimento
            backend em Java e Node.js, além de frontend com React.
          </p>

          <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Atualmente estou aprofundando meus conhecimentos em arquitetura,
            APIs seguras e boas práticas de desenvolvimento.
          </p>

          {/* HABILIDADES PESSOAIS */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
                "Resolução de Problemas",
                "Estratégico",
                "Flexibilidade",
                "Pensamento Analítico",
                "Aprendizado Contínuo"
            ].map((skill, index) => (
                <span
                key={index}
                className="
                    px-4 py-2 text-sm
                    rounded-full
                    bg-blue-400/10
                    text-blue-400
                    border border-blue-400/20
                "
                >
                {skill}
                </span>
            ))}
            </div>
        </div>

      </div>
    </section>
  );
}

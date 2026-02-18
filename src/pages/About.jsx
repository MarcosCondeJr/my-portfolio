export default function About() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center">

      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-16">
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Sobre Mim
        </span>
      </h2>

      <div className="w-full px-8 lg:px-20">

        <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center">

          <div className="relative group">
            <div
              className="absolute -inset-3 rounded-[2.5rem] bg-blue-400/15 blur-2xl
                        transition duration-500 group-hover:bg-blue-400/25"
            />

            <div
              className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-r from-blue-400 to-cyan-400 shadow-2xl
                        transition duration-500 group-hover:scale-[1.01] group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.35)]"
            >
              <div className="rounded-[2.4rem] bg-white/40 dark:bg-zinc-950/30 backdrop-blur-xl p-2">
                <img
                  src="/img-marcos-03.jpeg"
                  alt="Marcos Conde"
                  className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-[2rem]
                            border border-zinc-200/60 dark:border-zinc-800/60
                            shadow-xl transition duration-500 ease-out
                            group-hover:scale-[1.03]"
                />
              </div>
            </div>

            {/* badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full
                          bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl
                          border border-zinc-200/60 dark:border-zinc-800/60
                          text-zinc-800 dark:text-zinc-200 shadow-lg
                          transition duration-500 group-hover:translate-y-[-2px]"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Marcos Conde
              </span>
            </div>
          </div>

          {/* CARD */}
          <div className="max-w-2xl
                          rounded-3xl p-13
                          bg-white/50 dark:bg-zinc-950/30 backdrop-blur-xl
                          border border-zinc-200/60 dark:border-zinc-800/60
                          shadow-2xl">

            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 mb-6" />

            <p className="mt-6 text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Desenvolvedor Full Stack formado em Desenvolvimento de Sistemas pelo SENAI
              e graduando em Engenharia de Software. Atuo profissionalmente em sistemas
              web de grande escala utilizando <span className="text-blue-600 dark:text-blue-400 font-semibold">PHP</span>,
              participando da criação e evolução de módulos e funcionalidades, contribuindo
              para a melhoria contínua da arquitetura, organização e sustentabilidade do código.
            </p>

            <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Também desenvolvo projetos com{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                Java e Spring Boot
              </span>,
              aprofundando conhecimentos em arquitetura, padrões e segurança.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

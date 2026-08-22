// O retrato do hero: espelhado, ancorado na base da secao, na frente do card
// e atras do nome. So existe a partir de lg — no mobile o hero volta a ser o
// que era antes, nome e texto, sem foto.
//
// Os numeros nao sao gosto — saem da silhueta medida no proprio PNG (717x622).
// O corpo opaco ocupa 16,3%..79,4% da largura e desce ate a ultima linha: o
// arquivo foi cortado para vazar pela dobra, e por isso a base nao leva
// tratamento nenhum. Espelhado, os ombros caem em 20,6% e 83,7%, e na altura
// do rosto o corpo comeca em 33,3%.
//
// Com 64,3% da largura do conteudo comecando em 32,2%, o MARCOS termina antes
// do rosto e o ombro para antes do texto do card, encostando so na quina.
// ATENCAO: essas duas condicoes brigam entre si e a folga e de ~20px de cada
// lado. Aproximar o retrato do nome joga o ombro por cima do card; afastar
// para proteger o card faz as letras caminharem na direcao do rosto. Se mexer
// numa, confira a outra no navegador antes de dar por resolvido.
//
// A folga tambem depende do recorte: public/ guarda marcos-hero1.png (717x678)
// e marcos-hero2.png (717x586), o mesmo retrato com mais e com menos peito. O
// 678 e o mais estreito em proporcao e o que sobra mais espaco; o 586, o mais
// apertado. Trocar de arquivo obriga a refazer a conta do left.
//
// A profundidade e o ponto da composicao: nome (z-30) na frente do retrato
// (z-20), e o card (z-10) atras dele. jsdom nao enxerga empilhamento, transform
// nem media query, entao nem o empilhamento nem o sumico no mobile tem teste
// automatico — a verificacao dos dois e visual.
export default function HeroPortrait() {
  return (
    <div
      className="
        hidden
        lg:absolute lg:-bottom-20 lg:left-[32.2%] lg:z-20 lg:block lg:w-[64.3%]
        lg:drop-shadow-[20px_11px_26px_rgba(22,21,15,0.18)]
      "
    >
      {/*
        O espelhamento fica na img e a sombra no pai de proposito. Filtro e
        transform entram na mesma pilha de renderizacao: com os dois no mesmo
        elemento a sombra espelha junto e cai do lado esquerdo — longe do card,
        que e exatamente onde ela precisa cair para vender a profundidade.
      */}
      <img
        src="/marcos-hero.png"
        alt=""
        width={717}
        height={622}
        fetchPriority="high"
        className="block w-full [transform:scaleX(-1)]"
      />
    </div>
  );
}

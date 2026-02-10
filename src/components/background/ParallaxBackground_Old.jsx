import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxBackgroundOld() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })
        .to(".pb-layer-1", { y: -80 }, 0)
        .to(".pb-layer-2", { y: -160 }, 0)
        .to(".pb-layer-3", { y: -260 }, 0)
        .to(".pb-layer-4", { y: -120 }, 0);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Fundo base (acompanha dark/light) */}
      <div className="absolute inset-0 bg-white dark:bg-zinc-950" />

      {/* Glow suave para dar profundidade */}
      <div className="absolute inset-0 opacity-70 dark:opacity-60">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute top-40 left-20 h-[420px] w-[420px] rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      {/* SVG Parallax */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* GRID (bem sutil) */}
        <g className="pb-layer-1" opacity="0.22">
          <g className="text-blue-400">
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={120 + i * 70}
                x2="1440"
                y2={120 + i * 70}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.08"
              />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={80 + i * 110}
                y1="0"
                x2={80 + i * 110}
                y2="900"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.06"
              />
            ))}
          </g>
        </g>

        {/* BLOBs (camada média) */}
        <g className="pb-layer-2">
          <g className="text-blue-400" opacity="0.10">
            <path
              fill="currentColor"
              d="M260,260 C340,160 520,160 580,250 C650,360 520,430 410,410 C300,390 180,350 260,260 Z"
            />
            <path
              fill="currentColor"
              d="M1040,240 C1120,150 1290,170 1330,260 C1370,350 1280,420 1170,400 C1060,380 960,330 1040,240 Z"
              opacity="0.8"
            />
          </g>
        </g>

        {/* “Montanhas” (camada forte) */}
        <g className="pb-layer-3">
          <g className="text-blue-400" opacity="0.12">
            <path
              fill="currentColor"
              d="M0,640 C160,560 320,590 460,640 C620,700 760,670 920,610 C1090,550 1210,570 1440,640 L1440,900 L0,900 Z"
            />
          </g>

          <g className="text-blue-400" opacity="0.18">
            <path
              fill="currentColor"
              d="M0,720 C180,650 340,690 500,720 C660,760 820,740 980,700 C1160,650 1260,660 1440,720 L1440,900 L0,900 Z"
            />
          </g>
        </g>

        {/* Partículas (camada mais próxima) */}
        <g className="pb-layer-4 text-blue-400" opacity="0.30">
          {[
            [220, 520, 2],
            [420, 460, 1.5],
            [860, 520, 2.2],
            [1100, 480, 1.6],
            [1280, 560, 2.4],
          ].map(([cx, cy, r], idx) => (
            <circle key={idx} cx={cx} cy={cy} r={r} fill="currentColor" opacity="0.25" />
          ))}
        </g>
      </svg>

      {/* Ajustes de cor no dark (mantendo blue-400 como base, mas mais visível) */}
      <div className="absolute inset-0 hidden dark:block pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      </div>
    </div>
  );
}

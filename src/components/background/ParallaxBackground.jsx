import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxBackground() {
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
        .to(".pb-grid", { y: -140 }, 0)
        .to(".pb-glow-1", { y: -80 }, 0)
        .to(".pb-glow-2", { y: -160 }, 0);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-white dark:bg-zinc-950" />

      <div className="absolute inset-0 opacity-80 dark:opacity-60">
        <div className="pb-glow-1 absolute -top-48 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="pb-glow-2 absolute top-32 left-16 h-[460px] w-[460px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pb-glow-2 absolute bottom-[-120px] right-[-80px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <svg
        className="pb-grid absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g className="text-blue-400" opacity="0.18">
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={120 + i * 70}
              x2="1440"
              y2={120 + i * 70}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.06"
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
              opacity="0.05"
            />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-black/40" />
    </div>
  );
}

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldAnimate } from "../../motion/motionTokens";

gsap.registerPlugin(ScrollTrigger);

export default function BassBand({
  photo = "/marcos-contrabaixo.jpeg",
  alt = "Marcos Conde tocando contrabaixo",
}) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img || !shouldAnimate()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      data-tone="dark"
      className="relative h-[55vh] w-full overflow-hidden bg-surface"
    >
      <img
        ref={imgRef}
        src={photo}
        alt={alt}
        className="h-[120%] w-full object-cover"
      />
    </div>
  );
}

import { useReveal } from "../../motion/useReveal";

export default function MaskedHeading({
  lines,
  as: Tag = "h2",
  className = "",
}) {
  const ref = useReveal({ kind: "mask" });

  return (
    <Tag ref={ref} className={className}>
      {lines.map((linha, i) => (
        <span key={i} className="block overflow-hidden">
          <span data-mask-line className="block">
            {linha}
          </span>
        </span>
      ))}
    </Tag>
  );
}

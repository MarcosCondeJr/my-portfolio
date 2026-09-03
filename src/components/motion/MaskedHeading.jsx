import { useReveal } from "../../motion/useReveal";

export default function MaskedHeading({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  ...rest
}) {
  const ref = useReveal({ kind: "mask", delay });

  return (
    <Tag ref={ref} className={className} {...rest}>
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

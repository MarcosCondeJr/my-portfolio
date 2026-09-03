import { useReveal } from "../../motion/useReveal";

export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}) {
  const ref = useReveal({ delay });
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

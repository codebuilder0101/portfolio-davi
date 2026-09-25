import Image from "next/image";
import type { Tech } from "@/data/stack";

/** Brand logo inside a glossy circular orb. */
export function TechIcon({ tech, size = "md", label = true }: { tech: Tech; size?: "sm" | "md" | "lg"; label?: boolean }) {
  const s = {
    sm: { orb: "size-16", img: 34 },
    md: { orb: "size-24", img: 50 },
    lg: { orb: "size-28 md:size-32", img: 60 },
  }[size];
  return (
    <figure className="group flex flex-col items-center gap-3">
      <span className={`tech-orb ${s.orb} transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-6`}>
        <Image src={tech.icon} alt="" width={s.img} height={s.img} className="drop-shadow-sm" unoptimized />
      </span>
      {label && <figcaption className="text-center text-base font-bold leading-tight text-ink-soft">{tech.name}</figcaption>}
    </figure>
  );
}

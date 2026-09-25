"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/provider";
import type { Project } from "@/data/projects";
import { Tilt } from "../ui";

const aspect: Record<Project["shape"], string> = {
  arch: "aspect-[4/5]",
  leaf: "aspect-[4/4.2]",
  cut: "aspect-[4/4.4]",
  ticket: "aspect-[4/4.2]",
  pill: "aspect-[4/5]",
};

const chip: Record<Project["tone"], string> = {
  green: "bg-verde text-white",
  gold: "bg-ouro text-ink",
  blue: "bg-anil text-white",
  coral: "bg-coral text-white",
  violet: "bg-violet text-white",
  teal: "bg-teal text-white",
};

export function WorkCard({ project }: { project: Project }) {
  const { t } = useI18n();
  const copy = t.work.projects[project.key];
  const shapeClass = project.shape === "pill" ? "rounded-[10rem]" : `shape-${project.shape}`;

  return (
    <article className="group">
      <div className="[filter:drop-shadow(0_24px_30px_rgb(23_36_45/0.2))]">
        <Tilt className={shapeClass} max={8}>
          <div className={`${shapeClass} ${aspect[project.shape]} relative overflow-hidden bg-paper-2`}>
            <Image
              src={project.image}
              alt={copy.title}
              fill
              sizes="(max-width:768px) 90vw, (max-width:1024px) 45vw, 30vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-2 p-6" style={{ transform: "translateZ(40px)" }}>
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/85 px-3.5 py-1 text-sm font-bold text-ink backdrop-blur">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Tilt>
      </div>
      <div className="mt-7 px-2">
        <span className={`inline-block rounded-full px-4 py-1 text-sm font-extrabold uppercase tracking-wider ${chip[project.tone]}`}>{copy.cat}</span>
        <h3 className="mt-3 font-display text-[1.7rem] font-extrabold leading-tight tracking-tight">{copy.title}</h3>
        <p className="mt-2 text-lg text-muted">{copy.desc}</p>
      </div>
    </article>
  );
}

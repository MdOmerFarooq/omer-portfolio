import { useState } from "react";
import { projects } from "@/data/portfolio";
import { useScrollFocus } from "@/hooks/use-scroll-focus";

export function ProjectsList() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { register, focused, isMobile } = useScrollFocus(projects.length);

  return (
    <ul className="mt-14 list-none border-t border-border p-0">
      {projects.map((project, i) => {
        const active = isMobile ? focused === i : hovered === i;
        const anyActive = isMobile ? focused !== null : hovered !== null;
        const dimmed = anyActive && !active;
        return (
          <li
            key={project.name}
            ref={register(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              opacity: dimmed ? 0.4 : 1,
              transform: active ? "translateX(8px)" : "translateX(0)",
            }}
            className="grid grid-cols-1 gap-x-8 gap-y-3 border-b border-border py-8 transition-all duration-300 md:grid-cols-[auto_1.1fr_1.6fr_auto]"
          >
            <span className="font-mono text-2xl text-muted-foreground md:text-3xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-serif text-2xl text-foreground">{project.name}</h3>
            <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            <div className="flex items-start gap-6 md:justify-end">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-xs text-foreground no-underline transition-opacity hover:opacity-60"
                >
                  GitHub →
                </a>
              )}
              {project.blog && (
                <a
                  href={project.blog}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-xs text-foreground no-underline transition-opacity hover:opacity-60"
                >
                  Blog →
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

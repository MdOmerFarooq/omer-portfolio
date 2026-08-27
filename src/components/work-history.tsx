import { useState } from "react";
import { experiences } from "@/data/portfolio";
import { useScrollFocus } from "@/hooks/use-scroll-focus";

export function WorkHistory() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { register, focused, isMobile } = useScrollFocus(experiences.length);

  return (
    <div className="mt-10 space-y-12">
      {experiences.map((item, i) => {
        const active = isMobile ? focused === i : hovered === i;
        const anyActive = isMobile ? focused !== null : hovered !== null;
        const dimmed = anyActive && !active;
        return (
          <div
            key={item.role + item.period}
            ref={register(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              opacity: dimmed ? 0.4 : 1,
              transform: active ? "translateX(8px)" : "translateX(0)",
            }}
            className="grid grid-cols-1 gap-x-8 gap-y-3 transition-all duration-300 sm:grid-cols-[auto_1fr]"
          >
            <span className="font-mono text-xs whitespace-nowrap text-muted-foreground">
              {item.period}
            </span>
            <div>
              <h3 className="flex flex-wrap items-baseline font-sans text-lg font-medium text-foreground">
                <span>{item.role}</span>
                <span
                  aria-hidden
                  className="mx-2 font-mono text-sm font-normal text-muted-foreground"
                >
                  @
                </span>
                <span
                  className={`font-normal transition-colors duration-300 ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.company}
                </span>
              </h3>
              <ul className="mt-3 space-y-2 pl-0">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span aria-hidden>•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

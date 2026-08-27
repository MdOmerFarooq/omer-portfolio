import { useState } from "react";

type Achievement = {
  title: string;
  context: string;
  image?: string;
};

const achievements: Achievement[] = [
  { title: "Hi-Flyer Award Winner", context: "@ Movate", image: "/hi-flyer-award.jpg" },
  { title: "Spot Award Winner", context: "@ Movate", image: "/spot-award.png" },
];

export function Achievements() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:justify-center">
      {achievements.map((item, i) => {
        const dimmed = hovered !== null && hovered !== i;
        const active = hovered === i;
        return (
          <div
            key={item.title}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              opacity: dimmed ? 0.35 : 1,
              transform: active ? "translateY(-4px)" : "translateY(0)",
              boxShadow: active ? "0 12px 40px oklch(0 0 0 / 8%)" : "none",
            }}
            className="flex min-h-[340px] w-full flex-col border border-border bg-card p-6 transition-all duration-300 sm:max-w-[280px]"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={`${item.title} certificate`}
                className="h-[160px] w-full border border-border object-contain"
                loading="lazy"
              />
            ) : (
              <div className="mx-auto h-[160px] w-full bg-muted" aria-hidden />
            )}

            <h3 className="mt-6 text-base font-medium text-foreground">{item.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{item.context}</p>
          </div>
        );
      })}
    </div>
  );
}

import { useState } from "react";

type Certification = {
  name: string;
  description: string;
  link: string;
  image?: string;
};

const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    description: "Designing scalable, cost-optimized, and secure AWS architectures.",
    link: "https://www.credly.com/badges/a31c03f4-91e4-4673-a87a-ceea689cd783",
    image: "/aws-saa.png",
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    description:
      "Core cloud concepts, Azure services, and foundational cloud knowledge.",
    link: "https://learn.microsoft.com/en-us/users/mdomerfarooq-4351/credentials/3b6c19526e7a1f05",
    image: "/azure-fundamentals.png",
  },
];

export function Certifications() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:justify-center">
      {certifications.map((cert, i) => {
        const dimmed = hovered !== null && hovered !== i;
        const active = hovered === i;
        return (
          <div
            key={cert.name}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              opacity: dimmed ? 0.35 : 1,
              transform: active ? "translateY(-4px)" : "translateY(0)",
              boxShadow: active ? "0 12px 40px oklch(0 0 0 / 8%)" : "none",
            }}
            className="flex min-h-[320px] w-full flex-col border border-border bg-card p-6 transition-all duration-300 sm:max-w-[280px]"
          >
            {cert.image ? (
              <img
                src={cert.image}
                alt={`${cert.name} badge`}
                className="mx-auto h-20 w-auto object-contain"
                loading="lazy"
              />
            ) : (
              <div className="mx-auto h-20 w-20 bg-muted" aria-hidden />
            )}

            <h3 className="mt-6 text-base font-medium text-foreground">{cert.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {cert.description}
            </p>

            <a
              href={cert.link}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-auto pt-6 font-mono text-xs text-foreground no-underline hover:underline"
            >
              Verify →
            </a>
          </div>
        );
      })}
    </div>
  );
}

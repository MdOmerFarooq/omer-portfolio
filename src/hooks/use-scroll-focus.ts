import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Mobile-only "scroll to focus": tracks which registered element is closest to
 * the centre of the viewport (while at least 60% visible) and returns its index.
 * Returns null on screens >= 768px, where mouse hover is used instead.
 */
export function useScrollFocus(count: number) {
  const nodesRef = useRef<(HTMLElement | null)[]>([]);
  const [focused, setFocused] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const register = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      nodesRef.current[index] = node;
    },
    [],
  );

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setFocused(null);
      return;
    }
    const nodes = nodesRef.current.slice(0, count).filter(Boolean) as HTMLElement[];
    if (nodes.length === 0) return;

    const pick = () => {
      const center = window.innerHeight / 2;
      let best: number | null = null;
      let bestDist = Infinity;
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        // For elements taller than the viewport, measure visibility against the
        // viewport instead so they can still qualify.
        const reference = Math.min(rect.height, window.innerHeight);
        const ratio = reference > 0 ? visible / reference : 0;
        if (ratio < 0.6) return;
        const dist = Math.abs(rect.top + rect.height / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = nodesRef.current.indexOf(node);
        }
      });
      setFocused(best);
    };

    const observer = new IntersectionObserver(pick, {
      threshold: [0.5, 0.75, 1],
      // Only care about the middle band of the viewport, so the callback fires
      // a handful of times per scroll instead of continuously.
      rootMargin: "-35% 0px -35% 0px",
    });
    nodes.forEach((node) => observer.observe(node));
    pick();

    return () => observer.disconnect();
  }, [isMobile, count]);

  return { register, focused, isMobile };
}

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/** Internal canvas resolution — matches source frame dimensions. */
const RESOLUTION = 400;

/**
 * Canvas-based frame player.
 *
 * Frames live in /public/frames/<state>/frame_01.jpg ... and /public/frames/neutral.jpg
 * Replace the files (keeping the naming) to swap in real artwork.
 */

export type AnimationState = "wave" | "typing" | "conversation" | "404" | "neutral";

export const NEUTRAL_FRAME = "/frames/neutral.jpg";

const FRAME_COUNTS: Record<Exclude<AnimationState, "neutral">, number> = {
  wave: 10,
  typing: 10,
  conversation: 10,
  "404": 10,
};

const FPS = 10;
const FRAME_MS = 1000 / FPS;

function framePaths(state: AnimationState): string[] {
  if (state === "neutral") return [NEUTRAL_FRAME];
  const count = FRAME_COUNTS[state];
  const paths = Array.from(
    { length: count },
    (_, i) => `/frames/${state}/frame_${String(i + 1).padStart(2, "0")}.jpg`,
  );
  // wave rests on the neutral frame, so it is preloaded as the trailing image
  return state === "wave" ? [...paths, NEUTRAL_FRAME] : paths;
}

/** Order of frame indices to play, per state. */
function buildSequence(state: AnimationState, total: number): number[] {
  switch (state) {
    case "wave": {
      // frames 1..10 ping-pong, twice, then rest on the appended neutral frame
      const count = total - 1;
      const forward = Array.from({ length: count }, (_, i) => i);
      const backward = [...forward].reverse().slice(1);
      const cycle = [...forward, ...backward];
      return [...cycle, ...cycle, total - 1];
    }
    default:
      // typing loops 1..10 forward; conversation and 404 play once and hold
      return Array.from({ length: total }, (_, i) => i);
  }
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function FramePlayer({
  state,
  size = 400,
  className = "",
  alt = "",
  /** "load" starts immediately, "visible" starts when scrolled into view. */
  trigger = "load",
}: {
  state: AnimationState;
  size?: number;
  className?: string;
  alt?: string;
  trigger?: "load" | "visible";
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<Array<HTMLImageElement | null>>([]);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(trigger === "load");
  const [tabActive, setTabActive] = useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const displaySize = isMobile ? 200 : Math.min(size, 300);

  const staticSrc =
    state === "neutral" || state === "wave" ? NEUTRAL_FRAME : framePaths(state)[0];

  // Preload every frame before playback.
  useEffect(() => {
    if (reducedMotion || state === "neutral") return;
    let cancelled = false;
    setReady(false);
    Promise.all(framePaths(state).map(loadImage)).then((imgs) => {
      if (cancelled) return;
      framesRef.current = imgs;
      setReady(imgs.some(Boolean));
    });
    return () => {
      cancelled = true;
    };
  }, [state, reducedMotion]);

  // Off-screen detection.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setVisible(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pause when the tab is in the background.
  useEffect(() => {
    const onVisibility = () => setTabActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Playback loop. Fully torn down (no rAF at all) when off-screen or hidden.
  useEffect(() => {
    if (reducedMotion || state === "neutral" || !ready) return;
    if (!visible || !tabActive) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const frames = framesRef.current;
    const sequence = buildSequence(state, frames.length);
    const loops = state === "typing";
    let step = 0;
    let last = performance.now();
    let acc = 0;
    let raf = 0;
    let stopped = false;

    const draw = (index: number) => {
      const img = frames[index];
      if (!img) return;
      if (canvas.width !== RESOLUTION) {
        canvas.width = RESOLUTION;
        canvas.height = RESOLUTION;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, RESOLUTION, RESOLUTION);
      ctx.drawImage(img, 0, 0, RESOLUTION, RESOLUTION);
    };

    draw(sequence[0] ?? 0);

    const tick = (now: number) => {
      if (stopped) return;
      const delta = now - last;
      last = now;
      {
        acc += delta;
        while (acc >= FRAME_MS) {
          acc -= FRAME_MS;
          step += 1;
          if (step >= sequence.length) {
            if (loops) {
              step = 0;
            } else {
              // hold on the final frame (wave rests on the neutral first frame)
              draw(sequence[sequence.length - 1] ?? 0);
              stopped = true;
              return;
            }
          }
          draw(sequence[step] ?? 0);
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };
  }, [ready, reducedMotion, state, visible, tabActive]);

  const showCanvas = !reducedMotion && state !== "neutral";

  const mask =
    "radial-gradient(ellipse 95% 95% at center, black 80%, transparent 100%)";

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden bg-transparent ${className}`}
      style={{
        width: displaySize,
        height: displaySize,
        maxWidth: "100%",
        border: "none",
        outline: "none",
        boxShadow: "none",
        maskImage: mask,
        WebkitMaskImage: mask,
        contain: "paint",
        willChange: "contents",
      }}
    >
      {/* First frame as a static image: instant paint + fallback */}
      <img
        src={staticSrc}
        alt={alt}
        aria-hidden={alt === ""}
        className="absolute inset-0 h-full w-full object-contain"
        onError={(e) => {
          e.currentTarget.style.visibility = "hidden";
        }}
      />
      {showCanvas && (
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0"
          style={{
            width: displaySize,
            height: displaySize,
            imageRendering: "crisp-edges",
            opacity: ready ? 1 : 0,
            transition: "opacity 200ms ease",
          }}
        />
      )}
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const RESUME_URL = "/resume.pdf";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => setScrolled(!(entries[0]?.isIntersecting ?? true)),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = (
    <>
      <a
        href="/#experience"
        className="text-sm text-foreground no-underline transition-opacity hover:opacity-60"
        onClick={() => setOpen(false)}
      >
        experience
      </a>
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="text-sm text-foreground no-underline transition-opacity hover:opacity-60"
        onClick={() => setOpen(false)}
      >
        resume
      </a>
      <Link
        to="/about"
        className="text-sm text-foreground no-underline transition-opacity hover:opacity-60"
        activeProps={{ className: "font-medium underline underline-offset-4 opacity-100" }}
        onClick={() => setOpen(false)}
      >
        about
      </Link>
      <a
        href="/#footer"
        className="text-sm text-foreground no-underline transition-opacity hover:opacity-60"
        onClick={() => setOpen(false)}
      >
        contact
      </a>
    </>
  );

  return (
    <>
    <div ref={sentinelRef} aria-hidden className="absolute top-2 left-0 h-px w-px" />
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-background transition-shadow ${
        scrolled ? "shadow-[0_1px_12px_rgba(0,0,0,0.06)]" : "shadow-none"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-end px-6 py-5">
        <div className="hidden items-center gap-7 md:flex">{items}</div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="flex flex-col gap-4 border-t border-border px-6 py-5 md:hidden">
          {items}
        </div>
      )}
    </header>
    </>
  );
}

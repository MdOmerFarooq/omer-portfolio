import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { FramePlayer } from "@/components/frame-player";
import { Achievements } from "@/components/achievements";

const title = "About — Md Omer Farooq";
const description =
  "About Md Omer Farooq, a Cloud & DevOps engineer building scalable AWS infrastructure with Terraform, Ansible and Python.";

const EMAIL = "farooqomarfarooqomar@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/mdomerfarooq/";
const RESUME_URL = "/resume.pdf";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: About,
});

function About() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <Link
        to="/"
        className="fixed top-4 left-6 z-50 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground no-underline transition-opacity hover:opacity-60 md:top-5"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        back
      </Link>

      <main className="mx-auto max-w-4xl px-6 pt-36 pb-24">
        <Reveal>
          <h1 className="font-serif text-5xl font-bold text-foreground sm:text-6xl">
            A bit more
          </h1>

          <div className="mt-14 flex justify-center md:justify-start">
            <FramePlayer
              state="conversation"
              size={400}
              alt="Illustration closing a laptop"
            />
          </div>

          <div className="mt-14 max-w-2xl space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              I didn't start out calling myself a Cloud or DevOps Engineer. I started with
              Electronics and Communication Engineering, completing my diploma in 2020 and
              my Bachelor's degree in Engineering in 2023 at Lords Institute of Engineering
              and Technology in Hyderabad. Somewhere along the way, I found myself more
              interested in what happens behind the application — the machines, networks,
              deployments and systems that have to keep everything running.
            </p>
            <p>
              I joined Movate Technologies in 2023 as an Engineer, working across Linux,
              Windows and macOS environments, along with monitoring, incident response,
              access management and operational automation. Over time, that work moved
              deeper into cloud infrastructure and automation, and I grew into a Senior
              Engineer role where I worked with infrastructure provisioning, configuration
              management, containerized environments and CI/CD automation across cloud
              platforms.
            </p>
            <p>
              These days, the part of engineering I enjoy most is turning something that is
              manual, fragile or difficult to operate into something predictable. Whether
              that's a deployment pipeline, a rolling patch process, a cloud architecture or
              an incident that needs debugging, I like understanding what is actually
              happening underneath and then finding a better way to build, operate and scale
              it.
            </p>
            <p>
              Outside of work, I spend time with friends and family, build side projects
              that start with "this should be easy," and then quietly turn into weekend-long
              debugging sessions.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
            <button
              type="button"
              onClick={copyEmail}
              className="text-sm text-foreground transition-opacity hover:opacity-60"
            >
              {EMAIL}
              <span className="ml-3 font-mono text-xs text-muted-foreground">
                {copied ? "copied" : "click to copy"}
              </span>
            </button>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-xs text-foreground no-underline transition-opacity hover:opacity-60"
            >
              LinkedIn →
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-xs text-foreground no-underline transition-opacity hover:opacity-60"
            >
              resume (PDF) →
            </a>
          </div>
        </Reveal>

        <Reveal as="section" id="achievements" className="scroll-mt-24 pt-24">
          <p className="eyebrow">achievements</p>
          <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">
            Recognitions
          </h2>
          <Achievements />
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  );
}

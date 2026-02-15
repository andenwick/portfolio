"use client";

import { useEffect, useRef } from "react";

/* ── Intersection Observer hook ── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── Data ── */
const projects = [
  {
    title: "Friesian Ranchwear",
    description:
      "E-commerce platform for a western wear brand. Product catalog, Stripe payments, admin dashboard, inventory management.",
    tech: ["Next.js", "Stripe", "PostgreSQL"],
    link: "https://friesianranchwear.com",
    linkLabel: "Visit site",
  },
  {
    title: "ProxyStaff",
    description:
      "AI assistant connecting to WhatsApp and Telegram. Multi-tenant, scheduled tasks, persistent memory across conversations.",
    tech: ["TypeScript", "Fastify", "Prisma"],
    link: "https://github.com/andenwick/proxy-staff",
    linkLabel: "GitHub",
  },
  {
    title: "Binary Logic Studio",
    description:
      "Interactive binary math and logic gate trainer. Three modes, SVG circuit diagrams generated on the fly. ~2,800 lines of vanilla JS.",
    tech: ["JavaScript", "SVG"],
    link: "https://github.com/andenwick/binary-logic-studio",
    linkLabel: "GitHub",
  },
  {
    title: "SaltFlat Coffee",
    description:
      "Demo site for a local coffee shop. Custom scroll-triggered animations and SVG wave dividers.",
    tech: ["Next.js", "Animations"],
    link: "https://saltflat.andenwick.dev",
    linkLabel: "Visit site",
  },
  {
    title: "dns-spy",
    description:
      "DNS packet analyzer in C using libpcap. Captures live traffic and breaks down queries at the byte level.",
    tech: ["C", "libpcap"],
    link: "https://github.com/andenwick/dns-spy",
    linkLabel: "GitHub",
  },
  {
    title: "CarScan",
    description:
      "OBD-II diagnostic tool in C. Reads vehicle data, VIN lookups, auto-generates PDF reports.",
    tech: ["C", "OBD-II"],
    link: "https://github.com/andenwick/car-scan",
    linkLabel: "GitHub",
  },
];

/* ── Components ── */

function GlassPill({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a href={href} className="glass-pill">
      <span className="glass-pill-inner">{children}</span>
    </a>
  );
}

function ArrowLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="arrow-link inline-flex items-center gap-1 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-80"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
      <span className="arrow">→</span>
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="section-label">
      {children}
    </p>
  );
}

/* ── Sections ── */

function Nav() {
  return (
    <nav className="mx-auto flex h-16 max-w-[1024px] items-center justify-between px-6 sm:h-20 sm:px-8">
      <a href="/" className="text-sm font-medium tracking-widest text-white/90">
        AW
      </a>
      <div className="flex items-center gap-6 sm:gap-8">
        {["Projects", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white sm:text-sm"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const ref = useFadeIn();
  return (
    <section className="mx-auto max-w-[1024px] px-6 sm:px-8">
      <div className="pb-24 pt-16 sm:pb-32 sm:pt-24">
        <div ref={ref} className="fade-section">
          <SectionLabel>Software Developer</SectionLabel>
          <h1 className="mt-6 max-w-[672px] text-[clamp(2.25rem,8vw,3.75rem)] font-light leading-[1.1] text-white">
            Anden{" "}
            <span className="text-[rgb(187,222,242)]">Wickstrand</span>
          </h1>
          <p className="mt-6 max-w-[480px] text-[15px] leading-[1.7] text-white/60 sm:text-base sm:leading-[1.75]">
            19-year-old computer engineering student who builds software for
            people. I sell it, I build it, I support it. One person, start to
            finish.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <GlassPill href="#projects">View Projects</GlassPill>
            <ArrowLink href="#contact">Get in touch</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects">
      <div className="section-divider" />
      <div className="mx-auto max-w-[1024px] px-6 sm:px-8">
        <div className="pb-24 pt-20 sm:pb-32 sm:pt-28">
          <div className="max-w-[768px]">
            <SectionLabel>Projects</SectionLabel>
            <h2 className="section-heading mt-5">
              Things I&apos;ve built
            </h2>
            <p className="mt-4 max-w-[512px] text-[15px] leading-[1.7] text-white/60 sm:text-base">
              Client work, personal tools, and things I built to learn. All
              shipped.
            </p>
          </div>
          <div className="mt-16 space-y-0 sm:mt-20 sm:grid sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14 sm:space-y-0">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className={`fade-section py-8 sm:py-0 ${index > 0 ? "border-t border-white/[0.06] sm:border-t-0" : ""}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-normal text-white sm:text-xl">{project.title}</h3>
        <ArrowLink href={project.link}>{project.linkLabel}</ArrowLink>
      </div>
      <p className="mt-3 text-[15px] leading-[1.7] text-white/60">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="tech-tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  const ref = useFadeIn();
  return (
    <section id="about">
      <div className="section-divider" />
      <div className="mx-auto max-w-[1024px] px-6 sm:px-8">
        <div className="pb-24 pt-20 sm:pb-32 sm:pt-28">
          <div ref={ref} className="fade-section max-w-[768px]">
            <SectionLabel>About</SectionLabel>
            <h2 className="section-heading mt-5">
              Who I am
            </h2>
          </div>
          <div className="mt-10 max-w-[600px] space-y-6 sm:mt-14">
            <p ref={useFadeIn()} className="fade-section text-[15px] leading-[1.8] text-white/60 sm:text-base">
              Computer Engineering student at SLCC, transferring to the
              University of Utah. Based in Stansbury Park, about 30 minutes west
              of Salt Lake City.
            </p>
            <p ref={useFadeIn()} className="fade-section text-[15px] leading-[1.8] text-white/60 sm:text-base">
              I started building things to understand how they work. That turned
              into building things for other people. One paying client, a
              handful of projects, always shipping.
            </p>
            <p ref={useFadeIn()} className="fade-section text-[15px] leading-[1.8] text-white/60 sm:text-base">
              Mostly TypeScript and JavaScript. Also C when the problem calls
              for it. I like working close to the metal. No degree yet — I just
              ship things and learn as I go.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useFadeIn();
  return (
    <section id="contact">
      <div className="section-divider" />
      <div className="mx-auto max-w-[1024px] px-6 sm:px-8">
        <div className="pb-24 pt-20 sm:pb-32 sm:pt-28">
          <div ref={ref} className="fade-section max-w-[768px]">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="section-heading mt-5">
              Let&apos;s talk
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-white/60 sm:text-base">
              Project, question, or just want to connect.
            </p>
            <div className="mt-10">
              <GlassPill href="mailto:andenwick@gmail.com">
                andenwick@gmail.com
              </GlassPill>
            </div>
            <div className="mt-8 flex items-center gap-8">
              <ArrowLink href="https://github.com/andenwick">GitHub</ArrowLink>
              <ArrowLink href="https://linkedin.com/in/andenwick">
                LinkedIn
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="section-divider" />
      <div className="mx-auto max-w-[1024px] px-6 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center sm:py-12">
          <p className="text-[13px] text-white/30">
            &copy; {new Date().getFullYear()} Anden Wickstrand
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "GitHub", href: "https://github.com/andenwick" },
              { label: "LinkedIn", href: "https://linkedin.com/in/andenwick" },
              { label: "Email", href: "mailto:andenwick@gmail.com" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[13px] text-white/30 transition-colors duration-300 hover:text-white/60"
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ── */

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}

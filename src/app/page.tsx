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
      { threshold: 0.1 }
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
      "E-commerce platform I built for a western wear brand. Handles product catalog, Stripe payments, an admin dashboard for inventory, and order management. My only paying client right now.",
    tech: ["Next.js", "Stripe", "Admin Dashboard", "Inventory"],
    link: "https://friesianranchwear.com",
    linkLabel: "Visit site",
  },
  {
    title: "ProxyStaff",
    description:
      "AI assistant that connects to WhatsApp and Telegram. Multi-tenant architecture, scheduled tasks, persistent memory across conversations. The most complex thing I've built.",
    tech: ["TypeScript", "Fastify", "PostgreSQL", "Prisma"],
    link: "https://github.com/andenwick/proxy-staff",
    linkLabel: "GitHub",
  },
  {
    title: "Binary Logic Studio",
    description:
      "Interactive trainer for binary math and logic gates. Three modes: Learn, Practice, and Advanced. Generates SVG circuit diagrams on the fly. About 2,800 lines of vanilla JavaScript.",
    tech: ["Vanilla JS", "SVG", "Circuit Diagrams"],
    link: "https://github.com/andenwick/binary-logic-studio",
    linkLabel: "GitHub",
  },
  {
    title: "SaltFlat Coffee",
    description:
      "Demo site for a local coffee shop with custom scroll-triggered animations and SVG wave dividers between sections. Built to practice animation work.",
    tech: ["Next.js", "Scroll Animations", "SVG"],
    link: "https://saltflat.andenwick.dev",
    linkLabel: "Visit site",
  },
  {
    title: "dns-spy",
    description:
      "DNS packet analyzer written in C using libpcap. Captures live network traffic and breaks down DNS queries and responses at the byte level.",
    tech: ["C", "libpcap", "Networking"],
    link: "https://github.com/andenwick/dns-spy",
    linkLabel: "GitHub",
  },
  {
    title: "CarScan",
    description:
      "OBD-II diagnostic tool in C that reads vehicle data, does VIN-based lookups, and auto-generates PDF reports. Built for a friend who needed quick vehicle inspections.",
    tech: ["C", "OBD-II", "PDF Generation"],
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
    <p
      className="text-sm font-medium uppercase text-[#A3A3A3]"
      style={{ letterSpacing: "1.4px", fontSize: "14px" }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return <div className="gradient-divider" />;
}

/* ── Sections ── */

function Nav() {
  return (
    <nav className="mx-auto flex h-[72px] max-w-[1024px] items-center justify-between px-6 sm:h-[88px] sm:px-8">
      <a href="/" className="text-sm font-medium tracking-wide text-white">
        AW
      </a>
      <div className="flex items-center gap-5 sm:gap-8">
        <a
          href="#projects"
          className="text-sm text-white/80 transition-colors duration-300 hover:text-white"
        >
          Projects
        </a>
        <a
          href="#about"
          className="text-sm text-white/80 transition-colors duration-300 hover:text-white"
        >
          About
        </a>
        <a
          href="#contact"
          className="text-sm text-white/80 transition-colors duration-300 hover:text-white"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const ref = useFadeIn();
  return (
    <section className="mx-auto max-w-[1024px] px-6 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-16">
      <div ref={ref} className="fade-section text-center sm:text-left">
        <SectionLabel>Software Developer</SectionLabel>
        <h1
          className="mx-auto mt-6 text-[36px] font-light leading-[1.2] text-white sm:mx-0 sm:text-[48px] md:text-[60px]"
          style={{ maxWidth: "672px" }}
        >
          Anden <span style={{ color: "rgb(187, 222, 242)" }}>Wickstrand</span>
        </h1>
        <p
          className="mx-auto mt-5 text-base font-normal leading-[1.65] text-white/80 sm:mx-0 sm:text-lg"
          style={{ maxWidth: "512px" }}
        >
          I&apos;m a 19-year-old computer engineering student who builds
          software for people. I sell it, I build it, I support it. One person,
          start to finish.
        </p>
        <div className="mt-8 flex items-center justify-center gap-6 sm:justify-start">
          <GlassPill href="#projects">View Projects</GlassPill>
          <ArrowLink href="#contact">Get in touch</ArrowLink>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-12 sm:py-20">
      <Divider />
      <div className="mx-auto max-w-[1024px] px-6 pt-12 sm:px-8 sm:pt-20">
        <div className="mx-auto max-w-[768px] text-center">
          <SectionLabel>Projects</SectionLabel>
          <h2 className="mt-4 text-[32px] font-normal leading-[1.25] text-white sm:text-[40px] md:text-[48px]">
            Things I&apos;ve built
          </h2>
          <p className="mt-4 text-base leading-[1.65] text-white/80">
            A mix of client work, personal tools, and things I built to learn.
            All shipped.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const ref = useFadeIn();
  return (
    <div ref={ref} className="fade-section project-card">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-normal text-white">{project.title}</h3>
        {project.revenue && (
          <span className="shrink-0 text-xs font-medium text-[#A3A3A3]">
            {project.revenue}
          </span>
        )}
      </div>
      <p className="mt-3 text-base leading-[1.65] text-white/80">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="tech-tag">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5">
        <ArrowLink href={project.link}>{project.linkLabel}</ArrowLink>
      </div>
    </div>
  );
}

function About() {
  const ref = useFadeIn();
  return (
    <section id="about" className="py-12 sm:py-20">
      <Divider />
      <div className="mx-auto max-w-[1024px] px-6 pt-12 sm:px-8 sm:pt-20">
        <div ref={ref} className="fade-section mx-auto max-w-[768px] text-center">
          <SectionLabel>About</SectionLabel>
          <h2 className="mt-4 text-[32px] font-normal leading-[1.25] text-white sm:text-[40px] md:text-[48px]">
            Who I am
          </h2>
        </div>
        <div
          ref={useFadeIn()}
          className="fade-section mx-auto mt-10"
          style={{ maxWidth: "672px" }}
        >
          <p className="text-base leading-[1.65] text-white/80">
            I&apos;m studying Computer Engineering at Salt Lake Community
            College and transferring to the University of Utah. I live in
            Stansbury Park, about 30 minutes west of Salt Lake City.
          </p>
          <p className="mt-6 text-base leading-[1.65] text-white/80">
            I started building things because I wanted to understand how they
            work. That turned into building things for other people. Right now I
            have one paying client and a handful of projects that keep me busy
            outside of school.
          </p>
          <p className="mt-6 text-base leading-[1.65] text-white/80">
            I write a lot of TypeScript and JavaScript, but I also work in C
            when the problem calls for it. I like working close to the metal and
            understanding what happens under the abstractions. I don&apos;t have
            years of experience or a degree yet. I just ship things and learn as
            I go.
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useFadeIn();
  return (
    <section id="contact" className="py-12 sm:py-20">
      <Divider />
      <div className="mx-auto max-w-[1024px] px-6 pt-12 sm:px-8 sm:pt-20">
        <div
          ref={ref}
          className="fade-section mx-auto max-w-[768px] text-center"
        >
          <SectionLabel>Contact</SectionLabel>
          <h2 className="mt-4 text-[32px] font-normal leading-[1.25] text-white sm:text-[40px] md:text-[48px]">
            Let&apos;s talk
          </h2>
          <p className="mt-4 text-base leading-[1.65] text-white/80">
            If you have a project, a question, or just want to connect.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <GlassPill href="mailto:andenwick@gmail.com">
              andenwick@gmail.com
            </GlassPill>
          </div>
          <div className="mt-8 flex items-center justify-center gap-8">
            <ArrowLink href="https://github.com/andenwick">GitHub</ArrowLink>
            <ArrowLink href="https://linkedin.com/in/andenwick">
              LinkedIn
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 sm:py-20">
      <Divider />
      <div className="mx-auto max-w-[1024px] px-6 pt-8 sm:px-8 sm:pt-12">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[#A3A3A3]">
            &copy; {new Date().getFullYear()} Anden Wickstrand
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/andenwick"
              className="text-sm text-[#A3A3A3] transition-colors duration-300 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/andenwick"
              className="text-sm text-[#A3A3A3] transition-colors duration-300 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="mailto:andenwick@gmail.com"
              className="text-sm text-[#A3A3A3] transition-colors duration-300 hover:text-white"
            >
              Email
            </a>
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

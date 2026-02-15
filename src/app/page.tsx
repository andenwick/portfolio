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
      className="arrow-link"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
      <span className="arrow">→</span>
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label">{children}</p>;
}

/* ── Sections ── */

function Nav() {
  return (
    <nav className="nav">
      <a href="/" className="nav-logo">AW</a>
      <div className="nav-links">
        {["Projects", "About", "Contact"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
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
    <section className="section-wrap">
      <div className="section-inner hero-inner">
        <div ref={ref} className="fade-section">
          <SectionLabel>Software Developer</SectionLabel>
          <h1 className="hero-title">
            Anden <span className="hero-accent">Wickstrand</span>
          </h1>
          <p className="hero-desc">
            19-year-old computer engineering student who builds software for
            people. I sell it, I build it, I support it. One person, start to
            finish.
          </p>
          <div className="hero-ctas">
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
      <div className="section-wrap">
        <div className="section-inner">
          <SectionLabel>Projects</SectionLabel>
          <h2 className="section-heading">Things I&apos;ve built</h2>
          <p className="section-desc">
            Client work, personal tools, and things I built to learn. All shipped.
          </p>
          <div className="project-grid">
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
      className={`fade-section project-card ${index > 0 ? "project-card-border" : ""}`}
    >
      <div className="project-header">
        <h3 className="project-title">{project.title}</h3>
        <ArrowLink href={project.link}>{project.linkLabel}</ArrowLink>
      </div>
      <p className="project-desc">{project.description}</p>
      <div className="project-tags">
        {project.tech.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
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
      <div className="section-wrap">
        <div className="section-inner">
          <div ref={ref} className="fade-section">
            <SectionLabel>About</SectionLabel>
            <h2 className="section-heading">Who I am</h2>
          </div>
          <div className="about-text">
            <p ref={useFadeIn()} className="fade-section about-p">
              Computer Engineering student at SLCC, transferring to the
              University of Utah. Based in Stansbury Park, about 30 minutes west
              of Salt Lake City.
            </p>
            <p ref={useFadeIn()} className="fade-section about-p">
              I started building things to understand how they work. That turned
              into building things for other people. One paying client, a
              handful of projects, always shipping.
            </p>
            <p ref={useFadeIn()} className="fade-section about-p">
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
      <div className="section-wrap">
        <div className="section-inner">
          <div ref={ref} className="fade-section">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="section-heading">Let&apos;s talk</h2>
            <p className="section-desc">
              Project, question, or just want to connect.
            </p>
            <div style={{ marginTop: "40px" }}>
              <GlassPill href="mailto:andenwick@gmail.com">
                andenwick@gmail.com
              </GlassPill>
            </div>
            <div className="contact-links">
              <ArrowLink href="https://github.com/andenwick">GitHub</ArrowLink>
              <ArrowLink href="https://linkedin.com/in/andenwick">LinkedIn</ArrowLink>
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
      <div className="footer-inner">
        <p className="footer-copy">&copy; {new Date().getFullYear()} Anden Wickstrand</p>
        <div className="footer-links">
          {[
            { label: "GitHub", href: "https://github.com/andenwick" },
            { label: "LinkedIn", href: "https://linkedin.com/in/andenwick" },
            { label: "Email", href: "mailto:andenwick@gmail.com" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="footer-link"
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

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

'use client'

import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Reveal, SectionHeading } from '@/components/reveal'
import { getFeaturedProjects, type FeaturedProject } from '@/lib/works'

const PROJECTS = getFeaturedProjects()

function ProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  const reversed = index % 2 === 1
  return (
    <Reveal className="group">
      <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className={`relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_60px_-35px_rgba(0,0,0,0.4)] ${
            reversed ? 'lg:order-2' : ''
          }`}
        >
          <Image
            src={project.image}
            alt={`${project.name} interface preview`}
            width={900}
            height={640}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 font-mono text-[11px] tracking-widest text-muted-foreground uppercase backdrop-blur">
            {project.year}
          </span>
        </motion.div>

        <div className={reversed ? 'lg:order-1' : ''}>
          <h3 className="font-serif text-3xl tracking-tight sm:text-4xl">{project.name}</h3>
          <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>

          <dl className="mt-6 space-y-4 text-sm leading-relaxed">
            <div>
              <dt className="font-mono text-[11px] tracking-widest text-primary uppercase">
                Problem
              </dt>
              <dd className="mt-1 text-muted-foreground">{project.problem}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-widest text-primary uppercase">
                Solution
              </dt>
              <dd className="mt-1 text-muted-foreground">{project.solution}</dd>
            </div>
          </dl>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {project.results.map((r) => (
              <div key={r.label} className="rounded-xl border border-border bg-card/60 p-3">
                <div className="font-serif text-2xl tracking-tight text-foreground">
                  {r.value}
                </div>
                <div className="mt-1 text-[11px] leading-tight text-muted-foreground">
                  {r.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={`/works/${project.slug}`}
            className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            Read the case study
            <ArrowUpRight className="size-4 text-primary transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </article>
    </Reveal>
  )
}

export function FeaturedProjects() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
      <SectionHeading
        index="01"
        kicker="Selected Work"
        title="Work that earned its place."
        description="A handful of products where craft, accessibility, and speed actually moved the needle."
      />
      <div className="space-y-20 sm:space-y-28">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      <Reveal className="mt-16 flex justify-center">
        <Link
          href="/works"
          className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-card"
        >
          View all work
          <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  )
}

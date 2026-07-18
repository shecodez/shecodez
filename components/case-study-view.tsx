'use client'

import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import type { Work } from '@/lib/works'

const ease = [0.22, 1, 0.36, 1] as const

export function CaseStudyView({ work, next }: { work: Work; next: Work }) {
  const cs = work.caseStudy!

  return (
    <article className="mx-auto max-w-3xl px-4 pt-28 pb-24 sm:pt-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="border-t border-border pt-6"
      >
        <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <span className="text-primary">Case Study</span>
          <span>{work.category}</span>
        </div>
        <h1 className="text-balance font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          {work.name}
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {work.tagline}
        </p>

        {cs.liveUrl && (
          <a
            href={cs.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            {cs.liveLabel ?? 'Visit live site'}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}
      </motion.div>

      {/* Meta */}
      <motion.dl
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
        className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-4"
      >
        {[
          { label: 'Role', value: cs.role },
          { label: 'Timeline', value: cs.timeline },
          { label: 'Team', value: cs.team },
          { label: 'Stack', value: work.tech.slice(0, 3).join(', ') },
        ].map((m) => (
          <div key={m.label}>
            <dt className="font-mono text-[10px] tracking-widest text-primary uppercase">{m.label}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-foreground">{m.value}</dd>
          </div>
        ))}
      </motion.dl>

      {/* Cover */}
      <Reveal className="mt-10">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_60px_-35px_rgba(0,0,0,0.4)]">
          <Image
            src={work.image || '/placeholder.svg'}
            alt={`${work.name} cover`}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </Reveal>

      {/* Overview */}
      <Reveal className="mt-12">
        <p className="text-pretty font-serif text-2xl leading-snug tracking-tight text-foreground sm:text-3xl">
          {cs.overview}
        </p>
      </Reveal>

      {/* Results */}
      <Reveal className="mt-12">
        <div className="grid grid-cols-3 gap-3">
          {cs.results.map((r) => (
            <div key={r.label} className="rounded-xl border border-border bg-card/60 p-4">
              <div className="font-serif text-3xl tracking-tight text-foreground">{r.value}</div>
              <div className="mt-1 text-xs leading-tight text-muted-foreground">{r.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Sections */}
      <div className="mt-14 space-y-12">
        {cs.sections.map((section) => (
          <Reveal key={section.heading}>
            <section>
              <h2 className="font-mono text-xs tracking-widest text-primary uppercase">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((p, i) => (
                  <p key={i} className="text-pretty leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      {/* Gallery */}
      {cs.gallery.length > 0 && (
        <div className="mt-14 space-y-6">
          {cs.gallery.map((g) => (
            <Reveal key={g.src + g.caption}>
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-card">
                  <Image
                    src={g.src || '/placeholder.svg'}
                    alt={g.caption}
                    fill
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm text-muted-foreground">{g.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}

      {/* Next project */}
      <Reveal className="mt-16">
        <Link
          href={next.linkType === 'case-study' ? `/works/${next.slug}` : '/works'}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-foreground/20 hover:bg-card"
        >
          <div>
            <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              Next case study
            </div>
            <div className="mt-2 font-serif text-2xl tracking-tight">{next.name}</div>
          </div>
          <ArrowRight className="size-6 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </article>
  )
}
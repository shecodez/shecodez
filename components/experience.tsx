'use client'

import { motion } from 'motion/react'
import { Reveal, SectionHeading } from '@/components/reveal'

type Role = {
  company: string
  role: string
  period: string
  highlights: string[]
}

const ROLES: Role[] = [
  {
    company: 'Georgia Farm Bureau',
    role: 'Frontend Engineer',
    period: '2018 — Present',
    highlights: [
      'Led a React-based UI redesign of core member-facing applications.',
      'Raised accessibility scores from C to A+ and made every flow keyboard operable.',
      'Cut load time by over a second by removing render-blocking assets.',
      'Established a reusable component architecture adopted across teams.',
    ],
  },
  {
    company: 'microNovations',
    role: 'Web Developer',
    period: '2014 — 2018',
    highlights: [
      'Designed and built a responsive marketing website from scratch.',
      'Owned the visual design and interaction details end to end.',
      'Optimized hosting and assets to meaningfully reduce operating costs.',
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
      <SectionHeading index="04" kicker="Experience" title="Seven years of shipping." />

      <div className="relative ml-2 border-l border-border pl-8 sm:ml-4">
        {ROLES.map((r, i) => (
          <Reveal key={r.company} delay={i * 0.1} className="relative pb-14 last:pb-0">
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.1 }}
              className="absolute top-2 -left-10 flex size-4 items-center justify-center rounded-full border-2 border-background bg-primary"
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-serif text-2xl tracking-tight">{r.company}</h3>
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                {r.period}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-primary">{r.role}</p>
            <ul className="mt-4 space-y-2.5">
              {r.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

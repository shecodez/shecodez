'use client'

import { Reveal, SectionHeading } from '@/components/reveal'

const DETAILS = [
  'Reduced page load time by over one second by eliminating render-blocking assets.',
  'Improved accessibility scores from C to A+ across core member flows.',
  'Standardized spacing and component behavior across the application.',
  'Optimized layouts for mobile, tablet, and desktop with a fluid type scale.',
  'Built reusable React components to reduce duplicate UI code by 60%.',
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
      <SectionHeading index="03" kicker="About" title="Craft is a practice, not a claim." />

      <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
        <Reveal className="space-y-5 text-pretty text-base leading-relaxed text-muted-foreground">
          <p>
            I fell for frontend the first time a hover state made an interface feel alive. Since
            then I&apos;ve chased the same feeling in production: the quiet satisfaction of a
            layout that never shifts, a focus ring that always shows up, an animation that lands
            exactly on beat.
          </p>
          <p>
            I care most about the parts users can&apos;t name but always feel: accessibility,
            performance, and consistency. I&apos;d rather ship one component that behaves perfectly
            everywhere than ten that mostly work.
          </p>
          <p>
            I studied abroad in <span className="text-foreground">Osaka</span>, and Japanese
            design shaped how I think about restraint: remove until only the essential remains,
            then make that essential feel effortless. It&apos;s the same instinct I bring to
            interfaces, and why I&apos;m drawn to teams building at the intersection of design,
            AI, and creator culture.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-card/50 p-6">
            <h3 className="font-serif text-2xl tracking-tight">The details matter</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Instead of saying I&apos;m detail-oriented, here&apos;s the receipts.
            </p>
            <ul className="mt-5 space-y-3">
              {DETAILS.map((d, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

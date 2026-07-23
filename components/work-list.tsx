'use client'

import { ArrowUpRight, BookOpen, GitBranch, Globe } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Work, WorkLinkType } from '@/lib/works'

const FILTERS: { label: string; value: WorkLinkType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Case Studies', value: 'case-study' },
  { label: 'Websites', value: 'website' },
  { label: 'Open Source', value: 'github' },
]

const LINK_META: Record<WorkLinkType, { label: string; Icon: typeof BookOpen }> = {
  'case-study': { label: 'Read case study', Icon: BookOpen },
  website: { label: 'Visit website', Icon: Globe },
  github: { label: 'View on GitHub', Icon: GitBranch },
}

function WorkCard({ work }: { work: Work }) {
  const { label, Icon } = LINK_META[work.linkType]
  const isInternal = work.linkType === 'case-study'
  const href = isInternal ? `/works/${work.slug}` : work.href ?? '#'

  const inner = (
    <>
      <div className="relative aspect-[16/11] overflow-hidden rounded-xl border border-border bg-card">
        <Image
          src={work.image}
          alt={`${work.name} preview`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase backdrop-blur">
          <Icon className="size-3" />
          {work.linkType === 'case-study' ? 'Case Study' : work.linkType === 'github' ? 'GitHub' : 'Website'}
        </span>
        {work.selected && (
          <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 font-mono text-[10px] tracking-widest text-primary-foreground uppercase">
            Featured
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl tracking-tight">{work.name}</h3>
          <p className="mt-1 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            {work.category} · {work.year}
          </p>
        </div>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">{work.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {work.tech.slice(0, 4).map((t) => (
          <span key={t} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
        <Icon className="size-4 text-primary" />
        {label}
      </span>
    </>
  )

  const cardClass =
    'group flex flex-col rounded-2xl border border-border bg-card/40 p-4 transition-colors hover:border-foreground/20 hover:bg-card sm:p-5'

  if (isInternal) {
    return (
      <Link href={href} className={cardClass}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
      {inner}
    </a>
  )
}

export function WorkList({ works }: { works: Work[] }) {
  const [filter, setFilter] = useState<WorkLinkType | 'all'>('all')
  const filtered = filter === 'all' ? works : works.filter((w) => w.linkType === filter)

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.value
          const count = f.value === 'all' ? works.length : works.filter((w) => w.linkType === f.value).length
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${
                active
                  ? 'border-transparent text-primary-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="work-filter-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">
                {f.label}
                <span className="ml-1.5 opacity-60">{count}</span>
              </span>
            </button>
          )
        })}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((work, i) => (
            <motion.div
              key={work.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <WorkCard work={work} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
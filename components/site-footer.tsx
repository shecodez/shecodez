'use client'

import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const SOCIAL = [
  { label: 'Email', value: 'shecodez@gmail.com', href: 'mailto:shecodez@gmail.com' },
  { label: 'GitHub', value: '@shecodez', href: 'https://github.com/shecodez' },
  { label: 'LinkedIn', value: 'in/shecodez', href: 'https://www.linkedin.com/in/shecodez' },
  { label: 'Resume/CV', value: 'shecodez_cv.pdf', href: "/downloads/resumeNJN.pdf" },
]

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-5xl px-4 pb-28 pt-10">
      <Reveal>
        <div className="rounded-3xl border border-border bg-card/50 p-8 sm:p-12">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">Contact</p>
          <h2 className="mt-4 max-w-2xl text-balance font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Building something that should feel right? Let&apos;s talk.
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:shecodez@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Say hello
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium transition-colors hover:border-primary/40"
            >
              Back to top
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} className="group flex flex-col gap-1" target="_blank">
                <span className="text-xs tracking-widest text-muted-foreground uppercase">
                  {s.label}
                </span>
                <span className="flex items-center gap-1 text-sm font-medium transition-colors group-hover:text-primary">
                  {s.value}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
        <p>&copy; {new Date().getFullYear()} SHeCodez LLC. Built with intent.</p>
        <p className="font-mono tracking-wide">
          Press{' '}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">B</kbd>{' '}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">I</kbd>{' '}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">G</kbd>{' '}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">O</kbd>
        </p>
      </div>
    </footer>
  )
}

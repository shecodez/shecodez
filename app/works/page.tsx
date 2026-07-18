import type { Metadata } from 'next'
import { PageNav } from '@/components/page-nav'
import { SiteFooter } from '@/components/site-footer'
import { WorkList } from '@/components/work-list'
import { WORKS } from '@/lib/works'

export const metadata: Metadata = {
  title: 'Work — shecodez',
  description:
    'Selected work by Nicole J. Nobles, Frontend Design Engineer — case studies, live websites, and open-source projects.',
}

export default function WorkPage() {
  return (
    <main className="relative min-h-screen">
      <PageNav backHref="/" backLabel="Home" />

      <section className="mx-auto max-w-5xl px-4 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="border-t border-border pt-6">
          <div className="mb-4 flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            <span className="text-primary">Index</span>
            <span>All Work</span>
          </div>
          <h1 className="max-w-3xl text-balance font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            Some of the things SHeCodez.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            A mix of in-depth case studies, live client and personal projects, and open-source tools.
            Filter by type, or dive straight into a featured project.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24">
        <WorkList works={WORKS} />
      </section>

      <SiteFooter />
    </main>
  )
}
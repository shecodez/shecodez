import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseStudyView } from '@/components/case-study-view'
import { PageNav } from '@/components/page-nav'
import { SiteFooter } from '@/components/site-footer'
import { getCaseStudies, getWork } from '@/lib/works'

export function generateStaticParams() {
  return getCaseStudies().map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const work = getWork(slug)
  if (!work) return { title: 'Case Study — shecodez' }
  return {
    title: `${work.name} — Case Study · shecodez`,
    description: work.tagline,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const work = getWork(slug)

  if (!work || work.linkType !== 'case-study' || !work.caseStudy) {
    notFound()
  }

  const caseStudies = getCaseStudies()
  const currentIndex = caseStudies.findIndex((w) => w.slug === slug)
  const next = caseStudies[(currentIndex + 1) % caseStudies.length]

  return (
    <main className="relative min-h-screen">
      <PageNav backHref="/work" backLabel="All Work" />
      <CaseStudyView work={work} next={next} />
      <SiteFooter />
    </main>
  )
}
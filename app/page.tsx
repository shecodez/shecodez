import { About } from '@/components/about'
import { ComponentLibrary } from '@/components/component-library'
import { CurrentlyInto } from '@/components/currently-into'
import { Experience } from '@/components/experience'
import { FeaturedProjects } from '@/components/featured-projects'
import { Hero } from '@/components/hero'
import { PageOverlays } from '@/components/page-overlays'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { Skills } from '@/components/skills'

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <SiteNav />
      <Hero />
      <FeaturedProjects />
      <ComponentLibrary />
      <About />
      <Skills />
      <Experience />
      <CurrentlyInto />
      <SiteFooter />
      <PageOverlays />
    </main>
  )
}

import { About } from '@/components/about'
import { ComponentLibrary } from '@/components/component-library'
import { CurrentlyInto } from '@/components/currently-into'
import { EasterEgg } from '@/components/easter-egg'
import { PortalsPong } from '@/components/portals-pong'
import { Experience } from '@/components/experience'
import { FeaturedProjects } from '@/components/featured-projects'
import { Hero } from '@/components/hero'
import { MusicPlayer } from '@/components/music-player'
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
      <MusicPlayer />
      <EasterEgg />
      <PortalsPong />
    </main>
  )
}

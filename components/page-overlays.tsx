'use client'

import { MusicPlayer } from '@/components/music-player'
import { NowPlayingProvider } from '@/components/now-playing-provider'
import { PagePet } from '@/components/page-pet'

export function PageOverlays() {
  return (
    <NowPlayingProvider>
      <MusicPlayer />
      <PagePet />
    </NowPlayingProvider>
  )
}

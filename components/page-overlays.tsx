'use client'

import { MusicPlayer } from '@/components/music-player'
import { NowPlayingProvider } from '@/components/now-playing-provider'
import { SiteSitter } from '@/components/site-sitter'

export function PageOverlays() {
  return (
    <NowPlayingProvider>
      <MusicPlayer />
      <SiteSitter />
    </NowPlayingProvider>
  )
}

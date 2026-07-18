'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { AnimeTrack } from '@/lib/anime-tracks'

interface NowPlayingContextValue {
  track: AnimeTrack | null
  selectTrack: (track: AnimeTrack) => void
  clearTrack: () => void
}

const NowPlayingContext = createContext<NowPlayingContextValue | null>(null)

export function NowPlayingProvider({ children }: { children: React.ReactNode }) {
  const [track, setTrack] = useState<AnimeTrack | null>(null)

  const selectTrack = useCallback((next: AnimeTrack) => {
    setTrack(next)
  }, [])

  const clearTrack = useCallback(() => {
    setTrack(null)
  }, [])

  const value = useMemo(
    () => ({ track, selectTrack, clearTrack }),
    [track, selectTrack, clearTrack],
  )

  return <NowPlayingContext.Provider value={value}>{children}</NowPlayingContext.Provider>
}

export function useNowPlaying() {
  const context = useContext(NowPlayingContext)
  if (!context) {
    throw new Error('useNowPlaying must be used within NowPlayingProvider')
  }
  return context
}

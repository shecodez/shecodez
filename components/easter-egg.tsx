'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Play, X } from 'lucide-react'
import { useEffect } from 'react'
import { useNowPlaying } from '@/components/now-playing-provider'
import { ANIME_TRACKS, type AnimeTrack } from '@/lib/anime-tracks'

export const EASTER_EGG_SEQUENCE = 'anime'

export const FAVES = ANIME_TRACKS

interface EasterEggModalProps {
  open: boolean
  onClose: () => void
}

function TrackRow({ track, index, onSelect }: { track: AnimeTrack; index: number; onSelect: () => void }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * index }}
    >
      <button
        type="button"
        onClick={onSelect}
        className="group flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3 text-left transition-colors hover:border-primary/40 hover:bg-accent"
      >
        <div className="min-w-0">
          <p className="text-sm font-medium">{track.title}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{track.artist}</p>
        </div>
        <span className="flex shrink-0 items-center gap-2">
          <span className="text-right text-xs font-medium text-primary">{track.note}</span>
          <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary opacity-0 transition-opacity group-hover:opacity-100">
            <Play className="size-3.5 translate-x-px" fill="currentColor" aria-hidden />
          </span>
        </span>
      </button>
    </motion.li>
  )
}

export function EasterEggModal({ open, onClose }: EasterEggModalProps) {
  const { selectTrack } = useNowPlaying()

  useEffect(() => {
    if (!open) return

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  function handleSelectTrack(track: AnimeTrack) {
    selectTrack(track)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Favorite anime songs"
            className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] tracking-widest text-primary uppercase">
                  GOAT anime songs
                </p>
                <h3 className="mt-1 font-serif text-2xl tracking-tight">On heavy rotation ヾ(´･ ･`｡)ﾉ♪</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <ul className="mt-5 space-y-2">
              {ANIME_TRACKS.map((track, i) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  index={i}
                  onSelect={() => handleSelectTrack(track)}
                />
              ))}
            </ul>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Pick a track to start the floating player.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

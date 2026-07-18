'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Music, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useNowPlaying } from '@/components/now-playing-provider'
import { getTrackAlbum, getTrackDuration } from '@/lib/anime-tracks'

function format(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

const BARS = [0.3, 0.6, 0.9, 0.5, 0.75, 1, 0.4, 0.65, 0.85, 0.35, 0.7, 0.95, 0.5, 0.8, 0.45, 0.6, 0.9, 0.55, 0.7, 0.4]

function AlbumArt({ cover, label, size }: { cover?: string; label: string; size: 'sm' | 'lg' }) {
  const iconSize = size === 'lg' ? 'size-10' : 'size-4'
  const containerClass =
    size === 'lg'
      ? 'relative size-36 overflow-hidden rounded-full border border-border shadow-inner'
      : 'relative size-9 overflow-hidden rounded-full border border-border'

  if (!cover) {
    return (
      <div className={`${containerClass} flex items-center justify-center bg-muted`}>
        <Music className={`${iconSize} text-muted-foreground`} aria-hidden />
      </div>
    )
  }

  return (
    <div className={containerClass}>
      <Image src={cover} alt={`${label} album art`} fill className="object-cover" sizes={size === 'lg' ? '144px' : '36px'} />
      {size === 'lg' && (
        <span className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-card" />
      )}
    </div>
  )
}

export function MusicPlayer() {
  const { track } = useNowPlaying()
  const [expanded, setExpanded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const raf = useRef<number | null>(null)
  const last = useRef<number>(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const duration = track ? getTrackDuration(track) : 0
  const album = track ? getTrackAlbum(track) : ''
  const hasAudio = Boolean(track?.src)

  useEffect(() => {
    if (!track) return
    setTime(0)
    setPlaying(true)
    setExpanded(true)
  }, [track?.id])

  useEffect(() => {
    const audio = audioRef.current
    if (!track?.src || !audio) return

    audio.src = track.src
    audio.load()
    setTime(0)

    if (playing) {
      void audio.play().catch(() => setPlaying(false))
    }
  }, [track?.src, track?.id])

  useEffect(() => {
    const audio = audioRef.current
    if (!hasAudio || !audio) return

    if (playing) {
      void audio.play().catch(() => setPlaying(false))
    } else {
      audio.pause()
    }
  }, [playing, hasAudio])

  useEffect(() => {
    if (!playing || hasAudio || !track) {
      if (raf.current) cancelAnimationFrame(raf.current)
      return
    }

    last.current = performance.now()
    const tick = (now: number) => {
      const delta = (now - last.current) / 1000
      last.current = now
      setTime((t) => (t + delta >= duration ? 0 : t + delta))
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [playing, hasAudio, duration, track])

  useEffect(() => {
    const audio = audioRef.current
    if (!hasAudio || !audio) return

    function onTimeUpdate() {
      setTime(audio!.currentTime)
    }

    function onEnded() {
      setPlaying(false)
      setTime(0)
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
    }
  }, [hasAudio, track?.id])

  if (!track) return null

  const progress = duration > 0 ? (time / duration) * 100 : 0

  return (
    <div className="fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6">
      {track.src && <audio ref={audioRef} preload="metadata" />}

      <AnimatePresence mode="popLayout">
        {expanded ? (
          <motion.div
            key="expanded"
            layout
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="w-72 rounded-3xl border border-border bg-card/90 p-4 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                <span className="relative flex size-1.5">
                  {playing && (
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/70" />
                  )}
                  <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                </span>
                Now Playing
              </span>
              <button
                onClick={() => setExpanded(false)}
                aria-label="Minimize player"
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ChevronDown className="size-4" />
              </button>
            </div>

            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{ duration: 8, repeat: playing ? Infinity : 0, ease: 'linear' }}
              >
                <AlbumArt cover={track.cover} label={album} size="lg" />
              </motion.div>
            </div>

            <div className="mt-4 text-center">
              <p className="font-serif text-xl leading-tight tracking-tight">{track.note}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{track.artist}</p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground/80">{album}</p>
            </div>

            <div className="mt-4 flex h-10 items-center justify-center gap-0.5">
              {BARS.map((h, i) => {
                const activeBar = (i / BARS.length) * 100 <= progress
                return (
                  <motion.span
                    key={i}
                    animate={playing ? { scaleY: [h, h * 0.4 + 0.2, h] } : { scaleY: h }}
                    transition={
                      playing
                        ? { duration: 0.9 + (i % 5) * 0.12, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.2 }
                    }
                    style={{ height: '100%' }}
                    className={`w-1 origin-center rounded-full ${activeBar ? 'bg-primary' : 'bg-muted-foreground/25'}`}
                  />
                )
              })}
            </div>

            <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <span>{format(time)}</span>
              <span>{format(duration)}</span>
            </div>

            <div className="mt-3 flex items-center justify-center gap-5">
              <button
                onClick={() => setTime(0)}
                aria-label="Previous"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <SkipBack className="size-5" />
              </button>
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Pause' : 'Play'}
                className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
              >
                {playing ? (
                  <Pause className="size-5" fill="currentColor" />
                ) : (
                  <Play className="size-5 translate-x-px" fill="currentColor" />
                )}
              </button>
              <button
                onClick={() => setTime(0)}
                aria-label="Next"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <SkipForward className="size-5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="mini"
            layout
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={() => setExpanded(true)}
            aria-label="Open music player"
            className="flex items-center gap-3 rounded-full border border-border bg-card/90 py-2 pl-2 pr-4 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-colors hover:border-primary/40"
          >
            <motion.span
              animate={{ rotate: playing ? 360 : 0 }}
              transition={{ duration: 8, repeat: playing ? Infinity : 0, ease: 'linear' }}
            >
              <AlbumArt cover={track.cover} label={album} size="sm" />
            </motion.span>
            <span className="flex flex-col items-start leading-tight">
              <span className="flex items-center gap-1 text-[10px] tracking-widest text-muted-foreground uppercase">
                <Music className="size-2.5 text-primary" />
                Now Playing
              </span>
              <span className="max-w-32 truncate text-sm font-medium">{track.note}</span>
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation()
                setPlaying((p) => !p)
              }}
              role="button"
              aria-label={playing ? 'Pause' : 'Play'}
              className="ml-1 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              {playing ? (
                <Pause className="size-4" fill="currentColor" />
              ) : (
                <Play className="size-4 translate-x-px" fill="currentColor" />
              )}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

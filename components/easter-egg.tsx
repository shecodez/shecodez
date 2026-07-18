'use client'

import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const SEQUENCE = 'bigo'

const FAVES = [
  { title: 'The Big O', note: 'Cast in the name of God, ye not guilty.' },
  { title: 'Cowboy Bebop', note: 'See you space cowboy.' },
  { title: 'Ghost in the Shell', note: 'Craft as philosophy.' },
  { title: 'Neon Genesis Evangelion', note: 'Congratulations.' },
]

export function EasterEgg() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let buffer = ''
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key.length !== 1) return
      buffer = (buffer + e.key.toLowerCase()).slice(-SEQUENCE.length)
      if (buffer === SEQUENCE) setOpen(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
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
            aria-label="Favorite anime"
            className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] tracking-widest text-primary uppercase">
                  Easter Egg
                </p>
                <h3 className="mt-1 font-serif text-2xl tracking-tight">On heavy rotation</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <ul className="mt-5 space-y-2">
              {FAVES.map((f, i) => (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3"
                >
                  <span className="text-sm font-medium">{f.title}</span>
                  <span className="text-xs text-muted-foreground">{f.note}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              You found the hidden panel. Details matter.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

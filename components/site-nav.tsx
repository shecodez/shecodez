'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import Image from 'next/image'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Components', href: '#components' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border py-2 transition-all duration-300 ${
          scrolled
            ? 'border-border bg-background/80 shadow-[0_1px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl  sm:px-4 px-3'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#top" className="group flex items-center gap-2 pl-1">
          <Image src="/images/logo.png" alt="shecodez" width={24} height={24} className="dark:invert" />
          <span className="text-sm font-medium tracking-tight">shecodez</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
        {LINKS.map((l) =>
            l.href.startsWith('/') ? (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="relative rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ) : (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/works"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 sm:inline-block"
          >
            All Work
          </Link>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 flex-col items-center justify-center gap-1 rounded-full border border-border md:hidden"
          >
            <span
              className={`h-px w-4 bg-foreground transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`}
            />
            <span
              className={`h-px w-4 bg-foreground transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-20 w-[calc(100%-2rem)] max-w-5xl rounded-2xl border border-border bg-background/95 p-2 backdrop-blur-xl md:hidden"
          >
            {LINKS.map((l) =>
              l.href.startsWith('/') ? (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </a>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

'use client'

import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { MouseEvent } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

function FloatingUI() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 })

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto h-[340px] w-full max-w-md [perspective:1200px] sm:h-[420px]"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative size-full"
      >
        {/* main browser window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          style={{ translateZ: 40 }}
          className="absolute left-1/2 top-6 w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)] sm:w-80"
        >
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="size-2.5 rounded-full bg-primary/80" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="ml-3 h-4 w-32 rounded-full bg-muted" />
          </div>
          <div className="space-y-3 p-4">
            <div className="h-3 w-24 rounded-full bg-primary/70" />
            <div className="h-2.5 w-full rounded-full bg-muted" />
            <div className="h-2.5 w-4/5 rounded-full bg-muted" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-2 rounded-lg border border-border p-2">
                  <div className="size-5 rounded-md bg-accent" />
                  <div className="h-1.5 w-full rounded-full bg-muted" />
                  <div className="h-1.5 w-2/3 rounded-full bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* floating component card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.5 },
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{ translateZ: 90 }}
          className="absolute -left-2 bottom-10 w-44 rounded-xl border border-border bg-card p-3 shadow-[0_24px_44px_-22px_rgba(0,0,0,0.4)]"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium tracking-wide text-muted-foreground">
              BUTTON
            </span>
            <span className="size-1.5 rounded-full bg-primary" />
          </div>
          <div className="flex items-center justify-center rounded-lg bg-primary py-2 text-[11px] font-medium text-primary-foreground">
            Ship it
          </div>
        </motion.div>

        {/* floating toast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.7 },
            y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{ translateZ: 120 }}
          className="absolute -right-1 top-2 flex w-48 items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-[0_24px_44px_-22px_rgba(0,0,0,0.4)]"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <ArrowUpRight className="size-3.5" />
          </span>
          <div className="space-y-1">
            <div className="h-1.5 w-20 rounded-full bg-foreground/70" />
            <div className="h-1.5 w-12 rounded-full bg-muted" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-32 pb-16 sm:pt-40">
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Open to Frontend Design Engineer roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="text-balance font-serif text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Frontend Design Engineer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            I build interfaces that don&apos;t just work right. They <i>feel</i> right.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
            className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground/90"
          >
            Hi, I&apos;m Nicole J. Nobles, a frontend engineer with over seven years of experience
            creating polished, accessible, high-performance user experiences. I translate
            thoughtful design into production-quality web/mobile applications that people feel right using.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              View Projects
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="/downloads/resumeNJN.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-medium transition-colors hover:border-primary/40"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </motion.div>
        </div>

        <FloatingUI />
      </div>
    </section>
  )
}

'use client'

import {
  AnimatePresence,
  motion,
} from 'motion/react'
import { Check, ChevronDown, Copy, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { Reveal, SectionHeading } from '@/components/reveal'

/* ---------- Buttons + Badges ---------- */
function ButtonsDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0">
          Primary
        </button>
        <button className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40">
          Secondary
        </button>
        <button className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          Ghost
        </button>
        <button
          disabled
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-40"
        >
          Disabled
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          New
        </span>
        <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
          Draft
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-foreground">
          <span className="size-1.5 rounded-full bg-primary" /> Live
        </span>
        <span className="rounded-full bg-foreground px-2.5 py-1 text-xs text-background">
          Beta
        </span>
      </div>
    </div>
  )
}

/* ---------- Inputs ---------- */
function InputsDemo() {
  const [value, setValue] = useState('')
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted-foreground">Email address</span>
        <input
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="you@example.com"
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </label>
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
          <span className="truncate">example.com/portfolio</span>
        </div>
        <button
          onClick={() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1400)
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-primary/40"
        >
          {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

/* ---------- Tabs ---------- */
function TabsDemo() {
  const tabs = ['Overview', 'Activity', 'Settings']
  const [active, setActive] = useState('Overview')
  return (
    <div className="w-full">
      <div className="flex gap-1 rounded-full border border-border bg-card p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className="relative flex-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
          >
            {active === t && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              />
            )}
            <span
              className={`relative ${active === t ? 'text-primary-foreground' : 'text-muted-foreground'}`}
            >
              {t}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-border bg-card/50 p-4 text-sm text-muted-foreground">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {active === 'Overview' &&
              'Every tab transition uses a shared layout animation for a seamless, connected feel.'}
            {active === 'Activity' && 'Motion communicates state without stealing attention.'}
            {active === 'Settings' && 'Consistent spacing and focus states across the whole system.'}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- Accordion ---------- */
function AccordionDemo() {
  const items = [
    { q: 'Is it accessible?', a: 'Yes. Keyboard operable, ARIA-labelled, and reduced-motion aware.' },
    { q: 'Is it themeable?', a: 'Every value is a design token, so light and dark just work.' },
    { q: 'Is it fast?', a: 'Animations are GPU-friendly and components lazy-load where it counts.' },
  ]
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="w-full divide-y divide-border rounded-xl border border-border bg-card/50">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium"
          >
            {item.q}
            <ChevronDown
              className={`size-4 shrink-0 text-muted-foreground transition-transform ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

/* ---------- Dialog + Toast ---------- */
function OverlaysDemo() {
  const [dialog, setDialog] = useState(false)
  const [toast, setToast] = useState(false)

  function fireToast() {
    setToast(true)
    setTimeout(() => setToast(false), 2600)
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => setDialog(true)}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        Open dialog
      </button>
      <button
        onClick={fireToast}
        className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40"
      >
        Trigger toast
      </button>

      <AnimatePresence>
        {dialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDialog(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Example dialog"
              className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Sparkles className="size-5" />
                </div>
                <button
                  onClick={() => setDialog(false)}
                  aria-label="Close dialog"
                  className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
              <h4 className="mt-4 font-serif text-2xl tracking-tight">The details matter</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Focus is trapped, escape closes, and the backdrop dims. Small things, done right.
              </p>
              <button
                onClick={() => setDialog(false)}
                className="mt-5 w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed bottom-6 right-6 z-[60]">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-xl"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-3.5" />
              </span>
              <span className="text-sm font-medium">Saved to your workspace</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- Table ---------- */
function TableDemo() {
  const rows = [
    { name: 'Buttons', usage: '128', status: 'Stable' },
    { name: 'Inputs', usage: '96', status: 'Stable' },
    { name: 'Charts', usage: '41', status: 'Beta' },
  ]
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-left text-xs tracking-widest text-muted-foreground uppercase">
            <th className="px-4 py-2.5 font-medium">Component</th>
            <th className="px-4 py-2.5 font-medium">Usage</th>
            <th className="px-4 py-2.5 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-border last:border-0 transition-colors hover:bg-muted/30">
              <td className="px-4 py-2.5 font-medium">{r.name}</td>
              <td className="px-4 py-2.5 text-muted-foreground">{r.usage}</td>
              <td className="px-4 py-2.5">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    r.status === 'Stable'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ---------- Chart ---------- */
function ChartDemo() {
  const data = [42, 58, 51, 70, 64, 88, 79]
  const max = Math.max(...data)
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2 rounded-xl border border-border bg-card/50 p-4">
        {data.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(v / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-t-md bg-primary/80 transition-colors hover:bg-primary"
              />
            </div>
            <span className="text-[11px] text-muted-foreground">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const DEMOS = [
  { id: 'Buttons', node: <ButtonsDemo /> },
  { id: 'Inputs', node: <InputsDemo /> },
  { id: 'Tabs', node: <TabsDemo /> },
  { id: 'Accordion', node: <AccordionDemo /> },
  { id: 'Overlays', node: <OverlaysDemo /> },
  { id: 'Table', node: <TableDemo /> },
  { id: 'Charts', node: <ChartDemo /> },
]

export function ComponentLibrary() {
  return (
    <section id="components" className="mx-auto max-w-5xl px-4 py-20 sm:py-28">
      <SectionHeading
        index="02"
        kicker="Design System"
        title="A living component library."
        description="Real, interactive primitives—accessible, themeable, and consistent. Try them."
      />
      {/* TODO: make this a tab that shows Client A, Client B, Client C, and to the far right Base Components
      which is what's currently being used in the project. selecting Client a will show a user icon and a speech bubble with the text "Im looking for Apple Glassmorphism UI components" 
      client B shows a user icon and a speech bubble with the text "Im looking for Bold Brutalist UI components" 
      client C shows a user icon and a speech bubble with the text "Im looking for Clean Minimalist UI components" 
      the base components are the components that are currently being used in the project.*/}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEMOS.map((d, i) => (
          <Reveal
            key={d.id}
            delay={i * 0.05}
            className={
              d.id === 'Buttons' || d.id === 'Charts' ? 'sm:col-span-2 lg:col-span-2' : ''
            }
          >
            <div className="flex h-full min-h-52 flex-col rounded-2xl border border-border bg-card/40 p-5">
              <span className="mb-4 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                {d.id}
              </span>
              <div className="flex flex-1 items-center">{d.node}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

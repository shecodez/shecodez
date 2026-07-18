'use client'

import { Bike, Bot, BowArrow, Wrench, Coffee, Gamepad, Headphones, Landmark, MonitorPlay, UtensilsCrossed } from 'lucide-react'
import { motion } from 'motion/react'
import { Reveal } from '@/components/reveal'

const ITEMS = [
  { icon: Wrench, label: 'Tinkering' },
  { icon: Coffee, label: 'Tea' },
  { icon: Bike, label: 'Motorcycles' },
  { icon: Landmark, label: 'Traditional Architecture' },
  { icon: Headphones, label: '80s City Pop' },
  { icon: Gamepad, label: 'Gaming' },
  { icon: Bot, label: 'AI' },  
  { icon: UtensilsCrossed, label: 'Foodie' },
  { icon: MonitorPlay, label: 'Fantasy & Sci-Fi' },
  { icon: BowArrow, label: 'Kyudo' },
]

export function CurrentlyInto() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <Reveal>
        <div className="rounded-3xl border border-border bg-card/40 p-6 sm:p-10">
          <div className="mb-6 flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            <span className="text-primary">05</span>
            Currently Into
          </div>
          <div className="flex flex-wrap gap-3">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="inline-flex items-center gap-2.5 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium transition-colors hover:border-primary/40"
              >
                <item.icon className="size-4 text-primary" strokeWidth={1.6} />
                {item.label}
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

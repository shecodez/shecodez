'use client'

import { motion } from 'motion/react'
import { Reveal } from '@/components/reveal'

const GROUPS: { title: string; items: string[] }[] = [
  {
    title: 'Frontend',
    items: [
      'React/Next.js',
      'React Native',
      'ASP.NET MVC/Razor Pages',
      'Vue/Nuxt.js',
      'HTML/CSS/JS',
      'Accessibility',
      'Design Systems',
      'Shadcn/UI',
      'Tailwind CSS',
    ],
  },
  { title: 'Backend', items: ['Node.js', 'C#', 'MongoDB','Node.js/Express', 'PostgreSQL'] },
  { title: 'Tools', items: ['Git', 'VS Code','Cursor'] },
]

export function Skills() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="rounded-3xl border border-border bg-card/40 p-6 sm:p-10">
        <div className="grid gap-10 md:grid-cols-3">
          {GROUPS.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.08}>
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  <span className="text-primary">{String(gi + 1).padStart(2, '0')}</span>
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      whileHover={{ y: -2 }}
                      className="cursor-default rounded-full border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

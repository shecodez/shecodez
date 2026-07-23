'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <button
      type="button"
      aria-label={
        mounted
          ? isDark
            ? 'Switch to light mode'
            : 'Switch to dark mode'
          : 'Toggle color theme'
      }
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="relative inline-flex size-9 items-center justify-center rounded-full border border-border bg-card/60 text-foreground/80 transition-colors hover:text-foreground hover:border-primary/40"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-4" strokeWidth={1.6} />
        ) : (
          <Moon className="size-4" strokeWidth={1.6} />
        )
      ) : (
        <span className="size-4" />
      )}
    </button>
  )
}

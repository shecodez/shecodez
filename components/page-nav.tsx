'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import Image from 'next/image'

export function PageNav({ backHref = '/', backLabel = 'Home' }: { backHref?: string; backLabel?: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="flex w-full max-w-5xl items-center justify-between rounded-full border border-border bg-background/80 px-3 py-2 shadow-[0_1px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-4">
        <Link
          href={backHref}
          className="group flex items-center gap-2 rounded-full px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          {backLabel}
        </Link>

        <Link href="/" className="group flex items-center gap-2">
          <Image src="/logo.png" alt="shecodez" width={24} height={24} className="dark:invert" />
          <span className="text-sm font-medium tracking-tight">Nicole J. Nobles</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/works"
            className="hidden rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 sm:inline-block"
          >
            All Work
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
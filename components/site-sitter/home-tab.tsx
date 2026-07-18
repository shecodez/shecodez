'use client'

import { MessageCircle, Play, Send } from 'lucide-react'
import { FormEvent, useState } from 'react'
import type { FAQ } from './types'

interface SiteSitterHomeTabProps {
  mostFaq: FAQ
  sitesitterName: string
  cmdInputError?: string
  onSetActiveTabIndex: (index: number) => void
  onSetActiveCommand: (cmd: string) => void
  onOpenEasterEgg: () => void
  onOpenPortalsPong: () => void
}

export function SiteSitterHomeTab({
  mostFaq,
  sitesitterName,
  cmdInputError,
  onSetActiveTabIndex,
  onSetActiveCommand,
  onOpenEasterEgg,
  onOpenPortalsPong,
}: SiteSitterHomeTabProps) {
  const [cmdInput, setCmdInput] = useState('')

  function emitActiveCommand() {
    onSetActiveCommand(cmdInput)
    setCmdInput('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    emitActiveCommand()
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => onSetActiveTabIndex(2)}
        className="rounded-bl rounded-tl-3xl rounded-tr rounded-br-3xl border border-border bg-background px-4 py-2.5 text-left text-sm transition-colors hover:border-primary/40 hover:bg-accent"
      >
        Q: {mostFaq.question}
      </button>

      <button
        type="button"
        onClick={() => onSetActiveTabIndex(1)}
        className="rounded-bl rounded-tl-3xl rounded-tr rounded-br-3xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <span className="flex items-center gap-2">
          <Send className="size-4" aria-hidden />
          <span>Send message</span>
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSetActiveTabIndex(3)}
        className="rounded-bl rounded-tl-3xl rounded-tr rounded-br-3xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <span className="flex items-center gap-2">
          <MessageCircle className="size-4" aria-hidden />
          <span>Chat with {sitesitterName}</span>
        </span>
      </button>

      <hr className="my-1 border-border" />

      <form onSubmit={handleSubmit}>
        <div className="flex items-end gap-2">
          <div className="min-w-0 flex-1">
            <label htmlFor="cmd" className="sr-only">
              Site Sitter command input
            </label>
            <input
              id="cmd"
              name="cmd"
              value={cmdInput}
              onChange={(event) => setCmdInput(event.target.value)}
              placeholder="/help"
              className="w-full rounded-bl rounded-tl-3xl rounded-r-3xl border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            />
          </div>

          <div className="relative shrink-0 pt-3 pr-3">
            <button
              type="button"
              onClick={onOpenEasterEgg}
              aria-label="Open anime easter egg"
              className="absolute top-0 right-0 z-10 flex size-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md transition-colors hover:bg-secondary/90 border border-border"
            >
              <Play className="size-3.5 translate-x-px" aria-hidden />
            </button>
            <button
              type="button"
              onClick={onOpenPortalsPong}
              className="rounded-bl rounded-tl-3xl rounded-tr rounded-br-3xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Pong
            </button>
          </div>
        </div>
        {cmdInputError && (
          <div
            className={`mx-1 mt-1.5 text-left text-xs ${
              cmdInputError.startsWith('/') ? 'text-muted-foreground' : 'text-destructive'
            }`}
          >
            {cmdInputError}
          </div>
        )}
      </form>
    </div>
  )
}

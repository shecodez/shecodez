'use client'

import { FormEvent, useState } from 'react'
import { Send } from 'lucide-react'

interface FormData {
  email: string
  message: string
  bot: string
  subscribe: boolean
}

export function PagePetMessageForm() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [isBot, setIsBot] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    message: '',
    bot: '',
    subscribe: true,
  })

  async function postMessageForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSent(false)
    setIsBot(false)

    try {
      if (formData.bot) {
        setIsBot(true)
        return
      }

      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          message: formData.message,
          subscribe: formData.subscribe,
          subject: '👋 Page Pet message',
        }),
      })

      const result = (await response.json()) as { ok?: boolean; message?: string }

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Response was not successful')
      }

      setSent(true)
      setFormData((prev) => ({ ...prev, email: '', message: '' }))
    } catch {
      setError('Error, please try again later.')
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {isBot && (
        <div className="mb-4 rounded-lg border border-primary/30 bg-accent p-3 text-sm text-accent-foreground">
          🍯 Oh honey pot! We think not, you&apos;re a bot!
        </div>
      )}
      {sent && (
        <div
          className={`mb-4 rounded-lg border p-3 text-sm ${
            error
              ? 'border-destructive/40 bg-destructive/10 text-destructive'
              : 'border-primary/40 bg-accent text-accent-foreground'
          }`}
        >
          {error ? <>❗ {error}</> : <>✔️ Message sent. Thanks!</>}
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={postMessageForm}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="self-start text-sm text-muted-foreground">
            E-Mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <input
          type="text"
          name="bot"
          value={formData.bot}
          onChange={(event) => setFormData((prev) => ({ ...prev, bot: event.target.value }))}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="self-start text-sm text-muted-foreground">
            Message
          </label>
          <textarea
            id="message"
            rows={2}
            name="message"
            required
            value={formData.message}
            onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 self-start rounded-bl rounded-tl-3xl rounded-tr rounded-br-3xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          <span className="flex items-center gap-2">
            {!loading && <Send className="size-5" aria-hidden />}
            <span>{loading ? 'Sending...' : 'Send'}</span>
          </span>
        </button>
      </form>
    </div>
  )
}

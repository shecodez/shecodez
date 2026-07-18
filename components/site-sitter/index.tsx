'use client'

import { ChevronLeft, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { EASTER_EGG_SEQUENCE, EasterEggModal } from '@/components/easter-egg'
import { PORTALS_PONG_SEQUENCE, PortalsPongModal } from '@/components/portals-pong'
import { SiteSitterAnimatedAvatar } from './animated-avatar'
import { SiteSitterChatTab } from './chat-tab'
import { SiteSitterFAQTab } from './faq-tab'
import { SiteSitterMessageForm } from './message-form'
import { SiteSitterHomeTab } from './home-tab'
import type { ChatMessage, FAQ } from './types'

const SITESITTER_NAME = 'Daqi'
const WEBSITE_NAME = 'shecodez.com'

const FAQS: FAQ[] = [
  {
    question: 'Is Nicole open to work?',
    answer:
      "Yep — Frontend Design Engineer roles. Say hi through the contact links or send a message. I'll make sure she sees it. (•̀ᴗ•́ )و",
  },
  {
    question: 'WTF is a Site Sitter?',
    answer: `I'm ${WEBSITE_NAME}'s website sitter ${SITESITTER_NAME}. I'm here to answer questions, play with you, and look cute. /ᐠ - ˕ -マ`,
  },
]

const MESSAGES: ChatMessage[] = [
  {
    message: "Hey, how's it goin'?",
    answers: ['great', 'meh', '(ノಠ益ಠ)ノ彡┻━┻'],
    responses: ['(つ๑● ꇴ●)つヘ(•́ ∀ •̀๑ヘ )', '¯\\_(ツ)_/¯ meh too', '┬─┬ ノ( ゜-゜ノ)'],
  },
]

export function SiteSitter() {
  const [showChatbox, setShowChatbox] = useState(false)
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [cmdInputError, setCmdInputError] = useState<string | undefined>(undefined)
  const [easterEggOpen, setEasterEggOpen] = useState(false)
  const [portalsPongOpen, setPortalsPongOpen] = useState(false)

  const tabs = [`Hi, my name is ${SITESITTER_NAME}`, 'Send Message', 'FAQs', 'Chat']

  const openEasterEgg = useCallback(() => {
    setEasterEggOpen(true)
  }, [])

  const openPortalsPong = useCallback(() => {
    setShowChatbox(false)
    setPortalsPongOpen(true)
  }, [])

  useEffect(() => {
    let easterEggBuffer = ''
    let pongBuffer = ''

    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return

      if (e.key === 'Escape') {
        setEasterEggOpen(false)
        setPortalsPongOpen(false)
        return
      }

      if (e.key.length !== 1) return

      easterEggBuffer = (easterEggBuffer + e.key.toLowerCase()).slice(-EASTER_EGG_SEQUENCE.length)
      if (easterEggBuffer === EASTER_EGG_SEQUENCE) {
        setEasterEggOpen(true)
        return
      }

      pongBuffer = (pongBuffer + e.key.toLowerCase()).slice(-PORTALS_PONG_SEQUENCE.length)
      if (pongBuffer === PORTALS_PONG_SEQUENCE) {
        setPortalsPongOpen(true)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function handleSetActiveCommand(cmd: string) {
    const normalized = cmd.trim().toLowerCase()
    if (!normalized) return

    const commands: { labels: string[]; run: () => void }[] = [
      { labels: ['/chat'], run: () => setActiveTabIndex(3) },
      { labels: ['/message', '/feedback'], run: () => setActiveTabIndex(1) },
      { labels: ['/faq', '/faqs'], run: () => setActiveTabIndex(2) },
      { labels: ['/home'], run: () => setActiveTabIndex(0) },
      { labels: ['/play', '/pong'], run: openPortalsPong },
      { labels: ['/otaku', '/anime'], run: openEasterEgg },
      {
        labels: ['/help'],
        run: () =>
          setCmdInputError('/chat · /message · /faq · /play · /anime · /home'),
      },
    ]

    const match = commands.find((command) => command.labels.includes(normalized))
    if (match) {
      if (normalized !== '/help') setCmdInputError('')
      match.run()
      return
    }

    setCmdInputError(`'${cmd}' is unrecognized. Type /help for commands.`)
  }

  return (
    <>
      <div className="sitesitter-container fixed right-4 bottom-4 z-50 sm:bottom-6">
        {showChatbox && (
          <div className="sitesitter-chatbox mb-3 w-72 max-w-[calc(100vw-2rem)] rounded-3xl border border-border bg-card/90 p-5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-6">
            <header className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-1">
                {activeTabIndex !== 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveTabIndex(0)}
                    aria-label="Back"
                    className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                )}
                <span className="truncate font-serif text-lg tracking-tight">{tabs[activeTabIndex]}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowChatbox(false)}
                aria-label="Close chatbox"
                className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </header>

            <div className="max-h-80 min-h-48 overflow-y-auto px-1 py-4">
              {activeTabIndex === 0 && (
                <SiteSitterHomeTab
                  mostFaq={FAQS[0]}
                  sitesitterName={SITESITTER_NAME}
                  cmdInputError={cmdInputError}
                  onSetActiveTabIndex={setActiveTabIndex}
                  onSetActiveCommand={handleSetActiveCommand}
                  onOpenEasterEgg={openEasterEgg}
                  onOpenPortalsPong={openPortalsPong}
                />
              )}
              {activeTabIndex === 1 && <SiteSitterMessageForm />}
              {activeTabIndex === 2 && <SiteSitterFAQTab faqs={FAQS} />}
              {activeTabIndex === 3 && <SiteSitterChatTab messages={MESSAGES} />}
            </div>

            <p className="mt-3 text-center font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              Site Sitter by{' '}
              <a
                href="https://shecodez.com"
                target="_blank"
                rel="noreferrer"
                className="text-primary transition-colors hover:underline"
              >
                shecodez
              </a>
            </p>
          </div>
        )}

        <div className="sitesitter-avatar flex justify-end">
          <button
            type="button"
            onClick={() => setShowChatbox((open) => !open)}
            aria-label="Toggle Site Sitter"
          >
            <SiteSitterAnimatedAvatar />
          </button>
        </div>
      </div>

      <EasterEggModal open={easterEggOpen} onClose={() => setEasterEggOpen(false)} />
      <PortalsPongModal open={portalsPongOpen} onClose={() => setPortalsPongOpen(false)} />
    </>
  )
}

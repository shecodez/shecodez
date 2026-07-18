'use client'

import { useState } from 'react'
import type { FAQ } from './types'

interface SiteSitterFAQTabProps {
  faqs: FAQ[]
}

export function SiteSitterFAQTab({ faqs }: SiteSitterFAQTabProps) {
  const [showAnswerIndexArr, setShowAnswerIndexArr] = useState(() =>
    faqs.map((_, index) => index === 0),
  )

  function toggleAnswer(faqIndex: number) {
    setShowAnswerIndexArr((prev) =>
      prev.map((visible, index) => (index === faqIndex ? !visible : visible)),
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, index) => (
        <div key={`faq-${index}`} className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => toggleAnswer(index)}
            className="rounded-bl rounded-tl-3xl rounded-tr rounded-br-3xl border border-border bg-background p-3 text-left text-sm transition-colors hover:border-primary/40 hover:bg-accent"
          >
            {faq.question}
          </button>

          {showAnswerIndexArr[index] && (
            <div className="rounded-br rounded-tr-3xl rounded-l-3xl border border-border bg-secondary p-3 text-sm text-secondary-foreground">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

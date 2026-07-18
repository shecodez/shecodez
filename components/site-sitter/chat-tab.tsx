'use client'

import { useState } from 'react'
import type { ChatMessage } from './types'

interface SiteSitterChatTabProps {
  messages: ChatMessage[]
}

export function SiteSitterChatTab({ messages }: SiteSitterChatTabProps) {
  const [selectedAnswerIndexArr, setSelectedAnswerIndexArr] = useState<number[]>(() =>
    Array(messages.length).fill(-1),
  )
  const [showResponse, setShowResponse] = useState(false)

  function setSelectedAnswerIndex(messageIndex: number, answerIndex: number) {
    setSelectedAnswerIndexArr((prev) => {
      const next = [...prev]
      next[messageIndex] = answerIndex
      return next
    })
    setShowResponse(true)
  }

  return (
    <div className="flex flex-col gap-3 text-sm">
      {messages.map((message, messageIndex) => (
        <div key={`chat-message-${messageIndex}`} className="flex flex-col gap-3">
          <div className="min-w-20 self-end rounded-br rounded-tr-3xl rounded-l-3xl border border-border bg-secondary px-4 py-2 text-secondary-foreground">
            {message.message}
          </div>

          {showResponse ? (
            <div className="min-w-20 self-start rounded-bl rounded-tl-3xl rounded-r-3xl bg-primary px-4 py-2 text-primary-foreground">
              {message.answers[selectedAnswerIndexArr[messageIndex]]}
            </div>
          ) : (
            message.answers.map((answer, answerIndex) => (
              <button
                key={`message-answer-${answerIndex}`}
                type="button"
                onClick={() => setSelectedAnswerIndex(messageIndex, answerIndex)}
                className="min-w-20 self-start rounded-bl rounded-tl-3xl rounded-r-3xl bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {answer}
              </button>
            ))
          )}

          {showResponse && (
            <div className="min-w-20 self-end rounded-br rounded-tr-3xl rounded-l-3xl border border-border bg-secondary px-4 py-2 text-secondary-foreground">
              {message.responses[selectedAnswerIndexArr[messageIndex]]}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import type { PagePetCommand } from './types'

interface PagePetPlayTabProps {
  commands: PagePetCommand[]
  activeCommandIndex?: number
  onSetActiveCommand: (cmd: string) => void
}

export function PagePetPlayTab({
  commands,
  activeCommandIndex,
  onSetActiveCommand,
}: PagePetPlayTabProps) {
  const [isActiveCmdIndexArr, setIsActiveCmdIndexArr] = useState<boolean[]>(() =>
    Array(commands.length).fill(false),
  )
  const prevCmdIndexRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (activeCommandIndex != null && activeCommandIndex >= 0) {
      setIsActiveCmdIndexArr((prev) => {
        const next = [...prev]
        next[activeCommandIndex] = true
        return next
      })
    }
  }, [activeCommandIndex])

  function setActiveCmdIndex(cmdIndex: number, isActive: boolean) {
    setIsActiveCmdIndexArr((prev) => {
      const next = [...prev]
      next[cmdIndex] = isActive
      return next
    })
    onSetActiveCommand(isActive ? commands[cmdIndex].label : '')
  }

  function handleAnimationDuration(cmdIndex: number, timeout: number) {
    window.setTimeout(() => {
      setActiveCmdIndex(cmdIndex, false)
    }, timeout)
  }

  function play(cmdIndex: number, timeout?: number) {
    setIsActiveCmdIndexArr((prev) => {
      const next = [...prev]
      const prevCmdIndex = prevCmdIndexRef.current

      if (prevCmdIndex != null && prevCmdIndex >= 0 && prevCmdIndex !== cmdIndex) {
        next[prevCmdIndex] = false
      } else {
        prevCmdIndexRef.current = cmdIndex
      }

      const isActive = next[cmdIndex]
      next[cmdIndex] = !isActive
      prevCmdIndexRef.current = cmdIndex
      onSetActiveCommand(!isActive ? commands[cmdIndex].label : '')

      if (timeout) {
        handleAnimationDuration(cmdIndex, timeout)
      }

      return next
    })
  }

  if (commands.length === 0) {
    return <div className="text-center text-sm text-muted-foreground">Play coming soon!</div>
  }

  return (
    <div className="flex flex-wrap gap-4">
      {commands.map((command, index) => (
        <div key={`cmd-${index}`} className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => play(index, command.timeout)}
            className={`rounded-bl rounded-tl-3xl rounded-tr rounded-br-3xl border-2 border-dashed bg-primary p-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 ${
              isActiveCmdIndexArr[index] ? 'border-primary-foreground' : 'border-transparent'
            }`}
          >
            {command.label}
          </button>
        </div>
      ))}
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

const CLOUDINARY_BASE =
  process.env.NEXT_PUBLIC_CLOUDINARY_RES_URL?.replace(/\/$/, '') ||
  'https://res.cloudinary.com/shecodez'

const SPRITE_URL = `${CLOUDINARY_BASE}/image/upload/v1675097780/vvifi_fyi%20blog/calicoKitty_curiousIdleBreaker.png`

const SCALE = 2
const WIDTH = 64
const HEIGHT = 64
const SCALED_WIDTH = SCALE * WIDTH
const SCALED_HEIGHT = SCALE * HEIGHT
const CYCLE_LOOP = [0, 1, 0, 2]

export function PagePetAnimatedAvatar() {
  const [spriteFailed, setSpriteFailed] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const frameCountRef = useRef(0)
  const currentLoopIndexRef = useRef(0)
  const currentRowRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctxRef.current = ctx

    const img = new Image()
    imgRef.current = img

    function drawFrame(frameX: number, frameY: number, canvasX: number, canvasY: number) {
      if (!imgRef.current || !ctxRef.current) return
      ctxRef.current.drawImage(
        imgRef.current,
        frameX * WIDTH,
        frameY * HEIGHT,
        WIDTH,
        HEIGHT,
        canvasX,
        canvasY,
        SCALED_WIDTH,
        SCALED_HEIGHT,
      )
    }

    function step() {
      frameCountRef.current++
      if (frameCountRef.current < 75) {
        rafRef.current = window.requestAnimationFrame(step)
        return
      }

      frameCountRef.current = 0
      if (canvasRef.current && ctxRef.current) {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }

      drawFrame(CYCLE_LOOP[currentLoopIndexRef.current], currentRowRef.current, 0, 0)
      currentLoopIndexRef.current++
      if (currentLoopIndexRef.current >= CYCLE_LOOP.length) {
        currentLoopIndexRef.current = 0
        currentRowRef.current++
      }
      if (currentRowRef.current >= 2) {
        currentRowRef.current = 0
      }

      rafRef.current = window.requestAnimationFrame(step)
    }

    img.onload = () => {
      rafRef.current = window.requestAnimationFrame(step)
    }
    img.onerror = () => {
      setSpriteFailed(true)
    }
    img.src = SPRITE_URL

    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div className="page-pet-avatar">
      {spriteFailed ? (
        <div
          className="flex size-32 items-center justify-center rounded-full border-2 border-primary bg-accent text-5xl"
          aria-hidden
        >
          🐱
        </div>
      ) : (
        <canvas ref={canvasRef} width={128} height={128} className="block" />
      )}
    </div>
  )
}

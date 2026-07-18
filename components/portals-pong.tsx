'use client'

import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'

const SEQUENCE = 'pong'
const ORANGE = '#ff5d00'
const BLUE = '#0065ff'
const WIDTH = 512
const HEIGHT = 256
const PORTAL_BOUNDS = 50
const WIN_SCORE = 15
const PORTAL_DASH_PATTERN = [4, 2] as const
const PORTAL_DASH_SPEED = 0.22

// Ball tuned slower than the original (was WIDTH / 200 per frame)
const BALL_MAX_SPEED = WIDTH / 420
const BALL_START_RATIO = 0.38
const BALL_SPEED_CAP = BALL_MAX_SPEED * 1.3

const PADDLE_HEIGHT = Math.ceil(HEIGHT / 7)
const PADDLE_BASE_SPEED = Math.max(2, Math.ceil(PADDLE_HEIGHT / 14))
const PLAYER_SPEED_SCALE = 0.42
const PLAYER_ACCEL = 0.28
const PLAYER_FRICTION = 0.82
const AI_SPEED_RATIO = 0.5
const AI_BALL_SPEED_SCALE = 0.15
const AI_TRACK_X = WIDTH * 0.6
const AI_AIM_ERROR_MAX = 16

function drawMenuScreen(ctx: CanvasRenderingContext2D, dashOffset: number) {
  const cx = WIDTH / 2
  const cy = HEIGHT / 2

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  ctx.fillStyle = '#fff'
  ctx.font = '28px monospace'
  ctx.textAlign = 'center'
  ctx.fillText('P RTALS   P NG', cx, cy - 12)

  drawPortal(ctx, cx - 86, cy - 21, 5, 10, BLUE, dashOffset)
  drawPortal(ctx, cx + 68, cy - 21, 5, 10, ORANGE, dashOffset)

  ctx.font = '14px monospace'
  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  ctx.fillText('click to start', cx, cy + 20)
  ctx.fillText('move: W/S keys, exit: ESC', cx, cy + 40)
}

function drawGameOverScreen(
  ctx: CanvasRenderingContext2D,
  p1: Paddle,
  p2: Paddle,
  dashOffset: number,
  winner: Winner,
) {
  const cx = WIDTH / 2
  const cy = HEIGHT / 2

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  ctx.font = '24px monospace'
  ctx.textAlign = 'center'
  ctx.fillStyle = '#fff'
  ctx.fillText(String(p1.score), WIDTH / 4, 36)
  ctx.fillText(String(p2.score), (WIDTH * 3) / 4, 36)

  //drawPortal(ctx, cx - 80, cy - 21, 5, 10, BLUE, dashOffset)
  //drawPortal(ctx, cx + 15, cy - 21, 5, 10, ORANGE, dashOffset)

  ctx.fillStyle = '#fff'
  ctx.font = '28px monospace'
  ctx.fillText('GAME OVER', cx, cy - 12)

  ctx.font = '16px monospace'
  ctx.fillStyle = winner === 'player' ? '#8fd3ff' : '#ffb380'
  ctx.fillText(winner === 'player' ? 'You win!' : 'You lose!', cx, cy + 16)

  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  ctx.font = '14px monospace'
  ctx.fillText('click to start', cx, cy + 40)
  ctx.fillText('move: W/S keys, exit: ESC', cx, cy + 60)
}

type GamePhase = 'menu' | 'playing' | 'gameover'
type Winner = 'player' | 'ai' | null

type Portal = {
  x: number
  y: number
  rx: number
  ry: number
  color: string
  collidable: boolean
  cooldownUntil: number
}

type Paddle = {
  x: number
  y: number
  width: number
  height: number
  baseSpeed: number
  score: number
  startY: number
}

type Ball = {
  x: number
  y: number
  radius: number
  dx: number
  dy: number
  baseSpeed: number
  maxSpeed: number
}

type Keys = {
  up: boolean
  down: boolean
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function circleRectHit(
  cx: number,
  cy: number,
  radius: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number,
) {
  const closestX = clamp(cx, rx, rx + rw)
  const closestY = clamp(cy, ry, ry + rh)
  const dx = cx - closestX
  const dy = cy - closestY
  return dx * dx + dy * dy <= radius * radius
}

function circleEllipseHit(
  cx: number,
  cy: number,
  radius: number,
  ex: number,
  ey: number,
  erx: number,
  ery: number,
) {
  const dx = cx - ex
  const dy = cy - ey
  const normalized = (dx * dx) / ((erx + radius) * (erx + radius)) + (dy * dy) / ((ery + radius) * (ery + radius))
  return normalized <= 1
}

function ballSpeedRatio(ball: Ball) {
  return clamp(Math.hypot(ball.dx, ball.dy) / BALL_SPEED_CAP, 0, 1)
}

function playerMaxSpeed(paddle: Paddle, ball: Ball) {
  return paddle.baseSpeed * (1 + ballSpeedRatio(ball) * PLAYER_SPEED_SCALE)
}

function aiMaxSpeed(paddle: Paddle, ball: Ball) {
  return paddle.baseSpeed * AI_SPEED_RATIO * (1 + ballSpeedRatio(ball) * AI_BALL_SPEED_SCALE)
}

function predictBallYAtX(ball: Ball, targetX: number) {
  if (Math.abs(ball.dx) < 0.001) return null
  const timeToReach = (targetX - ball.x) / ball.dx
  if (timeToReach <= 0) return null
  return ball.y + ball.dy * timeToReach
}

function createBall(): Ball {
  const radius = Math.ceil(WIDTH / 200)
  const direction = Math.random() < 0.5 ? -1 : 1
  const startSpeed = BALL_MAX_SPEED * BALL_START_RATIO
  const dy = (Math.random() * 0.4 + 0.2) * startSpeed * (Math.random() < 0.5 ? 1 : -1)

  return {
    x: WIDTH / 2,
    y: HEIGHT / 2,
    radius,
    dx: startSpeed * direction,
    dy,
    baseSpeed: startSpeed,
    maxSpeed: BALL_SPEED_CAP,
  }
}

function resetBall(ball: Ball, direction: 1 | -1) {
  ball.x = WIDTH / 2
  ball.y = HEIGHT / 2
  ball.baseSpeed = BALL_MAX_SPEED * BALL_START_RATIO
  const dy = (Math.random() * 0.4 + 0.2) * ball.baseSpeed * (Math.random() < 0.5 ? 1 : -1)
  ball.dx = ball.baseSpeed * direction
  ball.dy = dy
}

function createPaddle(side: 'left' | 'right'): Paddle {
  const width = Math.ceil(WIDTH / 100)
  const height = PADDLE_HEIGHT
  const offset = 4
  const y = Math.ceil((HEIGHT - height) / 2)

  return {
    x: side === 'right' ? WIDTH - width - offset : offset,
    y,
    width,
    height,
    baseSpeed: PADDLE_BASE_SPEED,
    score: 0,
    startY: y,
  }
}

function createPortal(x: number, y: number, color: string): Portal {
  return {
    x,
    y,
    rx: 5,
    ry: 10,
    color,
    collidable: true,
    cooldownUntil: 0,
  }
}

function drawPortal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rx: number,
  ry: number,
  color: string,
  dashOffset: number,
) {
  ctx.save()
  ctx.translate(x + 0.5, y + 0.5)
  ctx.beginPath()
  ctx.setLineDash([...PORTAL_DASH_PATTERN])
  ctx.lineDashOffset = -dashOffset
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.restore()
}

function drawScene(
  ctx: CanvasRenderingContext2D,
  ball: Ball,
  p1: Paddle,
  p2: Paddle,
  bluePortal: Portal,
  orangePortal: Portal,
  dashOffset: number,
  phase: GamePhase,
  winner: Winner,
) {
  if (phase === 'menu') {
    drawMenuScreen(ctx, dashOffset)
    return
  }

  if (phase === 'gameover') {
    drawGameOverScreen(ctx, p1, p2, dashOffset, winner)
    return
  }

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)

  ctx.fillStyle = '#fff'
  ctx.fillRect(WIDTH / 2 - 1, 0, 2, HEIGHT)

  drawPortal(ctx, bluePortal.x, bluePortal.y, bluePortal.rx, bluePortal.ry, bluePortal.color, dashOffset)
  drawPortal(ctx, orangePortal.x, orangePortal.y, orangePortal.rx, orangePortal.ry, orangePortal.color, dashOffset)

  ctx.fillStyle = '#fff'
  ctx.fillRect(p1.x, p1.y, p1.width, p1.height)
  ctx.fillRect(p2.x, p2.y, p2.width, p2.height)

  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  ctx.fill()

  ctx.font = '24px monospace'
  ctx.textAlign = 'center'
  ctx.fillText(String(p1.score), WIDTH / 4, 28)
  ctx.fillText(String(p2.score), (WIDTH * 3) / 4, 28)
}

function resolvePaddleHit(ball: Ball, paddle: Paddle, movingRight: boolean) {
  const relativeY = (ball.y - (paddle.y + paddle.height / 2)) / (paddle.height / 2)
  const angle = clamp(relativeY, -1, 1) * (Math.PI / 4)
  const speed = Math.min(
    Math.hypot(ball.dx, ball.dy) * 1.02,
    ball.maxSpeed,
  )
  ball.baseSpeed = speed
  ball.dx = (movingRight ? 1 : -1) * speed * Math.cos(angle)
  ball.dy = speed * Math.sin(angle)

  if (movingRight) {
    ball.x = paddle.x - ball.radius - 0.5
  } else {
    ball.x = paddle.x + paddle.width + ball.radius + 0.5
  }
}

function updateGame(
  ball: Ball,
  p1: Paddle,
  p2: Paddle,
  bluePortal: Portal,
  orangePortal: Portal,
  keys: Keys,
  now: number,
  elapsed: number,
  playerVel: { current: number },
  aiReactionUntil: { current: number },
  aiAimError: { current: number },
) {
  const maxPlayerSpeed = playerMaxSpeed(p1, ball)

  if (keys.up) playerVel.current -= PLAYER_ACCEL
  if (keys.down) playerVel.current += PLAYER_ACCEL
  if (!keys.up && !keys.down) playerVel.current *= PLAYER_FRICTION

  playerVel.current = clamp(playerVel.current, -maxPlayerSpeed, maxPlayerSpeed)
  p1.y += playerVel.current
  p1.y = clamp(p1.y, 0, HEIGHT - p1.height)

  if (now >= aiReactionUntil.current && ball.dx < 0 && ball.x < AI_TRACK_X) {
    aiAimError.current += (Math.random() - 0.5) * 0.5
    aiAimError.current = clamp(aiAimError.current, -AI_AIM_ERROR_MAX, AI_AIM_ERROR_MAX)

    const interceptX = p2.x + p2.width
    const predictedY = predictBallYAtX(ball, interceptX)
    const targetY = (predictedY ?? ball.y) - p2.height / 2 + aiAimError.current
    const diff = targetY - p2.y
    const maxMove = aiMaxSpeed(p2, ball)

    p2.y += clamp(diff, -maxMove, maxMove)
  }
  p2.y = clamp(p2.y, 0, HEIGHT - p2.height)

  ball.x += ball.dx
  ball.y += ball.dy

  if (ball.y - ball.radius <= 0) {
    ball.y = ball.radius
    ball.dy = Math.abs(ball.dy)
  } else if (ball.y + ball.radius >= HEIGHT) {
    ball.y = HEIGHT - ball.radius
    ball.dy = -Math.abs(ball.dy)
  }

  if (circleRectHit(ball.x, ball.y, ball.radius, p1.x, p1.y, p1.width, p1.height) && ball.dx > 0) {
    resolvePaddleHit(ball, p1, false)
  }
  if (circleRectHit(ball.x, ball.y, ball.radius, p2.x, p2.y, p2.width, p2.height) && ball.dx < 0) {
    resolvePaddleHit(ball, p2, true)
  }

  const tryPort = (from: Portal, to: Portal) => {
    if (!from.collidable || now < from.cooldownUntil) return
    if (!circleEllipseHit(ball.x, ball.y, ball.radius, from.x, from.y, from.rx, from.ry)) return

    ball.x = to.x
    ball.y = to.y
    const speed = Math.min(Math.hypot(ball.dx, ball.dy) * 1.04, ball.maxSpeed)
    ball.baseSpeed = speed
    const angle = Math.atan2(ball.dy, ball.dx)
    ball.dx = Math.cos(angle) * speed
    ball.dy = Math.sin(angle) * speed

    from.collidable = false
    from.cooldownUntil = now + 900
    to.collidable = false
    to.cooldownUntil = now + 900

    aiReactionUntil.current = now + randomBetween(300, 520)
    aiAimError.current = randomBetween(-AI_AIM_ERROR_MAX, AI_AIM_ERROR_MAX)
  }

  tryPort(orangePortal, bluePortal)
  tryPort(bluePortal, orangePortal)

  const speedBoost = 1 + Math.min(elapsed / 180000, 0.18)
  const targetSpeed = ball.baseSpeed * speedBoost
  const currentSpeed = Math.hypot(ball.dx, ball.dy) || 1
  if (currentSpeed < targetSpeed) {
    ball.dx = (ball.dx / currentSpeed) * targetSpeed
    ball.dy = (ball.dy / currentSpeed) * targetSpeed
  }
}

function scorePoint(
  ball: Ball,
  p1: Paddle,
  p2: Paddle,
  scorer: 'p1' | 'p2',
): boolean {
  if (scorer === 'p1') {
    p1.score += 1
    if (p1.score >= WIN_SCORE) return true
    resetBall(ball, -1)
  } else {
    p2.score += 1
    if (p2.score >= WIN_SCORE) return true
    resetBall(ball, 1)
  }
  p1.y = p1.startY
  p2.y = p2.startY
  return false
}

function maybeTeleportPortals(
  bluePortal: Portal,
  orangePortal: Portal,
  nextTeleportAt: { value: number },
  now: number,
) {
  if (now < nextTeleportAt.value) return

  const portal = Math.random() < 0.5 ? bluePortal : orangePortal
  portal.x = randomBetween(PORTAL_BOUNDS, WIDTH - PORTAL_BOUNDS)
  portal.y = randomBetween(PORTAL_BOUNDS, HEIGHT - PORTAL_BOUNDS)
  nextTeleportAt.value = now + randomBetween(12, 22) * 1000
}

export function PortalsPongGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phaseRef = useRef<GamePhase>('menu')
  const winnerRef = useRef<Winner>(null)
  const keysRef = useRef<Keys>({ up: false, down: false })
  const dashOffsetRef = useRef(0)
  const nextTeleportAtRef = useRef({ value: 0 })
  const startTimeRef = useRef(0)
  const rafRef = useRef<number>(0)
  const playerVelRef = useRef(0)
  const aiReactionUntilRef = useRef(0)
  const aiAimErrorRef = useRef(0)

  const ballRef = useRef<Ball>(createBall())
  const p1Ref = useRef<Paddle>(createPaddle('right'))
  const p2Ref = useRef<Paddle>(createPaddle('left'))
  const bluePortalRef = useRef<Portal>(createPortal(99, 100, BLUE))
  const orangePortalRef = useRef<Portal>(createPortal(WIDTH - 99, 200, ORANGE))

  const startGame = useCallback(() => {
    phaseRef.current = 'playing'
    winnerRef.current = null
    ballRef.current = createBall()
    p1Ref.current = createPaddle('right')
    p2Ref.current = createPaddle('left')
    bluePortalRef.current = createPortal(99, 100, BLUE)
    orangePortalRef.current = createPortal(WIDTH - 99, 200, ORANGE)
    startTimeRef.current = performance.now()
    nextTeleportAtRef.current.value = performance.now() + 5000
    playerVelRef.current = 0
    aiReactionUntilRef.current = 0
    aiAimErrorRef.current = 0
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === ' ' || e.key === 'Enter') {
        if (phaseRef.current === 'menu' || phaseRef.current === 'gameover') {
          e.preventDefault()
          startGame()
        }
        return
      }
      if (phaseRef.current !== 'playing') return
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault()
        keysRef.current.up = true
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault()
        keysRef.current.down = true
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') keysRef.current.up = false
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keysRef.current.down = false
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    const loop = (now: number) => {
      dashOffsetRef.current =
        (dashOffsetRef.current + PORTAL_DASH_SPEED) %
        (PORTAL_DASH_PATTERN[0] + PORTAL_DASH_PATTERN[1])

      if (phaseRef.current === 'playing') {
        const elapsed = now - startTimeRef.current
        updateGame(
          ballRef.current,
          p1Ref.current,
          p2Ref.current,
          bluePortalRef.current,
          orangePortalRef.current,
          keysRef.current,
          now,
          elapsed,
          playerVelRef,
          aiReactionUntilRef,
          aiAimErrorRef,
        )
        maybeTeleportPortals(
          bluePortalRef.current,
          orangePortalRef.current,
          nextTeleportAtRef.current,
          now,
        )

        const ball = ballRef.current
        if (ball.x - ball.radius >= WIDTH) {
          if (scorePoint(ball, p1Ref.current, p2Ref.current, 'p2')) {
            phaseRef.current = 'gameover'
            winnerRef.current = 'ai'
          }
        } else if (ball.x + ball.radius <= 0) {
          if (scorePoint(ball, p1Ref.current, p2Ref.current, 'p1')) {
            phaseRef.current = 'gameover'
            winnerRef.current = 'player'
          }
        }

        for (const portal of [bluePortalRef.current, orangePortalRef.current]) {
          if (now >= portal.cooldownUntil) portal.collidable = true
        }
      }

      drawScene(
        ctx,
        ballRef.current,
        p1Ref.current,
        p2Ref.current,
        bluePortalRef.current,
        orangePortalRef.current,
        dashOffsetRef.current,
        phaseRef.current,
        winnerRef.current,
      )

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [onClose, startGame])

  return (
    <div
      className="relative w-full max-w-3xl rounded-2xl border border-border bg-black p-3 shadow-2xl"
      onClick={() => {
        if (phaseRef.current === 'menu' || phaseRef.current === 'gameover') startGame()
      }}
      role="presentation"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        aria-label="Close Portals Pong"
        className="absolute -right-2 -top-2 z-10 rounded-full border border-border bg-card p-2 text-muted-foreground shadow-md transition-colors hover:bg-muted hover:text-foreground"
      >
        <X className="size-4" />
      </button>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="mx-auto block w-full max-w-[512px] cursor-pointer rounded-lg"
        aria-label="Portals Pong game canvas"
      />
    </div>
  )
}

export const PORTALS_PONG_SEQUENCE = SEQUENCE

interface PortalsPongModalProps {
  open: boolean
  onClose: () => void
}

export function PortalsPongModal({ open, onClose }: PortalsPongModalProps) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <PortalsPongGame onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

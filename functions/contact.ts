import { createHash } from 'node:crypto'
import type { Handler } from '@netlify/functions'

interface ContactPayload {
  email?: string
  message?: string
  subject?: string
  name?: string
  bot?: string
  subscribe?: boolean
}

function jsonResponse(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

async function sendContactEmail(payload: {
  email: string
  message: string
  subject?: string
  name?: string
}) {
  const apiKey = process.env.MAILGUN_API_KEY
  const domain = process.env.MAILGUN_DOMAIN
  const to = process.env.CONTACT_EMAIL_ADDRESS

  if (!apiKey || !domain || !to) {
    throw new Error('Contact form is not configured')
  }

  const senderName = payload.name?.trim() || 'Portfolio visitor'
  const params = new URLSearchParams({
    from: `${senderName} <${payload.email}>`,
    to,
    subject: payload.subject?.trim() || 'Portfolio message',
    text: payload.message,
  })

  const auth = Buffer.from(`api:${apiKey}`).toString('base64')
  const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  if (!response.ok) {
    throw new Error(`Mailgun request failed (${response.status})`)
  }
}

async function subscribeToNewsletter(email: string) {
  const apiKey = process.env.MAILCHIMP_API_KEY
  const server = process.env.MAILCHIMP_SERVER_PREFIX
  const listId = process.env.MAILCHIMP_LIST_ID

  if (!apiKey || !server || !listId) return

  const subscriberHash = createHash('md5').update(email.toLowerCase()).digest('hex')
  const auth = Buffer.from(`anystring:${apiKey}`).toString('base64')

  const response = await fetch(
    `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: 'pending',
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`Mailchimp request failed (${response.status})`)
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, message: 'Method not allowed' })
  }

  try {
    const data = JSON.parse(event.body ?? '{}') as ContactPayload

    if (data.bot) {
      return jsonResponse(200, { ok: true, message: 'success' })
    }

    const email = data.email?.trim()
    const message = data.message?.trim()

    if (!email || !message) {
      return jsonResponse(400, { ok: false, message: 'Email and message are required' })
    }

    await sendContactEmail({
      email,
      message,
      subject: data.subject,
      name: data.name,
    })

    if (data.subscribe) {
      try {
        await subscribeToNewsletter(email)
      } catch {
        // Don't fail the contact submission if newsletter signup fails.
      }
    }

    return jsonResponse(200, { ok: true, message: 'success' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return jsonResponse(500, { ok: false, message })
  }
}

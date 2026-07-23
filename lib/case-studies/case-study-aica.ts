import type { Work } from '@/lib/work-types'

export const aicaCaseStudy: Work = {
  slug: 'aica',
  name: 'AICA',
  year: '2026',
  category: 'AI · Intercultural Communication · Mobile App',
  linkType: 'case-study',
  selected: true,
  image: '/images/works/aica-landing.png',
  tagline:
    'AI Intercultural Communication Assistant: a privacy-first Expo app that advises on cross-cultural messages, not just translates them.',
  tech: [
    'Expo 54',
    'React Native 0.81',
    'React 19',
    'TypeScript',
    'Expo Router',
    'expo-ai-kit',
    'Supabase (Auth, Postgres, Edge Functions, RLS)',
    'OpenRouter / Gemini 2.5 Flash',
    'CryptoJS',
    'AsyncStorage',
    'expo-secure-store',
    'Jest + RNTL',
  ],
  caseStudy: {
    overview:
      'AICA helps people navigate cross-cultural communication on their phone: paste a conversation or describe a situation, pick a persona (work, dating, academic, travel, casual), and get interpretation, cultural notes, and suggested replies. I designed and built the product end to end as an Expo Router app (glass UI, auth/onboarding, Analyze → Result → History, personas CRUD, tips, and freemium gating) with a local-first AI path (expo-ai-kit) that falls back to an OpenRouter model via a Supabase Edge Function when confidence is low and the user still has quota.',
    role: 'Founder / Full-Stack Mobile Engineer',
    timeline: '2025–2026 · Foundation Dec 2025, MVP build Jan–Mar 2026',
    team: 'Solo builder: product, schema, advisor architecture, UI, auth, and subscription surface',
    liveUrl: 'https://askaica.app',
    liveLabel: 'askaica.app',
    results: [
      { label: 'AI path', value: 'On-device → online fallback' },
      { label: 'Core loop', value: 'Analyze · Persona · History' },
      { label: 'Free online quota', value: '5 / week' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Translation tools fix wording, not culture. Someone can write grammatically perfect Japanese and still miss formality, indirect refusal, or workplace norms, and existing apps rarely warn about that. Cross-cultural friction shows up daily for remote teams, international couples, students abroad, and expats sharing sensitive conversations.',
          'AICA needed to feel like a cultural advisor in your pocket: actionable advice tailored to context (persona + language pair), with privacy as table stakes, not a chatbot that ships every message to the cloud by default.',
        ],
      },
      {
        heading: 'My approach',
        body: [
          'I built AICA as an Expo ~54 / React Native app with file-based Expo Router: auth stack (welcome, Google OAuth + email/password, language), then tabs for Analyze, History, Personas, and Settings. Domain state lives in React Context (Auth, Message, Persona); history is AES-encrypted locally; personas are local-first with optional Supabase sync when privacy settings allow.',
          'The differentiator is the advisor stack: try on-device inference first via expo-ai-kit; if confidence is below threshold and the user has remaining weekly quota, call a Supabase Edge Function that proxies OpenRouter (Gemini 2.5 Flash). Free limits (5 online requests/week, 2 personas, 1000 chars) and Pro CTAs create upgrade moments without requiring Stripe yet. Waitlist and subscription UI are in place for the next monetization step.',
        ],
      },
      {
        heading: 'Product & engineering details',
        body: [
          'Shipped surface includes the Analyze textarea with persona pills and usage dots, Result cards (summary, interpretation, suggested copy-to-clipboard messages, cultural notes, feedback), encrypted History with persona filters, Personas CRUD across domain categories, random cultural tips with voting, privacy local-only mode, and Settings (account, Pro waitlist/pricing, debug).',
          'Backend is Supabase: Auth, Postgres schema (profiles, personas, requests/responses, tips, feedback, waitlist, billing placeholders), RLS so users only touch their own rows, and the advisor Edge Function. Tests cover advisor decision/local model paths and key services with Jest + React Native Testing Library. Honest scope gaps: Draft rewriting API, traffic-light signals, Stripe checkout, and store submissions remain post-MVP.',
        ],
      },
      {
        heading: 'Outcome',
        body: [
          'AICA is a working end-to-end MVP: signup → analyze → culturally aware advice → save to history, with on-device-first AI and a real online fallback. The codebase is a coherent Expo product foundation (glass design system, typed routes, Supabase-backed auth and quota, and a clear freemium path), ready for Stripe, Draft AI, TestFlight / Play internal testing, and a public askaica.app launch.',
        ],
      },
    ],
    gallery: [
      {
        src: '/images/works/case-studies/aica-analyze.png',
        caption: 'Analyze: persona pills, situation input, usage quota, and cultural tip.',
      },
      {
        src: '/images/works/case-studies/aica-result.png',
        caption: 'Result: advice summary, interpretation, suggested messages, and cultural notes.',
      },
      {
        src: '/images/works/case-studies/aica-personas.png',
        caption: 'Personas: context cards by domain with language pairs for tailored advice.',
      },
    ],
  },
}

import type { Work } from '@/lib/work-types'

export const beekingCaseStudy: Work = {
  slug: 'beeking',
  name: 'BeeKing',
  year: '2025',
  category: 'Productivity · Freelance · Mobile App',
  linkType: 'case-study',
  image: '/images/works/beeking-landing.png',
  tagline:
    'Bee Productive, Bee Kind, Bee King of Your Time: a local-first Expo app for tracking billable hours, projects, and invoices.',
  tech: [
    'Expo 53',
    'React Native 0.79',
    'React 19',
    'TypeScript',
    'Expo Router',
    'expo-sqlite',
    'Drizzle ORM',
    'Zod',
    'TanStack Form',
    'Reanimated',
    'expo-notifications',
    'AsyncStorage',
    'expo-secure-store',
    'Custom SVG charts',
  ],
  caseStudy: {
    overview:
      'BeeKing is a bee-themed freelance productivity app that keeps time tracking, projects, clients, and invoices in one local-first mobile surface. I designed and built the product end to end as an Expo Router app on React Native: persisted task timers, project grouping, invoice/line-item CRUD, due-date notifications, settings (theme, rates, currency), and custom hexagon/circle analytics, all on device via expo-sqlite and Drizzle, with no accounts or backend. Branding evolved from BusyBee → TimeHive → BeeKing to land the “Bee King of Your Time” pun and a cohesive honeycomb visual system.',
    role: 'Founder / Full-Stack Mobile Engineer',
    timeline: '2025–2026 · Primary build Jul–Sep 2025, branding & polish Apr–May 2026',
    team: 'Solo builder: product, schema, UI, timers, invoicing, analytics, and settings',
    results: [
      { label: 'Core loop', value: 'Track · Project · Invoice · Analyze' },
      { label: 'Persistence', value: 'On-device SQLite (Drizzle)' },
      { label: 'Ownership', value: 'Solo end-to-end MVP' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Freelancers still bounce between a timer app, a project list, a spreadsheet, and a separate invoicing tool, so billable hours get lost between “I worked on this” and “I can send an invoice.” Mobile-first contractors especially need a single place where today’s timer, this week’s projects, and client-ready line items share one source of truth.',
          'BeeKing targets that loop without forcing accounts or a cloud stack: log hours per task and day (including timers that survive app restarts), group work into projects, turn hours × rates into invoices for clients, and glance at analytics, all local on the device.',
        ],
      },
      {
        heading: 'My approach',
        body: [
          'I built BeeKing as an Expo ~53 / React Native app with file-based Expo Router navigation: bottom tabs for Analytics, Tasks, Projects, and Invoices, plus stacks for create/edit flows and a settings area. Domain data lives in SQLite through Drizzle (tasks, task_history with timer fields, projects, project_tasks, clients, invoices, line_items); repositories and focused React contexts keep screens thin; Zod validates forms and settings.',
          'The product differentiator is persistence and cohesion: running timers store start/pause/accumulated seconds in task_history so sessions survive relaunches; due dates schedule via expo-notifications when enabled; invoices compose line items from hours and rates; analytics use custom SVG hexagon/circle/line charts that match the honeycomb brand. Freemium Pro gating and a crown CTA are in the UI; payment providers remain intentionally unwired until store readiness.',
        ],
      },
      {
        heading: 'Product & engineering details',
        body: [
          'Shipped surface includes task CRUD with search, bulk complete, archive, and N-day history; per-day task detail; project linking; client + invoice management with statuses (draft / pending / paid / overdue); analytics toggles across overview / tasks / projects / invoices; light/dark themes; currency and default hourly rate settings; side drawer and hexagon FAB chrome; and accessibility labels across interactive controls.',
          'Architecture is repository + context over a Drizzle schema, with migrations at boot, seed scripts for empty DBs, toast feedback, and constraint-aware error handling documented for the data layer. I kept honesty in scope: import/export and PDF invoice export are stubs; Pro select only logs; help/privacy/rate-app actions are incomplete; categories/tags and a real bar chart remain on the checklist; bundle id is still com.anonymous.beeking with no EAS store config in-repo.',
        ],
      },
      {
        heading: 'Outcome',
        body: [
          'BeeKing is a substantial solo mobile MVP for local freelance time → invoice workflows: users can track and persist timers, organize projects, manage clients and invoices, configure reminders and preferences, and explore custom analytics, without a backend. The codebase is a coherent Expo product foundation, ready for PDF export, backup/sync decisions, real Pro billing, and App Store / Play packaging, and a clear portfolio piece for end-to-end ownership from naming and visual system through schema, UX, and domain logic.',
        ],
      },
    ],
    gallery: [
      {
        src: '/images/works/case-studies/beeking-tasks.png',
        caption: 'Tasks tab: persisted timers, search, and billable day history.',
      },
      {
        src: '/images/works/case-studies/beeking-timer.png',
        caption: 'Timer: track time spent on tasks.',
      },
      {
        src: '/images/works/case-studies/beeking-analytics.png',
        caption: 'Analytics: hexagon and circle charts for hours and invoice status.',
      },
    ],
  },
}

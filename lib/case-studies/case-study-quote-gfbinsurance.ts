import type { Work } from '@/lib/work-types'

export const gfbInsuranceQuoteCaseStudy: Work = {
  slug: 'gfbinsurance-quote',
  name: 'quote.gfbinsurance.com',
  year: '2024',
  category: 'Insurance · Web Application',
  linkType: 'case-study',
  selected: true,
  image: '/images/works/quote-gfbinsurance-index.png',
  tagline:
    'Georgia Farm Bureau’s Online Quote app: an 8-step personal auto quote with live rating, a home inquiry form, and agent handoff into PolicyPro.',
  tech: [
    'Angular 17',
    'TypeScript',
    'Angular Material',
    'Bootstrap',
    'RxJS',
    'Playwright',
    '.NET 8 / Ocelot',
    'MSAL (lead-converter)',
    'GA4 + GTM',
  ],
  caseStudy: {
    overview:
      'Georgia Farm Bureau needed a public Online Quote (OQ) experience at quote.gfbinsurance.com so Georgia residents could start auto coverage online and connect with a local agent, not a self-serve bind. I helped build and maintain the Angular quote SPA: an 8-step personal auto wizard with data prefill, VIN/ISO vehicle lookup, editable coverages, live rating, and a “Contact an Agent” close, plus a streamlined home quote inquiry form. The same platform includes an MSAL-authenticated agent lead-converter that turns OQ sessions into PolicyPro quotes through a .NET Ocelot API gateway.',
    role: 'Frontend Engineer',
    timeline: '2023–2026 · Primary build in 2024, ongoing product & analytics work',
    team: '3 frontend engineers, backend / PolicyManagementApi, product & agency stakeholders',
    liveUrl: 'https://quote.gfbinsurance.com',
    liveLabel: 'quote.gfbinsurance.com',
    results: [
      { label: 'Auto quote steps', value: '8' },
      { label: 'Lines supported', value: 'Auto + Home' },
      { label: 'Close path', value: 'Agent → PolicyPro' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'GFB’s quoting experience had to work for two audiences at once: consumers who expect a clear, mobile-friendly path to a price, and local agents who still own underwriting, eligibility, and binding in PolicyPro (Adaptik). A full online purchase flow was out of scope. The product needed conditional rated quotes, Georgia-only address rules, consumer-reporting acknowledgements, and a clean handoff to a real agent.',
          'Homeowners quoting was even more constrained: instead of shipping an incomplete multi-step home rate path to production, the live /home experience became a focused “GFB Quote Inquiry Form” that captures contact and address and routes the lead for follow-up.',
        ],
      },
      {
        heading: 'My approach',
        body: [
          'I worked on the Policy-Manager SPA as a guided wizard: sticky GFB-branded header, step progress (1/8 → 8/8), Material outline fields, and reactive forms with dirty-navigation guards so members don’t lose mid-quote work. Auto steps cover primary insured → driver/vehicle prefill → vehicles → drivers → vehicle coverages → policy coverages → contact (discounts, membership) → summary with a 6-month premium.',
          'On the agent side, lead-converter authenticates with Azure AD (MSAL), loads quote versions by session (mc_id), surfaces vehicles/drivers/coverages/discounts, and creates the PolicyPro quote so the agency can finish the sale. A shared proxy_api gateway (Ocelot + client credentials) sits in front of PolicyManagementApi for both apps.',
        ],
      },
      {
        heading: 'Product & engineering details',
        body: [
          'Rating and session state run through the backend with an mc_id on every call. The UI integrates Google Places autocomplete (GA addresses only), vehicle year/make/model and VIN/ISO lookups, coverage amount editors (BI, PD, UM, collision, OTC, GAP, towing/labor, and rate-rule updates over time), and legal/CRA consent copy required for insurance quoting.',
          'I also owned large chunks of production hardening: analytics (GA4 gtag + GTM with SPA virtual pageviews and form_submit events), clickjacking protections on OQ and lead-converter, coverage/discount display fixes, effective-date limits, US-citizen / existing-member eligibility questions, and Playwright coverage for the happy-path auto quote.',
        ],
      },
      {
        heading: 'Outcome',
        body: [
          'quote.gfbinsurance.com is a live Georgia Farm Bureau channel: consumers can complete a rated personal auto quote online and contact a local agent, while home inquiries feed the agency workflow. Agents convert those leads in lead-converter into PolicyPro without re-keying the entire session. The stack (Angular 17, Material, Bootstrap, Playwright, and a .NET gateway) remains the production Online Quote platform through ongoing rate, eligibility, and marketing-analytics releases.',
        ],
      },
    ],
    gallery: [
      {
        src: '/images/works/case-studies/quote-gfbinsurance-index.png',
        caption: 'Auto quote: Primary Insured (step 1 of 8) on quote.gfbinsurance.com.',
      },
      {
        src: '/images/works/case-studies/quote-gfbinsurance-home.png',
        caption: 'Home path: GFB Quote Inquiry Form at /home.',
      },
      {
        src: '/images/works/case-studies/quote-gfbinsurance-summary.png',
        caption: 'Auto summary: rated 6-month premium with Contact an Agent handoff.',
      },
    ],
  },
}

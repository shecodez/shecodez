import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
})

export const metadata: Metadata = {
  title: 'Nicole J. Nobles — Frontend Design Engineer',
  description:
    'Nicole J. Nobles is a frontend design engineer with 7+ years of experience crafting polished, accessible, high-performance interfaces in React. Portfolio, projects, and design-system work.',
  keywords: [
    'Frontend Design Engineer',
    'React',
    'TypeScript',
    'Design Systems',
    'Accessibility',
    'UI Engineering',
    'Nicole J. Nobles',
    'SHeCodez',
  ],
  openGraph: {
    title: 'Nicole J. Nobles — Frontend Design Engineer',
    description:
      'Interfaces that don\u2019t just work\u2014they feel right. Portfolio of a frontend design engineer.',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1917' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

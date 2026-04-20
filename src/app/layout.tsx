import type { Metadata } from 'next'
import { Playfair_Display, Source_Serif_4, DM_Sans } from 'next/font/google'
import './globals.css'
import { Masthead } from '@/components/Masthead'
import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const body = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const label = DM_Sans({
  subsets: ['latin'],
  variable: '--font-label',
  display: 'swap',
})

const siteUrl = process.env.SITE_URL || 'https://rockefeller.press'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Rockefeller.press', template: '%s · Rockefeller.press' },
  description: 'American journalism — reporting, analysis, and dispatch from the desk.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Rockefeller.press',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${label.variable}`}>
      <body className="min-h-screen font-body">
        <Masthead />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

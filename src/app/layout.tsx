import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AppProviders } from '@/components/providers/AppProviders'
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: '%s ',
    absolute: 'ScrapeFlow'
  },
  description:
    'ScrapeFlow is the easiest way to create professional workflows that will help you land your dream job.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl={'/sign-in'}
      appearance={{
        elements: {
          formButtonPrimary:
            'bg-primary hover:bg-primary/80 text-sm !shadow-none'
        }
      }}
    >
      <html lang='en' suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AppProviders>{children}</AppProviders>
        </body>
      </html>
    </ClerkProvider>
  )
}

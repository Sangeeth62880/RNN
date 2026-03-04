import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { clsx } from 'clsx'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Understanding RNNs | Interactive Experience',
  description: 'An interactive educational journey into Recurrent Neural Networks.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          'antialiased bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-primary-foreground'
        )}
      >
        {children}
      </body>
    </html>
  )
}

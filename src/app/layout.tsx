import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'משפחת גבאי',
  description: 'אתר משפחת גבאי',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {children}
      </body>
    </html>
  )
}

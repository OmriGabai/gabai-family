import type { Metadata } from 'next'
import Link from 'next/link'
import { SecretButterfly } from '@/components/gili/SecretButterfly'

export const metadata: Metadata = {
  title: 'העולם המופלא של גילי',
  description: 'האתר של גילי - יצירות, מחשבות וחוויות',
}

function HelloKitty({ className }: { className?: string }) {
  return (
    <span className={`inline-block ${className}`}>🎀</span>
  )
}

function Rainbow() {
  return (
    <div className="rainbow-gradient h-2 w-full rounded-full opacity-70" />
  )
}

export default function GiliLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <SecretButterfly className="absolute top-4 right-10" />
          <SecretButterfly className="absolute top-12 left-20 text-2xl" />
          <SecretButterfly className="absolute top-6 left-1/3 text-xl" />
          <div className="absolute top-8 right-1/4"><HelloKitty className="text-2xl" /></div>
          <div className="absolute top-14 left-10"><HelloKitty className="text-xl" /></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/gili" className="block text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gili-pink via-gili-purple to-gili-blue bg-clip-text text-transparent">
              🌈 העולם המופלא של גילי 🎀
            </h1>
            <p className="text-sm text-gili-pink/70 mt-1">🦋 Hello Kitty Fan 🦋</p>
          </Link>
          <div className="mt-4">
            <Rainbow />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-pink-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-center gap-6">
          <Link
            href="/gili"
            className="text-gili-purple hover:text-gili-pink transition-colors font-medium"
          >
            🏠 בית
          </Link>
          <Link
            href="/"
            className="text-gili-purple hover:text-gili-pink transition-colors font-medium"
          >
            👨‍👩‍👧‍👦 המשפחה
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-pink-200 bg-white/30 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-gili-purple/70">
            🌟 נבנה עם הרבה אהבה 💖
          </p>
        </div>
      </footer>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { SecretCrewmate } from '@/components/ron/SecretCrewmate'

export const metadata: Metadata = {
  title: 'החללית של רון',
  description: 'האתר של רון - משימות, הרפתקאות וחקירות',
}

function Star({ className }: { className?: string }) {
  return (
    <span className={`inline-block animate-pulse ${className}`}>⭐</span>
  )
}

export default function RonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Star className="absolute top-10 right-20 text-xs opacity-60" />
        <Star className="absolute top-32 left-16 text-sm opacity-40" />
        <Star className="absolute top-20 left-1/3 text-xs opacity-50" />
        <Star className="absolute top-48 right-1/4 text-sm opacity-30" />
        <Star className="absolute top-64 left-1/2 text-xs opacity-60" />
        <Star className="absolute top-16 right-1/3 text-sm opacity-40" />
        <Star className="absolute top-40 left-10 text-xs opacity-50" />
        <Star className="absolute top-80 right-10 text-sm opacity-30" />
      </div>

      {/* Header */}
      <header className="relative">
        <div className="absolute inset-0 opacity-40">
          <SecretCrewmate className="absolute top-4 right-10" color="red" />
          <SecretCrewmate className="absolute top-8 left-20" color="cyan" />
          <SecretCrewmate className="absolute top-6 left-1/3" color="lime" />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 relative">
          <Link href="/ron" className="block text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-cyan-400">
              🚀 החללית של רון 👨‍🚀
            </h1>
            <p className="text-sm text-cyan-400/70 mt-1" dir="ltr">Trust no one... 🔪</p>
          </Link>
          <div className="mt-4 h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-cyan-500 rounded-full" />
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-cyan-500/30 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-center gap-6">
          <Link
            href="/ron"
            className="text-cyan-400 hover:text-red-400 transition-colors font-medium"
          >
            🏠 בסיס
          </Link>
          <Link
            href="/"
            className="text-cyan-400 hover:text-red-400 transition-colors font-medium"
          >
            👨‍👩‍👧‍👦 המשפחה
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/30 bg-slate-900/50 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-cyan-400/50" dir="ltr">
            🛸 . was not The Impostor 💀
          </p>
        </div>
      </footer>
    </div>
  )
}

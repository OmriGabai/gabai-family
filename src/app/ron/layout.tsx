import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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

        {/* Floating crewmates - different colors, positions, opacities */}
        {/* Row 1 - Top */}
        <Image src="/images/ron/crewmate.png" alt="" width={45} height={45}
          className="absolute top-16 right-8 opacity-35 float" />
        <Image src="/images/ron/crewmate-blue.png" alt="" width={55} height={55}
          className="absolute top-20 left-[15%] opacity-20 float" style={{ animationDelay: '0.5s' }} />
        <Image src="/images/ron/crewmate-cyan.png" alt="" width={40} height={40}
          className="absolute top-12 left-[40%] opacity-15 float" style={{ animationDelay: '1.2s' }} />
        <Image src="/images/ron/crewmate-pink.png" alt="" width={50} height={50}
          className="absolute top-24 right-[25%] opacity-25 float" style={{ animationDelay: '2s' }} />

        {/* Row 2 - Upper middle */}
        <Image src="/images/ron/crewmate-green.png" alt="" width={60} height={60}
          className="absolute top-36 left-4 opacity-30 float" style={{ animationDelay: '0.3s' }} />
        <Image src="/images/ron/crewmate-yellow.png" alt="" width={35} height={35}
          className="absolute top-44 right-[45%] opacity-15 float" style={{ animationDelay: '1.8s' }} />
        <Image src="/images/ron/crewmate-orange.png" alt="" width={50} height={50}
          className="absolute top-40 right-4 opacity-25 float" style={{ animationDelay: '2.5s' }} />

        {/* Row 3 - Middle */}
        <Image src="/images/ron/crewmate-black.png" alt="" width={55} height={55}
          className="absolute top-56 left-[20%] opacity-20 float" style={{ animationDelay: '0.8s' }} />
        <Image src="/images/ron/crewmate.png" alt="" width={40} height={40}
          className="absolute top-64 right-[15%] opacity-15 float" style={{ animationDelay: '1.5s' }} />
        <Image src="/images/ron/crewmate-blue.png" alt="" width={65} height={65}
          className="absolute top-60 left-[55%] opacity-25 float" style={{ animationDelay: '3s' }} />

        {/* Row 4 - Lower middle */}
        <Image src="/images/ron/crewmate-cyan.png" alt="" width={50} height={50}
          className="absolute top-80 right-8 opacity-30 float" style={{ animationDelay: '0.6s' }} />
        <Image src="/images/ron/crewmate-green.png" alt="" width={45} height={45}
          className="absolute top-[22rem] left-8 opacity-20 float" style={{ animationDelay: '2.2s' }} />
        <Image src="/images/ron/crewmate-pink.png" alt="" width={55} height={55}
          className="absolute top-[24rem] right-[35%] opacity-15 float" style={{ animationDelay: '1s' }} />

        {/* Row 5 - Bottom area */}
        <Image src="/images/ron/crewmate-yellow.png" alt="" width={60} height={60}
          className="absolute bottom-48 left-[10%] opacity-25 float" style={{ animationDelay: '1.7s' }} />
        <Image src="/images/ron/crewmate-orange.png" alt="" width={45} height={45}
          className="absolute bottom-40 right-[20%] opacity-20 float" style={{ animationDelay: '0.4s' }} />
        <Image src="/images/ron/crewmate-black.png" alt="" width={50} height={50}
          className="absolute bottom-52 left-[45%] opacity-30 float" style={{ animationDelay: '2.8s' }} />

        {/* Row 6 - Very bottom */}
        <Image src="/images/ron/crewmate.png" alt="" width={55} height={55}
          className="absolute bottom-24 right-6 opacity-35 float" style={{ animationDelay: '1.3s' }} />
        <Image src="/images/ron/crewmate-blue.png" alt="" width={40} height={40}
          className="absolute bottom-20 left-[30%] opacity-15 float" style={{ animationDelay: '2.1s' }} />
        <Image src="/images/ron/crewmate-cyan.png" alt="" width={60} height={60}
          className="absolute bottom-16 left-6 opacity-25 float" style={{ animationDelay: '0.9s' }} />
        <Image src="/images/ron/crewmate-green.png" alt="" width={35} height={35}
          className="absolute bottom-28 right-[40%] opacity-20 float" style={{ animationDelay: '3.2s' }} />
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
          <p className="text-cyan-400/50 text-center" dir="ltr">
            🛸 Ron was not The Impostor 💀
          </p>
        </div>
      </footer>
    </div>
  )
}

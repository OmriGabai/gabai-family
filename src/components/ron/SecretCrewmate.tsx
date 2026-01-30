'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

// Store click count globally so all crewmates share it
let globalClickCount = 0
let lastClickTime = 0

const crewmateColors: Record<string, string> = {
  red: '🔴',
  cyan: '🔵',
  lime: '🟢',
  yellow: '🟡',
  orange: '🟠',
  pink: '🟣',
}

interface SecretCrewmateProps {
  className?: string
  color?: keyof typeof crewmateColors
}

export function SecretCrewmate({ className, color = 'red' }: SecretCrewmateProps) {
  const router = useRouter()
  const [sus, setSus] = useState(false)

  const handleClick = () => {
    const now = Date.now()

    // Reset if more than 2 seconds since last click
    if (now - lastClickTime > 2000) {
      globalClickCount = 0
    }

    lastClickTime = now
    globalClickCount++

    // Sus animation
    setSus(true)
    setTimeout(() => setSus(false), 500)

    // After 3 clicks, go to admin
    if (globalClickCount >= 3) {
      globalClickCount = 0
      router.push('/ron/admin')
    }
  }

  return (
    <span
      onClick={handleClick}
      className={`inline-block cursor-pointer select-none transition-all duration-200 hover:scale-150 ${sus ? 'animate-bounce' : ''} ${className}`}
      title="sus?"
    >
      👨‍🚀
    </span>
  )
}

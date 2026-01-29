'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Store click count globally so all butterflies share it
let globalClickCount = 0
let lastClickTime = 0

export function SecretButterfly({ className }: { className?: string }) {
  const router = useRouter()
  const [wiggle, setWiggle] = useState(false)

  const handleClick = () => {
    const now = Date.now()

    // Reset if more than 2 seconds since last click
    if (now - lastClickTime > 2000) {
      globalClickCount = 0
    }

    lastClickTime = now
    globalClickCount++

    // Wiggle animation
    setWiggle(true)
    setTimeout(() => setWiggle(false), 300)

    // After 3 clicks, go to admin
    if (globalClickCount >= 3) {
      globalClickCount = 0
      router.push('/gili/admin')
    }
  }

  return (
    <span
      onClick={handleClick}
      className={`butterfly inline-block cursor-pointer select-none hover:scale-125 transition-transform ${wiggle ? 'animate-ping' : ''} ${className}`}
    >
      🦋
    </span>
  )
}

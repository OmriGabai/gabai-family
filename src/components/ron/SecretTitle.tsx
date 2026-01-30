'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

export function SecretTitle() {
  const router = useRouter()
  const [clickCount, setClickCount] = useState(0)
  const lastClickTime = useRef(0)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const now = Date.now()

    // Reset if more than 2 seconds since last click
    if (now - lastClickTime.current > 2000) {
      setClickCount(1)
    } else {
      setClickCount(prev => prev + 1)
    }

    lastClickTime.current = now

    // After 3 clicks, go to admin
    if (clickCount + 1 >= 3) {
      setClickCount(0)
      router.push('/ron/admin')
    }
  }

  return (
    <h1
      onClick={handleClick}
      className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-cyan-400 cursor-pointer select-none"
    >
      🚀 החללית של רון 👨‍🚀
    </h1>
  )
}

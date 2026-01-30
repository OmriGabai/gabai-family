'use client'

import { useState } from 'react'

interface ShareButtonProps {
  title: string
}

export function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href

    // Try Web Share API (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - החללית של רון`,
          url,
        })
        return
      } catch (error) {
        // User cancelled or error
      }
    }

    // Fallback: copy link
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-700 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 transition-all duration-200"
    >
      <span className="text-xl">{copied ? '✓' : '📡'}</span>
      <span className="font-medium">{copied ? 'הועתק!' : 'שידור'}</span>
    </button>
  )
}

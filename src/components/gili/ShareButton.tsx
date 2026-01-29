'use client'

import { useState } from 'react'

interface ShareButtonProps {
  title: string
}

export function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href

    // ניסיון להשתמש ב-Web Share API (מובייל)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} - העולם המופלא של גילי`,
          url,
        })
        return
      } catch (error) {
        // המשתמש ביטל את השיתוף או שהיה שגיאה
      }
    }

    // Fallback: העתקת קישור
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
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-gili-blue/20 text-slate-600 hover:text-gili-blue transition-all duration-200"
    >
      <span className="text-xl">{copied ? '✓' : '📤'}</span>
      <span className="font-medium">{copied ? 'הועתק!' : 'שיתוף'}</span>
    </button>
  )
}

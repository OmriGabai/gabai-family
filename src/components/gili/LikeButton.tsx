'use client'

import { useState, useEffect } from 'react'

interface LikeButtonProps {
  postId: number
  initialCount: number
  onLike: () => void
}

export function LikeButton({ postId, initialCount, onLike }: LikeButtonProps) {
  const [liked, setLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [count, setCount] = useState(initialCount)

  // בדיקה אם כבר עשינו לייק (מ-localStorage)
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('gili_liked_posts') || '[]')
    setLiked(likedPosts.includes(postId))
  }, [postId])

  const handleLike = async () => {
    if (liked) return

    setIsAnimating(true)
    setLiked(true)
    setCount(c => c + 1)
    onLike()

    // שמירה ב-localStorage
    const likedPosts = JSON.parse(localStorage.getItem('gili_liked_posts') || '[]')
    localStorage.setItem('gili_liked_posts', JSON.stringify([...likedPosts, postId]))

    // שליחה לשרת (כשיהיה API)
    try {
      await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, visitorId: getVisitorId() }),
      })
    } catch (error) {
      // נתעלם מטעויות בינתיים
    }

    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full
        transition-all duration-200
        ${liked
          ? 'bg-gili-pink/20 text-gili-pink cursor-default'
          : 'bg-slate-100 hover:bg-gili-pink/20 text-slate-600 hover:text-gili-pink'
        }
      `}
    >
      <span className={`text-xl ${isAnimating ? 'heart-beat' : ''}`}>
        {liked ? '❤️' : '🤍'}
      </span>
      <span className="font-medium">{count}</span>
    </button>
  )
}

// יצירת מזהה ייחודי למבקר
function getVisitorId(): string {
  let visitorId = localStorage.getItem('gili_visitor_id')
  if (!visitorId) {
    visitorId = crypto.randomUUID()
    localStorage.setItem('gili_visitor_id', visitorId)
  }
  return visitorId
}

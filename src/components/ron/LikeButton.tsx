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

  // Check if already liked (from localStorage)
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('ron_liked_posts') || '[]')
    setLiked(likedPosts.includes(postId))
  }, [postId])

  const handleLike = async () => {
    if (liked) return

    setIsAnimating(true)
    setLiked(true)
    setCount(c => c + 1)
    onLike()

    // Save to localStorage
    const likedPosts = JSON.parse(localStorage.getItem('ron_liked_posts') || '[]')
    localStorage.setItem('ron_liked_posts', JSON.stringify([...likedPosts, postId]))

    // Send to server
    try {
      await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, visitorId: getVisitorId() }),
      })
    } catch (error) {
      // Ignore errors for now
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
          ? 'bg-red-500/20 text-red-400 cursor-default'
          : 'bg-slate-700 hover:bg-red-500/20 text-slate-400 hover:text-red-400'
        }
      `}
    >
      <span className={`text-xl ${isAnimating ? 'animate-ping' : ''}`}>
        {liked ? '👍' : '👆'}
      </span>
      <span className="font-medium">{count}</span>
    </button>
  )
}

// Create unique visitor ID
function getVisitorId(): string {
  let visitorId = localStorage.getItem('ron_visitor_id')
  if (!visitorId) {
    visitorId = crypto.randomUUID()
    localStorage.setItem('ron_visitor_id', visitorId)
  }
  return visitorId
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LikeButton } from './LikeButton'
import { ShareButton } from './ShareButton'

interface Post {
  id: number
  title: string
  content: string
  image_url: string | null
  created_at: string
  likes_count: number
}

export function PostCard({ post }: { post: Post }) {
  const [likesCount, setLikesCount] = useState(post.likes_count)

  const formattedDate = new Date(post.created_at).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-pink-100 hover:border-gili-pink/50 transition-colors">
      {/* Image */}
      {post.image_url && (
        <div className="relative h-64 w-full">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h4 className="text-xl font-bold text-gili-purple mb-2">
          {post.title}
        </h4>

        <p className="text-slate-600 mb-4 whitespace-pre-line">
          {post.content}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-pink-100">
          <time className="text-sm text-slate-400">
            {formattedDate}
          </time>

          <div className="flex items-center gap-4">
            <LikeButton
              postId={post.id}
              initialCount={likesCount}
              onLike={() => setLikesCount(c => c + 1)}
            />
            <ShareButton title={post.title} />
          </div>
        </div>
      </div>
    </article>
  )
}

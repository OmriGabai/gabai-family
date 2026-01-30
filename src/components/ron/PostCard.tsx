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
    <article className="bg-slate-800/95 rounded-3xl shadow-lg overflow-hidden border border-cyan-500/30 hover:border-red-500/50 transition-colors backdrop-blur-md">
      {/* Content */}
      <div className="p-6">
        <h4 className="text-xl font-bold text-cyan-400 mb-2 flex items-center gap-2">
          <span>📋</span>
          {post.title}
        </h4>

        <p className="text-slate-300 mb-4 whitespace-pre-line">
          {post.content}
        </p>

        {/* Image - below content, full size */}
        {post.image_url && (
          <div className="relative w-full mb-4">
            <Image
              src={post.image_url}
              alt={post.title}
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl border border-cyan-500/30"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-cyan-500/30">
          <time className="text-sm text-slate-500">
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

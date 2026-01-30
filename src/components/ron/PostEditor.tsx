'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface Post {
  id: number
  title: string
  content: string
  image_url: string | null
}

interface PostEditorProps {
  post?: Post
  onSave: () => void
  onCancel: () => void
}

export function PostEditor({ post, onSave, onCancel }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [imageUrl, setImageUrl] = useState(post?.image_url || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('member', 'ron')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        setImageUrl(data.url)
      } else {
        alert('שגיאה בהעלאת התמונה')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('שגיאה בהעלאת התמונה')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('צריך כותרת למשימה!')
      return
    }

    setSaving(true)

    try {
      const url = post ? `/api/posts/${post.id}` : '/api/posts'
      const method = post ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          member: 'ron',
          title: title.trim(),
          content: content.trim(),
          imageUrl: imageUrl || null,
        }),
      })

      if (res.ok) {
        onSave()
      } else {
        alert('שגיאה בשמירת המשימה')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('שגיאה בשמירת המשימה')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/70 rounded-3xl p-6 border border-cyan-500/50 shadow-lg backdrop-blur-sm">
      <h3 className="text-xl font-bold text-cyan-400 mb-6">
        {post ? '✏️ עריכת משימה' : '🚀 משימה חדשה'}
      </h3>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
            שם המשימה
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-white focus:border-cyan-400 focus:outline-none transition-colors"
            placeholder="מה המשימה?"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">
            תיאור
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none"
            placeholder="תאר את המשימה..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            ראיה (תמונה)
          </label>

          {imageUrl ? (
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-2">
              <Image
                src={imageUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setImageUrl('')}
                className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 border-2 border-dashed border-cyan-500/30 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 transition-colors bg-slate-900/50"
            >
              {uploading ? (
                <p className="text-slate-400">🔄 מעלה...</p>
              ) : (
                <>
                  <p className="text-3xl mb-2">📷</p>
                  <p className="text-slate-400">לחץ להעלאת ראיה</p>
                </>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-red-500 to-cyan-500 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? '🔄 שומר...' : '💾 שמירה'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="py-3 px-6 rounded-xl bg-slate-700 text-slate-300 font-medium hover:bg-slate-600 transition-colors"
          >
            ביטול
          </button>
        </div>
      </div>
    </form>
  )
}

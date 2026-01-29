'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PostEditor } from '@/components/gili/PostEditor'

interface Post {
  id: number
  title: string
  content: string
  image_url: string | null
  created_at: string
}

export function AdminPostsClient() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [showNewPost, setShowNewPost] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts?member=gili')
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/gili/admin')
  }

  const handleDelete = async (id: number) => {
    if (!confirm('בטוח למחוק את הפוסט?')) return

    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setPosts(posts.filter(p => p.id !== id))
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const handleSave = () => {
    setShowNewPost(false)
    setEditingPost(null)
    fetchPosts()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gili-purple">
          ✏️ ניהול פוסטים
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowNewPost(true)}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-gili-green to-gili-blue text-white font-medium hover:opacity-90 transition-opacity"
          >
            ➕ פוסט חדש
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-xl bg-slate-200 text-slate-700 font-medium hover:bg-slate-300 transition-colors"
          >
            🚪 יציאה
          </button>
        </div>
      </div>

      {/* New Post Editor */}
      {showNewPost && (
        <div className="mb-8">
          <PostEditor
            onSave={handleSave}
            onCancel={() => setShowNewPost(false)}
          />
        </div>
      )}

      {/* Edit Post Editor */}
      {editingPost && (
        <div className="mb-8">
          <PostEditor
            post={editingPost}
            onSave={handleSave}
            onCancel={() => setEditingPost(null)}
          />
        </div>
      )}

      {/* Posts List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-2xl">🔄</p>
          <p className="text-slate-500 mt-2">טוען...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border-2 border-pink-100">
          <p className="text-4xl mb-4">📝</p>
          <p className="text-slate-500">עדיין אין פוסטים</p>
          <button
            onClick={() => setShowNewPost(true)}
            className="mt-4 px-6 py-2 rounded-xl bg-gili-pink text-white font-medium"
          >
            צרי את הפוסט הראשון!
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl p-6 border-2 border-pink-100 flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gili-purple">{post.title}</h3>
                <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                  {post.content}
                </p>
                <p className="text-slate-400 text-xs mt-2">
                  {new Date(post.created_at).toLocaleDateString('he-IL')}
                </p>
              </div>
              <div className="flex gap-2 mr-4">
                <button
                  onClick={() => setEditingPost(post)}
                  className="p-2 rounded-lg bg-gili-blue/20 text-gili-blue hover:bg-gili-blue/30 transition-colors"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

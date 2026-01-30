'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/ron/admin/posts')
      } else {
        setError('סיסמא שגויה... 🔪 sus!')
      }
    } catch {
      setError('שגיאה בהתחברות')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-slate-800/70 rounded-3xl shadow-lg p-8 w-full max-w-md border border-cyan-500/30 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-cyan-400 text-center mb-6">
          🔐 כניסת צוות
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              קוד גישה
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-white focus:border-cyan-400 focus:outline-none transition-colors"
              placeholder="הכנס קוד גישה..."
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-red-500 to-cyan-500 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? '🔄 מאמת...' : '🚀 כניסה'}
          </button>
        </form>
      </div>
    </div>
  )
}

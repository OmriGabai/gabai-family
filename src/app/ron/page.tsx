import { PostCard } from '@/components/ron/PostCard'
import { getPosts } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function RonHomePage() {
  const posts = await getPosts('ron')

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center mb-12 p-8 rounded-3xl bg-gradient-to-r from-red-500/20 via-slate-800/50 to-cyan-500/20 border border-cyan-500/30 relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-2 right-4 text-3xl opacity-30">🚀</div>
        <div className="absolute bottom-2 left-4 text-2xl opacity-30">👨‍🚀</div>
        <div className="absolute top-4 left-1/4 text-xl opacity-20">⭐</div>
        <div className="absolute bottom-4 right-1/4 text-xl opacity-20">🛸</div>

        <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">
          שלום צוות! 🚀
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          אני רון, ואני Crewmate (או שאני? 🤔).
          באתר הזה אני משתף משימות, הרפתקאות בחלל, וחקירות מסתוריות.
          אל תסמכו על אף אחד! 👀
        </p>
      </section>

      {/* Posts Grid */}
      <section>
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <span>📋</span>
          <span>יומן משימות</span>
        </h3>

        <div className="space-y-6">
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12 text-slate-400 bg-slate-800/50 rounded-3xl border border-cyan-500/30">
            <p className="text-4xl mb-4">🛸</p>
            <p>אין משימות עדיין...</p>
            <p className="text-sm mt-2 text-cyan-400/50">. was ejected.</p>
          </div>
        )}
      </section>
    </div>
  )
}

import { PostCard } from '@/components/gili/PostCard'
import { getPosts } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function GiliHomePage() {
  const posts = await getPosts('gili')
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center mb-12 p-8 rounded-3xl bg-gradient-to-r from-gili-pink/20 via-gili-purple/20 to-gili-blue/20 relative overflow-hidden">
        {/* Hello Kitty decorations */}
        <div className="absolute top-2 right-4 text-3xl opacity-30">🎀</div>
        <div className="absolute bottom-2 left-4 text-2xl opacity-30">🎀</div>
        <div className="absolute top-4 left-1/4 text-xl opacity-20">🦋</div>
        <div className="absolute bottom-4 right-1/4 text-xl opacity-20">🦋</div>

        <h2 className="text-2xl md:text-3xl font-bold text-gili-purple mb-4">
          שלום וברוכים הבאים! 🎀
        </h2>
        <p className="text-lg text-slate-700 max-w-2xl mx-auto">
          אני גילי, בת 7, ואני בכיתה ב&apos;.
          אני אוהבת הלו קיטי, פרפרים וקשתות! 🌈
          פה אני אשתף אתכם ביצירות שלי, בסיפורים ובהרפתקאות.
          תהנו! 🦋✨
        </p>
      </section>

      {/* Posts Grid */}
      <section>
        <h3 className="text-xl font-bold text-gili-purple mb-6 flex items-center gap-2">
          <span>📝</span>
          <span>הפוסטים שלי</span>
        </h3>

        <div className="space-y-6">
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p className="text-4xl mb-4">🦋</p>
            <p>עוד אין פוסטים... בקרוב!</p>
          </div>
        )}
      </section>
    </div>
  )
}

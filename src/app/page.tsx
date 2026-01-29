import Link from 'next/link'

const familyMembers = [
  {
    name: 'גילי',
    slug: 'gili',
    title: 'העולם המופלא של גילי',
    emoji: '🦋',
    color: 'from-pink-400 to-purple-500',
    available: true,
  },
  {
    name: 'רון',
    slug: 'ron',
    title: 'בקרוב...',
    emoji: '🚀',
    color: 'from-blue-400 to-cyan-500',
    available: false,
  },
  {
    name: 'יאנה',
    slug: 'yana',
    title: 'בקרוב...',
    emoji: '🌸',
    color: 'from-rose-400 to-pink-500',
    available: false,
  },
  {
    name: 'עומרי',
    slug: 'omri',
    title: 'בקרוב...',
    emoji: '💻',
    color: 'from-emerald-400 to-teal-500',
    available: false,
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            משפחת גבאי
          </h1>
          <p className="text-xl text-slate-600">
            ברוכים הבאים לאתר המשפחה שלנו
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {familyMembers.map((member) => (
            <div key={member.slug} className="relative">
              {member.available ? (
                <Link href={`/${member.slug}`}>
                  <div className={`
                    p-8 rounded-3xl bg-gradient-to-br ${member.color}
                    text-white shadow-lg hover:shadow-xl
                    transform hover:scale-105 transition-all duration-300
                    cursor-pointer
                  `}>
                    <span className="text-5xl mb-4 block">{member.emoji}</span>
                    <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
                    <p className="text-white/90">{member.title}</p>
                  </div>
                </Link>
              ) : (
                <div className={`
                  p-8 rounded-3xl bg-gradient-to-br ${member.color}
                  text-white shadow-lg opacity-50
                `}>
                  <span className="text-5xl mb-4 block">{member.emoji}</span>
                  <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
                  <p className="text-white/90">{member.title}</p>
                  <span className="absolute top-4 left-4 bg-white/20 px-3 py-1 rounded-full text-sm">
                    בקרוב
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

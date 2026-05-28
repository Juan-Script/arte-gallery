export const dynamic = 'force-dynamic'

import PublicLayout from '@/components/PublicLayout'
import { prisma } from '@/lib/db'
import { TimelineEntry } from '@/lib/types'

export default async function BiografiaPage() {
  const bio = await prisma.biography.findFirst()
  const timeline = await prisma.timelineEntry.findMany({ orderBy: { order: 'asc' } })

  const paragraphs = bio?.body.split('\n\n').filter(Boolean) ?? []

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1400&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pb-10 md:pb-16 w-full">
          <h1 className="font-serif text-4xl md:text-7xl text-white">Biografía</h1>
        </div>
      </section>

      {/* Bio texto */}
      {paragraphs.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 md:px-8 py-14 md:py-20">
          <div className="space-y-6 text-stone-600 text-sm leading-loose">
            {paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
          </div>
        </section>
      )}

      {/* Timeline */}
      {timeline.length > 0 && (
        <section className="bg-stone-100 py-14 md:py-20 px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-xl md:text-2xl text-stone-900 mb-8 md:mb-12">Cronología</h2>
            <div>
              {timeline.map((entry: TimelineEntry, i: number) => (
                <div
                  key={entry.id}
                  className={`flex gap-6 md:gap-8 py-4 md:py-5 ${i < timeline.length - 1 ? 'border-b border-stone-200' : ''}`}
                >
                  <span className="text-xs tracking-widest text-stone-400 w-10 md:w-12 flex-shrink-0 pt-0.5">{entry.year}</span>
                  <span className="text-sm text-stone-700">{entry.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  )
}

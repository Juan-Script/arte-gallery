export const dynamic = 'force-dynamic'

import Image from 'next/image'
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
      <section className="relative h-[60vh] overflow-hidden flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1400&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-16 w-full">
          <h1 className="font-serif text-5xl md:text-7xl text-white">Elena Vidal</h1>
          <p className="text-stone-300 text-sm tracking-widest uppercase mt-2">Nació en Madrid, 1940</p>
        </div>
      </section>

      {/* Bio texto */}
      <section className="max-w-4xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
          <div className="space-y-6">
            {[
              { label: 'Nacimiento', value: 'Madrid, 1940' },
              { label: 'Formación', value: 'E. Bellas Artes de San Fernando, Madrid\nAcadémie des Beaux-Arts, París' },
              { label: 'Premios', value: 'Premio Nacional de Artes Plásticas 2024\nPremio Velázquez 2009\nBeca Guggenheim 1970' },
              { label: 'Colecciones', value: 'MoMA, Nueva York\nMuseo Reina Sofía, Madrid\nCentre Pompidou, París\nTate Modern, Londres' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-1">{label}</p>
                {value.split('\n').map((line, i) => (
                  <p key={i} className="text-sm text-stone-700">{line}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="space-y-6 text-stone-600 text-sm leading-loose">
            {paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-stone-100 py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl text-stone-900 mb-12">Cronología</h2>
          <div>
            {timeline.map((entry: TimelineEntry, i: number) => (
              <div
                key={entry.id}
                className={`flex gap-8 py-5 ${i < timeline.length - 1 ? 'border-b border-stone-200' : ''}`}
              >
                <span className="text-xs tracking-widest text-stone-400 w-12 flex-shrink-0 pt-0.5">{entry.year}</span>
                <span className="text-sm text-stone-700">{entry.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

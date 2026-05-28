export const dynamic = 'force-dynamic'

import Image from 'next/image'
import Link from 'next/link'
import PublicLayout from '@/components/PublicLayout'
import { prisma } from '@/lib/db'
import { Artwork } from '@/lib/types'

const decades = [1960, 1970, 1980, 1990]

export default async function ObrasPage({
  params,
}: {
  params: { decade?: string[] }
}) {
  const decade = params.decade ? parseInt(params.decade[0]) : null

  const artworks = await prisma.artwork.findMany({
    where: decade ? { decade } : undefined,
    orderBy: [{ decade: 'asc' }, { order: 'asc' }, { year: 'asc' }],
  })

  const grouped = decades.reduce<Record<number, typeof artworks>>((acc, d) => {
    const items = artworks.filter((a: Artwork) => a.decade === d)
    if (items.length) acc[d] = items
    return acc
  }, {})

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="mb-14">
          <h1 className="font-serif text-4xl text-stone-900 mb-6">Obras</h1>
          <div className="flex items-center gap-8 border-b border-stone-200">
            <Link
              href="/obras"
              className={`pb-3 text-xs tracking-[0.2em] uppercase transition-colors border-b-2 -mb-px ${
                !decade ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Todas
            </Link>
            {decades.map(d => (
              <Link
                key={d}
                href={`/obras/${d}`}
                className={`pb-3 text-xs tracking-[0.2em] uppercase transition-colors border-b-2 -mb-px ${
                  decade === d ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                {d}s
              </Link>
            ))}
          </div>
        </div>

        {decade ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {artworks.map((artwork: Artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="space-y-20">
            {decades.map(d =>
              grouped[d] ? (
                <section key={d}>
                  <h2 className="font-serif text-2xl text-stone-900 mb-8 flex items-center gap-4">
                    {d}s <span className="flex-1 h-px bg-stone-200" />
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {grouped[d].map((artwork: Artwork) => (
                      <ArtworkCard key={artwork.id} artwork={artwork} />
                    ))}
                  </div>
                </section>
              ) : null
            )}
          </div>
        )}
      </div>
    </PublicLayout>
  )
}

function ArtworkCard({ artwork }: { artwork: { id: string; title: string; year: number; technique: string; dimensions: string; image: string } }) {
  return (
    <div className="group">
      <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-3 relative">
        <Image
          src={artwork.image}
          alt={artwork.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <p className="font-serif text-sm text-stone-900 leading-snug">{artwork.title}</p>
      <p className="text-xs text-stone-400 mt-0.5">{artwork.dimensions}</p>
      <p className="text-xs text-stone-400">{artwork.technique}</p>
      <p className="text-xs text-stone-400">{artwork.year}</p>
    </div>
  )
}

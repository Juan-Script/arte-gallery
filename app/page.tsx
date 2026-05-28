export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import PublicLayout from '@/components/PublicLayout'
import { prisma } from '@/lib/db'
import { Artwork, NewsItem } from '@/lib/types'

export default async function HomePage() {
  const [artworks, news] = await Promise.all([
    prisma.artwork.findMany({ orderBy: [{ decade: 'asc' }, { order: 'asc' }], take: 3 }),
    prisma.newsItem.findMany({ orderBy: { date: 'desc' }, take: 2 }),
  ])

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1600&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pb-12 md:pb-20 w-full">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-300 mb-3 md:mb-4">Obra 1962–1999</p>
          <h1 className="font-serif text-5xl md:text-8xl text-white leading-none mb-4 md:mb-6">Art Gallery</h1>
          <p className="text-stone-300 text-sm tracking-wide max-w-md leading-relaxed">
            Cinco décadas de pintura abstracta. Una voz singular en el arte español contemporáneo.
          </p>
        </div>
      </section>

      {/* Obras destacadas */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="flex items-baseline justify-between mb-8 md:mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-stone-900">Obras recientes</h2>
          <Link href="/obras" className="text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-stone-900 transition-colors">
            Ver todas →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {artworks.map((artwork: Artwork) => (
            <Link key={artwork.id} href="/obras" className="group">
              <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-4 relative">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="font-serif text-base text-stone-900">{artwork.title}</p>
              <p className="text-xs text-stone-400 mt-1">{artwork.year} · {artwork.technique}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-8"><hr className="border-stone-200" /></div>

      {/* Noticias */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="flex items-baseline justify-between mb-8 md:mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-stone-900">Noticias</h2>
          <Link href="/noticias" className="text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-stone-900 transition-colors">
            Ver todas →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {news.map((item: NewsItem) => (
            <article key={item.id} className="group">
              {item.image && (
                <div className="aspect-video overflow-hidden bg-stone-100 mb-5 relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-2">
                {item.category} · {new Date(item.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
              </p>
              <h3 className="font-serif text-xl text-stone-900 leading-snug mb-2">{item.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="bg-stone-900 py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-xl md:text-3xl text-stone-100 leading-relaxed italic">
            "Pintar es una forma de callar el mundo para poder escucharlo."
          </p>
          <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mt-6">Art Gallery, 1988</p>
        </div>
      </section>
    </PublicLayout>
  )
}

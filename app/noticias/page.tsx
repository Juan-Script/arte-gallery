export const dynamic = 'force-dynamic'

import Image from 'next/image'
import PublicLayout from '@/components/PublicLayout'
import { prisma } from '@/lib/db'
import { NewsItem } from '@/lib/types'

export default async function NoticiasPage() {
  const news = await prisma.newsItem.findMany({ orderBy: { date: 'desc' } })

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h1 className="font-serif text-4xl text-stone-900 mb-14">Noticias</h1>
        <div className="space-y-0">
          {news.map((item: NewsItem, i: number) => (
            <article
              key={item.id}
              className={`grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 py-12 ${
                i < news.length - 1 ? 'border-b border-stone-200' : ''
              }`}
            >
              {item.image && (
                <div className="aspect-video overflow-hidden bg-stone-100 relative">
                  <Image src={item.image} alt={item.title} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              )}
              <div className="flex flex-col justify-center">
                <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-3">
                  {item.category} · {new Date(item.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h2 className="font-serif text-2xl text-stone-900 leading-snug mb-4">{item.title}</h2>
                <p className="text-sm text-stone-500 leading-relaxed">{item.excerpt}</p>
                <p className="text-sm text-stone-600 leading-relaxed mt-4">{item.content}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}

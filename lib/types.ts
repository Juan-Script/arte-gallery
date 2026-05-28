// Tipos compartidos que reflejan el schema de Prisma
// Se usan en Client Components donde @prisma/client no está disponible en build sin DB

export type Artwork = {
  id: string
  title: string
  year: number
  decade: number
  technique: string
  dimensions: string
  image: string
  description: string | null
  order: number
  createdAt: Date
  updatedAt: Date
}

export type NewsItem = {
  id: string
  title: string
  date: Date
  category: string
  excerpt: string
  content: string
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export type Biography = {
  id: string
  body: string
  updatedAt: Date
}

export type TimelineEntry = {
  id: string
  year: string
  text: string
  order: number
}

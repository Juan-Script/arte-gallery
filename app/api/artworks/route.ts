import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const decade = searchParams.get('decade')

  const artworks = await prisma.artwork.findMany({
    where: decade ? { decade: parseInt(decade) } : undefined,
    orderBy: [{ decade: 'asc' }, { order: 'asc' }, { year: 'asc' }],
  })

  return NextResponse.json(artworks)
}

export async function POST(req: Request) {
  const body = await req.json()
  const decade = Math.floor(body.year / 10) * 10

  const artwork = await prisma.artwork.create({
    data: { ...body, decade },
  })

  return NextResponse.json(artwork, { status: 201 })
}

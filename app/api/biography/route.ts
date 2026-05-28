export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const bio = await prisma.biography.findFirst()
  const timeline = await prisma.timelineEntry.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json({ bio, timeline })
}

export async function PUT(req: Request) {
  const { body } = await req.json()
  const existing = await prisma.biography.findFirst()

  const bio = existing
    ? await prisma.biography.update({ where: { id: existing.id }, data: { body } })
    : await prisma.biography.create({ data: { body } })

  return NextResponse.json(bio)
}

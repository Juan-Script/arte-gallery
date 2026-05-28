import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  const { entries } = await req.json()

  await prisma.timelineEntry.deleteMany()
  const created = await prisma.timelineEntry.createMany({ data: entries })

  return NextResponse.json(created)
}

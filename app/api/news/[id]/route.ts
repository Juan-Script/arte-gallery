import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  const item = await prisma.newsItem.update({
    where: { id: params.id },
    data: { ...body, date: new Date(body.date) },
  })
  return NextResponse.json(item)
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.newsItem.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}

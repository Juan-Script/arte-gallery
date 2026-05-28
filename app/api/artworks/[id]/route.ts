import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  const decade = Math.floor(body.year / 10) * 10

  const artwork = await prisma.artwork.update({
    where: { id: params.id },
    data: { ...body, decade },
  })

  return NextResponse.json(artwork)
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.artwork.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}

import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const news = await prisma.newsItem.findMany({
    orderBy: { date: 'desc' },
  })
  return NextResponse.json(news)
}

export async function POST(req: Request) {
  const body = await req.json()
  const item = await prisma.newsItem.create({
    data: { ...body, date: new Date(body.date) },
  })
  return NextResponse.json(item, { status: 201 })
}

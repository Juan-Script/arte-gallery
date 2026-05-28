export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import AdminBiografiaClient from './AdminBiografiaClient'

export default async function AdminBiografiaPage() {
  const bio = await prisma.biography.findFirst()
  const timeline = await prisma.timelineEntry.findMany({ orderBy: { order: 'asc' } })
  return <AdminBiografiaClient bio={bio} timeline={timeline} />
}

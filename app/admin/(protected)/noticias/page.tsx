export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import AdminNoticiasClient from './AdminNoticiasClient'

export default async function AdminNoticiasPage() {
  const news = await prisma.newsItem.findMany({ orderBy: { date: 'desc' } })
  return <AdminNoticiasClient news={news} />
}

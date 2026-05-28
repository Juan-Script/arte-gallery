export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/db'
import AdminObrasClient from './AdminObrasClient'

export default async function AdminObrasPage() {
  const artworks = await prisma.artwork.findMany({
    orderBy: [{ decade: 'asc' }, { order: 'asc' }],
  })
  return <AdminObrasClient artworks={artworks} />
}

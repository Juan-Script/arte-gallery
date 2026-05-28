'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createArtwork(formData: FormData) {
  const year = parseInt(formData.get('year') as string)
  await prisma.artwork.create({
    data: {
      title: formData.get('title') as string,
      year,
      decade: Math.floor(year / 10) * 10,
      technique: formData.get('technique') as string,
      dimensions: formData.get('dimensions') as string,
      image: formData.get('image') as string,
      description: (formData.get('description') as string) || undefined,
      order: parseInt((formData.get('order') as string) || '0'),
    },
  })
  revalidatePath('/obras')
  revalidatePath('/admin/obras')
}

export async function updateArtwork(id: string, formData: FormData) {
  const year = parseInt(formData.get('year') as string)
  await prisma.artwork.update({
    where: { id },
    data: {
      title: formData.get('title') as string,
      year,
      decade: Math.floor(year / 10) * 10,
      technique: formData.get('technique') as string,
      dimensions: formData.get('dimensions') as string,
      image: formData.get('image') as string,
      description: (formData.get('description') as string) || undefined,
      order: parseInt((formData.get('order') as string) || '0'),
    },
  })
  revalidatePath('/obras')
  revalidatePath('/admin/obras')
}

export async function deleteArtwork(id: string) {
  await prisma.artwork.delete({ where: { id } })
  revalidatePath('/obras')
  revalidatePath('/admin/obras')
}

export async function createNews(formData: FormData) {
  await prisma.newsItem.create({
    data: {
      title: formData.get('title') as string,
      date: new Date(formData.get('date') as string),
      category: formData.get('category') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      image: (formData.get('image') as string) || undefined,
    },
  })
  revalidatePath('/noticias')
  revalidatePath('/admin/noticias')
}

export async function updateNews(id: string, formData: FormData) {
  await prisma.newsItem.update({
    where: { id },
    data: {
      title: formData.get('title') as string,
      date: new Date(formData.get('date') as string),
      category: formData.get('category') as string,
      excerpt: formData.get('excerpt') as string,
      content: formData.get('content') as string,
      image: (formData.get('image') as string) || undefined,
    },
  })
  revalidatePath('/noticias')
  revalidatePath('/admin/noticias')
}

export async function deleteNews(id: string) {
  await prisma.newsItem.delete({ where: { id } })
  revalidatePath('/noticias')
  revalidatePath('/admin/noticias')
}

export async function updateBiography(formData: FormData) {
  const body = formData.get('body') as string
  const existing = await prisma.biography.findFirst()
  if (existing) {
    await prisma.biography.update({ where: { id: existing.id }, data: { body } })
  } else {
    await prisma.biography.create({ data: { body } })
  }
  revalidatePath('/biografia')
  revalidatePath('/admin/biografia')
}

export async function updateTimeline(entries: { year: string; text: string; order: number }[]) {
  await prisma.timelineEntry.deleteMany()
  await prisma.timelineEntry.createMany({ data: entries })
  revalidatePath('/biografia')
  revalidatePath('/admin/biografia')
}

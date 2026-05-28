'use client'

import { useState, useTransition } from 'react'
import { NewsItem } from '@/lib/types'
import { createNews, updateNews, deleteNews } from '@/lib/actions'

type NewsForm = {
  id?: string
  title: string
  date: string
  category: string
  excerpt: string
  content: string
  image: string
}

const emptyForm = (): NewsForm => ({
  title: '',
  date: new Date().toISOString().split('T')[0],
  category: '',
  excerpt: '',
  content: '',
  image: '',
})

export default function AdminNoticiasClient({ news }: { news: NewsItem[] }) {
  const [editing, setEditing] = useState<NewsForm | null>(null)
  const [isPending, startTransition] = useTransition()

  const openNew = () => setEditing(emptyForm())
  const openEdit = (n: NewsItem) => setEditing({
    id: n.id,
    title: n.title,
    date: new Date(n.date).toISOString().split('T')[0],
    category: n.category,
    excerpt: n.excerpt,
    content: n.content,
    image: n.image ?? '',
  })

  const handleSave = (formData: FormData) => {
    startTransition(async () => {
      if (editing?.id) {
        await updateNews(editing.id, formData)
      } else {
        await createNews(formData)
      }
      setEditing(null)
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('¿Eliminar esta noticia?')) return
    startTransition(() => deleteNews(id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl text-stone-900">Noticias</h2>
        <button onClick={openNew} className="btn-primary">+ Nueva noticia</button>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-8 py-6 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-serif text-lg">{editing.id ? 'Editar noticia' : 'Nueva noticia'}</h3>
              <button onClick={() => setEditing(null)} className="text-stone-400 hover:text-stone-900 text-2xl leading-none">×</button>
            </div>
            <form action={handleSave}>
              <div className="px-8 py-6 space-y-4">
                {[
                  { label: 'Título', name: 'title', type: 'text', defaultValue: editing.title },
                  { label: 'Fecha', name: 'date', type: 'date', defaultValue: editing.date },
                  { label: 'Categoría', name: 'category', type: 'text', defaultValue: editing.category },
                  { label: 'URL imagen', name: 'image', type: 'text', defaultValue: editing.image },
                ].map(f => (
                  <div key={f.name}>
                    <label className="admin-label">{f.label}</label>
                    <input type={f.type} name={f.name} defaultValue={f.defaultValue} className="admin-input" />
                  </div>
                ))}
                {[
                  { label: 'Extracto', name: 'excerpt', defaultValue: editing.excerpt },
                  { label: 'Contenido', name: 'content', defaultValue: editing.content },
                ].map(f => (
                  <div key={f.name}>
                    <label className="admin-label">{f.label}</label>
                    <textarea name={f.name} defaultValue={f.defaultValue} rows={4} className="admin-input resize-y" />
                  </div>
                ))}
              </div>
              <div className="px-8 py-6 border-t border-stone-200 flex gap-3 justify-end">
                <button type="button" onClick={() => setEditing(null)} className="btn-secondary">Cancelar</button>
                <button type="submit" disabled={isPending} className="btn-primary">
                  {isPending ? 'Guardando…' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white border border-stone-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200">
              {['Título', 'Categoría', 'Fecha', ''].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-stone-400 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {news.map((item, i) => (
              <tr key={item.id} className={`${i < news.length - 1 ? 'border-b border-stone-100' : ''} hover:bg-stone-50`}>
                <td className="px-5 py-4 font-medium text-stone-900">{item.title}</td>
                <td className="px-5 py-4 text-stone-500">{item.category}</td>
                <td className="px-5 py-4 text-stone-500">
                  {new Date(item.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-3 justify-end">
                    <button onClick={() => openEdit(item)} className="text-xs text-stone-400 hover:text-stone-900 transition-colors">Editar</button>
                    <button onClick={() => handleDelete(item.id)} className="text-xs text-red-400 hover:text-red-700 transition-colors">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

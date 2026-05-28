'use client'

import { useState, useTransition } from 'react'
import { Artwork } from '@/lib/types'
import { createArtwork, updateArtwork, deleteArtwork } from '@/lib/actions'

type ArtworkForm = Omit<Artwork, 'id' | 'createdAt' | 'updatedAt' | 'decade'>

const emptyForm = (): ArtworkForm => ({
  title: '',
  year: 1980,
  technique: '',
  dimensions: '',
  image: '',
  description: '',
  order: 0,
})

const fields: { label: string; key: keyof ArtworkForm; type: string }[] = [
  { label: 'Título', key: 'title', type: 'text' },
  { label: 'Año', key: 'year', type: 'number' },
  { label: 'Técnica', key: 'technique', type: 'text' },
  { label: 'Medidas', key: 'dimensions', type: 'text' },
  { label: 'URL imagen', key: 'image', type: 'text' },
  { label: 'Descripción', key: 'description', type: 'text' },
  { label: 'Orden', key: 'order', type: 'number' },
]

export default function AdminObrasClient({ artworks }: { artworks: Artwork[] }) {
  const [editing, setEditing] = useState<(ArtworkForm & { id?: string }) | null>(null)
  const [isPending, startTransition] = useTransition()

  const openNew = () => setEditing(emptyForm())
  const openEdit = (a: Artwork) => setEditing({
    id: a.id,
    title: a.title,
    year: a.year,
    technique: a.technique,
    dimensions: a.dimensions,
    image: a.image,
    description: a.description ?? '',
    order: a.order,
  })

  const handleSave = (formData: FormData) => {
    startTransition(async () => {
      if (editing?.id) {
        await updateArtwork(editing.id, formData)
      } else {
        await createArtwork(formData)
      }
      setEditing(null)
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm('¿Eliminar esta obra?')) return
    startTransition(() => deleteArtwork(id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl text-stone-900">Obras</h2>
        <button onClick={openNew} className="btn-primary">+ Nueva obra</button>
      </div>

      {/* Modal */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-8 py-6 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-serif text-lg">{editing.id ? 'Editar obra' : 'Nueva obra'}</h3>
              <button onClick={() => setEditing(null)} className="text-stone-400 hover:text-stone-900 text-2xl leading-none">×</button>
            </div>
            <form action={handleSave}>
              <div className="px-8 py-6 space-y-4">
                {fields.map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="admin-label">{label}</label>
                    <input
                      type={type}
                      name={key}
                      defaultValue={String(editing[key] ?? '')}
                      className="admin-input"
                    />
                  </div>
                ))}
                {editing.image && (
                  <div className="aspect-video bg-stone-100 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={editing.image} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
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

      {/* Table */}
      <div className="bg-white border border-stone-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200">
              {['Obra', 'Año', 'Técnica', 'Medidas', ''].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs tracking-[0.15em] uppercase text-stone-400 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork, i) => (
              <tr key={artwork.id} className={`${i < artworks.length - 1 ? 'border-b border-stone-100' : ''} hover:bg-stone-50`}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-stone-100 flex-shrink-0 overflow-hidden relative">
                      {artwork.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={artwork.image} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <span className="font-medium text-stone-900">{artwork.title}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-stone-500">{artwork.year}</td>
                <td className="px-5 py-4 text-stone-500">{artwork.technique}</td>
                <td className="px-5 py-4 text-stone-500">{artwork.dimensions}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-3 justify-end">
                    <button onClick={() => openEdit(artwork)} className="text-xs text-stone-400 hover:text-stone-900 transition-colors">Editar</button>
                    <button onClick={() => handleDelete(artwork.id)} className="text-xs text-red-400 hover:text-red-700 transition-colors">Eliminar</button>
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

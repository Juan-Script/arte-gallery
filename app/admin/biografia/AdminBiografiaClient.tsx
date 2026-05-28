'use client'

import { useState, useTransition } from 'react'
import { Biography, TimelineEntry } from '@/lib/types'
import { updateBiography, updateTimeline } from '@/lib/actions'

export default function AdminBiografiaClient({
  bio,
  timeline,
}: {
  bio: Biography | null
  timeline: TimelineEntry[]
}) {
  const [entries, setEntries] = useState(
    timeline.map(t => ({ id: t.id, year: t.year, text: t.text, order: t.order }))
  )
  const [isPendingBio, startBio] = useTransition()
  const [isPendingTimeline, startTimeline] = useTransition()
  const [saved, setSaved] = useState(false)

  const addEntry = () =>
    setEntries(prev => [...prev, { id: Date.now().toString(), year: '', text: '', order: prev.length + 1 }])

  const removeEntry = (idx: number) =>
    setEntries(prev => prev.filter((_, i) => i !== idx))

  const handleEntry = (idx: number, field: 'year' | 'text', value: string) =>
    setEntries(prev => prev.map((e, i) => i === idx ? { ...e, [field]: value } : e))

  const handleSaveBio = (formData: FormData) => {
    startBio(async () => {
      await updateBiography(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    })
  }

  const handleSaveTimeline = () => {
    startTimeline(async () => {
      await updateTimeline(entries.map((e, i) => ({ year: e.year, text: e.text, order: i + 1 })))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    })
  }

  return (
    <div className="space-y-14">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-stone-900">Biografía</h2>
        {saved && <span className="text-xs text-green-600 tracking-widest uppercase">Guardado</span>}
      </div>

      {/* Bio text */}
      <section>
        <h3 className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4 pb-2 border-b border-stone-200">
          Texto biográfico
        </h3>
        <form action={handleSaveBio} className="space-y-4">
          <div>
            <label className="admin-label">
              Texto (párrafos separados por línea en blanco)
            </label>
            <textarea
              name="body"
              defaultValue={bio?.body ?? ''}
              rows={14}
              className="admin-input resize-y font-mono text-xs leading-relaxed"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={isPendingBio} className="btn-primary">
              {isPendingBio ? 'Guardando…' : 'Guardar texto'}
            </button>
          </div>
        </form>
      </section>

      {/* Timeline */}
      <section>
        <h3 className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4 pb-2 border-b border-stone-200">
          Cronología
        </h3>
        <div className="space-y-3 mb-6">
          {entries.map((entry, i) => (
            <div key={entry.id} className="flex gap-3 items-start">
              <input
                type="text"
                value={entry.year}
                onChange={e => handleEntry(i, 'year', e.target.value)}
                placeholder="Año"
                className="admin-input w-20 flex-shrink-0"
              />
              <input
                type="text"
                value={entry.text}
                onChange={e => handleEntry(i, 'text', e.target.value)}
                placeholder="Descripción"
                className="admin-input flex-1"
              />
              <button
                type="button"
                onClick={() => removeEntry(i)}
                className="text-stone-300 hover:text-red-500 transition-colors text-lg leading-none pt-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button type="button" onClick={addEntry} className="btn-secondary">
            + Añadir entrada
          </button>
          <button type="button" onClick={handleSaveTimeline} disabled={isPendingTimeline} className="btn-primary">
            {isPendingTimeline ? 'Guardando…' : 'Guardar cronología'}
          </button>
        </div>
      </section>
    </div>
  )
}

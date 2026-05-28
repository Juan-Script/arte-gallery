import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-stone-900 text-stone-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg">Elena Vidal</span>
          <span className="text-stone-500 text-xs tracking-widest uppercase">/ Admin</span>
        </div>
        <Link href="/" className="text-xs tracking-[0.15em] uppercase text-stone-400 hover:text-white transition-colors">
          ← Ver web
        </Link>
      </header>

      <div className="bg-white border-b border-stone-200 px-8">
        <nav className="flex gap-0 max-w-6xl mx-auto">
          {[
            { href: '/admin/obras', label: 'Obras' },
            { href: '/admin/noticias', label: 'Noticias' },
            { href: '/admin/biografia', label: 'Biografía' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-6 py-4 text-xs tracking-[0.2em] uppercase text-stone-400 hover:text-stone-900 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">
        {children}
      </div>
    </div>
  )
}

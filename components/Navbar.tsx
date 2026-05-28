'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const decades = [1960, 1970, 1980, 1990]

export default function Navbar() {
  const [obrasOpen, setObrasOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-lg tracking-wide text-stone-900" onClick={closeMenu}>
          Art Gallery
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'text-stone-900' : ''}`}>
            Inicio
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setObrasOpen(true)}
            onMouseLeave={() => setObrasOpen(false)}
          >
            <Link
              href="/obras"
              className={`nav-link ${pathname.startsWith('/obras') ? 'text-stone-900' : ''}`}
            >
              Obras
            </Link>

            {obrasOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                <div className="bg-stone-50 border border-stone-200 py-3 min-w-[120px] shadow-sm">
                  {decades.map(decade => (
                    <Link
                      key={decade}
                      href={`/obras/${decade}`}
                      className="block px-5 py-2 text-xs tracking-[0.15em] uppercase text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                    >
                      {decade}s
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/noticias" className={`nav-link ${pathname === '/noticias' ? 'text-stone-900' : ''}`}>
            Noticias
          </Link>

          <Link href="/biografia" className={`nav-link ${pathname === '/biografia' ? 'text-stone-900' : ''}`}>
            Biografía
          </Link>
        </nav>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Menú"
        >
          <span className={`block w-6 h-px bg-stone-900 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-stone-900 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-stone-900 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-stone-50 border-t border-stone-200 px-6 py-6 flex flex-col gap-0">
          <Link
            href="/"
            onClick={closeMenu}
            className={`py-4 border-b border-stone-100 text-xs tracking-[0.2em] uppercase font-medium ${pathname === '/' ? 'text-stone-900' : 'text-stone-500'}`}
          >
            Inicio
          </Link>

          <Link
            href="/obras"
            onClick={closeMenu}
            className={`py-4 border-b border-stone-100 text-xs tracking-[0.2em] uppercase font-medium ${pathname === '/obras' ? 'text-stone-900' : 'text-stone-500'}`}
          >
            Obras
          </Link>

          {/* Décadas en móvil */}
          <div className="pl-4 flex flex-col border-b border-stone-100">
            {decades.map(decade => (
              <Link
                key={decade}
                href={`/obras/${decade}`}
                onClick={closeMenu}
                className={`py-3 text-xs tracking-[0.15em] uppercase ${pathname === `/obras/${decade}` ? 'text-stone-900' : 'text-stone-400'}`}
              >
                {decade}s
              </Link>
            ))}
          </div>

          <Link
            href="/noticias"
            onClick={closeMenu}
            className={`py-4 border-b border-stone-100 text-xs tracking-[0.2em] uppercase font-medium ${pathname === '/noticias' ? 'text-stone-900' : 'text-stone-500'}`}
          >
            Noticias
          </Link>

          <Link
            href="/biografia"
            onClick={closeMenu}
            className={`py-4 text-xs tracking-[0.2em] uppercase font-medium ${pathname === '/biografia' ? 'text-stone-900' : 'text-stone-500'}`}
          >
            Biografía
          </Link>
        </div>
      )}
    </header>
  )
}

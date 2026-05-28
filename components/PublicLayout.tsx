import Navbar from '@/components/Navbar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <footer className="border-t border-stone-200 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between text-xs tracking-widest uppercase text-stone-400">
          <span>Art Gallery</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}

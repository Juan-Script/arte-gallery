import { login } from '@/lib/auth'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-serif text-2xl text-stone-900 mb-1">Art Gallery</h1>
          <p className="text-xs tracking-[0.2em] uppercase text-stone-400">Panel de administración</p>
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-stone-400 mb-1.5">
              Usuario
            </label>
            <input
              type="text"
              name="username"
              required
              autoComplete="username"
              className="w-full bg-white border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-stone-400 mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full bg-white border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-500 transition-colors"
            />
          </div>

          {searchParams.error && (
            <p className="text-xs text-red-500 tracking-wide">
              Usuario o contraseña incorrectos.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-stone-900 text-white text-xs tracking-[0.2em] uppercase py-3 hover:bg-stone-700 transition-colors mt-2"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

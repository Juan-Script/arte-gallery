'use server'

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'

export async function login(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  const validUser = process.env.ADMIN_USERNAME
  const validPass = process.env.ADMIN_PASSWORD

  if (username === validUser && password === validPass) {
    const session = await getSession()
    session.isLoggedIn = true
    await session.save()
    redirect('/admin/obras')
  }

  redirect('/admin/login?error=1')
}

export async function logout() {
  const session = await getSession()
  session.destroy()
  redirect('/admin/login')
}

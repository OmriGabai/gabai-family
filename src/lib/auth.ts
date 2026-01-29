import { cookies } from 'next/headers'

const ADMIN_COOKIE_NAME = 'gabai_admin_session'
const SESSION_DURATION = 60 * 60 * 24 * 7 // 7 days in seconds

export async function verifyPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not set')
    return false
  }
  return password === adminPassword
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies()
  const sessionToken = crypto.randomUUID()

  cookieStore.set(ADMIN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  })
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_COOKIE_NAME)
  return !!session?.value
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}

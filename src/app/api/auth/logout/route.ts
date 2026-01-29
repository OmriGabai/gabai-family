import { NextResponse } from 'next/server'
import { logout } from '@/lib/auth'

// POST /api/auth/logout
export async function POST() {
  try {
    await logout()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error logging out:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}

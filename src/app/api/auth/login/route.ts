import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, createSession } from '@/lib/auth'

// POST /api/auth/login
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }

    // Debug: check if env var exists
    const envExists = !!process.env.ADMIN_PASSWORD
    const envLength = process.env.ADMIN_PASSWORD?.length || 0
    console.log(`Debug: ADMIN_PASSWORD exists=${envExists}, length=${envLength}, input length=${password.length}`)

    const valid = await verifyPassword(password)

    if (!valid) {
      return NextResponse.json({
        error: 'Invalid password',
        debug: { envExists, envLength, inputLength: password.length }
      }, { status: 401 })
    }

    await createSession()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error logging in:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}

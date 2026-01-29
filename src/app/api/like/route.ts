import { NextRequest, NextResponse } from 'next/server'
import { addLike, getLikesCount } from '@/lib/db'

// POST /api/like
export async function POST(request: NextRequest) {
  try {
    const { postId, visitorId } = await request.json()

    if (!postId || !visitorId) {
      return NextResponse.json({ error: 'postId and visitorId required' }, { status: 400 })
    }

    await addLike(postId, visitorId)
    const count = await getLikesCount(postId)

    return NextResponse.json({ success: true, count })
  } catch (error) {
    console.error('Error adding like:', error)
    return NextResponse.json({ error: 'Failed to add like' }, { status: 500 })
  }
}

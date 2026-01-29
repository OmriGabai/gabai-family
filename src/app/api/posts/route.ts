import { NextRequest, NextResponse } from 'next/server'
import { getPosts, createPost } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'

// GET /api/posts?member=gili
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const member = searchParams.get('member')

  if (!member) {
    return NextResponse.json({ error: 'Member slug required' }, { status: 400 })
  }

  try {
    const posts = await getPosts(member)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

// POST /api/posts
export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { member, title, content, imageUrl } = await request.json()

    if (!member || !title) {
      return NextResponse.json({ error: 'Member and title required' }, { status: 400 })
    }

    const post = await createPost(member, title, content || '', imageUrl || null)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

import { sql } from '@vercel/postgres'

// Check if database is available
const hasDatabase = !!process.env.POSTGRES_URL

// Posts
export async function getPosts(memberSlug: string) {
  if (!hasDatabase) {
    console.log('No database connection - returning empty posts')
    return []
  }

  const { rows } = await sql`
    SELECT
      p.id,
      p.title,
      p.content,
      p.image_url,
      p.created_at,
      p.updated_at,
      COUNT(l.id) as likes_count
    FROM posts p
    LEFT JOIN likes l ON l.post_id = p.id
    JOIN family_members m ON m.id = p.member_id
    WHERE m.slug = ${memberSlug}
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `
  return rows
}

export async function getPost(id: number) {
  if (!hasDatabase) return null

  const { rows } = await sql`
    SELECT
      p.*,
      COUNT(l.id) as likes_count
    FROM posts p
    LEFT JOIN likes l ON l.post_id = p.id
    WHERE p.id = ${id}
    GROUP BY p.id
  `
  return rows[0] || null
}

export async function createPost(memberSlug: string, title: string, content: string, imageUrl: string | null) {
  if (!hasDatabase) return null

  const { rows } = await sql`
    INSERT INTO posts (member_id, title, content, image_url)
    SELECT id, ${title}, ${content}, ${imageUrl}
    FROM family_members
    WHERE slug = ${memberSlug}
    RETURNING *
  `
  return rows[0]
}

export async function updatePost(id: number, title: string, content: string, imageUrl: string | null) {
  if (!hasDatabase) return null

  const { rows } = await sql`
    UPDATE posts
    SET title = ${title}, content = ${content}, image_url = ${imageUrl}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0]
}

export async function deletePost(id: number) {
  if (!hasDatabase) return

  await sql`DELETE FROM posts WHERE id = ${id}`
}

// Likes
export async function addLike(postId: number, visitorId: string) {
  if (!hasDatabase) return false

  try {
    await sql`
      INSERT INTO likes (post_id, visitor_id)
      VALUES (${postId}, ${visitorId})
      ON CONFLICT (post_id, visitor_id) DO NOTHING
    `
    return true
  } catch {
    return false
  }
}

export async function getLikesCount(postId: number) {
  if (!hasDatabase) return 0

  const { rows } = await sql`
    SELECT COUNT(*) as count FROM likes WHERE post_id = ${postId}
  `
  return parseInt(rows[0].count)
}

// Family Members
export async function getMemberBySlug(slug: string) {
  if (!hasDatabase) return null

  const { rows } = await sql`
    SELECT * FROM family_members WHERE slug = ${slug}
  `
  return rows[0] || null
}

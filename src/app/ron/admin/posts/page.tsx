import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { AdminPostsClient } from './AdminPostsClient'

export default async function AdminPostsPage() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/ron/admin')
  }

  return <AdminPostsClient />
}

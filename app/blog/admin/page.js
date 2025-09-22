import { redirect } from 'next/navigation'

export default function BlogAdminRedirect() {
  // Server-side permanent redirect from /blog/admin to /discourses/admin
  redirect('/discourses/admin')
}

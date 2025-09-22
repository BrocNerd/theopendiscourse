import { redirect } from 'next/navigation'

export default function BlogRedirect() {
  // Permanent server-side redirect from /blog to /discourses
  redirect('/discourses')
}

import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect root to /en (default language)
  redirect('/en')
}

import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/login/actions'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
              <BookOpen className="w-6 h-6" />
              <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">DigitalBook</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/read/prelude" className="hidden sm:block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  Continue Reading
                </Link>
                <form action={logout}>
                  <button className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    Log out
                  </button>
                </form>
              </div>
            ) : (
              <Link href="/login" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

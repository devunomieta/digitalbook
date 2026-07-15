import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function ReadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 md:py-20 lg:py-24">
      {children}
    </div>
  )
}

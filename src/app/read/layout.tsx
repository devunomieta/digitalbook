import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import RulesPopup from '@/components/RulesPopup'
import ReadContainer from '@/components/ReadContainer'

export default async function ReadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signup')
  }

  // Update last_read_at to track when the user opened the website to read
  const { data: existingHistory } = await supabase
    .from('reading_history')
    .select('user_id')
    .eq('user_id', user.id)
    .single()

  if (existingHistory) {
    await supabase
      .from('reading_history')
      .update({ last_read_at: new Date().toISOString() })
      .eq('user_id', user.id)
  } else {
    await supabase
      .from('reading_history')
      .insert({ user_id: user.id, last_read_at: new Date().toISOString(), latest_chapter_unlocked: 0 })
  }

  return (
    <>
      <RulesPopup />
      <div className="flex-1 w-full relative bg-[#fdfbf7] dark:bg-[#121212] selection:bg-blue-200 dark:selection:bg-blue-900/50">
        {/* Subtle paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none mix-blend-multiply dark:mix-blend-overlay" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <ReadContainer>
            {children}
          </ReadContainer>
        </div>
      </div>
    </>
  )
}

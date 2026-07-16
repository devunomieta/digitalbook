import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import RulesPopup from '@/components/RulesPopup'
import ReadContainer from '@/components/ReadContainer'
import ChapterMenu from '@/components/ChapterMenu'
import LastSeenTracker from '@/components/LastSeenTracker'

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

  let latestChapter = 0
  let currentChapter = 0
  const { data: existingHistory } = await supabase
    .from('reading_history')
    .select('latest_chapter_unlocked')
    .eq('user_id', user.id)
    .single()

  if (existingHistory) {
    latestChapter = existingHistory.latest_chapter_unlocked
    currentChapter = user.user_metadata?.current_chapter ?? latestChapter
  } else {
    currentChapter = user.user_metadata?.current_chapter ?? 0
    await supabase
      .from('reading_history')
      .insert({ user_id: user.id, last_read_at: new Date().toISOString(), latest_chapter_unlocked: 0 })
  }

  return (
    <>
      <RulesPopup />
      <LastSeenTracker />
      <div className="flex-1 w-full relative bg-[#fdfbf7] dark:bg-[#121212] selection:bg-blue-200 dark:selection:bg-blue-900/50">
        {/* Subtle paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none mix-blend-multiply dark:mix-blend-overlay" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
        
        <div className="flex flex-col relative z-10 min-h-screen">
          <ChapterMenu latestChapter={latestChapter} currentChapter={currentChapter} />
          
          <main className="flex-1 px-6 py-12 md:py-16 w-full">
            <div className="max-w-4xl mx-auto w-full">
              <ReadContainer>
                {children}
              </ReadContainer>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

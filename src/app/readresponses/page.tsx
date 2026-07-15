import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ResponsesManager, { Comment } from '@/components/ResponsesManager'

export const metadata = {
  title: 'Responses Dashboard | DigitalBook',
}

export default async function ReadResponsesPage({
  searchParams,
}: {
  searchParams: Promise<{ chapter?: string }>
}) {
  const supabase = await createClient()

  // Verify authentication
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Fetch all comments
  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="min-h-screen p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error loading responses</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{error.message}</p>
      </div>
    )
  }

  // Group comments by chapter
  const groupedComments: Record<number, Comment[]> = {}
  if (comments) {
    comments.forEach((comment) => {
      const chapterId = comment.chapter_id
      if (!groupedComments[chapterId]) {
        groupedComments[chapterId] = []
      }
      groupedComments[chapterId].push(comment)
    })
  }

  const chapterTitles: Record<number, string> = {
    0: 'Prelude: The Root Directory',
    1: 'Chapter 1: AMARA — The First Syntax',
    2: 'Chapter 2: TINUADE — The Legacy Code',
    3: 'Chapter 3: ZAINAB — The Stateless Protocol',
    4: 'Chapter 4: DAMILOLA — The Deadlock',
    5: 'Chapter 5: NNEKA — The Garbage Collector',
    6: 'Chapter 6: TOLANI — The Asymmetric Risk',
    7: 'Chapter 7: ADANNA — The Ephemeral Socket',
    8: 'Chapter 8: FUNMILAYO — The Hybrid State',
    9: 'Chapter 9: ONOME — The Rollback Exception',
    10: 'Chapter 10: YEJIDE — The Steady Light',
  }

  // Default to prelude (0) or first available chapter
  const params = await searchParams;
  const activeChapterStr = params.chapter
  const allChapters = Object.keys(groupedComments).map(Number).sort((a, b) => a - b)
  
  let activeChapter = activeChapterStr ? parseInt(activeChapterStr, 10) : (allChapters.length > 0 ? allChapters[0] : 0)

  // Ensure active chapter is valid, else fallback
  if (!allChapters.includes(activeChapter) && allChapters.length > 0) {
    activeChapter = allChapters[0]
  }

  const activeComments = groupedComments[activeChapter] || []

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100">
              Reader Responses
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              A backend dashboard to review the verdicts left by your readers.
            </p>
          </div>
          <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-lg">
            Total Responses: {comments?.length || 0}
          </div>
        </header>

        {allChapters.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-zinc-600 dark:text-zinc-400">No responses yet.</h3>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Navigation */}
            <nav className="lg:w-1/4 shrink-0">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4 px-2">Chapters</h3>
              <div className="flex flex-col space-y-1">
                {allChapters.map((chapterId) => {
                  const isActive = chapterId === activeChapter
                  const count = groupedComments[chapterId].length
                  return (
                    <Link
                      key={chapterId}
                      href={`/readresponses?chapter=${chapterId}`}
                      className={`px-4 py-3 rounded-lg text-sm transition-all duration-200 flex justify-between items-center min-w-0 ${
                        isActive 
                          ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-600/20' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800/50'
                      }`}
                    >
                      <span className="truncate pr-4 flex-1 min-w-0">{chapterTitles[chapterId] || `Chapter ${chapterId}`}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                        isActive ? 'bg-blue-500/50 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                      }`}>
                        {count}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </nav>

            {/* Content Area */}
            <main className="lg:w-3/4">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                  {chapterTitles[activeChapter] || `Chapter ${activeChapter}`}
                </h2>
              </div>

              <ResponsesManager comments={activeComments} />
            </main>
          </div>
        )}
      </div>
    </div>
  )
}

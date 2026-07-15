import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Users Dashboard | DigitalBook',
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

// Helper for formatting time relatively
function timeAgo(dateParam: string | Date | null | undefined): string {
  if (!dateParam) return 'Never'

  const date = typeof dateParam === 'string' ? new Date(dateParam) : dateParam
  const now = new Date()
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000)
  const minutes = Math.round(seconds / 60)
  const hours = Math.round(minutes / 60)
  const days = Math.round(hours / 24)

  if (seconds < 60) return 'Just now'
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`
  
  return date.toLocaleDateString()
}

export default async function ViewUsersPage() {
  const supabase = await createClient()

  // Verify authentication
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  if (!currentUser) {
    redirect('/login')
  }

  // Fetch all users using admin client
  const adminClient = await createAdminClient()
  const { data: usersData, error: usersError } = await adminClient.auth.admin.listUsers()

  if (usersError) {
    return (
      <div className="min-h-screen p-8 text-center bg-zinc-50 dark:bg-zinc-950">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error loading users</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{usersError.message}</p>
        <p className="text-sm mt-4 text-zinc-500">Ensure SUPABASE_SERVICE_ROLE_KEY is set correctly.</p>
      </div>
    )
  }

  const users = usersData?.users || []

  // Fetch all reading histories
  const { data: histories, error: historyError } = await adminClient
    .from('reading_history')
    .select('*')

  if (historyError) {
    console.error("Error fetching reading history:", historyError)
  }

  const historyMap = new Map()
  if (histories) {
    for (const h of histories) {
      historyMap.set(h.user_id, h)
    }
  }

  // Merge data
  const mergedUsers = users.map(u => {
    const history = historyMap.get(u.id)
    return {
      id: u.id,
      email: u.email || 'No email',
      createdAt: u.created_at,
      latestChapter: history?.latest_chapter_unlocked ?? 0,
      lastReadAt: history?.last_read_at || null
    }
  })

  // Sort by latest activity (lastReadAt) descending, then created_at
  mergedUsers.sort((a, b) => {
    const timeA = a.lastReadAt ? new Date(a.lastReadAt).getTime() : 0
    const timeB = b.lastReadAt ? new Date(b.lastReadAt).getTime() : 0
    if (timeA !== timeB) return timeB - timeA
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100">
              Users Dashboard
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Overview of signed-up users and their reading activity.
            </p>
          </div>
          <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-lg">
            Total Users: {mergedUsers.length}
          </div>
        </header>

        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                  <th className="p-4 pl-6">User Email</th>
                  <th className="p-4">Signed Up</th>
                  <th className="p-4">Currently Reading</th>
                  <th className="p-4 pr-6">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {mergedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  mergedUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4 pl-6 font-medium text-zinc-900 dark:text-zinc-100">
                        {u.email}
                      </td>
                      <td className="p-4 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 inline-flex items-center px-3 py-1 rounded-full font-medium truncate max-w-[250px] md:max-w-[400px]">
                          {chapterTitles[u.latestChapter] || `Chapter ${u.latestChapter}`}
                        </div>
                      </td>
                      <td className="p-4 pr-6 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                        {timeAgo(u.lastReadAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
// Force recompile to resolve 404

'use client'

import { useState } from 'react'
import { submitComment } from '@/app/read/actions'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function CommentForm({ chapterId, nextChapterUrl }: { chapterId: number, nextChapterUrl: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    formData.append('chapterId', chapterId.toString())

    const res = await submitComment(formData)
    
    if (res.error) {
      setError(res.error)
      setLoading(false)
    } else {
      setSuccess(true)
      // Redirect to next chapter
      router.push(nextChapterUrl)
    }
  }

  return (
    <div className="mt-16 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-extrabold mb-3 text-zinc-900 dark:text-zinc-100 tracking-tight">Share your thoughts</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm sm:text-base leading-relaxed max-w-xl">
          You must leave a meaningful comment (at least 20 characters) to unlock the next chapter. Your reflections help shape the journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <textarea
            name="content"
            required
            rows={4}
            minLength={20}
            disabled={loading || success}
            placeholder="What did you think of this section?..."
            className="w-full px-5 py-4 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all disabled:opacity-50"
          />
          
          {error && (
            <p className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-200 dark:border-red-900/30">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto min-w-[200px] shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:shadow-none"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Unlocking...</>
            ) : success ? (
              "Unlocked!"
            ) : (
              "Submit & Continue"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

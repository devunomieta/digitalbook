'use client'

import { useState } from 'react'
import { submitComment } from '@/app/read/actions'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import VoiceRecorder from './VoiceRecorder'

interface CommentFormProps {
  chapterId: number
  nextChapterUrl: string
}

export default function CommentForm({ chapterId, nextChapterUrl }: CommentFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    formData.append('chapterId', chapterId.toString())

    // Combine answers to questions and the "more comments" field into a single content string
    let combinedContent = ''
    
    const additionalComments = formData.get('additional_comments') as string
    if (additionalComments) {
      combinedContent = additionalComments
    }

    // Replace the default content with our structured one
    formData.set('content', combinedContent)

    // Attach voice blob if recorded
    if (voiceBlob) {
      formData.append('voice_audio', voiceBlob)
    }

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
    <div className="mt-20 bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-zinc-900 dark:text-zinc-100 tracking-tight font-serif">Share your thoughts</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-sm sm:text-base leading-relaxed max-w-xl">
          You must leave a meaningful comment to unlock the next chapter. Your reflections help shape the journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* General comments */}
          <div className="space-y-2">
            <label className="block font-semibold text-zinc-800 dark:text-zinc-200">
              Leave a comment
            </label>
            <textarea
              name="additional_comments"
              required
              rows={4}
              minLength={20}
              disabled={loading || success}
              placeholder="Spill it all out..."
              className="w-full px-5 py-4 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y transition-all disabled:opacity-50"
            />
          </div>

          <VoiceRecorder onAudioReady={setVoiceBlob} />
          
          {error && (
            <p className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-200 dark:border-red-900/30">
              {error}
            </p>
          )}

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button
              type="submit"
              disabled={loading || success}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 w-full shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:shadow-none text-lg"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
              ) : success ? (
                "Unlocked!"
              ) : (
                "Submit & Continue"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

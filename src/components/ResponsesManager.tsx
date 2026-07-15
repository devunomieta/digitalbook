'use client'

import { useState, useTransition } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteComments } from '@/app/readresponses/actions'

export interface Comment {
  id: number
  user_id: string
  chapter_id: number
  content: string
  voice_url: string | null
  created_at: string
  user_email?: string
  ip_address?: string
  location?: string
}

interface ResponsesManagerProps {
  comments: Comment[]
}

export default function ResponsesManager({ comments }: ResponsesManagerProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleToggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedIds.length === comments.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(comments.map(c => c.id))
    }
  }

  const handleDelete = (ids: number[]) => {
    if (!confirm(`Are you sure you want to delete ${ids.length} comment(s)? This action cannot be undone.`)) {
      return
    }

    setError(null)
    startTransition(async () => {
      const res = await deleteComments(ids)
      if (res.error) {
        setError(res.error)
      } else {
        setSelectedIds([])
      }
    })
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <p className="text-zinc-500">No comments for this chapter.</p>
      </div>
    )
  }

  const allSelected = selectedIds.length > 0 && selectedIds.length === comments.length

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            checked={allSelected}
            onChange={handleSelectAll}
            className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {selectedIds.length > 0 ? `${selectedIds.length} selected` : 'Select All'}
          </span>
        </div>
        
        {selectedIds.length > 0 && (
          <button
            onClick={() => handleDelete(selectedIds)}
            disabled={isPending}
            className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50 text-sm font-medium"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Delete Selected
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm border border-red-200 dark:border-red-900/30">
          {error}
        </div>
      )}

      {/* Comments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {comments.map((comment) => {
          const isSelected = selectedIds.includes(comment.id)
          return (
            <div 
              key={comment.id}
              className={`bg-white dark:bg-zinc-900 border ${isSelected ? 'border-blue-500 dark:border-blue-500 ring-1 ring-blue-500' : 'border-zinc-200 dark:border-zinc-800'} rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative group`}
            >
              {/* Card Actions */}
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete([comment.id])}
                  disabled={isPending}
                  className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete comment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Selection Checkbox */}
              <div className="absolute top-4 left-4">
                <input 
                  type="checkbox" 
                  checked={isSelected}
                  onChange={() => handleToggleSelect(comment.id)}
                  className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="pl-8 mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
                <div className="flex justify-between items-start mb-2 pr-8">
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 break-all">
                    {comment.user_email || 'Anonymous User'}
                  </div>
                  <div className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0 ml-4">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {comment.location && (
                    <span className="inline-flex items-center px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium">
                      📍 {comment.location}
                    </span>
                  )}
                  {comment.ip_address && (
                    <span className="inline-flex items-center px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-xs font-mono">
                      {comment.ip_address}
                    </span>
                  )}
                  <span className="inline-flex items-center px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400 text-[10px] font-mono truncate max-w-[120px]" title={comment.user_id}>
                    ID: {comment.user_id.split('-')[0]}...
                  </span>
                </div>
              </div>

              <div className="prose prose-zinc dark:prose-invert max-w-none text-sm md:text-base text-zinc-700 dark:text-zinc-300">
                <p className="whitespace-pre-wrap m-0">
                  {comment.content}
                </p>
              </div>

              {comment.voice_url && (
                <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-950/50 -mx-6 -mb-6 px-6 pb-6 rounded-b-xl">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2 mt-2">
                    Voice Note Attached
                  </h4>
                  <audio 
                    controls 
                    src={comment.voice_url}
                    className="w-full h-8 outline-none"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

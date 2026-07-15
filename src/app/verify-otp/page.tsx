'use client'

import { useState, use } from 'react'
import { verifyOtpCode } from '@/app/login/actions'
import { Loader2 } from 'lucide-react'

export default function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string, type?: string, error?: string }>
}) {
  const params = use(searchParams)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(params.error || '')

  const email = params.email || ''
  const type = params.type || 'signup'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    formData.append('email', email)
    formData.append('type', type)

    const res = await verifyOtpCode(formData)
    
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Verify Email</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            We sent an authentication code to <span className="font-semibold text-zinc-800 dark:text-zinc-200">{email}</span>.
          </p>
        </div>
        
        {error && (
          <div className="p-4 text-sm font-medium text-red-500 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1" htmlFor="code">Authentication Code</label>
            <input 
              id="code" 
              name="code" 
              type="text" 
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={8}
              required 
              placeholder="00000000"
              className="block w-full text-center tracking-[0.3em] text-2xl font-mono px-5 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          
          <div className="pt-4 flex flex-col gap-3">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              Verify Code
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

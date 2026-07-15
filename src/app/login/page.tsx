'use client'

import { useState, use } from 'react'
import { login } from '@/app/login/actions'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string, message?: string }>
}) {
  const params = use(searchParams)
  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Welcome</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Sign in to read the book.</p>
        </div>
        
        {params.error && (
          <div className="p-4 text-sm font-medium text-red-500 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl">
            {params.error}
          </div>
        )}
        
        {params.message && (
          <div className="p-4 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-xl">
            {params.message}
          </div>
        )}
        
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1" htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="block w-full px-5 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="password">Password</label>
              <Link href="/forgot-password" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input 
                id="password" 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                className="block w-full px-5 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-12"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div className="pt-4 flex flex-col gap-4">
            <button 
              formAction={login} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25"
            >
              Log in
            </button>
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

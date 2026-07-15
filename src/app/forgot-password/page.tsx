import { requestPasswordReset } from '@/app/login/actions'
import Link from 'next/link'

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string, message?: string }>
}) {
  const params = await searchParams;
  
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Reset Password</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Enter your email to receive a reset link.</p>
        </div>
        
        {params?.error && (
          <div className="p-4 text-sm font-medium text-red-500 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl">
            {params.error}
          </div>
        )}
        
        {params?.message && (
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
          
          <div className="pt-4 flex flex-col gap-3">
            <button 
              formAction={requestPasswordReset} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25"
            >
              Send Reset Link
            </button>
            <Link 
              href="/login"
              className="text-center text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Back to log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

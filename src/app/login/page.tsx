import { login, signup } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams;
  
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Welcome</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Sign in to read the book.</p>
        </div>
        
        {params?.error && (
          <div className="p-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-lg">
            {params.error}
          </div>
        )}
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1" htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="block w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-transparent text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1" htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="block w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-transparent text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button 
              formAction={login} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm"
            >
              Log in
            </button>
            <button 
              formAction={signup} 
              className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

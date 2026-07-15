import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-12 text-center py-12 sm:py-24">
        
        {/* Hero Section */}
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            A Journey Awaits.
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Experience a new way of reading. Immerse yourself in the story, share your thoughts, and unlock the next chapter.
          </p>
        </div>

        {/* Prelude Snippet */}
        <div className="relative bg-white dark:bg-zinc-900 p-8 sm:p-12 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 text-left mx-auto max-w-2xl transform transition-transform hover:-translate-y-1">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase shadow-sm">
            Prelude
          </div>
          <div className="prose prose-zinc dark:prose-invert prose-lg mx-auto space-y-4 text-left">
            <p className="italic text-zinc-600 dark:text-zinc-400">
              He soliloquized, his voice a low, raspy baritone that barely carried past his own teeth.
            </p>
            <p className="italic text-zinc-600 dark:text-zinc-400">
              "We build systems," he muttered, pressing his forehead against the cool glass. "We write contracts to prevent breach. We write test cases to prevent failure. But we enter love without a single assertion. We jump into the compiler and pray we don't crash. Why do I keep jumping?"
            </p>
            <p className="italic text-zinc-600 dark:text-zinc-400">
              In his imagination, love was supposed to be a beautifully refactored codebase. It was supposed to be a joint tenancy—an estate in fee simple where two souls held an undivided interest with the right of survivorship... He wanted a love that felt like a successful deployment on a Friday afternoon—smooth, stable, and quiet.
            </p>
            <p className="italic text-zinc-600 dark:text-zinc-400">
              Instead, his twenties had become a series of sandboxed environments. Ten different women. Ten different branches of code that had failed to merge into his main trunk.
            </p>
          </div>
          
          {/* Call to Action overlay */}
          <div className="mt-8 flex justify-center">
            <Link 
              href="/read/prelude" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all hover:gap-3 shadow-lg hover:shadow-blue-500/25"
            >
              Start Reading <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

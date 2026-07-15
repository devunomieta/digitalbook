'use client'

import { useState, useEffect } from 'react'

export default function RulesPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    const hasAccepted = localStorage.getItem('digitalbook_rules_accepted')
    if (!hasAccepted) {
      setIsOpen(true)
      // Lock scrolling on body when modal is open
      document.body.style.overflow = 'hidden'
    }
  }, [])

  function handleAccept() {
    if (agreed) {
      localStorage.setItem('digitalbook_rules_accepted', 'true')
      setIsOpen(false)
      document.body.style.overflow = 'auto'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="p-6 sm:p-8 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Rules of Engagement
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Before you dive into the prelude, you must agree to the following conditions.
          </p>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-zinc-700 dark:text-zinc-300">
          <ol className="list-decimal list-outside ml-5 space-y-4 font-medium">
            <li>This book is fictitious and only converted to a digital book for easy reading and to get actual feedback.</li>
            <li>It has technical, legal and emotional lingos which may require you to visit a dictionary or make a quick Google search.</li>
            <li>Read to understand.</li>
            <li>Feel free to be emotional, bias, and attack the characters - they aren't humans after all.</li>
            <li>You must answer the end-of-chapter questions and fill in the comments before you can read the next chapter.</li>
            <li>You're the JURY - your verdict will be required at the end of the book. Judge the characters.</li>
            <li>You can request more digital books - use the footer link!</li>
          </ol>
        </div>

        <div className="p-6 sm:p-8 border-t border-zinc-200 dark:border-zinc-800 shrink-0 bg-zinc-50 dark:bg-zinc-950/50">
          <label className="flex items-start gap-3 cursor-pointer group mb-6">
            <div className="relative flex items-center mt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-700 rounded transition-colors checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
              />
              {agreed && (
                <svg className="absolute w-5 h-5 text-white pointer-events-none p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
              I have read, understood, and agree to the rules of engagement for this book.
            </span>
          </label>
          
          <button
            onClick={handleAccept}
            disabled={!agreed}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 disabled:text-zinc-500 dark:disabled:text-zinc-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg disabled:shadow-none"
          >
            Enter the Prelude
          </button>
        </div>

      </div>
    </div>
  )
}

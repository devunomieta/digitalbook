'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Lock, Unlock, Menu, X } from 'lucide-react'

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

const chapterPaths: Record<number, string> = {
  0: 'prelude',
  1: 'chapter-1',
  2: 'chapter-2',
  3: 'chapter-3',
  4: 'chapter-4',
  5: 'chapter-5',
  6: 'chapter-6',
  7: 'chapter-7',
  8: 'chapter-8',
  9: 'chapter-9',
  10: 'chapter-10',
}

export default function ChapterMenu({ latestChapter, currentChapter }: { latestChapter: number, currentChapter: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)
  
  // Cap latest chapter at 10 to handle legacy edge case where it could reach 11
  const cappedLatestChapter = Math.min(latestChapter, 10)
  const cappedCurrentChapter = Math.min(currentChapter, 10)

  const chapterList = Array.from({ length: 11 }, (_, i) => {
    const isUnlocked = i <= cappedLatestChapter
    const isCurrent = i === cappedCurrentChapter
    const isActive = pathname === `/read/${chapterPaths[i]}`
    const href = `/read/${chapterPaths[i]}`
    
    return (
      <li key={i} className="mb-2">
        {isUnlocked ? (
          <Link
            href={href}
            onClick={() => setIsOpen(false)}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors border ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700'}`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-zinc-700 dark:text-zinc-300'}`}>
                {chapterTitles[i]}
              </span>
            </div>
            {isCurrent && (
              <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
                Current
              </span>
            )}
          </Link>
        ) : (
          <div className="flex items-center p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/50 opacity-60 cursor-not-allowed">
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {chapterTitles[i]}
              </span>
            </div>
          </div>
        )}
      </li>
    )
  })

  return (
    <>
      {/* Top Navigation Bar inside ReadLayout */}
      <div className="w-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleMenu}
              className="p-1 -ml-1 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle Chapter Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 text-sm tracking-wide">
              Chapter Navigation
            </span>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
          onClick={toggleMenu}
        />
      )}

      {/* Slide-out Drawer */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-[100dvh] w-80 max-w-[85vw] bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-6 overflow-y-auto transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Chapters
          </h2>
          <button 
            onClick={toggleMenu} 
            className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <ul className="space-y-1">
          {chapterList}
        </ul>
      </aside>
    </>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Square, Type, Minus, Plus, Settings2 } from 'lucide-react'

export type FontStyle = 'font-serif' | 'font-mono'
export type TextSize = 14 | 16 | 18 | 20 | 22 | 24

interface ReadingToolbarProps {
  onFontChange: (font: FontStyle) => void
  onSizeChange: (size: TextSize) => void
  currentFont: FontStyle
  currentSize: TextSize
}

export default function ReadingToolbar({ onFontChange, onSizeChange, currentFont, currentSize }: ReadingToolbarProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [ttsSpeed, setTtsSpeed] = useState(0.95)
  const [ttsPitch, setTtsPitch] = useState(1)
  
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const paragraphsRef = useRef<HTMLParagraphElement[]>([])
  const currentPRef = useRef<number>(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  const clearHighlights = () => {
    paragraphsRef.current.forEach(p => {
      p.style.backgroundColor = ''
      p.style.transition = 'background-color 0.3s ease'
    })
  }

  const speakNextParagraph = () => {
    if (!synthRef.current) return
    if (currentPRef.current >= paragraphsRef.current.length) {
      setIsPlaying(false)
      setIsPaused(false)
      clearHighlights()
      return
    }

    const p = paragraphsRef.current[currentPRef.current]
    const text = p.textContent || ''
    
    if (!text.trim()) {
      currentPRef.current++
      speakNextParagraph()
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    const voices = synthRef.current.getVoices()
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Natural'))) || voices.find(v => v.lang.startsWith('en'))
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.rate = ttsSpeed
    utterance.pitch = ttsPitch

    utterance.onstart = () => {
      clearHighlights()
      // Highlight the current paragraph
      p.style.backgroundColor = 'rgba(59, 130, 246, 0.15)' // subtle blue highlight
    }

    utterance.onend = () => {
      currentPRef.current++
      // If we are still playing (not stopped or paused), continue to next
      if (!isPaused) {
         speakNextParagraph()
      }
    }

    utterance.onerror = (e: SpeechSynthesisErrorEvent) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.warn("TTS Error:", e.error)
      }
      setIsPlaying(false)
      setIsPaused(false)
      clearHighlights()
    }

    synthRef.current.speak(utterance)
  }

  const handlePlay = () => {
    if (!synthRef.current) return

    if (isPaused) {
      synthRef.current.resume()
      setIsPaused(false)
      setIsPlaying(true)
      return
    }

    // Start fresh
    synthRef.current.cancel()
    clearHighlights()
    
    // Find all paragraphs in the chapter content
    const container = document.getElementById('chapter-content')
    if (container) {
      paragraphsRef.current = Array.from(container.querySelectorAll('p'))
    } else {
      paragraphsRef.current = []
    }

    currentPRef.current = 0
    setIsPlaying(true)
    setIsPaused(false)
    
    speakNextParagraph()
  }

  const handlePause = () => {
    if (synthRef.current && isPlaying) {
      synthRef.current.pause()
      setIsPaused(true)
      setIsPlaying(false)
    }
  }

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsPlaying(false)
      setIsPaused(false)
      clearHighlights()
    }
  }

  const sizes: TextSize[] = [14, 16, 18, 20, 22, 24]
  const fonts: { value: FontStyle, label: string }[] = [
    { value: 'font-serif', label: 'Serif' },
    { value: 'font-mono', label: 'Mono' },
  ]

  const handleDecreaseSize = () => {
    const idx = sizes.indexOf(currentSize)
    if (idx > 0) onSizeChange(sizes[idx - 1])
  }

  const handleIncreaseSize = () => {
    const idx = sizes.indexOf(currentSize)
    if (idx < sizes.length - 1) onSizeChange(sizes[idx + 1])
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      
      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl p-4 w-64 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Typography</p>
              <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                {fonts.map(f => (
                  <button
                    key={f.value}
                    onClick={() => onFontChange(f.value)}
                    className={`flex-1 py-1.5 text-sm rounded-md transition-all ${currentFont === f.value ? 'bg-white dark:bg-zinc-700 shadow text-zinc-900 dark:text-zinc-100 font-medium' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
                  >
                    <span className={f.value}>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Text Size</p>
              <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                <button 
                  onClick={handleDecreaseSize}
                  disabled={currentSize === sizes[0]}
                  className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-50 transition-colors rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {currentSize}px
                </span>
                <button 
                  onClick={handleIncreaseSize}
                  disabled={currentSize === sizes[sizes.length - 1]}
                  className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 disabled:opacity-50 transition-colors rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TTS Settings */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Voice Settings</p>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Speed</span>
                    <span>{ttsSpeed.toFixed(1)}x</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" max="2" step="0.1" 
                    value={ttsSpeed} 
                    onChange={(e) => setTtsSpeed(parseFloat(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Pitch</span>
                    <span>{ttsPitch.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="2" step="0.1" 
                    value={ttsPitch} 
                    onChange={(e) => setTtsPitch(parseFloat(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Toolbar */}
      <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-full p-2">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className={`p-3 rounded-full transition-colors ${showSettings ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
          title="Text Settings"
        >
          <Type className="w-5 h-5" />
        </button>
        
        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
        
        <button 
          onClick={isPlaying ? handlePause : handlePlay}
          className="p-3 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          title={isPlaying ? "Pause Reading" : "Start Reading"}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
        </button>
        
        {(isPlaying || isPaused) && (
          <button 
            onClick={handleStop}
            className="p-3 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Stop Reading"
          >
            <Square className="w-5 h-5 fill-current" />
          </button>
        )}
      </div>
    </div>
  )
}

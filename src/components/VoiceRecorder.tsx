'use client'

import { useState, useRef } from 'react'
import { Mic, Square, Play, Trash2 } from 'lucide-react'

interface VoiceRecorderProps {
  onAudioReady: (blob: Blob | null) => void
}

export default function VoiceRecorder({ onAudioReady }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
        onAudioReady(audioBlob)
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setError('')
    } catch (err) {
      console.error('Error accessing microphone:', err)
      setError('Microphone access denied or unavailable.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const resetRecording = () => {
    setAudioUrl(null)
    onAudioReady(null)
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Voice Comment (Optional)</label>
        {isRecording && (
          <span className="flex items-center text-xs font-medium text-red-500 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
            Recording...
          </span>
        )}
      </div>
      
      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
      
      <div className="flex items-center gap-3">
        {!audioUrl ? (
          <>
            {isRecording ? (
              <button
                type="button"
                onClick={stopRecording}
                className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                <Square className="w-4 h-4 fill-current" /> Stop
              </button>
            ) : (
              <button
                type="button"
                onClick={startRecording}
                className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                <Mic className="w-4 h-4" /> Record Voice
              </button>
            )}
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Speak your mind directly.</p>
          </>
        ) : (
          <div className="flex items-center gap-3 w-full">
            <audio src={audioUrl} controls className="h-10 flex-1 max-w-full" />
            <button
              type="button"
              onClick={resetRecording}
              className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Delete recording"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

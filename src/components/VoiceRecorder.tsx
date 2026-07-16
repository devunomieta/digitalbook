'use client'

import { useState, useRef } from 'react'
import { Mic, Square, Trash2 } from 'lucide-react'

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
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone API not available. On iOS/mobile, this requires an HTTPS connection.')
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Determine best mimeType for cross-browser support (iOS Safari vs Chrome)
      let options = undefined
      if (typeof MediaRecorder.isTypeSupported === 'function') {
        if (MediaRecorder.isTypeSupported('audio/webm')) {
          options = { mimeType: 'audio/webm' }
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          options = { mimeType: 'audio/mp4' }
        } else if (MediaRecorder.isTypeSupported('audio/aac')) {
          options = { mimeType: 'audio/aac' }
        }
      }

      const mediaRecorder = new MediaRecorder(stream, options)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        // use the recorder's actual mimeType to avoid corrupting Safari's mp4 chunks
        const actualMimeType = mediaRecorder.mimeType || 'audio/mp4'
        const audioBlob = new Blob(audioChunksRef.current, { type: actualMimeType })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)
        onAudioReady(audioBlob)
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setError('')
    } catch (err: any) {
      console.error('Error accessing microphone:', err)
      const errorMsg = err.message || 'Unknown error'
      if (errorMsg.includes('HTTPS')) {
        setError('Microphone access requires a secure HTTPS connection on this device.')
      } else if (err.name === 'NotAllowedError' || errorMsg.toLowerCase().includes('not allowed')) {
        setError(
          'Your browser or device is blocking microphone access. To fix this:\n' +
          '• iOS: Go to Settings > Chrome (or Safari) and enable "Microphone"\n' +
          '• Android: Go to Settings > Apps > Chrome > Permissions and allow "Microphone"\n' +
          '• Desktop: Click the lock icon in the URL bar and allow Microphone access'
        )
      } else {
        setError(`Microphone access denied or unavailable (${errorMsg}).`)
      }
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
            Speak Your Mind <Mic className="w-4 h-4 text-blue-500" />
          </label>
          <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap">
            Highly Recommended
          </span>
        </div>
        {isRecording && (
          <span className="flex items-center text-xs font-medium text-red-500">
            <div className="flex items-center justify-center gap-0.5 mr-2 h-3">
              <span className="w-1 h-3 bg-red-500 rounded-full animate-[bounce_1s_infinite_0ms]"></span>
              <span className="w-1 h-2 bg-red-500 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
              <span className="w-1 h-4 bg-red-500 rounded-full animate-[bounce_1s_infinite_400ms]"></span>
              <span className="w-1 h-2 bg-red-500 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
            </div>
            Recording...
          </span>
        )}
      </div>
      
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 max-w-lg">
        We love hearing the raw emotion in your voice. Take a moment to record your thoughts—it makes the experience much more immersive!
      </p>
      
      {error && <p className="text-xs text-red-500 mb-2 whitespace-pre-line">{error}</p>}
      
      <div className="flex flex-wrap items-center gap-3 w-full max-w-full">
        {!audioUrl ? (
          <>
            {isRecording ? (
              <button
                type="button"
                onClick={stopRecording}
                className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors shrink-0"
              >
                <Square className="w-4 h-4 fill-current" /> Stop
              </button>
            ) : (
              <button
                type="button"
                onClick={startRecording}
                className="group flex items-center gap-2 bg-blue-600 text-white dark:bg-blue-600 px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 shrink-0 relative overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <Mic className="w-5 h-5" /> 
                <span className="font-semibold">Record Voice</span>
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-wrap items-center gap-3 w-full max-w-full overflow-hidden">
            <audio src={audioUrl} controls className="h-10 flex-1 min-w-[200px] max-w-full" />
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

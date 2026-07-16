'use client'

import { useState, ReactNode } from 'react'
import ReadingToolbar, { FontStyle, TextSize } from './ReadingToolbar'

interface ReadContainerProps {
  children: ReactNode
}

export default function ReadContainer({ children }: ReadContainerProps) {
  const [font, setFont] = useState<FontStyle>('font-serif')
  const [size, setSize] = useState<TextSize>(16) // default 16px for better reading

  return (
    <>
      <ReadingToolbar 
        currentFont={font} 
        onFontChange={setFont} 
        currentSize={size} 
        onSizeChange={setSize} 
      />
      
      <div className={`mx-auto transition-all duration-500 ease-in-out ${font === 'font-serif' ? 'font-serif' : 'font-mono'}`}>
        {/* We use an inline style targeting font-size, which cascades to children inheriting sizes */}
        <div 
          className="prose prose-zinc dark:prose-invert max-w-none mx-auto space-y-8 leading-loose text-[#2c2c2c] dark:text-[#d4d4d4]"
          style={{ fontSize: `${size}px` }}
        >
          {children}
        </div>
      </div>
    </>
  )
}

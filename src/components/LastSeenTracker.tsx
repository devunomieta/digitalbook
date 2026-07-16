'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { recordLastSeen } from '@/app/read/actions'

export default function LastSeenTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Only track if on a chapter page
    if (pathname.startsWith('/read/')) {
      recordLastSeen(pathname).catch(err => {
        console.error('Failed to record last seen', err)
      })
    }
  }, [pathname])

  return null
}

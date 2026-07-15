'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function submitComment(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const content = formData.get('content') as string
  const chapterIdStr = formData.get('chapterId') as string
  const chapterId = parseInt(chapterIdStr, 10)

  if (!content || content.trim().length < 20) {
    return { error: 'Comment must be at least 20 characters long to ensure meaningful feedback.' }
  }

  const voiceFile = formData.get('voice_audio') as File | null
  let voiceUrl = null

  if (voiceFile && voiceFile.size > 0) {
    const fileName = `${user.id}/${Date.now()}-voice.webm`
    const { data, error: uploadError } = await supabase.storage
      .from('voice_comments')
      .upload(fileName, voiceFile, { contentType: voiceFile.type || 'audio/webm' })
      
    if (!uploadError && data) {
      const { data: { publicUrl } } = supabase.storage.from('voice_comments').getPublicUrl(data.path)
      voiceUrl = publicUrl
    }
  }

  // Get headers
  const headersList = await headers()
  const ip_address = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'Unknown IP'
  const country = headersList.get('x-vercel-ip-country')
  const city = headersList.get('x-vercel-ip-city')
  const location = [city, country].filter(Boolean).join(', ') || 'Unknown Location'

  // Insert comment
  const { error: commentError } = await supabase
    .from('comments')
    .insert({
      user_id: user.id,
      chapter_id: chapterId,
      content: content.trim(),
      voice_url: voiceUrl,
      user_email: user.email,
      ip_address,
      location
    })

  if (commentError) {
    return { error: 'Failed to save comment.' }
  }

  // Update reading_history to unlock the next chapter
  // 0 = prelude, 1 = chapter 1, etc.
  const nextChapter = chapterId + 1

  const { data: history } = await supabase
    .from('reading_history')
    .select('latest_chapter_unlocked')
    .eq('user_id', user.id)
    .single()
  
  if (history && history.latest_chapter_unlocked < nextChapter) {
    await supabase
      .from('reading_history')
      .update({ latest_chapter_unlocked: nextChapter })
      .eq('user_id', user.id)
  }

  revalidatePath('/read', 'layout')
  
  return { success: true }
}

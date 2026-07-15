'use server'

import { revalidatePath } from 'next/cache'
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

  // Insert comment
  const { error: commentError } = await supabase
    .from('comments')
    .insert({
      user_id: user.id,
      chapter_id: chapterId,
      content: content.trim()
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

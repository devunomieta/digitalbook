'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteComments(commentIds: number[]) {
  if (!commentIds || commentIds.length === 0) {
    return { error: 'No comments provided for deletion.' }
  }

  const supabase = await createClient()
  
  // Verify authentication
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  // First, fetch the comments to check if there are voice URLs to delete
  const { data: comments, error: fetchError } = await supabase
    .from('comments')
    .select('voice_url')
    .in('id', commentIds)

  if (fetchError) {
    console.error('Error fetching comments for deletion:', fetchError)
    return { error: 'Failed to fetch comments for deletion.' }
  }

  // Delete voice files from storage
  if (comments && comments.length > 0) {
    const filesToDelete: string[] = []
    for (const comment of comments) {
      if (comment.voice_url) {
        try {
          // Voice URLs format: https://.../storage/v1/object/public/voice_comments/user_id/123-voice.webm
          // We need to extract: user_id/123-voice.webm
          const urlObj = new URL(comment.voice_url)
          const pathParts = urlObj.pathname.split('/voice_comments/')
          if (pathParts.length === 2) {
            filesToDelete.push(pathParts[1])
          }
        } catch (e) {
          console.error('Failed to parse voice URL:', comment.voice_url, e)
        }
      }
    }

    if (filesToDelete.length > 0) {
      const { error: storageError } = await supabase.storage
        .from('voice_comments')
        .remove(filesToDelete)
        
      if (storageError) {
        console.error('Error deleting voice files from storage:', storageError)
        // We continue anyway to delete the database records
      }
    }
  }

  // Delete from database
  const { error: deleteError } = await supabase
    .from('comments')
    .delete()
    .in('id', commentIds)

  if (deleteError) {
    console.error('Error deleting comments:', deleteError)
    return { error: 'Failed to delete comments.' }
  }

  revalidatePath('/readresponses')
  revalidatePath('/read', 'layout')
  
  return { success: true }
}

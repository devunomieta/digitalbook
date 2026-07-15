'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { type EmailOtpType } from '@supabase/supabase-js'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message || 'Could not authenticate user')}`)
  }

  revalidatePath('/', 'layout')
  redirect('/read/prelude')
}

export async function signup(formData: FormData) {
  try {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error('Supabase Auth Error:', error)
      return { error: `Supabase Error: ${JSON.stringify(error)} | Message: ${error.message}` }
    }

    return { success: true }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : JSON.stringify(err)
    console.error('Signup exception:', err)
    return { error: `Exception: ${errorMsg}` }
  }
}

export async function verifyOtpCode(formData: FormData) {
  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const token = formData.get('code') as string
  const type = formData.get('type') as EmailOtpType

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type
  })

  if (error) {
    return { error: 'Invalid or expired code' }
  }

  revalidatePath('/', 'layout')
  
  if (type === 'recovery') {
    redirect('/reset-password')
  } else {
    redirect('/read/prelude')
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    redirect('/forgot-password?error=Could not send reset email')
  }

  redirect(`/verify-otp?email=${encodeURIComponent(email)}&type=recovery`)
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    redirect('/reset-password?error=Could not update password')
  }

  redirect('/read/prelude')
}

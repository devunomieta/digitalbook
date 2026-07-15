import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gvijnyulbusajhakddsn.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2aWpueXVsYnVzYWpoYWtkZHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwNjIxODMsImV4cCI6MjA5OTYzODE4M30.t2PYIYZCz50r2xWI2_2cwCLnYq9XaiYShRA5sDw0uuI'
const supabase = createClient(supabaseUrl, supabaseKey)

async function check() {
  const { data, error } = await supabase.from('reading_history').select('*').limit(5)
  console.log("reading_history:")
  console.log(data)
  console.log("error:", error)
}
check()

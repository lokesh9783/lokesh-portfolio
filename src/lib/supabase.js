import { createClient } from '@supabase/supabase-js'

// Get credentials from Vite env or fallback to browser-stored config (for easy admin setup)
export const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  const storedUrl = typeof window !== 'undefined' ? localStorage.getItem('lk_supabase_url') : null
  const storedKey = typeof window !== 'undefined' ? localStorage.getItem('lk_supabase_key') : null

  const url = (envUrl && envUrl !== 'YOUR_SUPABASE_URL') ? envUrl : storedUrl
  const key = (envKey && envKey !== 'YOUR_SUPABASE_ANON_KEY') ? envKey : storedKey

  return { url, key }
}

export const isSupabaseConfigured = () => {
  const { url, key } = getSupabaseConfig()
  return Boolean(url && key && url.startsWith('http') && key.length > 20)
}

let supabaseInstance = null

export const getSupabaseClient = () => {
  if (supabaseInstance) return supabaseInstance
  const { url, key } = getSupabaseConfig()
  if (isSupabaseConfigured()) {
    try {
      supabaseInstance = createClient(url, key)
      return supabaseInstance
    } catch (err) {
      console.warn('Could not initialize Supabase client:', err)
      return null
    }
  }
  return null
}

export const saveSupabaseCredentials = (url, key) => {
  if (typeof window !== 'undefined') {
    if (url) localStorage.setItem('lk_supabase_url', url.trim())
    else localStorage.removeItem('lk_supabase_url')

    if (key) localStorage.setItem('lk_supabase_key', key.trim())
    else localStorage.removeItem('lk_supabase_key')

    supabaseInstance = null // reset client to reinitialize
  }
}

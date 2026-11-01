import { createContext, useContext, useEffect, useState } from 'react'
import { defaultPortfolioData } from '../data/defaultData'
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase'

const PortfolioContext = createContext()

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Check if there is cached data in localStorage
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('lk_portfolio_data')
      if (cached) {
        try {
          const parsed = JSON.parse(cached)
          if (parsed && parsed.projects) {
            // Verify if cached projects have the latest live URLs and project titles
            const hasLatestData = Array.isArray(parsed.projects) &&
              parsed.projects.length === 4 &&
              parsed.projects.every(p => p.image && p.category && p.features && p.liveDemoUrl && p.githubUrl) &&
              parsed.projects[0].liveDemoUrl === defaultPortfolioData.projects[0].liveDemoUrl &&
              parsed.projects[0].title === defaultPortfolioData.projects[0].title
            
            if (!hasLatestData) {
              parsed.projects = defaultPortfolioData.projects
              try {
                localStorage.setItem('lk_portfolio_data', JSON.stringify(parsed))
              } catch {
                // Ignore storage errors
              }
            }
          }
          return parsed
        } catch (e) {
          console.error('Error parsing cached data:', e)
        }
      }
    }
    return defaultPortfolioData
  })

  const [isSupabaseLive, setIsSupabaseLive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('lk_portfolio_messages')
      return cached ? JSON.parse(cached) : []
    }
    return []
  })

  // Synchronize with Supabase if credentials are valid
  const syncWithSupabase = async () => {
    if (!isSupabaseConfigured()) {
      setIsSupabaseLive(false)
      setLoading(false)
      return
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      setIsSupabaseLive(false)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      // Attempt to fetch profile
      const { data: profileRows, error: profileErr } = await supabase
        .from('portfolio_profile')
        .select('*')
        .limit(1)

      if (!profileErr && profileRows && profileRows.length > 0) {
        const p = profileRows[0]
        setData(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            name: p.name || prev.profile.name,
            headline: p.headline || prev.profile.headline,
            subtitle: p.subtitle || prev.profile.subtitle,
            bio: p.bio || prev.profile.bio,
            email: p.email || prev.profile.email,
            location: p.location || prev.profile.location,
            availability: p.availability || prev.profile.availability,
            isAvailableForHire: p.is_available_for_hire ?? prev.profile.isAvailableForHire,
            resumeUrl: p.resume_url || prev.profile.resumeUrl,
            experienceLetterUrl: p.experience_letter_url || prev.profile.experienceLetterUrl,
            githubUrl: p.github_url || prev.profile.githubUrl,
            linkedinUrl: p.linkedin_url || prev.profile.linkedinUrl,
          }
        }))
        setIsSupabaseLive(true)
      }

      // Fetch experiences
      const { data: expRows } = await supabase
        .from('portfolio_experiences')
        .select('*')
        .order('sort_order', { ascending: true })

      if (expRows && expRows.length > 0) {
        setData(prev => ({
          ...prev,
          experiences: expRows.map(e => ({
            id: e.id,
            role: e.role,
            company: e.company,
            period: e.period,
            location: e.location,
            current: e.is_current,
            description: e.description,
            skills: e.skills || []
          }))
        }))
      }

      // Fetch projects
      const { data: projRows } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('sort_order', { ascending: true })

      if (projRows && projRows.length > 0) {
        setData(prev => ({
          ...prev,
          projects: projRows.map(pr => ({
            id: pr.id,
            title: pr.title,
            category: pr.category,
            tagline: pr.tagline,
            description: pr.description,
            image: pr.image,
            features: pr.features || [],
            tags: pr.tags || [],
            featured: pr.featured,
            liveDemoUrl: pr.live_demo_url || pr.liveDemoUrl,
            githubUrl: pr.github_url || pr.githubUrl,
            repoName: pr.repo_name || pr.repoName,
            localPort: pr.local_port || pr.localPort
          }))
        }))
      }

      // Fetch messages for admin
      const { data: msgRows } = await supabase
        .from('portfolio_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (msgRows) {
        setMessages(msgRows)
      }

      setIsSupabaseLive(true)
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local dataset:', err)
      setIsSupabaseLive(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    syncWithSupabase()
  }, [])

  // Save changes locally to retain updates even without Supabase
  const persistLocally = (updatedData) => {
    setData(updatedData)
    if (typeof window !== 'undefined') {
      localStorage.setItem('lk_portfolio_data', JSON.stringify(updatedData))
    }
  }

  // Update Profile
  const updateProfile = async (newProfile) => {
    const updated = { ...data, profile: { ...data.profile, ...newProfile } }
    persistLocally(updated)

    if (isSupabaseLive) {
      const supabase = getSupabaseClient()
      if (supabase) {
        await supabase.from('portfolio_profile').upsert({
          name: newProfile.name,
          headline: newProfile.headline,
          subtitle: newProfile.subtitle,
          bio: newProfile.bio,
          email: newProfile.email,
          location: newProfile.location,
          availability: newProfile.availability,
          is_available_for_hire: newProfile.isAvailableForHire,
          resume_url: newProfile.resumeUrl,
          experience_letter_url: newProfile.experienceLetterUrl,
          github_url: newProfile.githubUrl,
          linkedin_url: newProfile.linkedinUrl
        })
      }
    }
  }

  // Experience Mutations
  const addExperience = (exp) => {
    const updated = {
      ...data,
      experiences: [exp, ...data.experiences]
    }
    persistLocally(updated)
  }

  const updateExperience = (id, updatedExp) => {
    const updated = {
      ...data,
      experiences: data.experiences.map(e => e.id === id ? { ...e, ...updatedExp } : e)
    }
    persistLocally(updated)
  }

  const deleteExperience = (id) => {
    const updated = {
      ...data,
      experiences: data.experiences.filter(e => e.id !== id)
    }
    persistLocally(updated)
  }

  // Project Mutations
  const addProject = (proj) => {
    const updated = {
      ...data,
      projects: [proj, ...data.projects]
    }
    persistLocally(updated)
  }

  const updateProject = (id, updatedProj) => {
    const updated = {
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, ...updatedProj } : p)
    }
    persistLocally(updated)
  }

  const deleteProject = (id) => {
    const updated = {
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    }
    persistLocally(updated)
  }

  // Skill Mutations
  const addSkill = (skill) => {
    const updated = {
      ...data,
      skills: [...data.skills, skill]
    }
    persistLocally(updated)
  }

  const deleteSkill = (id) => {
    const updated = {
      ...data,
      skills: data.skills.filter(s => s.id !== id)
    }
    persistLocally(updated)
  }

  // Services Mutations
  const updateService = (id, updatedService) => {
    const updated = {
      ...data,
      services: data.services.map(s => s.id === id ? { ...s, ...updatedService } : s)
    }
    persistLocally(updated)
  }

  // Reset to default resume data
  const resetToDefault = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lk_portfolio_data')
    }
    setData(defaultPortfolioData)
  }

  // Send a Contact Message
  const submitContactMessage = async ({ name, email, subject, message }) => {
    const newMsg = {
      id: 'msg-' + Date.now(),
      created_at: new Date().toISOString(),
      name,
      email,
      subject: subject || 'Portfolio Contact Inquiry',
      message,
      is_read: false
    }

    const updated = [newMsg, ...messages]
    setMessages(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem('lk_portfolio_messages', JSON.stringify(updated))
    }

    if (isSupabaseLive) {
      const supabase = getSupabaseClient()
      if (supabase) {
        await supabase.from('portfolio_messages').insert({
          name,
          email,
          subject: newMsg.subject,
          message
        })
      }
    }

    return { success: true }
  }

  return (
    <PortfolioContext.Provider
      value={{
        ...data,
        loading,
        isSupabaseLive,
        syncWithSupabase,
        messages,
        updateProfile,
        addExperience,
        updateExperience,
        deleteExperience,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        deleteSkill,
        updateService,
        resetToDefault,
        submitContactMessage
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}

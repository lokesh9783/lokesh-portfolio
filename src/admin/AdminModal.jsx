import { useState } from 'react'
import {
  X,
  User,
  Briefcase,
  FolderGit2,
  Cpu,
  Layers,
  Inbox,
  Database,
  Lock,
  LogOut,
  Save,
  Plus,
  Trash2,
  Check,
  Copy,
  ExternalLink,
  RefreshCw
} from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'
import {
  getSupabaseConfig,
  saveSupabaseCredentials,
  isSupabaseConfigured
} from '../lib/supabase'

export const AdminModal = ({ isOpen, onClose }) => {
  const portfolio = usePortfolio()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('lk_admin_auth') === 'true'
  })
  const [pinInput, setPinInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [activeTab, setActiveTab] = useState('profile')
  const [saveNotification, setSaveNotification] = useState('')
  const [copiedSql, setCopiedSql] = useState(false)

  // Supabase Config State
  const initialConfig = getSupabaseConfig()
  const [supabaseUrl, setSupabaseUrl] = useState(initialConfig.url || '')
  const [supabaseKey, setSupabaseKey] = useState(initialConfig.key || '')

  // Local Profile Form State
  const [profileForm, setProfileForm] = useState({ ...portfolio.profile })

  if (!isOpen) return null

  const handleLogin = (e) => {
    e.preventDefault()
    // Secure master access password
    if (pinInput === 'Lks@9783') {
      setIsAuthenticated(true)
      localStorage.setItem('lk_admin_auth', 'true')
      setAuthError('')
    } else {
      setAuthError('Incorrect admin key. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('lk_admin_auth')
  }

  const triggerNotification = (msg) => {
    setSaveNotification(msg)
    setTimeout(() => setSaveNotification(''), 3000)
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    portfolio.updateProfile(profileForm)
    triggerNotification('Profile details saved successfully!')
  }

  const handleSaveSupabaseConfig = (e) => {
    e.preventDefault()
    saveSupabaseCredentials(supabaseUrl, supabaseKey)
    portfolio.syncWithSupabase()
    triggerNotification('Supabase settings updated! Re-synchronizing...')
  }

  const sqlCode = `-- Lokesh Kumawat Portfolio Tables
CREATE TABLE IF NOT EXISTS public.portfolio_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    headline TEXT NOT NULL,
    subtitle TEXT,
    bio TEXT NOT NULL,
    email TEXT NOT NULL,
    location TEXT,
    availability TEXT,
    is_available_for_hire BOOLEAN DEFAULT true,
    resume_url TEXT,
    experience_letter_url TEXT,
    github_url TEXT,
    linkedin_url TEXT
);

CREATE TABLE IF NOT EXISTS public.portfolio_experiences (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL,
    location TEXT,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    skills TEXT[],
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    tags TEXT[],
    live_url TEXT,
    github_url TEXT,
    featured BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.portfolio_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL
);

ALTER TABLE public.portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read" ON public.portfolio_profile FOR SELECT USING (true);
CREATE POLICY "Public Read Exp" ON public.portfolio_experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Proj" ON public.portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Public Can Message" ON public.portfolio_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Full Profile" ON public.portfolio_profile FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Exp" ON public.portfolio_experiences FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Proj" ON public.portfolio_projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Msg" ON public.portfolio_messages FOR ALL TO authenticated USING (true);`

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlCode)
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 2500)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-primary)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden',
          borderRadius: '20px'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'var(--badge-bg)',
                color: 'var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Lock size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Private Portfolio CMS</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {portfolio.isSupabaseLive ? 'Connected to Supabase PostgreSQL' : 'Instant Dataset Mode'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
                title="Log out"
              >
                <LogOut size={15} /> Logout
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '0.4rem',
                borderRadius: '8px'
              }}
              aria-label="Close Admin Modal"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div style={{ padding: '3.5rem 2rem', maxWidth: '440px', margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'var(--badge-bg)',
                color: 'var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}
            >
              <Lock size={26} />
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Admin Authentication</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Enter your master key to edit profile details, add projects, and review incoming messages.
            </p>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="password"
                  required
                  className="form-input"
                  placeholder="Enter Admin Password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  style={{ textAlign: 'center', letterSpacing: '0.2em', fontSize: '1.1rem' }}
                />
              </div>

              {authError && (
                <p style={{ color: '#ef4444', fontSize: '0.82rem', marginBottom: '1rem' }}>
                  {authError}
                </p>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Dashboard Layout with Tabs */
          <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
            {/* Sidebar Navigation */}
            <div
              style={{
                width: '210px',
                borderRight: '1px solid var(--border-subtle)',
                background: 'var(--bg-secondary)',
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem 0.5rem',
                gap: '0.35rem',
                flexShrink: 0
              }}
            >
              {[
                { id: 'profile', label: 'Profile & Bio', icon: User },
                { id: 'experiences', label: 'Experiences', icon: Briefcase },
                { id: 'projects', label: 'Projects', icon: FolderGit2 },
                { id: 'skills', label: 'Skills', icon: Cpu },
                { id: 'services', label: 'Services', icon: Layers },
                { id: 'messages', label: `Messages (${portfolio.messages.length})`, icon: Inbox },
                { id: 'database', label: 'Supabase DB', icon: Database }
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem 0.9rem',
                      borderRadius: '10px',
                      border: 'none',
                      background: isActive ? 'var(--badge-bg)' : 'transparent',
                      color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <Icon size={17} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Tab Body (Scrollable) */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
              
              {saveNotification && (
                <div
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#10b981',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Check size={16} /> {saveNotification}
                </div>
              )}

              {/* 1. PROFILE TAB */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfile}>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Edit Personal Profile</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Headline Role</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileForm.headline}
                        onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Hero Subtitle</label>
                    <input
                      type="text"
                      className="form-input"
                      value={profileForm.subtitle}
                      onChange={(e) => setProfileForm({ ...profileForm, subtitle: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Bio Description</label>
                    <textarea
                      className="form-textarea"
                      rows={4}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-input"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-input"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Resume PDF URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={profileForm.resumeUrl}
                        onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Experience Letter URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={profileForm.experienceLetterUrl}
                        onChange={(e) => setProfileForm({ ...profileForm, experienceLetterUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">GitHub URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={profileForm.githubUrl}
                        onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">LinkedIn URL</label>
                      <input
                        type="url"
                        className="form-input"
                        value={profileForm.linkedinUrl}
                        onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    <Save size={16} /> Save Profile Changes
                  </button>
                </form>
              )}

              {/* 2. EXPERIENCES TAB */}
              {activeTab === 'experiences' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.25rem' }}>Manage Experience Timeline</h4>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {portfolio.experiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="glass-panel"
                        style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}
                      >
                        <div>
                          <h5 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{exp.role}</h5>
                          <p style={{ color: 'var(--accent-cyan)', fontSize: '0.88rem' }}>{exp.company} &bull; {exp.period}</p>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{exp.description}</p>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${exp.role} at ${exp.company}?`)) {
                              portfolio.deleteExperience(exp.id)
                            }
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Projects Repository</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {portfolio.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="glass-panel"
                        style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}
                      >
                        <div>
                          <h5 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{proj.title}</h5>
                          <p style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>{proj.tagline}</p>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>{proj.description}</p>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete project ${proj.title}?`)) {
                              portfolio.deleteProject(proj.id)
                            }
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. SKILLS TAB */}
              {activeTab === 'skills' && (
                <div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Skills Inventory</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                    {portfolio.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="glass-panel"
                        style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.88rem' }}>{skill.name}</p>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{skill.category}</span>
                        </div>
                        <button
                          onClick={() => portfolio.deleteSkill(skill.id)}
                          style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. SERVICES TAB */}
              {activeTab === 'services' && (
                <div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Client Services</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {portfolio.services.map((srv) => (
                      <div key={srv.id} className="glass-panel" style={{ padding: '1.25rem' }}>
                        <h5 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{srv.title}</h5>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>{srv.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. MESSAGES INBOX TAB */}
              {activeTab === 'messages' && (
                <div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Contact Messages Inbox</h4>
                  {portfolio.messages.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>No messages received yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {portfolio.messages.map((msg) => (
                        <div key={msg.id} className="glass-panel" style={{ padding: '1.25rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 700 }}>{msg.name} ({msg.email})</span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                              {new Date(msg.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>{msg.subject}</p>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                            {msg.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 7. DATABASE CONFIGURATION & SQL SCRIPT */}
              {activeTab === 'database' && (
                <div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Supabase PostgreSQL Setup</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Connect your free Supabase project to enable real-time cloud persistence and authentication.
                  </p>

                  <form onSubmit={handleSaveSupabaseConfig} style={{ marginBottom: '2rem' }}>
                    <div className="form-group">
                      <label className="form-label">Supabase Project URL</label>
                      <input
                        type="url"
                        className="form-input"
                        placeholder="https://xyzcompany.supabase.co"
                        value={supabaseUrl}
                        onChange={(e) => setSupabaseUrl(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Supabase Anon Key (Public Key Only)</label>
                      <input
                        type="password"
                        className="form-input"
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI..."
                        value={supabaseKey}
                        onChange={(e) => setSupabaseKey(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm">
                      <Save size={15} /> Save Supabase Keys
                    </button>
                  </form>

                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>1-Click Database Setup SQL</span>
                      <button onClick={handleCopySql} className="btn btn-secondary btn-sm">
                        {copiedSql ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        {copiedSql ? 'Copied to Clipboard!' : 'Copy SQL'}
                      </button>
                    </div>
                    <pre
                      style={{
                        padding: '1rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        maxHeight: '220px',
                        overflowY: 'auto',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {sqlCode}
                    </pre>
                  </div>

                  <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                    <button
                      onClick={() => {
                        if (window.confirm('Reset all portfolio details back to the verified resume data?')) {
                          portfolio.resetToDefault()
                          setProfileForm({ ...portfolio.profile })
                          triggerNotification('Reset to original resume data completed!')
                        }
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ color: 'var(--accent-amber)', borderColor: 'rgba(255, 160, 72, 0.3)' }}
                    >
                      <RefreshCw size={14} /> Reset to Default Resume Data
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

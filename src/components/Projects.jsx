import { useState } from 'react'
import {
  X,
  Code2,
  Play,
  CheckCircle2,
  Terminal,
  Copy,
  Check,
  FolderGit2,
  Globe,
  Sparkles
} from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

export const Projects = () => {
  const { projects } = usePortfolio()
  const [filter, setFilter] = useState('All')
  const [activeModalProject, setActiveModalProject] = useState(null)
  const [actionType, setActionType] = useState('demo') // 'demo' | 'source'
  const [copiedText, setCopiedText] = useState('')

  // Category filter groups
  const categories = ['All', 'Weddings', 'Confectionery', 'Fine Dining', 'Luxury Gifting']

  const filteredProjects = projects.filter((p) => {
    if (filter === 'All') return true
    if (filter === 'Weddings') return p.category?.toLowerCase().includes('wedding')
    if (filter === 'Confectionery') return p.category?.toLowerCase().includes('confectionery') || p.category?.toLowerCase().includes('sweets')
    if (filter === 'Fine Dining') return p.category?.toLowerCase().includes('dining') || p.category?.toLowerCase().includes('restaurant')
    if (filter === 'Luxury Gifting') return p.category?.toLowerCase().includes('gifting')
    return true
  })

  const handleActionClick = (project, type) => {
    // If a verified live demo URL exists, open it directly
    if (type === 'demo' && project.liveDemoUrl && project.liveDemoUrl.startsWith('http')) {
      window.open(project.liveDemoUrl, '_blank', 'noopener,noreferrer')
      return
    }

    // If a verified GitHub URL exists, open it directly
    if (type === 'source' && project.githubUrl && project.githubUrl.startsWith('http')) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
      return
    }

    // Otherwise open informative local preview & deployment guide modal
    setActiveModalProject(project)
    setActionType(type)
    setCopiedText('')
  }

  const handleCopy = (text, label) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text)
      setCopiedText(label)
      setTimeout(() => setCopiedText(''), 2500)
    }
  }

  return (
    <section id="projects" className="section-wrapper">
      <div className="container">

        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={13} />
            Original Frontend Projects
          </span>
          <h2 className="section-title">Authentic Business Web Applications</h2>
          <p className="section-subtitle">
            Four independent, fully functional React + Vite web applications inspired by prominent Rajasthan & Indian businesses. Engineered with original architecture, responsive layouts, and interactive business workflows.
          </p>
        </div>

        {/* Filter Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.65rem',
            marginBottom: '3rem'
          }}
        >
          {categories.map((cat) => {
            const isActive = filter === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '100px',
                  border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'var(--badge-bg)' : 'var(--bg-card)',
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat === 'All' ? `All Projects (${projects.length})` : cat}
              </button>
            )
          })}
        </div>

        {/* Projects Grid: 2 Columns for spacious, prominent presentation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card"
            >
              {/* Card Image Preview with Badges */}
              <div className="project-card-image-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-img"
                  loading="lazy"
                />
                <div className="project-card-overlay" />

                {/* Top Overlay Badges */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    right: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    zIndex: 2
                  }}
                >
                  {/* Category Badge */}
                  <span
                    style={{
                      background: 'rgba(5, 7, 12, 0.75)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      color: 'var(--accent-cyan)',
                      border: '1px solid var(--border-subtle)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '100px',
                      fontSize: '0.74rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      letterSpacing: '0.02em'
                    }}
                  >
                    {project.category}
                  </span>

                  {/* Personal Project Demo Badge */}
                  <span
                    style={{
                      background: 'rgba(5, 7, 12, 0.75)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      color: 'var(--text-primary)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '100px',
                      fontSize: '0.72rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: '#10b981',
                        boxShadow: '0 0 8px #10b981'
                      }}
                    />
                    Personal Project / Demo
                  </span>
                </div>
              </div>

              {/* Card Body Content */}
              <div
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}
              >
                {/* Title & Tagline */}
                <h3
                  style={{
                    fontSize: '1.45rem',
                    marginBottom: '0.35rem',
                    fontWeight: 700,
                    letterSpacing: '-0.01em'
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--accent-cyan)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '1rem',
                    fontWeight: 500
                  }}
                >
                  {project.tagline}
                </p>

                {/* Short Description */}
                <p
                  style={{
                    fontSize: '0.92rem',
                    lineHeight: '1.65',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.5rem'
                  }}
                >
                  {project.description}
                </p>

                {/* Key Features List */}
                {project.features && project.features.length > 0 && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                        display: 'block',
                        marginBottom: '0.65rem'
                      }}
                    >
                      Key Features & Architecture
                    </span>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.55rem'
                      }}
                    >
                      {project.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.55rem',
                            fontSize: '0.84rem',
                            color: 'var(--text-primary)',
                            lineHeight: '1.45'
                          }}
                        >
                          <CheckCircle2
                            size={14}
                            style={{
                              color: 'var(--accent-cyan)',
                              flexShrink: 0,
                              marginTop: '2px'
                            }}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies Used Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div style={{ marginTop: 'auto', marginBottom: '1.75rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            fontSize: '0.74rem',
                            padding: '0.22rem 0.6rem',
                            borderRadius: '6px',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-subtle)',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons: Live Demo & Source Code */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '1.25rem'
                  }}
                >
                  <a
                    href={project.liveDemoUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, textDecoration: 'none' }}
                    onClick={(e) => {
                      if (!project.liveDemoUrl || !project.liveDemoUrl.startsWith('http')) {
                        e.preventDefault()
                        handleActionClick(project, 'demo')
                      }
                    }}
                  >
                    <Play size={14} /> Live Demo
                  </a>

                  <a
                    href={project.githubUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, textDecoration: 'none' }}
                    onClick={(e) => {
                      if (!project.githubUrl || !project.githubUrl.startsWith('http')) {
                        e.preventDefault()
                        handleActionClick(project, 'source')
                      }
                    }}
                  >
                    <Code2 size={14} /> Source Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Interactive Modal for Preview / Source Access */}
      {activeModalProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: 'rgba(5, 7, 12, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '580px',
              padding: '2.25rem',
              background: 'var(--bg-primary)',
              borderRadius: '20px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.25rem'
              }}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            {/* Badge Indicator */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '8px',
                background: 'var(--badge-bg)',
                color: 'var(--accent-cyan)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                marginBottom: '1rem',
                border: '1px solid var(--badge-border)'
              }}
            >
              {actionType === 'demo' ? <Globe size={13} /> : <FolderGit2 size={13} />}
              <span>
                {actionType === 'demo' ? 'Live Demo Environment' : 'Independent Source Repository'}
              </span>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>
              {activeModalProject.title}
            </h3>

            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--accent-cyan)',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {activeModalProject.category} • {activeModalProject.repoName}
            </p>

            {/* Action Content */}
            {actionType === 'demo' ? (
              <div>
                <p
                  style={{
                    fontSize: '0.92rem',
                    lineHeight: '1.65',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.25rem'
                  }}
                >
                  This project has completed full development and passed production build verification (`dist/` generated with zero errors). It is configured to run locally on port <strong>{activeModalProject.localPort}</strong> or deploy instantly to Netlify / Vercel.
                </p>

                {/* Local Terminal Run Box */}
                <div
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    marginBottom: '1.5rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                      color: 'var(--text-muted)',
                      fontSize: '0.75rem'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Terminal size={12} /> Local Preview Command
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          `cd projects/${activeModalProject.repoName} && npm run dev`,
                          'run-cmd'
                        )
                      }
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: copiedText === 'run-cmd' ? '#10b981' : 'var(--accent-cyan)',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      {copiedText === 'run-cmd' ? (
                        <>
                          <Check size={12} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <code
                    style={{
                      display: 'block',
                      color: 'var(--accent-cyan)',
                      fontSize: '0.85rem'
                    }}
                  >
                    cd projects/{activeModalProject.repoName} ; npm run dev
                  </code>
                  <span
                    style={{
                      display: 'block',
                      marginTop: '0.35rem',
                      color: 'var(--text-muted)',
                      fontSize: '0.75rem'
                    }}
                  >
                    Default URL: http://localhost:{activeModalProject.localPort}/
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <p
                  style={{
                    fontSize: '0.92rem',
                    lineHeight: '1.65',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.25rem'
                  }}
                >
                  The complete source code has been organized into an independent Git repository located inside <code>projects/{activeModalProject.repoName}</code> with clean components, CSS, and assets.
                </p>

                {/* Git Instructions Box */}
                <div
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    marginBottom: '1.5rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                      color: 'var(--text-muted)',
                      fontSize: '0.75rem'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Terminal size={12} /> Push to Your GitHub Repo
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          `cd projects/${activeModalProject.repoName}\ngit remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/${activeModalProject.repoName}.git\ngit branch -M main\ngit push -u origin main`,
                          'git-cmd'
                        )
                      }
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: copiedText === 'git-cmd' ? '#10b981' : 'var(--accent-cyan)',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      {copiedText === 'git-cmd' ? (
                        <>
                          <Check size={12} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem',
                      whiteSpace: 'pre-wrap',
                      lineHeight: '1.5'
                    }}
                  >
                    {`cd projects/${activeModalProject.repoName}\ngit remote add origin https://github.com/<USER>/${activeModalProject.repoName}.git\ngit branch -M main\ngit push -u origin main`}
                  </pre>
                </div>
              </div>
            )}

            {/* Modal Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => {
                  const contactSec = document.getElementById('contact')
                  setActiveModalProject(null)
                  if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                Inquire / Get in Touch
              </button>
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="btn btn-secondary btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

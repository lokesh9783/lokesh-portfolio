import { GraduationCap, MapPin, Mail, Award, BookOpen, Music, PenTool, Film } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './common/SocialIcons'
import { usePortfolio } from '../context/PortfolioContext'

export const About = () => {
  const { profile, educations } = usePortfolio()

  const interestIcons = {
    'search': BookOpen,
    'pen-tool': PenTool,
    'music': Music,
    'film': Film,
    'book-open': BookOpen
  }

  return (
    <section id="about" className="section-wrapper">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">Background & Academic Foundation</h2>
          <p className="section-subtitle">
            Combining analytical rigor with digital problem-solving.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'start'
          }}
        >
          {/* Narrative Bio & Contact Fast-Card */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>
              Solving Complex Problems with Precision
            </h3>
            <p style={{ lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {profile.bio}
            </p>
            <p style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
              Whether extracting high-value prospective leads for sales teams, maintaining immaculate CRM pipelines, or engineering performant web interfaces, I approach every project with structured precision, proactive communication, and complete accountability.
            </p>

            {/* Quick Meta List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '1.5rem',
                fontSize: '0.9rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <MapPin size={18} color="var(--accent-cyan)" />
                <span style={{ color: 'var(--text-secondary)' }}>Based in:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{profile.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Mail size={18} color="var(--accent-amber)" />
                <span style={{ color: 'var(--text-secondary)' }}>Email:</span>
                <a
                  href={`mailto:${profile.email}`}
                  style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'underline' }}
                >
                  {profile.email}
                </a>
              </div>
            </div>

            {/* Social Profile Links */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  aria-label="GitHub profile"
                >
                  <GithubIcon size={16} /> GitHub
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  aria-label="LinkedIn profile"
                >
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Education & Personal Interests */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Education Cards */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div
                  style={{
                    padding: '0.5rem',
                    borderRadius: '10px',
                    background: 'var(--badge-bg)',
                    color: 'var(--accent-cyan)'
                  }}
                >
                  <GraduationCap size={22} />
                </div>
                <h3 style={{ fontSize: '1.25rem' }}>Education</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {educations.map((edu) => (
                  <div
                    key={edu.id}
                    style={{
                      borderLeft: '2px solid var(--accent-cyan)',
                      paddingLeft: '1.25rem'
                    }}
                  >
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{edu.degree}</h4>
                    <p style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.92rem' }}>
                      {edu.institution}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                      {edu.location}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                      {edu.highlights}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Interests from original portfolio */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Interests & Creative Pursuits
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span className="badge" style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}>
                  <PenTool size={14} /> Creative Writing
                </span>
                <span className="badge" style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}>
                  <Music size={14} /> Music
                </span>
                <span className="badge" style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}>
                  <Film size={14} /> Video & Visual Editing
                </span>
                <span className="badge" style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}>
                  <BookOpen size={14} /> Technical Reading
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

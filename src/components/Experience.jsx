import { Briefcase, Calendar, MapPin, CheckCircle, FileText, Download } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

export const Experience = () => {
  const { experiences, profile } = usePortfolio()

  return (
    <section id="experience" className="section-wrapper" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Career History</span>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            Demonstrated track record across enterprise operations, virtual support, and software routines.
          </p>
        </div>

        {/* Timeline Container */}
        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
          
          {/* Vertical Track Line */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              bottom: '1.5rem',
              left: '20px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent-cyan), var(--border-subtle))',
              zIndex: 1
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  position: 'relative',
                  zIndex: 2,
                  paddingLeft: '55px'
                }}
              >
                {/* Timeline Node Point */}
                <div
                  style={{
                    position: 'absolute',
                    left: '11px',
                    top: '6px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: exp.current ? 'var(--accent-cyan)' : 'var(--bg-card)',
                    border: '3px solid var(--accent-cyan)',
                    boxShadow: exp.current ? '0 0 12px var(--accent-cyan)' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                />

                {/* Experience Card */}
                <div
                  className="glass-panel"
                  style={{
                    padding: '2rem',
                    width: '100%',
                    borderLeft: exp.current ? '3px solid var(--accent-cyan)' : '1px solid var(--border-subtle)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      marginBottom: '0.5rem'
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                        {exp.role}
                      </h3>
                      <h4
                        style={{
                          fontSize: '1rem',
                          color: 'var(--accent-cyan)',
                          fontWeight: 600,
                          marginTop: '0.2rem'
                        }}
                      >
                        {exp.company}
                      </h4>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {exp.current && (
                        <span
                          className="badge"
                          style={{
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#10b981',
                            borderColor: 'rgba(16, 185, 129, 0.3)'
                          }}
                        >
                          Current Role
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.82rem',
                          color: 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <Calendar size={14} /> {exp.period}
                      </span>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <MapPin size={14} /> {exp.location}
                  </p>

                  <p style={{ lineHeight: '1.7', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
                    {exp.description}
                  </p>

                  {/* Skills Pills */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            fontSize: '0.78rem',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '6px',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-subtle)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Experience Verification Banner */}
          <div
            className="glass-panel"
            style={{
              marginTop: '3.5rem',
              padding: '1.75rem',
              textAlign: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                Verified Credentials & Experience Letter
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Official letters, certificates, and full resume available for inspection.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {profile.experienceLetterUrl && (
                <a
                  href={profile.experienceLetterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <FileText size={16} /> View Letter
                </a>
              )}
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <Download size={16} /> Get Resume
                </a>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

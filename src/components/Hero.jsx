import { Download, Briefcase, Mail, Sparkles, Code2, Database, SearchCheck, BriefcaseBusiness } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

export const Hero = () => {
  const { profile } = usePortfolio()

  // Four floating icon cards with distinct accents and subtle float animation delays
  const floatingCards = [
    {
      id: 'data-research',
      label: 'Data Research & Lead Generation',
      icon: SearchCheck,
      color: 'var(--accent-cyan)',
      borderColor: 'rgba(0, 210, 255, 0.35)',
      glowColor: 'var(--accent-cyan-glow)',
      animationDelay: '0s'
    },
    {
      id: 'data-mgmt',
      label: 'Data Management & CRM',
      icon: Database,
      color: 'var(--accent-blue)',
      borderColor: 'rgba(59, 130, 246, 0.35)',
      glowColor: 'rgba(59, 130, 246, 0.2)',
      animationDelay: '0.8s'
    },
    {
      id: 'prof-exp',
      label: 'Professional Experience & Operations',
      icon: BriefcaseBusiness,
      color: 'var(--accent-amber)',
      borderColor: 'rgba(255, 160, 72, 0.35)',
      glowColor: 'var(--accent-amber-glow)',
      animationDelay: '1.6s'
    },
    {
      id: 'web-dev',
      label: 'Web Development',
      icon: Code2,
      color: '#a855f7',
      borderColor: 'rgba(168, 85, 247, 0.35)',
      glowColor: 'rgba(168, 85, 247, 0.2)',
      animationDelay: '2.4s'
    }
  ]

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '7rem',
        paddingBottom: '4rem',
        position: 'relative'
      }}
    >
      <div className="container">
        
        {/* Main Hero Split: Left text, Right portrait with vertical floating icon stack */}
        <div className="hero-content-wrapper">
          
          {/* Left Column: Text & CTAs */}
          <div className="hero-text-col">
            
            {/* Availability Status Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.45rem 1.1rem',
                borderRadius: '100px',
                background: 'var(--badge-bg)',
                border: '1px solid var(--badge-border)',
                marginBottom: '1.75rem',
                backdropFilter: 'blur(8px)'
              }}
            >
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 10px #10b981'
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  letterSpacing: '0.02em'
                }}
              >
                {profile.availability}
              </span>
            </div>

            {/* Cinematic Title & Dual Purpose Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem'
              }}
            >
              Hi, I'm <span className="gradient-text">{profile.name}</span>.
            </h1>

            <h2
              style={{
                fontSize: 'clamp(1.15rem, 2.5vw, 1.7rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.35,
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-heading)'
              }}
            >
              {profile.headline}
            </h2>

            <p
              style={{
                fontSize: 'clamp(1.02rem, 1.8vw, 1.15rem)',
                color: 'var(--text-secondary)',
                maxWidth: '620px',
                marginBottom: '2.5rem',
                lineHeight: 1.7
              }}
            >
              {profile.subtitle}
            </p>

            {/* Action CTAs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
            >
              <a href="#contact" className="btn btn-primary">
                <Mail size={18} /> Get in Touch
              </a>
              <a href="#projects" className="btn btn-secondary">
                <Code2 size={18} /> View Projects
              </a>
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Download size={18} /> Resume PDF
                </a>
              )}
            </div>

          </div>

          {/* Right Column: Portrait with 4 Floating Icon Cards to the Right */}
          <div className="hero-portrait-stage">
            <div className="hero-portrait-wrapper">
              
              {/* Subtle ambient aura */}
              <div className="hero-portrait-aura" />

              {/* Lokesh's Portrait Cutout */}
              <img
                src="/images/lokesh-portrait.png"
                alt={profile.name}
                className="hero-portrait-image"
                loading="eager"
              />

              {/* Vertical Stack of 4 Floating Icon Cards to the Right */}
              <div
                className="hero-floating-stack"
                role="region"
                aria-label="Core Skill and Experience Highlights"
              >
                {floatingCards.map((card) => {
                  const Icon = card.icon
                  return (
                    <div
                      key={card.id}
                      className="hero-icon-card"
                      style={{
                        borderColor: card.borderColor,
                        boxShadow: `0 8px 24px rgba(0, 0, 0, 0.35), 0 0 16px ${card.glowColor}`,
                        animationDelay: card.animationDelay
                      }}
                      tabIndex="0"
                      role="button"
                      aria-label={card.label}
                    >
                      <Icon size={23} color={card.color} strokeWidth={2} />
                      <span className="icon-tooltip">{card.label}</span>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>

        </div>

        {/* Existing Quick Credibility Cards (Preserved Exactly) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            textAlign: 'left'
          }}
        >
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                color: 'var(--accent-cyan)',
                marginBottom: '0.4rem'
              }}
            >
              <Briefcase size={20} />
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Enterprise Experience</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Associate at Wipro Jaipur, VA at Get Catalyzed & Get It Ready.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                color: 'var(--accent-amber)',
                marginBottom: '0.4rem'
              }}
            >
              <Database size={20} />
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Data & Research</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Targeted B2B Lead Gen, Web Scraping, Cleansing & CRM Management.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                color: 'var(--accent-blue)',
                marginBottom: '0.4rem'
              }}
            >
              <Sparkles size={20} />
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Web Engineering</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Modern responsive React & JavaScript development with zero fluff.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

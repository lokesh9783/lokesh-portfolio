import { ArrowUp, Shield, Database, Heart } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

export const Footer = ({ onOpenAdmin }) => {
  const { isSupabaseLive } = usePortfolio()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-primary)',
        padding: '3rem 0',
        marginTop: '2rem',
        fontSize: '0.88rem',
        color: 'var(--text-secondary)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          {/* Brand & Copyright */}
          <div>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              &copy; {new Date().getFullYear()} Lokesh Kumawat. All rights reserved.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Virtual Assistant & Data Specialist | Web Developer
            </p>
          </div>

          {/* Database & Admin Status Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.78rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '100px',
                background: isSupabaseLive ? 'rgba(16, 185, 129, 0.1)' : 'var(--badge-bg)',
                border: isSupabaseLive ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid var(--badge-border)',
                color: isSupabaseLive ? '#10b981' : 'var(--accent-cyan)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <Database size={13} />
              <span>{isSupabaseLive ? 'Supabase Live DB' : 'Instant Dataset (Ready for Supabase)'}</span>
            </div>

            <button
              onClick={onOpenAdmin}
              title="Admin CMS"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.8rem',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <Shield size={14} /> Admin
            </button>

            <button
              onClick={scrollToTop}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.4rem 0.8rem', borderRadius: '8px' }}
              aria-label="Back to top"
            >
              <ArrowUp size={15} /> Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

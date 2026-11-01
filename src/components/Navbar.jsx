import { useState, useEffect } from 'react'
import { Menu, X, Shield, ExternalLink, ArrowRight } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

export const Navbar = ({ onOpenAdmin }) => {
  const { profile } = usePortfolio()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Services', href: '#services' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Credentials', href: '#credentials' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: scrolled ? '1rem' : '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: scrolled ? 'calc(100% - 2rem)' : 'calc(100% - 3rem)',
          maxWidth: '1100px',
          zIndex: 1000,
          background: scrolled ? 'var(--bg-glass-nav)' : 'var(--bg-glass)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '20px',
          padding: '0.75rem 1.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: scrolled ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
          transition: 'all var(--transition-normal)'
        }}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-cyan), #0099ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#07090e',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              letterSpacing: '-0.02em',
              boxShadow: '0 2px 10px var(--accent-cyan-glow)'
            }}
          >
            LK
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em'
              }}
            >
              {profile.name}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                color: 'var(--accent-cyan)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              VA & Developer
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.5rem',
            '@media (min-width: 900px)': { display: 'flex' }
          }}
          className="desktop-nav-links"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{
                fontSize: '0.88rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Controls: Admin + Mobile trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Admin Panel Entry */}
          <button
            onClick={onOpenAdmin}
            title="Open Admin CMS"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-cyan)'
              e.currentTarget.style.color = 'var(--accent-cyan)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            <Shield size={17} />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="mobile-menu-trigger"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '5.5rem',
            left: '1.5rem',
            right: '1.5rem',
            background: 'var(--bg-glass-nav)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '1.5rem',
            zIndex: 999,
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                padding: '0.6rem 0.5rem',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {link.label}
              <ArrowRight size={16} color="var(--accent-cyan)" />
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenAdmin()
            }}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '0.5rem', width: '100%' }}
          >
            <Shield size={16} /> Admin CMS
          </button>
        </div>
      )}

      {/* Global CSS for desktop media query display */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav-links {
            display: flex !important;
          }
          .mobile-menu-trigger {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}

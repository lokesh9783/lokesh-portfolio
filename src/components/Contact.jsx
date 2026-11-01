import { useState } from 'react'
import { Mail, MapPin, Send, CheckCircle2, Clock, MessageSquare } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './common/SocialIcons'
import { usePortfolio } from '../context/PortfolioContext'

export const Contact = () => {
  const { profile, submitContactMessage } = usePortfolio()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setStatus('submitting')
    try {
      await submitContactMessage(formData)
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('Contact error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-wrapper">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Let's Connect</span>
          <h2 className="section-title">Start a Conversation</h2>
          <p className="section-subtitle">
            Hiring for a full-time role or looking for freelance support? Reach out directly.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            maxWidth: '1050px',
            margin: '0 auto',
            alignItems: 'start'
          }}
        >
          {/* Contact Direct Info Card */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>
              Direct Contact Details
            </h3>
            <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              I am open to full-time roles in Virtual Assistance, Data Research, and Web Support, as well as select freelance projects. Let's discuss how I can contribute to your team.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--badge-bg)',
                    color: 'var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--badge-border)'
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Address</span>
                  <a
                    href={`mailto:${profile.email}`}
                    style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--badge-bg)',
                    color: 'var(--accent-cyan)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--badge-border)'
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location</span>
                  <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {profile.location}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(16, 185, 129, 0.25)'
                  }}
                >
                  <Clock size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Response Time</span>
                  <span style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: '#10b981' }}>
                    Within 24 Hours
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p
                style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '0.75rem',
                  fontWeight: 600
                }}
              >
                Connect Online
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <LinkedinIcon size={16} /> LinkedIn
                  </a>
                )}
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <GithubIcon size={16} /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>
              Send an Inquiry
            </h3>

            {status === 'success' ? (
              <div
                style={{
                  padding: '2rem',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={42} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#10b981' }}>
                  Message Received!
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Thank you for reaching out. Your message has been safely recorded, and I will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn btn-secondary btn-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    Your Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="e.g. john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject-field">
                    Subject
                  </label>
                  <input
                    id="contact-subject-field"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Virtual Assistant Role / Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    className="form-textarea"
                    placeholder="Provide details about your requirement, timeline, or position..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  {status === 'submitting' ? (
                    'Delivering...'
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}

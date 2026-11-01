import { FileCheck, Download, ExternalLink, ShieldCheck, Award } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

export const Certificates = () => {
  const { certificates, profile } = usePortfolio()

  return (
    <section id="credentials" className="section-wrapper" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Formal Documents</span>
          <h2 className="section-title">Verified Credentials & Resume</h2>
          <p className="section-subtitle">
            Authentic certificates, verified work experience letter, and my comprehensive resume.
          </p>
        </div>

        {/* Credentials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            maxWidth: '900px',
            margin: '0 auto 3rem auto'
          }}
        >
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="glass-panel"
              style={{
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem'
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(16, 185, 129, 0.25)'
                    }}
                  >
                    <ShieldCheck size={22} />
                  </div>

                  <span
                    className="badge"
                    style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      borderColor: 'rgba(16, 185, 129, 0.25)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {cert.type}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>
                  {cert.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--accent-cyan)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '1rem'
                  }}
                >
                  Issued by: {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                </p>

                <p style={{ fontSize: '0.92rem', lineHeight: '1.65', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
                  {cert.description}
                </p>
              </div>

              {/* Download / View Button */}
              {cert.fileUrl && (
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                >
                  <Download size={16} /> Download Verified Document
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Accreditation Callout */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Looking for historical certificates or academic transcripts?
          </p>
          <a
            href="#contact"
            className="btn btn-secondary btn-sm"
            style={{
              display: 'inline-flex'
            }}
          >
            <ShieldCheck size={15} /> Request Additional Accreditations
          </a>
        </div>

      </div>
    </section>
  )
}

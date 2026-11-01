import { Target, Headphones, Database, Globe, CheckCircle, ArrowRight } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

export const Services = () => {
  const { services } = usePortfolio()

  const serviceIcons = {
    'srv-1': Target,
    'srv-2': Headphones,
    'srv-3': Database,
    'srv-4': Globe
  }

  const handleInquire = (serviceTitle) => {
    const contactSection = document.getElementById('contact')
    const subjectInput = document.getElementById('contact-subject-field')
    if (subjectInput) {
      subjectInput.value = `Inquiry: ${serviceTitle}`
    }
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="section-wrapper">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Client Solutions</span>
          <h2 className="section-title">Freelance & Contract Services</h2>
          <p className="section-subtitle">
            Reliable support tailored to accelerate your business growth and free up your focus.
          </p>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {services.map((service, index) => {
            const Icon = serviceIcons[service.id] || Target
            return (
              <div
                key={service.id}
                className="glass-panel"
                style={{
                  padding: '2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Badge & Icon Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'var(--badge-bg)',
                        color: 'var(--accent-cyan)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--badge-border)'
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    {service.badge && (
                      <span className="badge" style={{ fontFamily: 'var(--font-mono)' }}>
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.85rem' }}>
                    {service.title}
                  </h3>

                  <p style={{ fontSize: '0.92rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                      <p
                        style={{
                          fontSize: '0.78rem',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                          color: 'var(--accent-cyan)',
                          letterSpacing: '0.05em',
                          marginBottom: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        Key Deliverables
                      </p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {service.deliverables.map((item, dIdx) => (
                          <li
                            key={dIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              fontSize: '0.85rem',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            <CheckCircle size={15} color="var(--accent-cyan)" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Inquiry Action */}
                <button
                  onClick={() => handleInquire(service.title)}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span>Inquire for this Service</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

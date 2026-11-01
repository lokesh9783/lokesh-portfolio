import { useState } from 'react'
import { Sparkles, Check } from 'lucide-react'
import { usePortfolio } from '../context/PortfolioContext'

export const Skills = () => {
  const { skills } = usePortfolio()
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Data & VA', 'Tools & Productivity', 'Web Development', 'Creative & Design']

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="section-wrapper" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Competencies</span>
          <h2 className="section-title">Verified Skill Set</h2>
          <p className="section-subtitle">
            Core operational tools, data methodologies, and programming languages directly from my experience.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.6rem',
            marginBottom: '3rem'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.55rem 1.2rem',
                borderRadius: '100px',
                border: activeCategory === cat ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                background: activeCategory === cat ? 'var(--badge-bg)' : 'var(--bg-card)',
                color: activeCategory === cat ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-panel"
              style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {skill.name}
                </h4>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {skill.category}
                </span>
              </div>

              <span
                className="badge"
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {skill.level}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

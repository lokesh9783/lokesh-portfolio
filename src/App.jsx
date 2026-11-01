import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { PortfolioProvider } from './context/PortfolioContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Services } from './components/Services'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Certificates } from './components/Certificates'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { AdminModal } from './admin/AdminModal'

function PortfolioApp() {
  const [adminOpen, setAdminOpen] = useState(false)

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Ambient Glow Atmosphere */}
      <div className="ambient-glow-mesh">
        <div className="glow-orb-cyan" />
        <div className="glow-orb-amber" />
      </div>

      {/* Navigation */}
      <Navbar onOpenAdmin={() => setAdminOpen(true)} />

      {/* Main Content Sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Experience />
        <Services />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* Secure Admin CMS Modal */}
      <AdminModal isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <PortfolioApp />
      </PortfolioProvider>
    </ThemeProvider>
  )
}

import { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext({ theme: 'dark' })

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    document.documentElement.style.colorScheme = 'dark'
    if (typeof window !== 'undefined') {
      localStorage.setItem('lk_portfolio_theme', 'dark')
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

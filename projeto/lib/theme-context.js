import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
    isDark: false,
    toggleTheme: () => { },
    theme: 'light'
})

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        // Retorna valores padrão em vez de erro para evitar problemas de SSR
        return {
            isDark: false,
            toggleTheme: () => { },
            theme: 'light'
        }
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Verificar se estamos no browser
        if (typeof window === 'undefined') return

        // Verificar preferência do sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        // Verificar localStorage
        const stored = localStorage.getItem('theme')

        if (stored) {
            setIsDark(stored === 'dark')
        } else {
            setIsDark(mediaQuery.matches)
        }

        // Listener para mudanças na preferência do sistema
        const handleChange = (e) => {
            if (!localStorage.getItem('theme')) {
                setIsDark(e.matches)
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    useEffect(() => {
        if (mounted && typeof window !== 'undefined') {
            const root = document.documentElement
            if (isDark) {
                root.classList.add('dark')
            } else {
                root.classList.remove('dark')
            }

            // Salvar no localStorage
            localStorage.setItem('theme', isDark ? 'dark' : 'light')
        }
    }, [isDark, mounted])

    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    const value = {
        isDark: mounted ? isDark : false,
        toggleTheme,
        theme: mounted ? (isDark ? 'dark' : 'light') : 'light'
    }

    // Durante SSR ou antes da hidratação, renderizar sem estilos específicos de tema
    return (
        <ThemeContext.Provider value={value}>
            <div className={mounted ? '' : 'opacity-0'}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default ThemeContext

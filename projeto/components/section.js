import { useEffect, useRef } from 'react'
import { animateSection } from '../lib/animation'

const Section = ({ children, delay = 0, className = '', ...props }) => {
    const sectionRef = useRef(null)

    useEffect(() => {
        if (sectionRef.current) {
            animateSection(sectionRef.current, delay * 1000)
        }

        // Fallback: garantir que o conteúdo seja visível após 2 segundos
        const fallbackTimer = setTimeout(() => {
            if (sectionRef.current) {
                sectionRef.current.style.opacity = '1'
                sectionRef.current.style.transform = 'translateY(0)'
            }
        }, Math.max(2000, delay * 1000 + 1000))

        return () => clearTimeout(fallbackTimer)
    }, [delay])

    return (
        <div
            ref={sectionRef}
            className={`mb-6 transition-opacity duration-600 ${className}`}
            style={{ opacity: 1 }} // Fallback inicial
            {...props}
        >
            {children}
        </div>
    )
}

export default Section
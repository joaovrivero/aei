// Animation utilities - Usando CSS transitions por enquanto
// AnimeJS será implementado na Fase 2

// Configurações globais de animação
export const ANIMATION_CONFIG = {
    duration: 800,
    easing: 'ease-in-out',
    delay: 100
}

// Helper para detectar prefers-reduced-motion
export const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Função para animar entrada de seção
export const animateSection = (element, delay = 0) => {
    if (!element) return

    // Se prefers-reduced-motion, mostrar imediatamente sem animação
    if (prefersReducedMotion()) {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
        return
    }

    // Reset inicial
    element.style.opacity = '0'
    element.style.transform = 'translateY(20px)'
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'

    // Aplicar animação após delay
    requestAnimationFrame(() => {
        setTimeout(() => {
            element.style.opacity = '1'
            element.style.transform = 'translateY(0)'
        }, delay)
    })
}

// Função para animar entrada de página
export const animatePageEnter = (element) => {
    if (!element) return

    // Se prefers-reduced-motion, mostrar imediatamente sem animação
    if (prefersReducedMotion()) {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
        return
    }

    // Reset inicial
    element.style.opacity = '0'
    element.style.transform = 'translateY(30px)'

    // Aplicar animação imediatamente
    requestAnimationFrame(() => {
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
    })
}

// Placeholder functions for AnimeJS animations (Fase 2)
export const pageEntranceTimeline = (selector = '.animate-entrance') => {
    console.log('🎬 Page entrance animation placeholder:', selector)
    return Promise.resolve()
}

export const scrollTriggeredAnimations = (selector = '.animate-scroll') => {
    console.log('📜 Scroll triggered animation placeholder:', selector)
    return Promise.resolve()
}

export const morphElement = (fromElement, toElement, _config = {}) => {
    console.log('🔄 Morph animation placeholder:', fromElement, toElement)
    return Promise.resolve()
}

export const textAnimations = {
    typewriter: (selector, _config = {}) => {
        console.log('⌨️ Typewriter animation placeholder:', selector)
        return Promise.resolve()
    },
    reveal: (selector, _config = {}) => {
        console.log('👁️ Text reveal animation placeholder:', selector)
        return Promise.resolve()
    },
    stagger: (selector, _config = {}) => {
        console.log('📝 Text stagger animation placeholder:', selector)
        return Promise.resolve()
    }
}

// Utility functions for CSS transitions
export const cssTransitions = {
    fadeIn: (element, duration = 300) => {
        if (!element) return
        element.style.transition = `opacity ${duration}ms ease-in-out`
        element.style.opacity = '1'
    },
    slideUp: (element, duration = 300) => {
        if (!element) return
        element.style.transition = `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`
        element.style.transform = 'translateY(0)'
        element.style.opacity = '1'
    },
    scale: (element, scale = 1.05, duration = 200) => {
        if (!element) return
        element.style.transition = `transform ${duration}ms ease-in-out`
        element.style.transform = `scale(${scale})`

        setTimeout(() => {
            element.style.transform = 'scale(1)'
        }, duration)
    }
}

// Export named object
const animationUtils = {
    ANIMATION_CONFIG,
    prefersReducedMotion,
    animateSection,
    animatePageEnter,
    pageEntranceTimeline,
    scrollTriggeredAnimations,
    morphElement,
    textAnimations,
    cssTransitions
}

export default animationUtils

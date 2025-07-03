// Animation utilities - AnimeJS Integration
// Usando a versão estável do AnimeJS v3.2.2

// Helper para detectar prefers-reduced-motion
export const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Dynamic import for AnimeJS to handle SSR
const getAnime = async () => {
    if (typeof window === 'undefined') return null
    try {
        const animeModule = await import('animejs/lib/anime.es.js')
        return animeModule.default
    } catch (error) {
        console.warn('AnimeJS not available:', error)
        return null
    }
}

// Função para animar entrada de seção (CSS fallback)
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

// Função para animar entrada de página (CSS fallback)
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

// 1. Timeline de entrada de página
export const pageEntranceTimeline = async (selector = '.animate-entrance') => {
    const anime = await getAnime()
    if (!anime) {
        // Fallback para CSS
        const elements = document.querySelectorAll(selector)
        elements.forEach((el, index) => {
            animateSection(el, index * 100)
        })
        return Promise.resolve()
    }

    const elements = document.querySelectorAll(selector)
    
    if (elements.length === 0) {
        console.log('🎬 No elements found for page entrance animation')
        return Promise.resolve()
    }

    // Reset elements
    anime.set(elements, {
        opacity: 0,
        translateY: 30,
        scale: 0.9
    })

    // Create timeline
    const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 800
    })

    tl.add({
        targets: elements,
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.9, 1],
        delay: anime.stagger(100),
        complete: () => console.log('🎬 Page entrance animation completed')
    })

    return tl.finished
}

// 2. Animações de scroll (IntersectionObserver)
export const scrollTriggeredAnimations = async (selector = '.animate-scroll') => {
    const anime = await getAnime()
    const elements = document.querySelectorAll(selector)
    
    if (elements.length === 0) {
        console.log('📜 No elements found for scroll animation')
        return Promise.resolve()
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (anime) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateX: [-50, 0],
                        rotateY: [-15, 0],
                        duration: 1000,
                        easing: 'easeOutBack',
                        complete: () => {
                            console.log('📜 Scroll animation completed for element')
                            observer.unobserve(entry.target)
                        }
                    })
                } else {
                    // CSS fallback
                    animateSection(entry.target, 0)
                    observer.unobserve(entry.target)
                }
            }
        })
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    })

    elements.forEach(el => {
        if (anime) {
            anime.set(el, { opacity: 0, translateX: -50, rotateY: -15 })
        } else {
            el.style.opacity = '0'
            el.style.transform = 'translateX(-50px) rotateY(-15deg)'
        }
        observer.observe(el)
    })

    console.log('📜 Scroll triggered animations initialized')
    return Promise.resolve()
}

// 3. Morphing de elementos
export const morphElement = async (fromElement, toElement, config = {}) => {
    const anime = await getAnime()
    if (!anime || !fromElement || !toElement) {
        console.log('🔄 Morph animation not available or missing elements')
        return Promise.resolve()
    }

    const defaultConfig = {
        duration: 1200,
        easing: 'easeInOutQuart',
        ...config
    }

    // Get initial and final positions/sizes
    const fromRect = fromElement.getBoundingClientRect()
    const toRect = toElement.getBoundingClientRect()

    // Create morphing animation
    return anime({
        targets: fromElement,
        translateX: toRect.left - fromRect.left,
        translateY: toRect.top - fromRect.top,
        scaleX: toRect.width / fromRect.width,
        scaleY: toRect.height / fromRect.height,
        borderRadius: ['0%', '50%', '0%'],
        duration: defaultConfig.duration,
        easing: defaultConfig.easing,
        complete: () => {
            console.log('🔄 Morph animation completed')
            // Reset transform
            anime.set(fromElement, {
                translateX: 0,
                translateY: 0,
                scaleX: 1,
                scaleY: 1,
                borderRadius: '0%'
            })
        }
    }).finished
}

// 4. Animações de texto (typewriter/reveal)
export const textAnimations = {
    typewriter: async (selector, config = {}) => {
        const anime = await getAnime()
        const elements = document.querySelectorAll(selector)
        
        if (elements.length === 0) {
            console.log('⌨️ No elements found for typewriter animation')
            return Promise.resolve()
        }

        const defaultConfig = {
            duration: 2000,
            delay: 0,
            ...config
        }

        elements.forEach(element => {
            const text = element.textContent
            element.textContent = ''
            
            // Create spans for each character
            const chars = text.split('').map(char => {
                const span = document.createElement('span')
                span.textContent = char === ' ' ? '\u00A0' : char
                span.style.opacity = '0'
                return span
            })
            
            element.append(...chars)

            if (anime) {
                // Animate each character
                anime({
                    targets: chars,
                    opacity: [0, 1],
                    duration: 50,
                    delay: anime.stagger(defaultConfig.duration / chars.length, { start: defaultConfig.delay }),
                    easing: 'linear',
                    complete: () => console.log('⌨️ Typewriter animation completed')
                })
            } else {
                // CSS fallback
                chars.forEach((char, index) => {
                    setTimeout(() => {
                        char.style.opacity = '1'
                    }, (defaultConfig.duration / chars.length) * index + defaultConfig.delay)
                })
            }
        })

        return Promise.resolve()
    },

    reveal: async (selector, config = {}) => {
        const anime = await getAnime()
        const elements = document.querySelectorAll(selector)
        
        if (elements.length === 0) {
            console.log('👁️ No elements found for text reveal animation')
            return Promise.resolve()
        }

        const defaultConfig = {
            duration: 1000,
            delay: 0,
            direction: 'up', // 'up', 'down', 'left', 'right'
            ...config
        }

        elements.forEach(element => {
            const text = element.textContent
            element.innerHTML = `<span style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${text}</span></span>`
            
            const inner = element.querySelector('span span')
            
            const transforms = {
                up: { translateY: '100%' },
                down: { translateY: '-100%' },
                left: { translateX: '100%' },
                right: { translateX: '-100%' }
            }

            if (anime) {
                anime.set(inner, transforms[defaultConfig.direction])

                anime({
                    targets: inner,
                    translateX: 0,
                    translateY: 0,
                    duration: defaultConfig.duration,
                    delay: defaultConfig.delay,
                    easing: 'easeOutExpo',
                    complete: () => console.log('👁️ Text reveal animation completed')
                })
            } else {
                // CSS fallback
                const transform = transforms[defaultConfig.direction]
                Object.keys(transform).forEach(key => {
                    inner.style.transform = `${key}(${transform[key]})`
                })
                
                setTimeout(() => {
                    inner.style.transition = `transform ${defaultConfig.duration}ms ease-out`
                    inner.style.transform = 'translateX(0) translateY(0)'
                }, defaultConfig.delay)
            }
        })

        return Promise.resolve()
    },

    stagger: async (selector, config = {}) => {
        const anime = await getAnime()
        const elements = document.querySelectorAll(selector)
        
        if (elements.length === 0) {
            console.log('📝 No elements found for text stagger animation')
            return Promise.resolve()
        }

        const defaultConfig = {
            duration: 600,
            stagger: 100,
            ...config
        }

        elements.forEach(element => {
            const words = element.textContent.split(' ')
            element.innerHTML = words.map(word => 
                `<span style="display: inline-block; opacity: 0; transform: translateY(20px);">${word}</span>`
            ).join(' ')

            const spans = element.querySelectorAll('span')

            if (anime) {
                anime({
                    targets: spans,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: defaultConfig.duration,
                    delay: anime.stagger(defaultConfig.stagger),
                    easing: 'easeOutBack',
                    complete: () => console.log('📝 Text stagger animation completed')
                })
            } else {
                // CSS fallback
                spans.forEach((span, index) => {
                    setTimeout(() => {
                        span.style.transition = `opacity ${defaultConfig.duration}ms ease-out, transform ${defaultConfig.duration}ms ease-out`
                        span.style.opacity = '1'
                        span.style.transform = 'translateY(0)'
                    }, defaultConfig.stagger * index)
                })
            }
        })

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

// Export everything as default
const animationUtils = {
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

// Animate.css integration utilities
// Provides easy-to-use functions for adding animate.css classes

export const ANIMATE_CSS_CLASSES = {
    // Attention seekers
    bounce: 'animate__bounce',
    flash: 'animate__flash',
    pulse: 'animate__pulse',
    rubberBand: 'animate__rubberBand',
    shakeX: 'animate__shakeX',
    shakeY: 'animate__shakeY',
    headShake: 'animate__headShake',
    swing: 'animate__swing',
    tada: 'animate__tada',
    wobble: 'animate__wobble',
    jello: 'animate__jello',
    heartBeat: 'animate__heartBeat',

    // Back entrances
    backInDown: 'animate__backInDown',
    backInLeft: 'animate__backInLeft',
    backInRight: 'animate__backInRight',
    backInUp: 'animate__backInUp',

    // Bouncing entrances
    bounceIn: 'animate__bounceIn',
    bounceInDown: 'animate__bounceInDown',
    bounceInLeft: 'animate__bounceInLeft',
    bounceInRight: 'animate__bounceInRight',
    bounceInUp: 'animate__bounceInUp',

    // Fading entrances
    fadeIn: 'animate__fadeIn',
    fadeInDown: 'animate__fadeInDown',
    fadeInDownBig: 'animate__fadeInDownBig',
    fadeInLeft: 'animate__fadeInLeft',
    fadeInLeftBig: 'animate__fadeInLeftBig',
    fadeInRight: 'animate__fadeInRight',
    fadeInRightBig: 'animate__fadeInRightBig',
    fadeInUp: 'animate__fadeInUp',
    fadeInUpBig: 'animate__fadeInUpBig',

    // Sliding entrances
    slideInDown: 'animate__slideInDown',
    slideInLeft: 'animate__slideInLeft',
    slideInRight: 'animate__slideInRight',
    slideInUp: 'animate__slideInUp',

    // Zoom entrances
    zoomIn: 'animate__zoomIn',
    zoomInDown: 'animate__zoomInDown',
    zoomInLeft: 'animate__zoomInLeft',
    zoomInRight: 'animate__zoomInRight',
    zoomInUp: 'animate__zoomInUp',
}

export const ANIMATE_CSS_SPEEDS = {
    slower: 'animate__slower',
    slow: 'animate__slow',
    fast: 'animate__fast',
    faster: 'animate__faster',
}

export const ANIMATE_CSS_DELAYS = {
    delay1s: 'animate__delay-1s',
    delay2s: 'animate__delay-2s',
    delay3s: 'animate__delay-3s',
    delay4s: 'animate__delay-4s',
    delay5s: 'animate__delay-5s',
}

export const ANIMATE_CSS_REPEATS = {
    repeat1: 'animate__repeat-1',
    repeat2: 'animate__repeat-2',
    repeat3: 'animate__repeat-3',
    infinite: 'animate__infinite',
}

// Helper function to build animate.css class string
export const buildAnimateClass = (animation, options = {}) => {
    const { speed, delay, repeat, infinite } = options
    
    let classes = ['animate__animated', ANIMATE_CSS_CLASSES[animation]]
    
    if (speed && ANIMATE_CSS_SPEEDS[speed]) {
        classes.push(ANIMATE_CSS_SPEEDS[speed])
    }
    
    if (delay && ANIMATE_CSS_DELAYS[delay]) {
        classes.push(ANIMATE_CSS_DELAYS[delay])
    }
    
    if (repeat && ANIMATE_CSS_REPEATS[repeat]) {
        classes.push(ANIMATE_CSS_REPEATS[repeat])
    }
    
    if (infinite) {
        classes.push(ANIMATE_CSS_REPEATS.infinite)
    }
    
    return classes.join(' ')
}

// Hook for adding animate.css to element with intersection observer
import { useEffect, useRef, useState } from 'react'

export const useAnimateOnScroll = (animation, options = {}) => {
    const elementRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (!isClient) return // Only run on client side
        
        const element = elementRef.current // Capture ref value
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsVisible(true)
                    setHasAnimated(true)
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        )

        if (element) {
            observer.observe(element)
        }

        return () => {
            if (element) {
                observer.unobserve(element)
            }
        }
    }, [hasAnimated, isClient])

    const animateClass = isClient && isVisible ? buildAnimateClass(animation, options) : ''

    return [elementRef, animateClass]
}

// Component wrapper for animate.css animations
export const AnimateWrapper = ({ 
    children, 
    animation, 
    trigger = 'scroll', // 'scroll', 'immediate', 'hover' 
    options = {},
    className = '',
    ...props 
}) => {
    const [elementRef, animateClass] = useAnimateOnScroll(animation, options)
    const [isHovered, setIsHovered] = useState(false)

    const getAnimationClass = () => {
        switch (trigger) {
            case 'immediate':
                return buildAnimateClass(animation, options)
            case 'hover':
                return isHovered ? buildAnimateClass(animation, options) : ''
            case 'scroll':
            default:
                return animateClass
        }
    }

    const handleMouseEnter = () => {
        if (trigger === 'hover') {
            setIsHovered(true)
        }
    }

    const handleMouseLeave = () => {
        if (trigger === 'hover') {
            setIsHovered(false)
        }
    }

    return (
        <div
            ref={elementRef}
            className={`${getAnimationClass()} ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </div>
    )
}

const animateCssUtils = {
    ANIMATE_CSS_CLASSES,
    ANIMATE_CSS_SPEEDS,
    ANIMATE_CSS_DELAYS,
    ANIMATE_CSS_REPEATS,
    buildAnimateClass,
    useAnimateOnScroll,
    AnimateWrapper
}

export default animateCssUtils

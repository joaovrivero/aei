import { useEffect, useState, useRef } from 'react'
import { textAnimations } from '../lib/animation'

const ParallaxHero = ({ 
    title = "Welcome to My Portfolio",
    subtitle = "Full-Stack Developer & Digital Artisan",
    backgroundImage = "/images/hero-bg.jpg",
    height = "100vh",
    children 
}) => {
    const [scrollY, setScrollY] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const heroRef = useRef(null)

    useEffect(() => {
        const heroElement = heroRef.current // Capture ref value
        
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        // Intersection Observer for triggering animations
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true)
                    
                    // Trigger text animations
                    setTimeout(() => {
                        textAnimations.typewriter('.hero-title', { duration: 2000 })
                    }, 500)
                    
                    setTimeout(() => {
                        textAnimations.reveal('.hero-subtitle', { 
                            delay: 1000, 
                            direction: 'up' 
                        })
                    }, 1500)
                }
            },
            { threshold: 0.1 }
        )

        if (heroElement) {
            observer.observe(heroElement)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (heroElement) {
                observer.unobserve(heroElement)
            }
        }
    }, [isVisible])

    // Parallax calculations
    const parallaxOffset = scrollY * 0.5
    const contentOffset = scrollY * 0.2
    const opacity = Math.max(0, 1 - scrollY / 800)

    return (
        <div 
            ref={heroRef}
            className="relative overflow-hidden"
            style={{ height }}
        >
            {/* Background Layer with Parallax */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={{
                    transform: `translateY(${parallaxOffset}px)`,
                    scale: 1.1 // Prevent gaps during parallax
                }}
            >
                {/* Background Image */}
                <div 
                    className="w-full h-full bg-cover bg-center bg-fixed"
                    style={{
                        backgroundImage: `linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3)), url(${backgroundImage})`
                    }}
                />
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    {/* Floating Particles */}
                    <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="absolute top-40 right-20 w-6 h-6 bg-primary-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-accent-light/40 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
                    <div className="absolute top-60 right-1/3 w-5 h-5 bg-pink-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                    
                    {/* Geometric Shapes */}
                    <div 
                        className="absolute top-32 left-1/3 w-20 h-20 border-2 border-white/20 rotate-45 animate-pulse"
                        style={{ transform: `translateY(${scrollY * 0.3}px) rotate(45deg)` }}
                    />
                    <div 
                        className="absolute bottom-32 right-1/4 w-16 h-16 bg-gradient-to-br from-primary-400/20 to-accent-light/20 rounded-full animate-pulse"
                        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
                    />
                </div>
            </div>

            {/* Overlay for better text readability */}
            <div 
                className="absolute inset-0 bg-black/30"
                style={{ opacity: opacity * 0.7 }}
            />

            {/* Content Layer */}
            <div 
                className="relative z-10 flex items-center justify-center h-full px-4"
                style={{
                    transform: `translateY(${contentOffset}px)`,
                    opacity
                }}
            >
                <div className="text-center text-white max-w-4xl">
                    {/* Main Title */}
                    <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        {title}
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle text-lg md:text-2xl lg:text-3xl mb-8 text-gray-200 font-light">
                        {subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="group px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                            <span className="flex items-center">
                                View My Work
                                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </button>
                        
                        <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm hover:scale-105">
                            Get In Touch
                        </button>
                    </div>

                    {/* Custom Content */}
                    {children && (
                        <div className="mt-12">
                            {children}
                        </div>
                    )}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
                style={{ opacity }}
            >
                <div className="flex flex-col items-center">
                    <span className="text-sm mb-2">Scroll Down</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>

            {/* Wave Transition */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: '100px' }}>
                <svg 
                    className="relative block w-full h-full" 
                    data-name="Layer 1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 1200 120" 
                    preserveAspectRatio="none"
                >
                    <path 
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
                        className="fill-current text-white dark:text-gray-900"
                    />
                </svg>
            </div>
        </div>
    )
}

export default ParallaxHero

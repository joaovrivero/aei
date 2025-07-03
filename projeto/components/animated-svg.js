import { useEffect, useRef } from 'react'

const AnimatedSVG = ({ 
    width = 200, 
    height = 200, 
    className = '',
    autoPlay = true,
    delay = 0 
}) => {
    const svgRef = useRef(null)
    const isAnimating = useRef(false)
    const animeRef = useRef(null)

    // Dynamic import for AnimeJS
    useEffect(() => {
        const loadAnime = async () => {
            if (typeof window !== 'undefined') {
                try {
                    const animeModule = await import('animejs/lib/anime.es.js')
                    animeRef.current = animeModule.default
                    
                    if (autoPlay && !isAnimating.current) {
                        setTimeout(startAnimation, delay)
                    }
                } catch (error) {
                    console.warn('AnimeJS not available, using CSS fallback:', error)
                }
            }
        }
        
        loadAnime()
    }, [autoPlay, delay])

    const startAnimation = () => {
        if (isAnimating.current) return
        isAnimating.current = true

        const svg = svgRef.current
        const anime = animeRef.current
        
        if (!svg) return

        if (anime) {
            // Reset SVG elements
            anime.set(svg.querySelectorAll('.animated-path'), {
                strokeDasharray: '1000',
                strokeDashoffset: '1000',
                opacity: 0
            })

            anime.set(svg.querySelectorAll('.animated-circle'), {
                scale: 0,
                opacity: 0
            })

            anime.set(svg.querySelectorAll('.animated-text'), {
                opacity: 0,
                translateY: 20
            })

            // Create timeline animation
            const tl = anime.timeline({
                easing: 'easeOutExpo',
                complete: () => {
                    isAnimating.current = false
                }
            })

            // Animate paths (drawing effect)
            tl.add({
                targets: svg.querySelectorAll('.animated-path'),
                strokeDashoffset: [1000, 0],
                opacity: [0, 1],
                duration: 2000,
                delay: anime.stagger(300)
            })

            // Animate circles (scaling effect)
            .add({
                targets: svg.querySelectorAll('.animated-circle'),
                scale: [0, 1],
                opacity: [0, 1],
                duration: 800,
                delay: anime.stagger(200)
            }, '-=1000')

            // Animate text (fade in from bottom)
            .add({
                targets: svg.querySelectorAll('.animated-text'),
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 1000,
                delay: anime.stagger(100)
            }, '-=500')

            // Add rotation animation to the entire logo
            .add({
                targets: svg.querySelector('.logo-group'),
                rotate: [0, 360],
                duration: 2000,
                easing: 'easeInOutQuart'
            }, '-=800')
        } else {
            // CSS fallback animation
            const paths = svg.querySelectorAll('.animated-path')
            const circles = svg.querySelectorAll('.animated-circle')
            const text = svg.querySelectorAll('.animated-text')
            
            // Reset elements
            paths.forEach(path => {
                path.style.opacity = '0'
                path.style.transition = 'opacity 2s ease-out'
            })
            
            circles.forEach(circle => {
                circle.style.opacity = '0'
                circle.style.transform = 'scale(0)'
                circle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'
            })
            
            text.forEach(t => {
                t.style.opacity = '0'
                t.style.transform = 'translateY(20px)'
                t.style.transition = 'opacity 1s ease-out, transform 1s ease-out'
            })

            // Animate with delays
            setTimeout(() => {
                paths.forEach((path, index) => {
                    setTimeout(() => {
                        path.style.opacity = '1'
                    }, index * 300)
                })
            }, 100)

            setTimeout(() => {
                circles.forEach((circle, index) => {
                    setTimeout(() => {
                        circle.style.opacity = '1'
                        circle.style.transform = 'scale(1)'
                    }, index * 200)
                })
            }, 1000)

            setTimeout(() => {
                text.forEach((t, index) => {
                    setTimeout(() => {
                        t.style.opacity = '1'
                        t.style.transform = 'translateY(0)'
                    }, index * 100)
                })
            }, 1500)

            setTimeout(() => {
                isAnimating.current = false
            }, 3000)
        }
    }

    return (
        <div className={`inline-block ${className}`}>
            <svg
                ref={svgRef}
                width={width}
                height={height}
                viewBox="0 0 200 200"
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={startAnimation}
            >
                {/* Background circle */}
                <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="animated-path opacity-20"
                />

                <g className="logo-group">
                    {/* Main logo paths */}
                    <path
                        d="M50 80 Q100 40 150 80 Q100 120 50 80"
                        fill="none"
                        stroke="url(#gradient1)"
                        strokeWidth="3"
                        className="animated-path"
                    />

                    <path
                        d="M60 120 Q100 160 140 120"
                        fill="none"
                        stroke="url(#gradient2)"
                        strokeWidth="3"
                        className="animated-path"
                    />

                    {/* Decorative circles */}
                    <circle
                        cx="70"
                        cy="70"
                        r="8"
                        fill="url(#gradient1)"
                        className="animated-circle"
                    />

                    <circle
                        cx="130"
                        cy="70"
                        r="6"
                        fill="url(#gradient2)"
                        className="animated-circle"
                    />

                    <circle
                        cx="100"
                        cy="140"
                        r="5"
                        fill="url(#gradient3)"
                        className="animated-circle"
                    />

                    {/* Central element */}
                    <polygon
                        points="100,90 110,100 100,110 90,100"
                        fill="url(#gradient3)"
                        className="animated-circle"
                        style={{ transformOrigin: '100px 100px' }}
                    />
                </g>

                {/* Text elements */}
                <text
                    x="100"
                    y="180"
                    textAnchor="middle"
                    className="animated-text text-sm font-bold fill-current"
                    style={{ fontSize: '14px' }}
                >
                    RIVERO
                </text>

                {/* Gradients */}
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                    
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#F97316" />
                    </linearGradient>
                    
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F97316" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Controls */}
            <div className="text-center mt-2">
                <button
                    onClick={startAnimation}
                    disabled={isAnimating.current}
                    className="px-3 py-1 text-xs bg-primary-500 hover:bg-primary-600 text-white rounded transition-colors duration-200 disabled:opacity-50"
                >
                    {isAnimating.current ? 'Animating...' : 'Replay'}
                </button>
            </div>
        </div>
    )
}

// Standalone logo component for navigation
export const AnimatedLogo = ({ size = 40, className = '' }) => {
    return (
        <AnimatedSVG 
            width={size} 
            height={size} 
            className={className}
            autoPlay={false}
            delay={0}
        />
    )
}

export default AnimatedSVG

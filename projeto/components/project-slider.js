import { useState, useEffect, useRef } from 'react'

const ProjectSlider = ({ projects = [], autoPlay = true, autoPlayInterval = 5000 }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const sliderRef = useRef(null)
    const autoPlayRef = useRef(null)

    // Auto-play functionality
    useEffect(() => {
        if (autoPlay && !isDragging) {
            autoPlayRef.current = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % projects.length)
            }, autoPlayInterval)
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current)
            }
        }
    }, [autoPlay, autoPlayInterval, projects.length, isDragging])

    // Touch/Mouse handlers for swipe functionality
    const handleStart = (e) => {
        setIsDragging(true)
        const pageX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX
        setStartX(pageX - sliderRef.current.offsetLeft)
        setScrollLeft(sliderRef.current.scrollLeft)
        
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current)
        }
    }

    const handleMove = (e) => {
        if (!isDragging) return
        e.preventDefault()
        
        const pageX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX
        const x = pageX - sliderRef.current.offsetLeft
        const walk = (x - startX) * 2
        sliderRef.current.scrollLeft = scrollLeft - walk
    }

    const handleEnd = () => {
        setIsDragging(false)
        
        // Snap to nearest slide
        const slideWidth = sliderRef.current.offsetWidth
        const newSlide = Math.round(sliderRef.current.scrollLeft / slideWidth)
        setCurrentSlide(Math.max(0, Math.min(newSlide, projects.length - 1)))
    }

    // Navigate to specific slide
    const goToSlide = (index) => {
        setCurrentSlide(index)
        if (sliderRef.current) {
            const slideWidth = sliderRef.current.offsetWidth
            sliderRef.current.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            })
        }
    }

    // Navigation functions
    const nextSlide = () => goToSlide((currentSlide + 1) % projects.length)
    const prevSlide = () => goToSlide(currentSlide === 0 ? projects.length - 1 : currentSlide - 1)

    // Default projects if none provided
    const defaultProjects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "Modern React-based shopping platform with advanced features",
            image: "/images/works/project1.jpg",
            tech: ["React", "Node.js", "MongoDB"],
            link: "/works/project1"
        },
        {
            id: 2,
            title: "Portfolio Website",
            description: "Responsive portfolio with Three.js integration",
            image: "/images/works/project2.jpg",
            tech: ["Next.js", "Three.js", "Tailwind CSS"],
            link: "/works/project2"
        },
        {
            id: 3,
            title: "Mobile App",
            description: "Cross-platform mobile application",
            image: "/images/works/project3.jpg",
            tech: ["React Native", "Firebase", "Redux"],
            link: "/works/project3"
        }
    ]

    const slidesToShow = projects.length > 0 ? projects : defaultProjects

    return (
        <div className="relative w-full overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-lg">
            {/* Slider Container */}
            <div
                ref={sliderRef}
                className="flex overflow-x-hidden scroll-smooth"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
            >
                {slidesToShow.map((project, index) => (
                    <div
                        key={project.id}
                        className="w-full flex-shrink-0 relative group"
                        style={{ minHeight: '400px' }}
                    >
                        {/* Background Image with Parallax Effect */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div 
                                className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                style={{
                                    backgroundImage: `url(${project.image || '/images/works/shrek.jpg'})`,
                                    transform: `translateX(${(index - currentSlide) * 10}px)`
                                }}
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex items-center justify-center p-8">
                            <div className="text-center text-white max-w-2xl">
                                <h3 className="text-3xl md:text-4xl font-bold mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {project.title}
                                </h3>
                                <p className="text-lg md:text-xl mb-6 opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                    {project.description}
                                </p>
                                
                                {/* Tech Stack */}
                                {project.tech && (
                                    <div className="flex justify-center gap-2 mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                                        {project.tech.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* CTA Button */}
                                <button
                                    onClick={() => window.open(project.link, '_blank')}
                                    className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 group-hover:scale-105 delay-300"
                                >
                                    View Project
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slidesToShow.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                                ? 'bg-white scale-125' 
                                : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                <div 
                    className="h-full bg-primary-500 transition-all duration-300"
                    style={{ width: `${((currentSlide + 1) / slidesToShow.length) * 100}%` }}
                />
            </div>
        </div>
    )
}

export default ProjectSlider

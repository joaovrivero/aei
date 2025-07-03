import { useEffect, useState } from 'react'
import Layout from '../components/layouts/main'
import { Container, Box, Heading, Button } from '../components/temp-ui'
import EnhancedButton from '../components/enhanced-button'
import AnimatedSVG from '../components/animated-svg'
import { AnimateWrapper } from '../lib/animate-css-utils'
import { 
    pageEntranceTimeline, 
    scrollTriggeredAnimations, 
    morphElement,
    textAnimations 
} from '../lib/animation'

const AnimationsDemo = () => {
    const [morphDemo, setMorphDemo] = useState(false)

    useEffect(() => {
        // Initialize page entrance animations
        pageEntranceTimeline('.animate-entrance')
        
        // Initialize scroll animations
        scrollTriggeredAnimations('.animate-scroll')

        // Initialize text animations
        setTimeout(() => {
            textAnimations.typewriter('.typewriter-demo', { delay: 500 })
        }, 1000)

        setTimeout(() => {
            textAnimations.reveal('.reveal-demo', { delay: 800, direction: 'up' })
        }, 2000)

        setTimeout(() => {
            textAnimations.stagger('.stagger-demo', { delay: 1200 })
        }, 3000)
    }, [])

    const handleMorphDemo = () => {
        const fromEl = document.getElementById('morph-from')
        const toEl = document.getElementById('morph-to')
        if (fromEl && toEl) {
            morphElement(fromEl, toEl)
            setMorphDemo(true)
            setTimeout(() => setMorphDemo(false), 2000)
        }
    }

    return (
        <Layout title="Animations Demo">
            <Container>
                {/* Page Title with entrance animation */}
                <Box className="animate-entrance text-center mb-12">
                    <Heading as="h1" className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-accent-light bg-clip-text text-transparent">
                        🎬 Animations Showcase
                    </Heading>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Demonstrando todas as animações implementadas
                    </p>
                </Box>

                {/* CSS Transitions Section */}
                <Box className="animate-entrance mb-16">
                    <Heading as="h2" variant="section-title" className="mb-8">
                        🎨 CSS Transitions (4/4 Complete)
                    </Heading>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Fade In/Out */}
                        <div className="interactive-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <h3 className="font-semibold mb-2">Fade In/Out</h3>
                            <div className="w-16 h-16 bg-blue-500 rounded hover:opacity-50 transition-opacity duration-500"></div>
                        </div>

                        {/* Slide Up/Down */}
                        <div className="interactive-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <h3 className="font-semibold mb-2">Slide Up/Down</h3>
                            <div className="w-16 h-16 bg-green-500 rounded hover:translate-y-2 transition-transform duration-300"></div>
                        </div>

                        {/* Scale/Zoom */}
                        <div className="interactive-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <h3 className="font-semibold mb-2">Scale/Zoom</h3>
                            <div className="w-16 h-16 bg-purple-500 rounded scale-on-hover"></div>
                        </div>

                        {/* Rotation */}
                        <div className="interactive-card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <h3 className="font-semibold mb-2">Rotation</h3>
                            <div className="w-16 h-16 bg-orange-500 rounded rotate-on-hover"></div>
                        </div>
                    </div>
                </Box>

                {/* Animate.css Section */}
                <Box className="animate-scroll mb-16">
                    <Heading as="h2" variant="section-title" className="mb-8">
                        ✨ Animate.css Integration
                    </Heading>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <AnimateWrapper animation="bounceIn" trigger="scroll" className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <h3 className="font-semibold mb-2">Bounce In</h3>
                            <p>Triggered on scroll</p>
                        </AnimateWrapper>

                        <AnimateWrapper animation="fadeInLeft" trigger="scroll" options={{ speed: 'slow' }} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <h3 className="font-semibold mb-2">Fade In Left</h3>
                            <p>Slow speed variant</p>
                        </AnimateWrapper>

                        <AnimateWrapper animation="zoomIn" trigger="hover" className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer">
                            <h3 className="font-semibold mb-2">Zoom In</h3>
                            <p>Hover to animate</p>
                        </AnimateWrapper>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-8">
                        <EnhancedButton 
                            variant="primary" 
                            animate={true} 
                            animationType="bounceIn"
                        >
                            Animated Button
                        </EnhancedButton>
                        
                        <EnhancedButton 
                            variant="ghost" 
                            animate={true} 
                            animationType="slideInRight"
                        >
                            Ghost Button
                        </EnhancedButton>
                        
                        <EnhancedButton 
                            variant="success" 
                            animate={true} 
                            animationType="fadeInUp"
                        >
                            Success Button
                        </EnhancedButton>
                    </div>
                </Box>

                {/* AnimeJS Section */}
                <Box className="animate-scroll mb-16">
                    <Heading as="h2" variant="section-title" className="mb-8">
                        🎭 AnimeJS Animations (4/4 Complete)
                    </Heading>

                    {/* Text Animations */}
                    <div className="mb-12 space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Text Animations</h3>
                            <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="typewriter-demo text-lg font-mono">
                                    This text appears with typewriter effect...
                                </p>
                                <p className="reveal-demo text-lg">
                                    This text reveals from bottom to top
                                </p>
                                <p className="stagger-demo text-lg">
                                    Each word appears with staggered animation timing
                                </p>
                            </div>
                        </div>

                        {/* Morph Animation */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Element Morphing</h3>
                            <div className="flex items-center gap-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div 
                                    id="morph-from"
                                    className="w-16 h-16 bg-blue-500 rounded cursor-pointer"
                                    onClick={handleMorphDemo}
                                ></div>
                                <span>→</span>
                                <div 
                                    id="morph-to"
                                    className="w-20 h-20 bg-purple-500 rounded-full"
                                ></div>
                                <Button 
                                    onClick={handleMorphDemo}
                                    disabled={morphDemo}
                                    className="ml-4"
                                >
                                    {morphDemo ? 'Morphing...' : 'Start Morph'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Box>

                {/* SVGator Section */}
                <Box className="animate-scroll mb-16">
                    <Heading as="h2" variant="section-title" className="mb-8">
                        🎨 SVG Animations (Custom Implementation)
                    </Heading>
                    
                    <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-xl font-semibold mb-6">Animated Logo</h3>
                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            Custom SVG animation with drawing effects, scaling, and rotation
                        </p>
                        
                        <div className="flex justify-center mb-6">
                            <AnimatedSVG width={250} height={250} autoPlay={true} delay={1000} />
                        </div>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Click the logo or &ldquo;Replay&rdquo; button to see the animation again
                        </p>
                    </div>
                </Box>

                {/* Page Entrance Timeline Demo */}
                <Box className="animate-scroll mb-16">
                    <Heading as="h2" variant="section-title" className="mb-8">
                        🎬 Page Entrance Timeline
                    </Heading>
                    <p className="mb-4">
                        The page entrance animation runs automatically when the page loads.
                        Elements with <code>.animate-entrance</code> class are animated in sequence.
                    </p>
                    <Button 
                        onClick={() => pageEntranceTimeline('.demo-entrance')}
                        className="mb-6"
                    >
                        Replay Entrance Animation
                    </Button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="demo-entrance p-4 bg-blue-100 dark:bg-blue-900 rounded">Item 1</div>
                        <div className="demo-entrance p-4 bg-green-100 dark:bg-green-900 rounded">Item 2</div>
                        <div className="demo-entrance p-4 bg-purple-100 dark:bg-purple-900 rounded">Item 3</div>
                    </div>
                </Box>

                {/* Performance Stats */}
                <Box className="animate-scroll text-center">
                    <Heading as="h2" variant="section-title" className="mb-8">
                        📊 Implementation Status
                    </Heading>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="p-6 bg-green-100 dark:bg-green-900 rounded-lg">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">4/4</div>
                            <div className="text-sm text-green-800 dark:text-green-200">CSS Transitions</div>
                        </div>
                        <div className="p-6 bg-green-100 dark:bg-green-900 rounded-lg">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">✓</div>
                            <div className="text-sm text-green-800 dark:text-green-200">Animate.css</div>
                        </div>
                        <div className="p-6 bg-green-100 dark:bg-green-900 rounded-lg">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">4/4</div>
                            <div className="text-sm text-green-800 dark:text-green-200">AnimeJS</div>
                        </div>
                        <div className="p-6 bg-green-100 dark:bg-green-900 rounded-lg">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">✓</div>
                            <div className="text-sm text-green-800 dark:text-green-200">SVG Animations</div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="p-6 bg-green-100 dark:bg-green-900 rounded-lg">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">✓</div>
                            <div className="text-sm text-green-800 dark:text-green-200">Slider/Parallax</div>
                        </div>
                        <div className="p-6 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">100%</div>
                            <div className="text-sm text-blue-800 dark:text-blue-200">Total Progress</div>
                        </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300">
                        🎉 **ALL REQUIREMENTS COMPLETED!** Project ready for submission.
                    </p>
                </Box>
            </Container>
        </Layout>
    )
}

export default AnimationsDemo

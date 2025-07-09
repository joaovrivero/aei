import { Container, Heading, SimpleGrid } from '../components/ui'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import ProjectSlider from '../components/project-slider'
import ParallaxHero from '../components/parallax-hero'
import { AnimateWrapper } from '../lib/animate-css-utils'
import thumbproject1 from '../public/images/works/shrek.jpg'
import Layout from '../components/layouts/article'

const Works = () => {
  const projects = [
    {
      id: 1,
      title: "Rivero Portfolio",
      description: "Modern portfolio with Next.js, Tailwind CSS, and AnimeJS animations",
      image: "/images/works/shrek.jpg",
      tech: ["Next.js", "Tailwind CSS", "AnimeJS", "Three.js"],
      link: "/projects/project1"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with modern technologies",
      image: "/images/works/shrek.jpg",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "/projects/ecommerce-platform"
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      image: "/images/works/shrek.jpg",
      tech: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
      link: "/projects/task-management"
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Modern weather application with interactive maps",
      image: "/images/works/shrek.jpg",
      tech: ["React", "Chart.js", "OpenWeather API", "Mapbox"],
      link: "/projects/weather-dashboard"
    }
  ]

  return (
    <Layout title="Projects">
      {/* Parallax Hero Section */}
      <ParallaxHero
        title="My Projects"
        subtitle="Explore my portfolio of web applications and digital experiences"
        height="60vh"
      />
      
      <Container>
        {/* Project Slider Section */}
        <Section delay={0.1}>
          <AnimateWrapper animation="fadeInUp" className="mb-12">
            <Heading as="h2" fontSize={28} className="mb-8 text-center">
              Featured Projects
            </Heading>
            <ProjectSlider projects={projects} autoPlay={true} />
          </AnimateWrapper>
        </Section>

        {/* Traditional Grid Section */}
        <Section delay={0.2}>
          <AnimateWrapper animation="fadeInUp">
            <Heading as="h3" fontSize={20} className="mb-6">
              All Projects
            </Heading>
            <SimpleGrid columns={[1, 1, 2]} gap={6}>
              <AnimateWrapper animation="bounceIn" trigger="scroll">
                <WorkGridItem
                  id="ecommerce-platform"
                  title="E-Commerce Platform"
                  thumbnail={thumbproject1}
                >
                  Modern e-commerce solution with payment integration
                </WorkGridItem>
              </AnimateWrapper>
              
              <AnimateWrapper animation="bounceIn" trigger="scroll" options={{ delay: 'delay-1s' }}>
                <WorkGridItem
                  id="task-management"
                  title="Task Management App"
                  thumbnail={thumbproject1}
                >
                  Collaborative workspace with real-time updates
                </WorkGridItem>
              </AnimateWrapper>
              
              <AnimateWrapper animation="bounceIn" trigger="scroll" options={{ delay: 'delay-2s' }}>
                <WorkGridItem
                  id="weather-dashboard"
                  title="Weather Dashboard"
                  thumbnail={thumbproject1}
                >
                  Interactive weather app with beautiful visualizations
                </WorkGridItem>
              </AnimateWrapper>
              
              <AnimateWrapper animation="bounceIn" trigger="scroll" options={{ delay: 'delay-3s' }}>
                <WorkGridItem
                  id="project1"
                  title="Portfolio Website"
                  thumbnail={thumbproject1}
                >
                  This portfolio - built with Next.js and modern animations
                </WorkGridItem>
              </AnimateWrapper>
            </SimpleGrid>
          </AnimateWrapper>
        </Section>

        {/* Skills & Technologies */}
        <Section delay={0.3}>
          <AnimateWrapper animation="slideInUp" trigger="scroll">
            <Heading as="h3" fontSize={20} className="mb-6">
              Technologies I Use
            </Heading>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {[
                'React', 'Next.js', 'TypeScript', 'Node.js', 
                'Tailwind CSS', 'Three.js', 'MongoDB', 'PostgreSQL',
                'AWS', 'Docker', 'Git', 'Figma'
              ].map((tech, index) => (
                <AnimateWrapper 
                  key={tech} 
                  animation="zoomIn"
                  trigger="scroll"
                  options={{ delay: `delay${index % 5 + 1}s` }}
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-300"
                >
                  <span className="text-sm font-medium">{tech}</span>
                </AnimateWrapper>
              ))}
            </div>
          </AnimateWrapper>
        </Section>
      </Container>
    </Layout>
  )
}

export default Works
export { getServerSideProps } from '../components/chakra'

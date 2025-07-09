import NextLink from 'next/link'
import {
  Container,
  Box,
  Heading,
  List,
  ListItem,
  Icon,
  Link
} from '../components/ui'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import ParallaxHero from '../components/parallax-hero'
import { AnimateWrapper } from '../lib/animate-css-utils'
import EnhancedButton from '../components/enhanced-button'
import Layout from '../components/layouts/article'
import Image from 'next/image'
import { IoLogoInstagram, IoLogoGithub, IoLogoTwitter } from 'react-icons/io5'
import { useEffect } from 'react'
import { pageEntranceTimeline, scrollTriggeredAnimations } from '../lib/animation'

// Ícone de seta para direita (substitui ChevronRightIcon)
const ChevronRightIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
  </svg>
)

const Page = () => {
  useEffect(() => {
    // Initialize page entrance animations
    setTimeout(() => {
      pageEntranceTimeline('.animate-entrance')
    }, 100)
    
    // Initialize scroll animations
    scrollTriggeredAnimations('.animate-scroll')
  }, [])

  return (
    <Layout>
      {/* Parallax Hero Section */}
      <ParallaxHero
        title="João Rivero"
        subtitle="Digital Artisan • Developer • Problem Solver"
        height="80vh"
      >
        <div className="mt-8">
          <EnhancedButton
            as={NextLink}
            href="/projects"
            variant="primary"
            size="lg"
            animate={true}
            animationType="bounceIn"
            rightIcon={<ChevronRightIcon />}
          >
            Explore My Projects
          </EnhancedButton>
        </div>
        
        {/* Profile section with image next to name */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          {/* Profile Image */}
          <AnimateWrapper animation="zoomIn" trigger="scroll" className="flex-shrink-0">
            <Box className="border-2 border-white/80 w-[100px] h-[100px] md:w-[120px] md:h-[120px] inline-block rounded-full overflow-hidden interactive-card">
              <Image
                src="/images/profile.jpg"
                alt="Profile image"
                className="rounded-full"
                width="120"
                height="120"
              />
            </Box>
          </AnimateWrapper>

          {/* Welcome message */}
          <AnimateWrapper animation="fadeInUp" className="flex-grow text-center md:text-left max-w-sm md:max-w-md">
            <Box className="rounded-lg backdrop-blur-glass p-4">
              Hello, I&apos;m a full-stack software developer based in Brazil!
            </Box>
          </AnimateWrapper>
        </div>
      </ParallaxHero>

      {/* Espaço adicional entre hero e conteúdo */}
      <div className="h-16 md:h-24"></div>

      <Container>
        {/* Título principal agora separado do hero */}
        <AnimateWrapper animation="fadeInUp" className="animate-entrance text-center mb-12">
          <Heading as="h2" variant="page-title" className="text-3xl md:text-4xl mb-4">
            About Me
          </Heading>
          <Paragraph className="text-lg text-gray-600 dark:text-gray-300">
            Digital Artisan • Developer • Problem Solver
          </Paragraph>
        </AnimateWrapper>

        <Section delay={0.1}>
          <AnimateWrapper animation="slideInUp" trigger="scroll" className="animate-scroll">
            <Box className="text-center my-4">
              <EnhancedButton
                as={NextLink}
                href="/projects"
                variant="primary"
                animate={true}
                animationType="pulse"
                rightIcon={<ChevronRightIcon />}
              >
                My Projects
              </EnhancedButton>
            </Box>
          </AnimateWrapper>
          
          <AnimateWrapper animation="fadeInLeft" trigger="scroll">
            <Heading as="h3" variant="section-title">
              Introduction
            </Heading>
            <Paragraph>
              Rivero is a full-stack developer based in Pelotas with a passion for
              building digital services/stuff he wants. He has a knack for all
              things launching products, from planning and designing all the way
              to solving real-life problems with code. When not online, he loves
              to get lost in the wonderful world of books. Currently, he is
              graduating in Internet Systems at IFSUL
            </Paragraph>
          </AnimateWrapper>
        </Section>

        <Section delay={0.2}>
          <AnimateWrapper animation="slideInRight" trigger="scroll" className="animate-scroll">
            <Heading as="h3" variant="section-title">
              Bio
            </Heading>
            <BioSection>
              <BioYear>1998</BioYear>
              Born in Pelotas , Brazil.
            </BioSection>
            <BioSection>
              <BioYear>2019 to 2022</BioYear>
              Worked at Appen Limited. with translation/transcription, data
              collection and training for social media marketing.
            </BioSection>
            <BioSection>
              <BioYear>2024</BioYear>
              Internship on Compass.uol with AWS cloud engineering.
            </BioSection>
            <BioSection>
              <BioYear>2025</BioYear>
              Completed the Graduate School of Internet Systems at Pelotas Federal
              Institute of Science and Technology (IFSUL).
            </BioSection>
          </AnimateWrapper>
        </Section>

        <Section delay={0.3}>
          <AnimateWrapper animation="bounceIn" trigger="scroll" className="animate-scroll">
            <Heading as="h3" variant="section-title">
              I ♥
            </Heading>
            <Paragraph>
              <Link href="https://letterboxd.com/joaovrivero/" target="_blank">
                Movies
              </Link>
              , Music, Japanese Culture
            </Paragraph>
          </AnimateWrapper>
        </Section>

        <Section delay={0.3}>
          <AnimateWrapper animation="fadeInUp" trigger="scroll" className="animate-scroll">
            <Heading as="h3" variant="section-title">
              On the web
            </Heading>
            <List>
              <ListItem>
                <Link href="https://github.com/joaovrivero" target="_blank">
                  <EnhancedButton
                    variant="ghost"
                    leftIcon={<Icon as={IoLogoGithub} />}
                    animate={true}
                    animationType="slideInLeft"
                  >
                    @joaovrivero
                  </EnhancedButton>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://instagram.com/joaovrivero" target="_blank">
                  <EnhancedButton
                    variant="ghost"
                    leftIcon={<Icon as={IoLogoInstagram} />}
                    animate={true}
                    animationType="slideInLeft"
                  >
                    @joaovrivero
                  </EnhancedButton>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://twitter.com/joaovrivero" target="_blank">
                  <EnhancedButton
                    variant="ghost"
                    leftIcon={<Icon as={IoLogoTwitter} />}
                    animate={true}
                    animationType="slideInLeft"
                  >
                    @joaovrivero
                  </EnhancedButton>
                </Link>
              </ListItem>
            </List>
          </AnimateWrapper>
        </Section>

        {/* New Skills Section */}
        <Section delay={0.4}>
          <AnimateWrapper animation="zoomIn" trigger="scroll" className="animate-scroll">
            <Heading as="h3" variant="section-title">
              Skills & Technologies
            </Heading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                'React/Next.js', 'Node.js', 'TypeScript', 'Python',
                'AWS Cloud', 'MongoDB', 'PostgreSQL', 'Docker'
              ].map((skill, index) => (
                <AnimateWrapper
                  key={skill}
                  animation="bounceIn"
                  trigger="scroll"
                  options={{ delay: `delay${index % 3 + 1}s` }}
                  className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-center interactive-card"
                >
                  <span className="text-sm font-medium">{skill}</span>
                </AnimateWrapper>
              ))}
            </div>
          </AnimateWrapper>
        </Section>

        {/* Animation Demo Link */}
        <Section delay={0.5}>
          <AnimateWrapper animation="tada" trigger="scroll" className="text-center animate-scroll">
            <Box className="p-6 bg-gradient-to-r from-primary-500/10 to-accent-light/10 rounded-lg">
              <Heading as="h3" className="mb-4">
                🎬 Check out the Animation Demo!
              </Heading>
              <Paragraph className="mb-4">
                See all the implemented animations in action
              </Paragraph>
              <EnhancedButton
                as={NextLink}
                href="/animations-demo"
                variant="primary"
                size="lg"
                animate={true}
                animationType="heartBeat"
              >
                View Animation Demo
              </EnhancedButton>
            </Box>
          </AnimateWrapper>
        </Section>
      </Container>
    </Layout>
  )
}

export default Page

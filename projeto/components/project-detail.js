import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Heading, Badge, Link } from './temp-ui'
import { AnimateWrapper } from '../lib/animate-css-utils'
import { IoArrowBack, IoLinkOutline, IoLogoGithub, IoGlobeOutline } from 'react-icons/io5'

// Title component for project detail pages
export const Title = ({ children, ...props }) => (
  <AnimateWrapper animation="fadeInUp">
    <Box className="mb-6" {...props}>
      <Heading as="h1" fontSize="2xl" className="font-bold text-center mb-4">
        {children}
      </Heading>
    </Box>
  </AnimateWrapper>
)

// Meta component for project metadata
export const Meta = ({ children }) => (
  <Box as="span" className="font-semibold text-primary-600 dark:text-primary-400 mr-2">
    {children}:
  </Box>
)

// Project image component with animations
export const ProjectImage = ({ src, alt, ...props }) => (
  <AnimateWrapper animation="zoomIn" trigger="scroll">
    <Box className="mb-6 text-center">
      <Image
        src={src}
        alt={alt}
        className="rounded-lg shadow-lg mx-auto interactive-card"
        width={800}
        height={450}
        {...props}
      />
    </Box>
  </AnimateWrapper>
)

// External link icon component
export const ExternalLinkIcon = ({ className = "w-4 h-4 inline ml-1" }) => (
  <IoLinkOutline className={className} />
)

// Back navigation component
export const BackToProjects = () => (
  <AnimateWrapper animation="slideInLeft">
    <Box className="mb-6">
      <NextLink 
        href="/projects"
        className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
      >
        <IoArrowBack className="mr-2" />
        Back to Projects
      </NextLink>
    </Box>
  </AnimateWrapper>
)

// Project stats/info component
export const ProjectStats = ({ stats }) => (
  <AnimateWrapper animation="fadeInUp" trigger="scroll">
    <Box className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
      {stats.map((stat, index) => (
        <Box key={index} className="text-center">
          <Box className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {stat.value}
          </Box>
          <Box className="text-sm text-gray-600 dark:text-gray-400">
            {stat.label}
          </Box>
        </Box>
      ))}
    </Box>
  </AnimateWrapper>
)

// Tech stack display component
export const TechStack = ({ technologies }) => (
  <AnimateWrapper animation="slideInUp" trigger="scroll">
    <Box className="mb-6">
      <Heading as="h3" fontSize="lg" className="mb-4">
        Technologies Used
      </Heading>
      <Box className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <Badge
            key={index}
            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
          >
            {tech}
          </Badge>
        ))}
      </Box>
    </Box>
  </AnimateWrapper>
)

// Project links component
export const ProjectLinks = ({ website, github, demo }) => (
  <AnimateWrapper animation="bounceIn" trigger="scroll">
    <Box className="flex flex-wrap gap-4 mb-8">
      {website && (
        <Link
          href={website}
          target="_blank"
          className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <IoGlobeOutline className="mr-2" />
          Live Demo
          <ExternalLinkIcon />
        </Link>
      )}
      {github && (
        <Link
          href={github}
          target="_blank"
          className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          <IoLogoGithub className="mr-2" />
          Source Code
          <ExternalLinkIcon />
        </Link>
      )}
      {demo && (
        <Link
          href={demo}
          target="_blank"
          className="inline-flex items-center px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors"
        >
          View Demo
          <ExternalLinkIcon />
        </Link>
      )}
    </Box>
  </AnimateWrapper>
)

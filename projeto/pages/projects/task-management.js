import {
  Container,
  Box,
  Heading,
  List,
  ListItem,
  Badge
} from '../../components/ui'
import {
  Title,
  Meta,
  ProjectImage,
  BackToProjects,
  ProjectStats,
  TechStack,
  ProjectLinks
} from '../../components/project-detail'
import { AnimateWrapper } from '../../lib/animate-css-utils'
import Layout from '../../components/layouts/article'
import Paragraph from '../../components/paragraph'

const Work = () => {
  const stats = [
    { value: '50+', label: 'Components' },
    { value: '8', label: 'Pages' },
    { value: '20+', label: 'Features' },
    { value: '2024', label: 'Year' }
  ]

  const technologies = [
    'Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Socket.io',
    'NextAuth.js', 'Tailwind CSS', 'React Query', 'Zustand', 'Vercel'
  ]

  return (
    <Layout title="Task Management App">
      <Container>
        <BackToProjects />
        
        <Title>
          Task Management App <Badge className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">2024</Badge>
        </Title>
        
        <AnimateWrapper animation="fadeInUp">
          <Paragraph className="text-lg text-center mb-8 text-gray-600 dark:text-gray-400">
            A collaborative task management application with real-time updates, 
            team collaboration features, and modern TypeScript architecture.
          </Paragraph>
        </AnimateWrapper>

        <ProjectStats stats={stats} />

        <ProjectLinks 
          website="#"
          github="https://github.com/joaovrivero/task-management"
          demo="#"
        />

        <AnimateWrapper animation="fadeInUp" trigger="scroll">
          <List className="mb-8 space-y-4">
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Platform</Meta>
              <span>Web Application (PWA Ready)</span>
            </ListItem>
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Stack</Meta>
              <span>Next.js + TypeScript + Prisma + PostgreSQL</span>
            </ListItem>
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Real-time</Meta>
              <span>Socket.io for live collaboration</span>
            </ListItem>
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Authentication</Meta>
              <span>NextAuth.js with multiple providers</span>
            </ListItem>
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Deployment</Meta>
              <span>Vercel + Railway (Database)</span>
            </ListItem>
          </List>
        </AnimateWrapper>

        <TechStack technologies={technologies} />

        <ProjectImage src="/images/works/shrek.jpg" alt="Task Management Dashboard" />
        
        <AnimateWrapper animation="slideInUp" trigger="scroll">
          <Box className="mb-8">
            <Heading as="h3" fontSize="xl" className="mb-4">
              ⚡ Key Features
            </Heading>
            <List className="grid md:grid-cols-2 gap-4">
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>📋 Kanban Boards</strong><br />
                Drag-and-drop task management with custom columns
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>👥 Team Collaboration</strong><br />
                Real-time updates and team member assignments
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>🔔 Notifications</strong><br />
                In-app and email notifications for task updates
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>📊 Analytics</strong><br />
                Team productivity insights and reporting
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>🎯 Deadline Tracking</strong><br />
                Smart deadline management with reminders
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>📱 Mobile Responsive</strong><br />
                Optimized for mobile and tablet devices
              </ListItem>
            </List>
          </Box>
        </AnimateWrapper>

        <ProjectImage src="/images/works/shrek.jpg" alt="Task Management Mobile Interface" />

        <AnimateWrapper animation="fadeInUp" trigger="scroll">
          <Box className="mb-8">
            <Heading as="h3" fontSize="xl" className="mb-4">
              🛠️ Technical Implementation
            </Heading>
            <List className="space-y-3">
              <ListItem>• <strong>Type Safety:</strong> Full TypeScript implementation with strict mode</ListItem>
              <ListItem>• <strong>Database Design:</strong> Optimized Prisma schema with efficient relationships</ListItem>
              <ListItem>• <strong>Real-time Updates:</strong> Socket.io integration for live collaboration</ListItem>
              <ListItem>• <strong>State Management:</strong> Zustand for lightweight and efficient state handling</ListItem>
              <ListItem>• <strong>Authentication:</strong> NextAuth.js with Google, GitHub, and email providers</ListItem>
              <ListItem>• <strong>Performance:</strong> React Query for efficient data fetching and caching</ListItem>
              <ListItem>• <strong>UI/UX:</strong> Tailwind CSS with custom components and animations</ListItem>
            </List>
          </Box>
        </AnimateWrapper>

        <AnimateWrapper animation="bounceIn" trigger="scroll">
          <Box className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <Heading as="h3" fontSize="lg" className="mb-4">
              💡 Learning Outcomes
            </Heading>
            <List className="space-y-2">
              <ListItem>• Advanced TypeScript patterns and best practices</ListItem>
              <ListItem>• Real-time application architecture with WebSockets</ListItem>
              <ListItem>• Database design and optimization with Prisma ORM</ListItem>
              <ListItem>• Modern authentication flows and security practices</ListItem>
              <ListItem>• Performance optimization and user experience design</ListItem>
            </List>
          </Box>
        </AnimateWrapper>
      </Container>
    </Layout>
  )
}

export default Work

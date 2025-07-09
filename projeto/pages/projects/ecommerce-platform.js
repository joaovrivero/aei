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
    { value: '100+', label: 'Components' },
    { value: '5', label: 'Pages' },
    { value: '15+', label: 'Features' },
    { value: '2024', label: 'Year' }
  ]

  const technologies = [
    'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 
    'Stripe', 'JWT', 'Tailwind CSS', 'Socket.io', 'AWS S3'
  ]

  return (
    <Layout title="E-Commerce Platform">
      <Container>
        <BackToProjects />
        
        <Title>
          E-Commerce Platform <Badge className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">2024</Badge>
        </Title>
        
        <AnimateWrapper animation="fadeInUp">
          <Paragraph className="text-lg text-center mb-8 text-gray-600 dark:text-gray-400">
            A comprehensive full-stack e-commerce solution with modern technologies, 
            featuring user authentication, product catalog, shopping cart, and payment processing.
          </Paragraph>
        </AnimateWrapper>

        <ProjectStats stats={stats} />

        <ProjectLinks 
          website="#"
          github="https://github.com/joaovrivero/ecommerce-platform"
          demo="#"
        />

        <AnimateWrapper animation="fadeInUp" trigger="scroll">
          <List className="mb-8 space-y-4">
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Platform</Meta>
              <span>Web Application (Responsive)</span>
            </ListItem>
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Stack</Meta>
              <span>MERN Stack (MongoDB, Express, React, Node.js)</span>
            </ListItem>
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Database</Meta>
              <span>MongoDB with Mongoose ODM</span>
            </ListItem>
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Payment</Meta>
              <span>Stripe Integration for secure payments</span>
            </ListItem>
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Deployment</Meta>
              <span>Vercel (Frontend) + Railway (Backend)</span>
            </ListItem>
          </List>
        </AnimateWrapper>

        <TechStack technologies={technologies} />

        <ProjectImage src="/images/works/shrek.jpg" alt="E-Commerce Platform Dashboard" />
        
        <AnimateWrapper animation="slideInUp" trigger="scroll">
          <Box className="mb-8">
            <Heading as="h3" fontSize="xl" className="mb-4">
              🚀 Key Features
            </Heading>
            <List className="grid md:grid-cols-2 gap-4">
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>🔐 User Authentication</strong><br />
                JWT-based secure login and registration system
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>🛍️ Product Catalog</strong><br />
                Dynamic product listings with search and filtering
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>🛒 Shopping Cart</strong><br />
                Real-time cart updates with local storage persistence
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>💳 Payment Processing</strong><br />
                Secure Stripe integration for credit card payments
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>📊 Admin Dashboard</strong><br />
                Complete order and product management system
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>📱 Responsive Design</strong><br />
                Mobile-first approach with Tailwind CSS
              </ListItem>
            </List>
          </Box>
        </AnimateWrapper>

        <ProjectImage src="/images/works/shrek.jpg" alt="E-Commerce Mobile View" />

        <AnimateWrapper animation="fadeInUp" trigger="scroll">
          <Box className="mb-8">
            <Heading as="h3" fontSize="xl" className="mb-4">
              🎯 Technical Highlights
            </Heading>
            <List className="space-y-3">
              <ListItem>• <strong>RESTful API Design:</strong> Well-structured endpoints with proper HTTP methods</ListItem>
              <ListItem>• <strong>Data Validation:</strong> Input validation on both client and server sides</ListItem>
              <ListItem>• <strong>Security:</strong> Password hashing, JWT tokens, and CORS protection</ListItem>
              <ListItem>• <strong>Performance:</strong> Image optimization and lazy loading implementation</ListItem>
              <ListItem>• <strong>SEO:</strong> Next.js SSR for better search engine optimization</ListItem>
              <ListItem>• <strong>Testing:</strong> Unit tests with Jest and integration tests</ListItem>
            </List>
          </Box>
        </AnimateWrapper>
      </Container>
    </Layout>
  )
}

export default Work

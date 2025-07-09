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
    { value: '30+', label: 'Components' },
    { value: '4', label: 'Pages' },
    { value: '12+', label: 'Features' },
    { value: '2024', label: 'Year' }
  ]

  const technologies = [
    'React', 'Chart.js', 'OpenWeather API', 'Mapbox GL JS',
    'Axios', 'React Router', 'CSS Modules', 'Webpack', 'Netlify'
  ]

  return (
    <Layout title="Weather Dashboard">
      <Container>
        <BackToProjects />
        
        <Title>
          Weather Dashboard <Badge className="ml-2 px-2 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded">2024</Badge>
        </Title>
        
        <AnimateWrapper animation="fadeInUp">
          <Paragraph className="text-lg text-center mb-8 text-gray-600 dark:text-gray-400">
            A modern weather application with interactive maps, detailed forecasts, 
            and beautiful data visualizations powered by multiple weather APIs.
          </Paragraph>
        </AnimateWrapper>

        <ProjectStats stats={stats} />

        <ProjectLinks 
          website="#"
          github="https://github.com/joaovrivero/weather-dashboard"
          demo="#"
        />

        <AnimateWrapper animation="fadeInUp" trigger="scroll">
          <List className="mb-8 space-y-4">
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Platform</Meta>
              <span>Web Application (Mobile Responsive)</span>
            </ListItem>
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Stack</Meta>
              <span>React + Chart.js + Multiple Weather APIs</span>
            </ListItem>
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>APIs</Meta>
              <span>OpenWeather API + Mapbox GL JS</span>
            </ListItem>
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Data Viz</Meta>
              <span>Chart.js for temperature and precipitation charts</span>
            </ListItem>
            <ListItem className="border-l-4 border-primary-500 pl-4">
              <Meta>Deployment</Meta>
              <span>Netlify with CI/CD integration</span>
            </ListItem>
          </List>
        </AnimateWrapper>

        <TechStack technologies={technologies} />

        <ProjectImage src="/images/works/shrek.jpg" alt="Weather Dashboard Main Interface" />
        
        <AnimateWrapper animation="slideInUp" trigger="scroll">
          <Box className="mb-8">
            <Heading as="h3" fontSize="xl" className="mb-4">
              🌤️ Key Features
            </Heading>
            <List className="grid md:grid-cols-2 gap-4">
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>🗺️ Interactive Maps</strong><br />
                Mapbox integration with weather overlay layers
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>📊 Data Visualization</strong><br />
                Beautiful charts for temperature, humidity, and precipitation
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>🔍 Location Search</strong><br />
                Search weather by city name or coordinates
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>📅 7-Day Forecast</strong><br />
                Extended weather forecasts with hourly details
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>⚡ Real-time Updates</strong><br />
                Live weather data with automatic refresh
              </ListItem>
              <ListItem className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <strong>📱 Responsive Design</strong><br />
                Optimized experience across all devices
              </ListItem>
            </List>
          </Box>
        </AnimateWrapper>

        <ProjectImage src="/images/works/shrek.jpg" alt="Weather Dashboard Charts View" />

        <AnimateWrapper animation="fadeInUp" trigger="scroll">
          <Box className="mb-8">
            <Heading as="h3" fontSize="xl" className="mb-4">
              🎨 Design & User Experience
            </Heading>
            <List className="space-y-3">
              <ListItem>• <strong>Modern UI:</strong> Clean, minimalist design with intuitive navigation</ListItem>
              <ListItem>• <strong>Color Coding:</strong> Weather-condition-based color schemes for quick understanding</ListItem>
              <ListItem>• <strong>Accessibility:</strong> WCAG compliant with keyboard navigation support</ListItem>
              <ListItem>• <strong>Performance:</strong> Optimized API calls with intelligent caching</ListItem>
              <ListItem>• <strong>Loading States:</strong> Smooth skeleton loaders and progress indicators</ListItem>
              <ListItem>• <strong>Error Handling:</strong> Graceful error messages and retry mechanisms</ListItem>
            </List>
          </Box>
        </AnimateWrapper>

        <AnimateWrapper animation="slideInUp" trigger="scroll">
          <Box className="mb-8">
            <Heading as="h3" fontSize="xl" className="mb-4">
              🔧 Technical Features
            </Heading>
            <List className="grid md:grid-cols-2 gap-4">
              <ListItem className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                <strong>API Integration</strong><br />
                Multiple weather service APIs with fallback options
              </ListItem>
              <ListItem className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                <strong>Data Caching</strong><br />
                Smart caching to reduce API calls and improve performance
              </ListItem>
              <ListItem className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                <strong>Geolocation</strong><br />
                Automatic location detection with user permission
              </ListItem>
              <ListItem className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                <strong>Unit Conversion</strong><br />
                Support for metric and imperial measurement systems
              </ListItem>
            </List>
          </Box>
        </AnimateWrapper>

        <AnimateWrapper animation="bounceIn" trigger="scroll">
          <Box className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg">
            <Heading as="h3" fontSize="lg" className="mb-4">
              🎯 Project Goals Achieved
            </Heading>
            <List className="space-y-2">
              <ListItem>• Mastered external API integration and data management</ListItem>
              <ListItem>• Implemented complex data visualization with Chart.js</ListItem>
              <ListItem>• Built responsive design with mobile-first approach</ListItem>
              <ListItem>• Applied modern React patterns and hooks effectively</ListItem>
              <ListItem>• Optimized performance with caching and lazy loading</ListItem>
            </List>
          </Box>
        </AnimateWrapper>
      </Container>
    </Layout>
  )
}

export default Work

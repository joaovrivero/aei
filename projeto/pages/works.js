import { Container, Heading, SimpleGrid } from '../components/temp-ui'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import thumbproject1 from '../public/images/works/shrek.jpg'
import Layout from '../components/layouts/article'

const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} className="mb-4">
        Works
      </Heading>
      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem
            id="project1"
            title="project1"
            thumbnail={thumbproject1}
          >
            Project 1 App
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'

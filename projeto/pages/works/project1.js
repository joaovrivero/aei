// Project 1 page - will be implemented in Phase 2
import Layout from '../../components/layouts/article'
import { Container, Heading } from '../../components/temp-ui'

const Project1 = () => (
    <Layout title="Project 1">
        <Container>
            <Heading as="h2">Project 1</Heading>
            <p>This project page will be implemented in Phase 2 with full animations and content.</p>
        </Container>
    </Layout>
)

export default Project1
export { getServerSideProps } from '../../components/chakra'
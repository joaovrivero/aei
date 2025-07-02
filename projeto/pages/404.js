import NextLink from 'next/link'
import {
    Box,
    Heading,
    Text,
    Container,
    Divider,
    Button
} from '../components/temp-ui'

const NotFound = () => {
    return (
        <Container>
            <Heading as="h1">Not Found</Heading>
            <Text> The page you&apos;re looking for was not found.</Text>
            <Divider className="my-6" />
            <Box className="my-6 text-center">
                <Button as={NextLink} href="/">
                    Return to home
                </Button>
            </Box>
        </Container>
    )
}

export default NotFound
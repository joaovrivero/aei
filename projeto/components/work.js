import NextLink from 'next/link'
import { Heading, Box, Image, Link, Badge } from './temp-ui'

// Ícone de seta para direita (substitui ChevronRightIcon)
const ChevronRightIcon = () => (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
    </svg>
)

export const Title = ({ children }) => (
    <Box>
        <Link as={NextLink} href="/works">
            Works
        </Link>
        <span className="inline-flex items-center mx-2">
            <ChevronRightIcon />
        </span>
        <Heading className="inline-block mb-4" as="h3" fontSize={20}>
            {children}
        </Heading>
    </Box>
)

export const WorkImage = ({ src, alt }) => (
    <Image className="rounded-lg w-full mb-4" src={src} alt={alt} />
)

export const Meta = ({ children }) => (
    <Badge className="mr-2">
        {children}
    </Badge>
)
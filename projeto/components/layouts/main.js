import Head from 'next/head'
import Navbar from '../navbar.js'
import { Box, Container } from '@chakra-ui/react'
import VoxelArt from '../voxel-art'
import dynamic from 'next/dynamic'
import Footer from '../footer.js'

const LazyVoxelArt = dynamic(() => import('../voxel-art'), {
  ssr: false,
  loading: () => <VoxelArt />
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Rivero</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        <LazyVoxelArt />

        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main

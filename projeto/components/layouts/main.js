import Head from 'next/head'
import Navbar from '../navbar.js'
import VoxelArt from '../voxel-art'
import dynamic from 'next/dynamic'
import Footer from '../footer.js'

const LazyVoxelArt = dynamic(() => import('../voxel-art'), {
  ssr: false,
  loading: () => <VoxelArt />
})

const Main = ({ children, router }) => {
  return (
    <main className="pb-8 min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Rivero</title>
      </Head>

      <Navbar path={router.asPath} />

      <div className="container-custom pt-14">
        <LazyVoxelArt />
        {children}
        <Footer />
      </div>
    </main>
  )
}

export default Main

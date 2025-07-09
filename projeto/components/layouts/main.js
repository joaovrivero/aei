import Head from 'next/head'
import Navbar from '../navbar.js'
import { VoxelSkeleton } from '../skeleton-loader'
import dynamic from 'next/dynamic'
import Footer from '../footer.js'

const LazyVoxelArt = dynamic(() => import('../voxel-art'), {
  ssr: false,
  loading: () => (
    <div className="relative mb-16 md:mb-20">
      <div className="voxel-art mx-auto w-[280px] md:w-[480px] lg:w-[640px] h-[280px] md:h-[480px] lg:h-[640px] relative">
        <VoxelSkeleton className="absolute inset-0" />
      </div>
    </div>
  )
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

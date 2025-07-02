import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import CustomThemeProvider from '../components/chakra'
import '../styles/globals.css'

if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual'
}

function Website({ Component, pageProps, router }) {
    return (
        <CustomThemeProvider>
            <Fonts />
            <Layout router={router}>
                <Component {...pageProps} key={router.route} />
            </Layout>
        </CustomThemeProvider>
    )
}

export default Website
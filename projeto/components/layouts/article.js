import Head from 'next/head'
import { GridItemStyle } from '../grid-item'
import { useEffect, useRef } from 'react'
import { animatePageEnter } from '../../lib/animation'

const Layout = ({ children, title }) => {
    const articleRef = useRef(null)
    const t = `${title} - João Rivero`

    useEffect(() => {
        if (articleRef.current) {
            animatePageEnter(articleRef.current)
        }
    }, [])

    return (
        <article
            ref={articleRef}
            className="relative opacity-0"
        >
            <>
                {title && (
                    <Head>
                        <title>{t}</title>
                        <meta name="twitter:title" content={t} />
                        <meta property="og:title" content={t} />
                    </Head>
                )}
                {children}
                <GridItemStyle />
            </>
        </article>
    )
}

export default Layout
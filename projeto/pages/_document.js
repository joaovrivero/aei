import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                function getInitialColorMode() {
                                    const persistedColorPreference = window.localStorage.getItem('theme');
                                    const hasPersistedPreference = typeof persistedColorPreference === 'string';
                                    if (hasPersistedPreference) {
                                        return persistedColorPreference;
                                    }
                                    const mql = window.matchMedia('(prefers-color-scheme: dark)');
                                    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
                                    if (hasMediaQueryPreference) {
                                        return mql.matches ? 'dark' : 'light';
                                    }
                                    return 'dark';
                                }
                                const colorMode = getInitialColorMode();
                                if (colorMode === 'dark') {
                                    document.documentElement.classList.add('dark');
                                }
                            })()
                        `
                    }} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
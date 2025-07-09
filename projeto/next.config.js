/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [],
        formats: ['image/webp', 'image/avif'],
    },
    // Turbopack configuration for AnimeJS optimizations
    turbopack: {
        resolveAlias: {
            // This handles the fs fallback that was in the webpack config
        },
    },
}

module.exports = nextConfig
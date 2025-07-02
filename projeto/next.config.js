/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        optimizeCss: true,
    },
    images: {
        domains: [],
        formats: ['image/webp', 'image/avif'],
    },
    webpack: (config, { isServer }) => {
        // Otimizações para AnimeJS
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            }
        }
        return config
    },
}

module.exports = nextConfig
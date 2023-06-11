/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // only allow trusted domain in production
        domains: ["www.si.com"],
        remotePatterns: [
            {
                //     that's something you should not do in production
                protocol: 'http',
                hostname: '*',
            },
            {
                protocol: 'https',
                hostname: '*',
            }
        ],
    }
}

module.exports = nextConfig

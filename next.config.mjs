import NextBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: "avatars.githubusercontent.com",
            protocol: "https"
        }]
    }
};


export default process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;


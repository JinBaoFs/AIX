import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return process.env.NODE_ENV === 'development'
        ? [
            {
                source: '/api/:path*',
                destination: 'http://121.41.46.130/api/:path*', // ✅ 实际后端地址
            },
            ]
        : []
    },
};
 
export default withNextIntl(nextConfig);
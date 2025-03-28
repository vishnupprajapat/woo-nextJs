/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'store.local',
            port: '',
            pathname: '/wp-content/uploads/**',
          },
          {
            protocol: 'https',
            hostname: 'placehold.co',
          },
          
        ],
        dangerouslyAllowSVG: true, // Enables SVGs, but use cautiously
        contentSecurityPolicy: "default-src 'self'; img-src * data:;",
      },
};

export default nextConfig;

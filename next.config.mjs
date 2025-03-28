/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["wptesting.demo.cmsminds.net", "placehold.co"],
    dangerouslyAllowSVG: true, 
    contentSecurityPolicy: "default-src 'self'; img-src * data:;",
  },
};

export default nextConfig;

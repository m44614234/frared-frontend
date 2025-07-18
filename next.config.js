/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
        {
          protocol: "https",
          hostname: "fared-backend-production.up.railway.app",
        },
        {
          protocol: "http",
          hostname: "localhost",
        },
      ]
    },
    async headers() {
        return [
          {
            source: "/:path*", 
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "*", // یا آدرس خاصی که نیاز دارید
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE, OPTIONS",
              },
              {
                key: "Access-Control-Allow-Headers",
                value: "Content-Type, Authorization, authorization",
              },
            ],
          },
        ];
    },
}

module.exports = nextConfig;

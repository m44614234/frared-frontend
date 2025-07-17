/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ['picsum.photos' , 'res.cloudinary.com'],
    //   },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
         {
        protocol: "https",
        hostname: "fared-backend.vercel.app",
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
                value: "https://fared-backend.vercel.app", // یا * برای همه دامنه‌ها
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

module.exports = nextConfig

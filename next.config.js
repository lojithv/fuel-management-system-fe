/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent:true
      }
    ];
  },
  env:{
    API_URL : process.env.API_URL
  }
};

module.exports = nextConfig;

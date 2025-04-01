/** @type {import('next').NextConfig} */
// const nodeExternals = require('webpack-node-externals');
// import nodeExternals from "webpack-node-externals"


const nextConfig  = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  output:"standalone",
  eslint:{
    ignoreDuringBuilds: true
},
typescript: {
  ignoreBuildErrors: true,
},
};

export default nextConfig;

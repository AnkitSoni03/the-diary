// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };


// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", // allow all paths from Cloudinary
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[new URL("https://cwsaim.vercel.app/*")]
  },
  allowedDevOrigins:["http://192.168.0.109:3000"],

};

export default nextConfig;

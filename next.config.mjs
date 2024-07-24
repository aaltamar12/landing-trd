/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flagpedia.net", "images.ctfassets.net", "img.freepik.com"],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_API_URL: process.env.NEXT_API_URL,
  },
};

export default nextConfig;

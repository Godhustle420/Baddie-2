/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com', 'scontent.cdninstagram.com'],
  },
  env: {
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    TIKTOK_CLIENT_KEY: process.env.TIKTOK_CLIENT_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  }
}

module.exports = nextConfig
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'email,public_profile,user_friends'
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'openid email profile'
        }
      }
    }),
    // TikTok provider (custom implementation)
    {
      id: 'tiktok',
      name: 'TikTok',
      type: 'oauth',
      clientId: process.env.TIKTOK_CLIENT_KEY,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET,
      authorization: {
        url: 'https://www.tiktok.com/auth/authorize/',
        params: {
          scope: 'user.info.basic',
          response_type: 'code',
          client_key: process.env.TIKTOK_CLIENT_KEY
        }
      },
      token: 'https://open-api.tiktok.com/oauth/access_token/',
      userinfo: 'https://open-api.tiktok.com/user/info/',
      profile(profile) {
        return {
          id: profile.data.user.open_id,
          name: profile.data.user.display_name,
          email: null, // TikTok doesn't provide email by default
          image: profile.data.user.avatar_url
        }
      }
    },
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Implement your own authentication logic here
        // This is a placeholder implementation
        if (credentials?.email && credentials?.password) {
          // In a real app, verify against your database
          return {
            id: '1',
            email: credentials.email,
            name: 'User',
            provider: 'credentials'
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.provider = account.provider
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.provider = token.provider as string
      }
      session.accessToken = token.accessToken as string
      return session
    },
    async signIn({ user, account, profile }) {
      // Custom sign-in logic
      // Track social logins for analytics
      if (account?.provider === 'facebook' || account?.provider === 'tiktok') {
        // Track social login event
        try {
          // Send tracking data to your analytics
          console.log(`Social login: ${account.provider}`, user)
        } catch (error) {
          console.error('Analytics tracking error:', error)
        }
      }
      return true
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
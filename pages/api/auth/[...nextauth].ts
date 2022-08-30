import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { SanityAdapter } from 'next-auth-sanity'
import { sanityClient } from '@lib'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      clientId: process.env.GOOGLE_CLIENT_ID!,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  // @ts-ignore
  adapter: SanityAdapter(sanityClient),
})

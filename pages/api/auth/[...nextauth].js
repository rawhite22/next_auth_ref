import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import connectMongo from '../../../lib/db'
import User from '../../../models/userModel'

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60,
  },

  providers: [
    CredentialProvider({
      async authorize(credentials) {
        await connectMongo()
        const u = await User.findOne({ username: credentials.username })
        console.log(u.id)
        if (u) {
          return {
            id: u.id,
          }
        }

        // login failed
        return null
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = token.uid
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }

      return token
    },
  },
}

export default NextAuth(authOptions)

import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

// In a real app, you would use a database adapter
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // In a real app, you would verify credentials against your database
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Mock user for demonstration
        if (credentials.email && credentials.password) {
          return {
            id: "user_123",
            name: "John Doe",
            email: credentials.email,
          }
        }

        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

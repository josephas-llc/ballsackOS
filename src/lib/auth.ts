import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { prisma } from './prisma'
import { z } from 'zod'
import type { Role } from '@/generated/prisma/client'

// Login validation schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt', // Use JWT for serverless compatibility
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    // Google OAuth (optional - for easy signup)
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    // Email/Password credentials
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) {
          return null
        }

        const { email, password } = parsed.data

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            roles: {
              include: {
                league: true,
                club: true,
                team: true,
              },
            },
          },
        })

        if (!user) {
          return null
        }

        // TODO: Implement proper password verification
        // For now, this is a placeholder - you'll need bcrypt or similar
        // const isValid = await bcrypt.compare(password, user.passwordHash)
        // if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string

        // Fetch user roles for the session
        const userWithRoles = await prisma.user.findUnique({
          where: { id: token.id as string },
          include: {
            roles: true,
          },
        })

        if (userWithRoles) {
          session.user.roles = userWithRoles.roles.map((r) => r.role)
        }
      }
      return session
    },
    async authorized({ auth, request }) {
      // Check if user is authenticated for protected routes
      const isLoggedIn = !!auth?.user
      const isProtectedRoute = request.nextUrl.pathname.startsWith('/admin') ||
                               request.nextUrl.pathname.startsWith('/dashboard') ||
                               request.nextUrl.pathname.startsWith('/portal')

      if (isProtectedRoute && !isLoggedIn) {
        return false // Will redirect to signIn page
      }

      return true
    },
  },
})

// Helper to check if user has a specific role
export async function hasRole(userId: string, role: Role): Promise<boolean> {
  const userRole = await prisma.userRole.findFirst({
    where: {
      userId,
      role,
    },
  })
  return !!userRole
}

// Helper to check if user is a league admin
export async function isLeagueAdmin(userId: string, leagueId: string): Promise<boolean> {
  const role = await prisma.userRole.findFirst({
    where: {
      userId,
      leagueId,
      role: { in: ['LEAGUE_OWNER', 'LEAGUE_ADMIN', 'SUPER_ADMIN'] },
    },
  })
  return !!role
}

// Helper to check if user is a club admin
export async function isClubAdmin(userId: string, clubId: string): Promise<boolean> {
  const role = await prisma.userRole.findFirst({
    where: {
      userId,
      clubId,
      role: { in: ['CLUB_ADMIN', 'LEAGUE_ADMIN', 'LEAGUE_OWNER', 'SUPER_ADMIN'] },
    },
  })
  return !!role
}

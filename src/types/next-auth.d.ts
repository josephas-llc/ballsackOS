import type { Role } from '@/generated/prisma/client'
import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    roles?: Role[]
  }

  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      roles?: Role[]
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
  }
}

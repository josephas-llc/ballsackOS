import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { prisma } from '@/lib/prisma'

export type Context = {
  prisma: typeof prisma
  session: {
    user?: {
      id: string
      email: string
      name?: string
    }
  } | null
}

export const createContext = async (): Promise<Context> => {
  // TODO: Get session from next-auth
  return {
    prisma,
    session: null,
  }
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

export const router = t.router
export const publicProcedure = t.procedure

// Middleware to check if user is authenticated
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

export const protectedProcedure = t.procedure.use(isAuthed)

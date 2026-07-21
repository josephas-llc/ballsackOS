import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc/trpc'

export const leagueRouter = router({
  // Get all leagues (public)
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.league.findMany({
      where: { isActive: true, isPublic: true },
      include: {
        divisions: true,
        _count: {
          select: { clubs: true, seasons: true },
        },
      },
    })
  }),

  // Get a single league by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.league.findUnique({
        where: { slug: input.slug },
        include: {
          divisions: { orderBy: { sortOrder: 'asc' } },
          clubs: { where: { isActive: true } },
          sponsors: {
            where: { isActive: true },
            include: { sponsor: true },
            orderBy: { tier: 'asc' },
          },
        },
      })
    }),

  // Create a new league (protected - league owner only)
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
        city: z.string().optional(),
        state: z.string().default('TX'),
        timezone: z.string().default('America/Chicago'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.league.create({
        data: {
          ...input,
          // Create default divisions for adult soccer
          divisions: {
            create: [
              { name: "Men's Premier", slug: 'mens-premier', gender: 'MENS', level: 'PREMIER', sortOrder: 1 },
              { name: "Men's Open", slug: 'mens-open', gender: 'MENS', level: 'OPEN', sortOrder: 2 },
              { name: "Women's Premier", slug: 'womens-premier', gender: 'WOMENS', level: 'PREMIER', sortOrder: 3 },
              { name: "Women's Open", slug: 'womens-open', gender: 'WOMENS', level: 'OPEN', sortOrder: 4 },
            ],
          },
        },
        include: { divisions: true },
      })
    }),

  // Get current standings for a division
  standings: publicProcedure
    .input(
      z.object({
        leagueSlug: z.string(),
        seasonSlug: z.string(),
        divisionSlug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const league = await ctx.prisma.league.findUnique({
        where: { slug: input.leagueSlug },
      })
      if (!league) return null

      const season = await ctx.prisma.season.findUnique({
        where: { leagueId_slug: { leagueId: league.id, slug: input.seasonSlug } },
      })
      if (!season) return null

      const division = await ctx.prisma.division.findUnique({
        where: { leagueId_slug: { leagueId: league.id, slug: input.divisionSlug } },
      })
      if (!division) return null

      return ctx.prisma.teamSeason.findMany({
        where: {
          seasonId: season.id,
          team: { divisionId: division.id },
        },
        include: {
          team: {
            include: { club: true },
          },
        },
        orderBy: [{ points: 'desc' }, { goalsFor: 'desc' }],
      })
    }),
})

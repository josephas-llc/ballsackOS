import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc/trpc'

export const sponsorRouter = router({
  // Get all sponsors for a league (with their tier info)
  getLeagueSponsors: publicProcedure
    .input(z.object({ leagueSlug: z.string() }))
    .query(async ({ ctx, input }) => {
      const league = await ctx.prisma.league.findUnique({
        where: { slug: input.leagueSlug },
      })
      if (!league) return []

      return ctx.prisma.leagueSponsor.findMany({
        where: {
          leagueId: league.id,
          isActive: true,
          startDate: { lte: new Date() },
          endDate: { gte: new Date() },
        },
        include: {
          sponsor: true,
        },
        orderBy: { tier: 'asc' },
      })
    }),

  // Get title sponsor for a league
  getTitleSponsor: publicProcedure
    .input(z.object({ leagueSlug: z.string() }))
    .query(async ({ ctx, input }) => {
      const league = await ctx.prisma.league.findUnique({
        where: { slug: input.leagueSlug },
      })
      if (!league) return null

      return ctx.prisma.leagueSponsor.findFirst({
        where: {
          leagueId: league.id,
          isActive: true,
          isTitleSponsor: true,
          startDate: { lte: new Date() },
          endDate: { gte: new Date() },
        },
        include: {
          sponsor: true,
        },
      })
    }),

  // Get ads for a specific placement
  getAdsForPlacement: publicProcedure
    .input(
      z.object({
        leagueSlug: z.string(),
        placement: z.enum([
          'HOMEPAGE_HERO',
          'HOMEPAGE_SIDEBAR',
          'SCHEDULE_BANNER',
          'STANDINGS_BANNER',
          'TEAM_PAGE_BANNER',
          'GAME_PAGE_SPONSOR',
          'EMAIL_HEADER',
          'EMAIL_FOOTER',
          'EMAIL_INLINE',
          'APP_SPLASH_SCREEN',
          'APP_BANNER',
          'APP_INTERSTITIAL',
        ]),
        divisionId: z.string().optional(),
        clubId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const league = await ctx.prisma.league.findUnique({
        where: { slug: input.leagueSlug },
      })
      if (!league) return []

      const now = new Date()

      return ctx.prisma.adPlacement.findMany({
        where: {
          leagueId: league.id,
          placement: input.placement,
          isActive: true,
          startDate: { lte: now },
          endDate: { gte: now },
          // Optional targeting filters
          OR: [
            { targetDivisions: { isEmpty: true } },
            input.divisionId ? { targetDivisions: { has: input.divisionId } } : {},
          ],
        },
        include: {
          sponsor: true,
        },
        orderBy: [{ priority: 'desc' }, { weight: 'desc' }],
      })
    }),

  // Track an impression (public - called from frontend)
  trackImpression: publicProcedure
    .input(
      z.object({
        sponsorId: z.string(),
        placementId: z.string().optional(),
        type: z.enum(['VIEW', 'CLICK', 'CONVERSION']),
        pageUrl: z.string().optional(),
        deviceType: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Create impression record
      await ctx.prisma.sponsorImpression.create({
        data: {
          sponsorId: input.sponsorId,
          placementId: input.placementId,
          type: input.type,
          pageUrl: input.pageUrl,
          deviceType: input.deviceType,
          userId: ctx.session?.user?.id,
        },
      })

      // Update ad placement counters if applicable
      if (input.placementId) {
        if (input.type === 'VIEW') {
          await ctx.prisma.adPlacement.update({
            where: { id: input.placementId },
            data: { impressions: { increment: 1 } },
          })
        } else if (input.type === 'CLICK') {
          await ctx.prisma.adPlacement.update({
            where: { id: input.placementId },
            data: { clicks: { increment: 1 } },
          })
        }
      }

      return { success: true }
    }),

  // Create a new sponsor (protected - sponsor admin only)
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        website: z.string().url().optional(),
        tagline: z.string().optional(),
        industry: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.sponsor.create({
        data: input,
      })
    }),

  // Add a sponsor to a league
  addToLeague: protectedProcedure
    .input(
      z.object({
        sponsorId: z.string(),
        leagueId: z.string(),
        tier: z.enum(['TITLE', 'PLATINUM', 'GOLD', 'SILVER', 'BRONZE', 'SUPPORTER']),
        startDate: z.date(),
        endDate: z.date(),
        contractValue: z.number().optional(),
        isTitleSponsor: z.boolean().default(false),
        logoOnJerseys: z.boolean().default(false),
        logoOnWebsite: z.boolean().default(true),
        fieldSignage: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.leagueSponsor.create({
        data: {
          sponsorId: input.sponsorId,
          leagueId: input.leagueId,
          tier: input.tier,
          startDate: input.startDate,
          endDate: input.endDate,
          contractValue: input.contractValue,
          isTitleSponsor: input.isTitleSponsor,
          logoOnJerseys: input.logoOnJerseys,
          logoOnWebsite: input.logoOnWebsite,
          fieldSignage: input.fieldSignage,
        },
        include: { sponsor: true },
      })
    }),

  // Get sponsor analytics/ROI report
  getAnalytics: protectedProcedure
    .input(
      z.object({
        sponsorId: z.string(),
        startDate: z.date(),
        endDate: z.date(),
      })
    )
    .query(async ({ ctx, input }) => {
      const impressions = await ctx.prisma.sponsorImpression.groupBy({
        by: ['type'],
        where: {
          sponsorId: input.sponsorId,
          timestamp: {
            gte: input.startDate,
            lte: input.endDate,
          },
        },
        _count: true,
      })

      const byPlacement = await ctx.prisma.sponsorImpression.groupBy({
        by: ['placementId', 'type'],
        where: {
          sponsorId: input.sponsorId,
          timestamp: {
            gte: input.startDate,
            lte: input.endDate,
          },
        },
        _count: true,
      })

      return {
        summary: impressions.reduce(
          (acc, imp) => {
            acc[imp.type.toLowerCase() as 'view' | 'click' | 'conversion'] = imp._count
            return acc
          },
          { view: 0, click: 0, conversion: 0 }
        ),
        byPlacement,
      }
    }),
})

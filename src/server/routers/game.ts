import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc/trpc'

export const gameRouter = router({
  // Get upcoming games for a league/season
  upcoming: publicProcedure
    .input(
      z.object({
        leagueSlug: z.string(),
        seasonSlug: z.string().optional(),
        divisionSlug: z.string().optional(),
        teamId: z.string().optional(),
        limit: z.number().min(1).max(50).default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      const league = await ctx.prisma.league.findUnique({
        where: { slug: input.leagueSlug },
      })
      if (!league) return []

      const where: Record<string, unknown> = {
        season: { leagueId: league.id },
        scheduledAt: { gte: new Date() },
        status: { in: ['SCHEDULED', 'CONFIRMED'] },
      }

      if (input.seasonSlug) {
        where.season = {
          leagueId: league.id,
          slug: input.seasonSlug,
        }
      }

      if (input.divisionSlug) {
        const division = await ctx.prisma.division.findUnique({
          where: { leagueId_slug: { leagueId: league.id, slug: input.divisionSlug } },
        })
        if (division) {
          where.divisionId = division.id
        }
      }

      if (input.teamId) {
        where.OR = [{ homeTeamId: input.teamId }, { awayTeamId: input.teamId }]
      }

      return ctx.prisma.game.findMany({
        where,
        include: {
          homeTeam: { include: { club: true } },
          awayTeam: { include: { club: true } },
          division: true,
          field: { include: { venue: true } },
        },
        orderBy: { scheduledAt: 'asc' },
        take: input.limit,
      })
    }),

  // Get recent results
  results: publicProcedure
    .input(
      z.object({
        leagueSlug: z.string(),
        seasonSlug: z.string().optional(),
        divisionSlug: z.string().optional(),
        limit: z.number().min(1).max(50).default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      const league = await ctx.prisma.league.findUnique({
        where: { slug: input.leagueSlug },
      })
      if (!league) return []

      const where: Record<string, unknown> = {
        season: { leagueId: league.id },
        status: 'COMPLETED',
      }

      if (input.seasonSlug) {
        where.season = {
          leagueId: league.id,
          slug: input.seasonSlug,
        }
      }

      if (input.divisionSlug) {
        const division = await ctx.prisma.division.findUnique({
          where: { leagueId_slug: { leagueId: league.id, slug: input.divisionSlug } },
        })
        if (division) {
          where.divisionId = division.id
        }
      }

      return ctx.prisma.game.findMany({
        where,
        include: {
          homeTeam: { include: { club: true } },
          awayTeam: { include: { club: true } },
          division: true,
          field: { include: { venue: true } },
        },
        orderBy: { scheduledAt: 'desc' },
        take: input.limit,
      })
    }),

  // Get single game details
  getById: publicProcedure
    .input(z.object({ gameId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.game.findUnique({
        where: { id: input.gameId },
        include: {
          homeTeam: {
            include: {
              club: true,
              players: { include: { player: true } },
            },
          },
          awayTeam: {
            include: {
              club: true,
              players: { include: { player: true } },
            },
          },
          division: true,
          season: true,
          field: { include: { venue: true } },
          refereeAssignments: {
            include: { referee: { include: { user: true } } },
          },
          events: { orderBy: { minute: 'asc' } },
          playerStats: { include: { player: true } },
        },
      })
    }),

  // Submit score (protected - referee or league admin)
  submitScore: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
        homeScore: z.number().min(0),
        awayScore: z.number().min(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: Verify user is assigned referee or league admin

      const game = await ctx.prisma.game.update({
        where: { id: input.gameId },
        data: {
          homeScore: input.homeScore,
          awayScore: input.awayScore,
          status: 'COMPLETED',
        },
        include: {
          homeTeam: true,
          awayTeam: true,
          season: true,
        },
      })

      // Update team season stats
      const homeWin = input.homeScore > input.awayScore
      const awayWin = input.awayScore > input.homeScore
      const draw = input.homeScore === input.awayScore

      // Home team stats
      await ctx.prisma.teamSeason.upsert({
        where: {
          teamId_seasonId: {
            teamId: game.homeTeamId,
            seasonId: game.seasonId,
          },
        },
        update: {
          wins: { increment: homeWin ? 1 : 0 },
          losses: { increment: awayWin ? 1 : 0 },
          draws: { increment: draw ? 1 : 0 },
          goalsFor: { increment: input.homeScore },
          goalsAgainst: { increment: input.awayScore },
          points: { increment: homeWin ? 3 : draw ? 1 : 0 },
        },
        create: {
          teamId: game.homeTeamId,
          seasonId: game.seasonId,
          wins: homeWin ? 1 : 0,
          losses: awayWin ? 1 : 0,
          draws: draw ? 1 : 0,
          goalsFor: input.homeScore,
          goalsAgainst: input.awayScore,
          points: homeWin ? 3 : draw ? 1 : 0,
        },
      })

      // Away team stats
      await ctx.prisma.teamSeason.upsert({
        where: {
          teamId_seasonId: {
            teamId: game.awayTeamId,
            seasonId: game.seasonId,
          },
        },
        update: {
          wins: { increment: awayWin ? 1 : 0 },
          losses: { increment: homeWin ? 1 : 0 },
          draws: { increment: draw ? 1 : 0 },
          goalsFor: { increment: input.awayScore },
          goalsAgainst: { increment: input.homeScore },
          points: { increment: awayWin ? 3 : draw ? 1 : 0 },
        },
        create: {
          teamId: game.awayTeamId,
          seasonId: game.seasonId,
          wins: awayWin ? 1 : 0,
          losses: homeWin ? 1 : 0,
          draws: draw ? 1 : 0,
          goalsFor: input.awayScore,
          goalsAgainst: input.homeScore,
          points: awayWin ? 3 : draw ? 1 : 0,
        },
      })

      return game
    }),

  // Add game event (goal, card, etc.)
  addEvent: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
        type: z.enum([
          'GOAL',
          'OWN_GOAL',
          'ASSIST',
          'YELLOW_CARD',
          'RED_CARD',
          'SUBSTITUTION',
          'INJURY',
          'PENALTY_SCORED',
          'PENALTY_MISSED',
          'PENALTY_SAVED',
        ]),
        minute: z.number().min(0).max(120).optional(),
        playerId: z.string().optional(),
        teamId: z.string().optional(),
        details: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.gameEvent.create({
        data: input,
      })
    }),
})

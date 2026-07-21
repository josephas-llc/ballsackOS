import { router } from '../trpc/trpc'
import { leagueRouter } from './league'
import { sponsorRouter } from './sponsor'
import { gameRouter } from './game'

export const appRouter = router({
  league: leagueRouter,
  sponsor: sponsorRouter,
  game: gameRouter,
})

export type AppRouter = typeof appRouter

# API Architecture

## Overview

ballsackOS uses [tRPC](https://trpc.io/) for type-safe API communication between the frontend and backend. This provides end-to-end type safety without code generation.

## tRPC Setup

### Server-Side

```
src/server/
├── trpc/
│   └── trpc.ts          # tRPC initialization, context, procedures
└── routers/
    ├── index.ts         # Main router combining all sub-routers
    ├── league.ts        # League management endpoints
    ├── game.ts          # Game and scheduling endpoints
    └── sponsor.ts       # Sponsorship and advertising endpoints
```

### Client-Side

```
src/lib/
├── trpc.ts              # tRPC React hooks
└── trpc-provider.tsx    # React Query + tRPC provider
```

## Context

Every tRPC procedure has access to:

```typescript
type Context = {
  prisma: PrismaClient    // Database client
  session: {              // User session (from NextAuth)
    user?: {
      id: string
      email: string
      name?: string
    }
  } | null
}
```

## Procedure Types

### Public Procedures

No authentication required. Used for public data like schedulesoll standings.

```typescript
export const publicProcedure = t.procedure
```

### Protected Procedures

Requires authenticated user. Throws `UNAUTHORIZED` if no session.

```typescript
export const protectedProcedure = t.procedure.use(isAuthed)
```

## Routers

### League Router (`/api/trpc/league.*`)

| Procedure | Type | Description |
|-----------|------|-------------|
| `league.list` | Query | List all public leagues |
| `league.getBySlug` | Query | Get league details by URL slug |
| `league.create` | Mutation | Create a new league (protected) |
| `league.standings` | Query | Get division standings |

**Example Usage:**

```typescript
// Client-side
const { data: leagues } = trpc.league.list.useQuery()

const { data: league } = trpc.league.getBySlug.useQuery({
  slug: 'texas-select-league'
})

const { data: standings } = trpc.league.standings.useQuery({
  leagueSlug: 'texas-select-league',
  seasonSlug: 'spring-2025',
  divisionSlug: 'mens-premier'
})
```

### Game Router (`/api/trpc/game.*`)

| Procedure | Type | Description |
|-----------|------|-------------|
| `game.upcoming` | Query | Get upcoming games with filters |
| `game.results` | Query | Get completed game results |
| `game.getById` | Query | Get full game details |
| `game.submitScore` | Mutation | Submit final score (protected) |
| `game.addEvent` | Mutation | Add game event (protected) |

**Example Usage:**

```typescript
// Get upcoming games for a team
const { data: games } = trpc.game.upcoming.useQuery({
  leagueSlug: 'texas-select-league',
  teamId: 'team-123',
  limit: 10
})

// Submit final score
const submitScore = trpc.game.submitScore.useMutation()
await submitScore.mutateAsync({
  gameId: 'game-456',
  homeScore: 3,
  awayScore: 1
})
```

### Sponsor Router (`/api/trpc/sponsor.*`)

| Procedure | Type | Description |
|-----------|------|-------------|
| `sponsor.getLeagueSponsors` | Query | Get all sponsors for a league |
| `sponsor.getTitleSponsor` | Query | Get title sponsor only |
| `sponsor.getAdsForPlacement` | Query | Get ads for a specific placement |
| `sponsor.trackImpression` | Mutation | Track view/click/conversion |
| `sponsor.create` | Mutation | Create new sponsor (protected) |
| `sponsor.addToLeague` | Mutation | Add sponsor to league (protected) |
| `sponsor.getAnalytics` | Query | Get sponsor analytics (protected) |

**Example Usage:**

```typescript
// Get title sponsor for header
const { data: titleSponsor } = trpc.sponsor.getTitleSponsor.useQuery({
  leagueSlug: 'texas-select-league'
})

// Get sidebar ads
const { data: ads } = trpc.sponsor.getAdsForPlacement.useQuery({
  leagueSlug: 'texas-select-league',
  placement: 'HOMEPAGE_SIDEBAR'
})

// Track ad click
const trackImpression = trpc.sponsor.trackImpression.useMutation()
await trackImpression.mutateAsync({
  sponsorId: 'sponsor-789',
  placementId: 'placement-123',
  type: 'CLICK',
  pageUrl: window.location.href
})
```

## API Route Handler

The tRPC router is exposed at `/api/trpc/[trpc]`:

```typescript
// src/app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers'
import { createContext } from '@/server/trpc/trpc'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  })

export { handler as GET, handler as POST }
```

## React Integration

### Provider Setup

```tsx
// src/app/layout.tsx
import { TRPCProvider } from '@/lib/trpc-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  )
}
```

### Using Queries

```tsx
'use client'

import { trpc } from '@/lib/trpc'

export function UpcomingGames() {
  const { data, isLoading, error } = trpc.game.upcoming.useQuery({
    leagueSlug: 'texas-select-league',
    limit: 5
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data?.map(game => (
        <li key={game.id}>
          {game.homeTeam.name} vs {game.awayTeam.name}
        </li>
      ))}
    </ul>
  )
}
```

### Using Mutations

```tsx
'use client'

import { trpc } from '@/lib/trpc'

export function ScoreForm({ gameId }) {
  const submitScore = trpc.game.submitScore.useMutation({
    onSuccess: () => {
      // Invalidate queries to refresh data
      trpc.useContext().game.invalidate()
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    submitScore.mutate({
      gameId,
      homeScore: parseInt(e.target.homeScore.value),
      awayScore: parseInt(e.target.awayScore.value)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="homeScore" type="number" />
      <input name="awayScore" type="number" />
      <button type="submit" disabled={submitScore.isLoading}>
        Submit Score
      </button>
    </form>
  )
}
```

## Error Handling

tRPC provides typed errors:

```typescript
import { TRPCError } from '@trpc/server'

// In a procedure
throw new TRPCError({
  code: 'NOT_FOUND',
  message: 'Game not found'
})

// Error codes:
// - UNAUTHORIZED: Not logged in
// - FORBIDDEN: Logged in but not allowed
// - NOT_FOUND: Resource doesn't exist
// - BAD_REQUEST: Invalid input
// - INTERNAL_SERVER_ERROR: Server error
```

## Input Validation

All inputs are validated with Zod:

```typescript
import { z } from 'zod'

const createLeague = protectedProcedure
  .input(
    z.object({
      name: z.string().min(1),
      slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
      description: z.string().optional(),
      city: z.string().optional(),
      state: z.string().default('TX'),
    })
  )
  .mutation(async ({ ctx, input }) => {
    // Input is fully typed and validated
    return ctx.prisma.league.create({ data: input })
  })
```

## Future: REST API

For third-party integrations, a REST API layer may be added:

```
/api/v1/leagues
/api/v1/leagues/:slug/schedule
/api/v1/leagues/:slug/standings
/api/v1/games/:id
```

See [Issue #16: API Documentation & Developer Access](../../issues/16)

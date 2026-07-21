# Database Architecture

## Overview

ballsackOS uses PostgreSQL with Prisma 7 ORM. The schema is designed to support:
- Multi-tenant league management
- Sponsorship and advertising from day one
- Real-time game tracking
- Referee assignment and payment

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CORE HIERARCHY                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  League ─────┬──── Season ──── Game                                         │
│              │                   │                                           │
│              ├──── Division ─────┤                                           │
│              │         │         │                                           │
│              ├──── Club ────── Team ──── TeamPlayer ──── Player             │
│              │                   │                          │                │
│              └──── Venue ───── Field                   PlayerGameStats      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              SPONSORSHIP                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Sponsor ────┬──── LeagueSponsor ──── League                                │
│              │                                                               │
│              ├──── ClubSponsor ──── Club                                    │
│              │                                                               │
│              ├──── AdCampaign ──── AdPlacement                              │
│              │                                                               │
│              └──── SponsorContact ──── User                                 │
│                                                                              │
│  SponsorImpression (analytics tracking)                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              REFEREES                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Referee ────┬──── LeagueReferee ──── League                                │
│              │                                                               │
│              ├──── RefereeAvailability                                      │
│              │                                                               │
│              └──── GameReferee ──── Game                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Core Models

### League Structure

| Model | Description |
|-------|-------------|
| `League` | Top-level organization (e.g., "Texas Select League") |
| `Season` | Time-bounded competition period (e.g., "Spring 2025") |
| `Division` | Gender + skill level grouping (e.g., "Men's Premier") |
| `Club` | Geographic organization with multiple teams |
| `Team` | Roster of players competing in a division |
| `Player` | Individual player profile linked to User |
| `TeamPlayer` | Junction table with jersey number, position, captain status |

### Games & Scheduling

| Model | Description |
|-------|-------------|
| `Game` | Scheduled match between two teams |
| `GameEvent` | In-game events (goals, cards, substitutions) |
| `PlayerGameStats` | Per-player statistics for a game |
| `Venue` | Physical location with address and amenities |
| `Field` | Individual playing field within a venue |
| `FieldAvailability` | Time slots when field is available |

### Referees

| Model | Description |
|-------|-------------|
| `Referee` | Referee profile with certifications |
| `LeagueReferee` | Referee approval status for a league |
| `RefereeAvailability` | When referee is available |
| `GameReferee` | Referee assignment to a game with payment tracking |

### Sponsorship & Advertising

| Model | Description |
|-------|-------------|
| `Sponsor` | Company/brand (e.g., "Texian Insurance") |
| `LeagueSponsor` | League-level sponsorship with tier and benefits |
| `ClubSponsor` | Club-level sponsorship |
| `AdCampaign` | Digital advertising campaign |
| `AdPlacement` | Individual ad unit with targeting |
| `SponsorImpression` | Analytics event (view, click, conversion) |

### Tournaments

| Model | Description |
|-------|-------------|
| `Tournament` | Competition with bracket/group format |
| `TournamentTeam` | Team registration with seeding and stats |

## Enums

### User Roles
```prisma
enum Role {
  SUPER_ADMIN       // Platform-wide admin
  LEAGUE_OWNER      // Owns the league
  LEAGUE_ADMIN      // League administrators
  CLUB_ADMIN        // Club administrators
  TEAM_MANAGER      // Team manager/coach
  REFEREE_ADMIN     // Manages referee assignments
  SPONSOR_ADMIN     // Manages sponsors/ads
}
```

### Division Structure
```prisma
enum Gender {
  MENS
  WOMENS
  COED
}

enum DivisionLevel {
  PREMIER     // Upper/competitive
  OPEN        // Lower/recreational
}
```

### Game Status
```prisma
enum GameStatus {
  SCHEDULED
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  POSTPONED
  CANCELLED
}
```

### Sponsorship Tiers
```prisma
enum SponsorTier {
  TITLE       // "Presented by" - top tier
  PLATINUM
  GOLD
  SILVER
  BRONZE
  SUPPORTER   // Lowest tier
}
```

### Ad Placements
```prisma
enum AdPlacementLocation {
  HOMEPAGE_HERO
  HOMEPAGE_SIDEBAR
  SCHEDULE_BANNER
  STANDINGS_BANNER
  TEAM_PAGE_BANNER
  GAME_PAGE_SPONSOR
  EMAIL_HEADER
  EMAIL_FOOTER
  EMAIL_INLINE
  APP_SPLASH_SCREEN
  APP_BANNER
  APP_INTERSTITIAL
}
```

## Indexes

Key indexes for performance:

```prisma
// Sponsor analytics queries
@@index([sponsorId, timestamp]) on SponsorImpression
@@index([placementId, timestamp]) on SponsorImpression
```

## Unique Constraints

Important uniqueness rules:

```prisma
// League slugs must be globally unique
@@unique([slug]) on League

// Season/Division/Club slugs unique within league
@@unique([leagueId, slug]) on Season
@@unique([leagueId, slug]) on Division
@@unique([leagueId, slug]) on Club

// Team slugs unique within club
@@unique([clubId, slug]) on Team

// One player per team
@@unique([teamId, playerId]) on TeamPlayer

// One sponsor per league/club
@@unique([leagueId, sponsorId]) on LeagueSponsor
@@unique([clubId, sponsorId]) on ClubSponsor
```

## Prisma 7 Configuration

Prisma 7 requires a driver adapter. We use `@prisma/adapter-pg`:

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({ adapter })
```

## Migrations

```bash
# Generate migration from schema changes
npx prisma migrate dev --name description_of_changes

# Apply migrations in production
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

## Related Documentation

- [Prisma Schema](/prisma/schema.prisma)
- [Setup Guide](/docs/setup/INSTALLATION.md)

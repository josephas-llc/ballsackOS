# ballsackOS

**Chisholm FC League Management Platform**

A comprehensive soccer league management system for the **Chisholm FC League** - a competitive adult soccer league operating along the historic Chisholm Trail corridor (I-35) in Central Texas, from Waco to San Antonio.

This isn't rec soccer - it's a legitimate pathway for serious players who can't go pro due to life choices, aspiring players developing toward higher levels, and adults who want real competition while building careers and families.

**Key differentiator:** Combined gender match days where men's and women's results determine club championships together. No other adult league does this.

**Title Sponsor:** [Texian Insurance](https://texianinsurance.com)

## Features

- **League Management** - Seasons, divisions, clubs, teams, players
- **Game Scheduling** - Intelligent scheduling with conflict detection and optimization
- **Referee System** - Availability tracking, auto-assignment, payment management
- **Live Scoring** - Real-time score entry and updates
- **Standings & Stats** - Automatic standings calculation and player statistics
- **Tournaments** - Single/double elimination, group stages, playoffs
- **Sponsorship Platform** - Tiered sponsorships, ad placements, analytics
- **Broadcasting** - Live stream integration with sponsor overlays
- **Mobile PWA** - Offline-capable, field-side optimized

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma 7
- **API:** tRPC for type-safe APIs
- **Auth:** NextAuth.js v5
- **Styling:** Tailwind CSS
- **Deployment:** Linux VM (self-hosted)

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/josephas-llc/ballsackOS.git
cd ballsackOS

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your database connection string

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
ballsackOS/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js app router
│   │   ├── api/trpc/          # tRPC API endpoint
│   │   └── (pages)/           # Page components
│   ├── lib/                   # Utilities
│   │   ├── prisma.ts          # Database client
│   │   └── trpc.ts            # tRPC client
│   └── server/
│       └── routers/           # tRPC routers
│           ├── league.ts      # League endpoints
│           ├── game.ts        # Game endpoints
│           └── sponsor.ts     # Sponsorship endpoints
├── docs/
│   └── reference/             # Reference materials
└── public/                    # Static assets
```

## Development Roadmap

### Phase 1: MVP

Core functionality to launch a functional league:

- [#1](../../issues/1) PostgreSQL setup on Linux VM
- [#2](../../issues/2) Authentication (NextAuth.js)
- [#3](../../issues/3) Admin Dashboard
- [#4](../../issues/4) Player Portal
- [#5](../../issues/5) Fan/Spectator Public Site
- [#7](../../issues/7) Schedule Optimization Algorithm
- [#8](../../issues/8) Referee Assignment System
- [#9](../../issues/9) Texian Insurance Title Sponsorship
- [#17](../../issues/17) Deployment & CI/CD
- [#18](../../issues/18) Live Score Entry
- [#22](../../issues/22) Venue & Field Management
- [#28](../../issues/28) Texas League Rules Configuration

### Phase 2: Core Features

Enhanced functionality after MVP launch:

- [#6](../../issues/6) Live Broadcasting System
- [#10](../../issues/10) Sponsor Analytics Dashboard
- [#11](../../issues/11) Tournament System
- [#12](../../issues/12) Notifications (Email, SMS, Push)
- [#13](../../issues/13) PWA & Mobile Experience
- [#14](../../issues/14) Player Registration & Payments
- [#19](../../issues/19) Stats & Leaderboards
- [#20](../../issues/20) Club Branding & Subdomains
- [#21](../../issues/21) Calendar Integration
- [#23](../../issues/23) Disciplinary System
- [#24](../../issues/24) Team Messaging
- [#26](../../issues/26) SEO & Social Media

### Phase 3: Advanced Features

Polish and expansion:

- [#15](../../issues/15) Multi-language Support (Spanish)
- [#16](../../issues/16) Public API & Developer Access
- [#25](../../issues/25) Photo & Media Gallery
- [#27](../../issues/27) Data Import/Export Tools

## League Structure

```
Chisholm FC League
└── Divisions
    ├── Men's Premier (competitive)
    ├── Men's Open (recreational)
    ├── Women's Premier (competitive)
    └── Women's Open (recreational)
        └── Clubs (geographically based, 12 planned)
            ├── Men's Team (required)
            ├── Women's Team (required)
            └── Additional teams (2-3 per gender for internal competition)
```

**Combined Club Scoring:** Men's + Women's match results determine club championship standings.

## Sponsorship Tiers

| Tier | Benefits |
|------|----------|
| **Title** | "Presented by" branding, all placements, broadcast integration |
| **Platinum** | Logo on website, field signage, email mentions |
| **Gold** | Logo on website, social media posts |
| **Silver** | Logo on website, program ads |
| **Bronze** | Logo on sponsors page |
| **Supporter** | Basic logo placement |

## Contributing

This is a private project for Josephas LLC. Contact the maintainers for access.

## License

Proprietary - All rights reserved.

---

Built with [Next.js](https://nextjs.org) and [Prisma](https://prisma.io)

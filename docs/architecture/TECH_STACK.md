# Technology Stack

## Overview

ballsackOS is built with a modern TypeScript stack optimized for developer productivity, type safety, and performance.

## Core Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Framework** | Next.js | 16.x | React framework with App Router |
| **Language** | TypeScript | 5.x | Type-safe JavaScript |
| **Database** | PostgreSQL | 15+ | Relational database |
| **ORM** | Prisma | 7.x | Type-safe database access |
| **API** | tRPC | 11.x | End-to-end type-safe APIs |
| **Auth** | NextAuth.js | 5.x (beta) | Authentication |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS |
| **State** | React Query | 5.x | Server state management |

## Architecture Decisions

### Why Next.js 16?

- **App Router**: Modern React Server Components
- **File-based routing**: Intuitive page structure
- **API routes**: Backend and frontend in one project
- **Built-in optimizations**: Images, fonts, code splitting
- **Vercel-ready**: Easy deployment (though we self-host)

### Why tRPC over REST/GraphQL?

- **End-to-end type safety**: No code generation needed
- **Automatic type inference**: Change backend, frontend types update
- **React Query integration**: Caching, refetching, optimistic updates
- **Smaller bundle**: No GraphQL client needed
- **Simpler**: No schema definition language

### Why Prisma 7?

- **Type-safe queries**: Full TypeScript support
- **Migrations**: Version-controlled schema changes
- **Studio**: Visual database browser
- **Relations**: Easy nested queries
- **Driver adapters**: Flexible database connections

### Why PostgreSQL?

- **Reliability**: Battle-tested, ACID compliant
- **Performance**: Excellent for complex queries
- **JSON support**: Flexible data when needed
- **Full-text search**: Built-in search capabilities
- **Extensions**: PostGIS for future mapping features

### Why Tailwind CSS?

- **Utility-first**: Rapid UI development
- **No CSS files**: Styles in components
- **Responsive**: Mobile-first by default
- **Dark mode**: Built-in support
- **Customizable**: Design system via config

## Project Structure

```
ballsackOS/
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API routes
│   │   │   └── trpc/        # tRPC endpoint
│   │   ├── (admin)/         # Admin pages (future)
│   │   ├── (player)/        # Player portal (future)
│   │   └── (public)/        # Public pages (future)
│   ├── components/          # React components (future)
│   │   ├── ui/              # Base UI components
│   │   └── features/        # Feature-specific components
│   ├── generated/           # Generated code (Prisma client)
│   ├── lib/                 # Utilities and configs
│   │   ├── prisma.ts        # Database client
│   │   ├── trpc.ts          # tRPC client hooks
│   │   └── trpc-provider.tsx # Provider component
│   ├── server/              # Server-side code
│   │   ├── routers/         # tRPC routers
│   │   └── trpc/            # tRPC setup
│   └── types/               # TypeScript types (future)
├── public/                  # Static assets
├── docs/                    # Documentation
│   ├── architecture/        # Technical docs
│   ├── business/            # Business docs
│   └── setup/               # Setup guides
└── tests/                   # Tests (future)
```

## Dependencies

### Production Dependencies

```json
{
  "@prisma/client": "^7.9.0",
  "@prisma/adapter-pg": "^7.9.0",
  "@tanstack/react-query": "^5.x",
  "@trpc/client": "^11.x",
  "@trpc/next": "^11.x",
  "@trpc/react-query": "^11.x",
  "@trpc/server": "^11.x",
  "next": "16.x",
  "next-auth": "5.x-beta",
  "pg": "^8.x",
  "react": "19.x",
  "react-dom": "19.x",
  "superjson": "^2.x",
  "zod": "^4.x"
}
```

### Development Dependencies

```json
{
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/pg": "^8",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "dotenv": "^16",
  "eslint": "^9",
  "eslint-config-next": "16.x",
  "prisma": "^7.9.0",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ballsackos"

# Auth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""

# Storage
S3_BUCKET=""
S3_REGION=""
S3_ACCESS_KEY=""
S3_SECRET_KEY=""
```

## Development Workflow

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npx tsc --noEmit

# Run linting
npm run lint

# Format code
npx prettier --write .

# Generate Prisma client after schema changes
npx prisma generate

# Create database migration
npx prisma migrate dev --name description

# Open Prisma Studio (database browser)
npx prisma studio
```

## Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start

# Or with PM2
pm2 start npm --name "ballsackos" -- start
```

## Performance Considerations

### Database

- Connection pooling via `pg` Pool
- Indexed queries for common access patterns
- Denormalized stats for fast standings

### Frontend

- React Server Components where possible
- Client components only when interactive
- Image optimization via Next.js
- Code splitting per route

### Caching

- React Query for client-side caching
- ISR (Incremental Static Regeneration) for public pages
- CDN for static assets

## Security

- Input validation with Zod on all tRPC procedures
- SQL injection prevention via Prisma
- XSS prevention via React
- CSRF protection via NextAuth
- Environment variables for secrets
- HTTPS in production

## Monitoring (Future)

- Error tracking: Sentry
- Performance: Vercel Analytics or self-hosted
- Uptime: UptimeRobot
- Logs: PM2 logs or centralized logging

## Related Documentation

- [Database Architecture](/docs/architecture/DATABASE.md)
- [API Architecture](/docs/architecture/API.md)
- [Installation Guide](/docs/setup/INSTALLATION.md)

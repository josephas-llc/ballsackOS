# Installation Guide

## Prerequisites

- **Node.js** 20.x or higher
- **PostgreSQL** 15.x or higher
- **npm** (comes with Node.js)
- **Git**

## Quick Start

```bash
# Clone the repository
git clone https://github.com/josephas-llc/ballsackOS.git
cd ballsackOS

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Detailed Setup

### 1. Clone Repository

```bash
git clone https://github.com/josephas-llc/ballsackOS.git
cd ballsackOS
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages. You may see warnings about scripts needing approval:

```bash
npm approve-scripts prisma @prisma/engines
```

### 3. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```bash
# Required: Database connection
DATABASE_URL="postgresql://username:password@localhost:5432/ballsackos"

# Required: Auth secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"

# Optional: OAuth providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Optional: Email
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
EMAIL_FROM="noreply@yourdomain.com"
```

### 4. Set Up PostgreSQL

#### Option A: Local PostgreSQL

Install PostgreSQL and create a database:

```bash
# macOS (Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database
createdb ballsackos
```

#### Option B: Docker

```bash
docker run -d \
  --name ballsackos-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=ballsackos \
  -p 5432:5432 \
  postgres:15
```

Connection string for Docker:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ballsackos"
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

This generates the type-safe database client in `src/generated/prisma/`.

### 6. Run Database Migrations

```bash
npx prisma migrate dev
```

This creates all database tables based on the Prisma schema.

### 7. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open database browser |
| `npx prisma generate` | Regenerate Prisma client |
| `npx prisma migrate dev` | Run migrations |
| `npx prisma migrate reset` | Reset database (destructive!) |

## Troubleshooting

### "Cannot find module '@/generated/prisma/client'"

Run `npx prisma generate` to generate the Prisma client.

### "Connection refused" to database

1. Ensure PostgreSQL is running
2. Check your `DATABASE_URL` in `.env`
3. Verify the database exists: `psql -l`

### Prisma migration errors

If migrations fail, you can reset (development only):

```bash
npx prisma migrate reset
```

**Warning:** This deletes all data!

### TLS/SSL certificate errors

If you see SSL errors during Prisma operations:

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npx prisma migrate dev
```

This is common in development with self-signed certificates.

### Port 3000 already in use

Either stop the other process or use a different port:

```bash
PORT=3001 npm run dev
```

## Next Steps

After installation:

1. Set up authentication - see [Issue #2](../../issues/2)
2. Configure your first league
3. Add clubs and teams
4. Set up Texian Insurance sponsorship - see [Issue #9](../../issues/9)

## Related Documentation

- [Linux VM Deployment](/docs/setup/LINUX_VM.md)
- [Database Architecture](/docs/architecture/DATABASE.md)
- [Tech Stack](/docs/architecture/TECH_STACK.md)

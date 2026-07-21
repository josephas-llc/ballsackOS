# Sponsorship & Advertising System

## Overview

ballsackOS is built with sponsorship as a first-class feature, not an afterthought. This enables the league to generate revenue while providing value to sponsors through targeted advertising and measurable ROI.

## Title Sponsor: Texian Insurance

[Texian Insurance](https://texianinsurance.com) is the founding title sponsor of the Texas Select League.

### Strategic Alignment

- **Target audience overlap**: Adult soccer players in Texas are potential insurance customers
- **Lead generation**: Direct pipeline to engaged, community-minded adults
- **Brand association**: Healthy, active, community-focused lifestyle
- **Business networking**: Club owners and players may be future clients, employees, or referral partners

### Title Sponsor Benefits

- "Texas Select League presented by Texian Insurance" branding
- Logo on all league pages
- Logo on broadcast overlays
- Email header/footer inclusion
- Social media mentions
- Field signage rights
- First right of refusal on renewals

## Sponsorship Tiers

| Tier | Annual Value | Benefits |
|------|-------------|----------|
| **Title** | $25,000+ | All benefits, "presented by" naming |
| **Platinum** | $10,000 | Homepage banner, field signage, email mentions |
| **Gold** | $5,000 | Homepage sidebar, social media posts |
| **Silver** | $2,500 | Schedule page banner, program ads |
| **Bronze** | $1,000 | Standings page placement |
| **Supporter** | $500 | Logo on sponsors page |

## League vs Club Sponsorship

### League-Level Sponsors

- Appear across all league pages
- Access to full league audience
- Premium placement options
- Managed by league admin

### Club-Level Sponsors

- Appear on club and team pages
- Targeted to club's geographic area
- Lower cost entry point
- Managed by club admin

## Digital Ad Placements

### Website Placements

| Location | Description | Visibility |
|----------|-------------|------------|
| `HOMEPAGE_HERO` | Large banner at top of homepage | Highest |
| `HOMEPAGE_SIDEBAR` | Sidebar on homepage | High |
| `SCHEDULE_BANNER` | Banner on schedule page | Medium |
| `STANDINGS_BANNER` | Banner on standings page | Medium |
| `TEAM_PAGE_BANNER` | Banner on team pages | Targeted |
| `GAME_PAGE_SPONSOR` | "This game brought to you by..." | Contextual |

### Email Placements

| Location | Description |
|----------|-------------|
| `EMAIL_HEADER` | Top of all league emails |
| `EMAIL_FOOTER` | Bottom of all league emails |
| `EMAIL_INLINE` | Mid-content placement |

### Broadcast Placements

| Location | Description |
|----------|-------------|
| Scoreboard | Logo next to live score |
| Pre-game | Sponsor reel before kickoff |
| Halftime | Sponsor segment |
| Replay | "Replay brought to you by..." |

## Ad Targeting

Sponsors can target their ads by:

- **Division**: Men's Premier, Women's Open, etc.
- **Club**: Specific clubs only
- **Geography**: City/region (future)
- **Time**: Prime time slots

## Analytics & ROI Tracking

### Metrics Tracked

| Metric | Description |
|--------|-------------|
| **Impressions** | Number of times ad was displayed |
| **Clicks** | Number of times ad was clicked |
| **CTR** | Click-through rate (clicks / impressions) |
| **Unique Users** | Distinct users who saw/clicked |
| **Conversions** | Actions taken on sponsor site (if tracked) |

### Sponsor Dashboard

Sponsors have access to:

- Real-time impression/click counts
- Historical trends (daily/weekly/monthly)
- Breakdown by placement
- Audience demographics
- Exportable reports

### Conversion Tracking

For sponsors like Texian Insurance:

1. UTM parameters on click-through URLs
2. Optional conversion pixel on sponsor's site
3. Track: quote requests, contact forms, sign-ups

## Revenue Model

### Sponsorship Revenue

Expected revenue mix:
- Title sponsor: 30-40%
- Platinum/Gold: 25-30%
- Silver/Bronze/Supporter: 15-20%
- Club-level sponsors: 15-20%

### Transaction Fees

Additional revenue from:
- Player registration: 4.5% + $0.75 per transaction
- Team registration fees: 4.5% + $0.75
- Referee payments: Processing fee

## Implementation

### Database Schema

```prisma
model Sponsor {
  id          String   @id
  name        String   // "Texian Insurance"
  slug        String   @unique
  logo        String?
  website     String?
  // ... see full schema
}

model LeagueSponsor {
  id            String      @id
  leagueId      String
  sponsorId     String
  tier          SponsorTier
  isTitleSponsor Boolean
  startDate     DateTime
  endDate       DateTime
  contractValue Decimal?
  // ... benefits flags
}

model AdPlacement {
  id          String   @id
  sponsorId   String
  placement   AdPlacementLocation
  imageUrl    String
  clickUrl    String?
  impressions Int      @default(0)
  clicks      Int      @default(0)
  // ... targeting options
}

model SponsorImpression {
  id          String   @id
  sponsorId   String
  type        ImpressionType // VIEW, CLICK, CONVERSION
  timestamp   DateTime
  // ... context data
}
```

### API Endpoints

```typescript
// Get sponsors for display
trpc.sponsor.getLeagueSponsors({ leagueSlug })
trpc.sponsor.getTitleSponsor({ leagueSlug })
trpc.sponsor.getAdsForPlacement({ leagueSlug, placement })

// Track engagement
trpc.sponsor.trackImpression({ sponsorId, type, ... })

// Admin: Manage sponsors
trpc.sponsor.create({ name, slug, ... })
trpc.sponsor.addToLeague({ sponsorId, leagueId, tier, ... })

// Reporting
trpc.sponsor.getAnalytics({ sponsorId, startDate, endDate })
```

## Sales Process

### Prospecting

Target sponsors who benefit from reaching adult recreational athletes:
- Insurance (Texian Insurance)
- Sports equipment retailers
- Breweries/bars (post-game sponsors)
- Physical therapy/sports medicine
- Local restaurants near venues
- Financial services
- Real estate

### Sales Materials

- Media kit with audience demographics
- Rate card with pricing
- Case studies (after first season)
- Analytics samples

### Contract Terms

- Minimum 1 season commitment
- Payment: 50% upfront, 50% mid-season
- Auto-renewal with 30-day notice
- Exclusivity options (category exclusivity)

## Related Issues

- [#9: Texian Insurance Title Sponsorship Integration](../../issues/9)
- [#10: Sponsor Analytics Dashboard](../../issues/10)
- [#6: Live Broadcasting System](../../issues/6) (sponsor overlays)

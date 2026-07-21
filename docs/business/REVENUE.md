# Revenue Model & Business Strategy

## Revenue Streams

### 1. Sponsorship & Advertising (50-60% of revenue)

| Source | Description | Pricing |
|--------|-------------|---------|
| Title Sponsor | "Presented by" naming rights | $25,000+/year |
| Platinum Sponsors | Premium placements | $10,000/year |
| Gold Sponsors | Mid-tier placements | $5,000/year |
| Silver/Bronze | Lower-tier placements | $1,000-2,500/year |
| Digital Ads | CPM-based campaigns | $5-15 CPM |
| Broadcast Sponsors | Live stream integration | Custom pricing |

### 2. Registration Fees (25-35% of revenue)

| Fee Type | Amount | Platform Fee |
|----------|--------|--------------|
| Player Registration | $50-100/season | 4.5% + $0.75 |
| Team Registration | $500-1,000/season | 4.5% + $0.75 |
| Late Registration | +$25 surcharge | Same |
| Tournament Entry | $200-500/team | 4.5% + $0.75 |

### 3. Subscription Tiers (Future - SaaS Model)

| Tier | Monthly | Features |
|------|---------|----------|
| Free | $0 | Single team, basic features, ballsackOS branding |
| Club | $12/team | Full features, custom branding |
| Pro | $25/team | Registration, payments, advanced stats, API |
| Enterprise | Custom | Multi-league, white-label, support |

### 4. Premium Features (5-10% of revenue)

- Advanced analytics dashboard
- Custom mobile app branding
- API access for integrations
- Priority support
- Custom domain (club.texasselect.com)

### 5. Marketplace (Future)

- Referee booking platform (commission)
- Equipment sales (affiliate/commission)
- Team apparel (print-on-demand commission)
- Photography services (booking fee)

## Cost Structure

### Infrastructure (Variable with scale)

| Scale | Monthly Cost |
|-------|--------------|
| <1,000 users | ~$55 |
| 10,000 users | ~$195 |
| 100,000 users | ~$1,625 |

Breakdown:
- **PostgreSQL**: $15-200/month (managed DB)
- **Hosting**: $20-500/month (VM or Vercel)
- **CDN/Storage**: $5-100/month (images, assets)
- **Email**: $0-200/month (transactional emails)
- **SMS**: Pay-per-message (~$0.01/message)

### Fixed Costs

| Item | Monthly |
|------|---------|
| Domain | ~$2 |
| SSL Certificate | Free (Let's Encrypt) |
| Monitoring/Uptime | $5-20 |
| Error Tracking | $0-30 |

## Projections

### Year 1: Foundation

```
Clubs: 10
Teams: 30 (avg 3 per club)
Players: 600 (avg 20 per team)
Games: 150

Revenue:
- Title Sponsor: $25,000
- Other Sponsors: $15,000
- Registration: $30,000 (600 × $50)
- Transaction Fees: $2,000

Total Revenue: ~$72,000

Costs:
- Infrastructure: $1,500
- Marketing: $5,000
- Operations: $10,000

Net: ~$55,500
```

### Year 2: Growth

```
Clubs: 25
Teams: 75
Players: 1,500
Games: 400

Revenue:
- Sponsorship: $80,000
- Registration: $75,000
- Transaction Fees: $5,000
- Premium Features: $10,000

Total Revenue: ~$170,000
```

### Year 3-4: Scale

```
Clubs: 50+
Teams: 150+
Players: 3,000+

Revenue: $300,000 - $500,000
```

### Path to $10M ARR (Multi-League SaaS)

| Year | Leagues | Avg Revenue/League | Total ARR |
|------|---------|-------------------|-----------|
| 1 | 1 | $72,000 | $72,000 |
| 2 | 5 | $100,000 | $500,000 |
| 3 | 20 | $150,000 | $3,000,000 |
| 4 | 50 | $200,000 | $10,000,000 |

## Pricing Philosophy

### Value-Based Pricing

- Competitors charge $5-15/player/season
- We can undercut while adding more value
- Sponsorship subsidizes player costs
- Focus on lifetime value of league relationships

### Transaction Fee Rationale

- 4.5% + $0.75 is competitive with Stripe's 2.9% + $0.30
- Premium covers our admin, support, and platform
- Transparent to users (shown at checkout)
- Incentive: more registrations = more revenue

## Competitive Landscape

| Platform | Pricing | Our Advantage |
|----------|---------|---------------|
| TeamSnap | $12-25/team/mo | Soccer-specific, sponsorship built-in |
| SportsEngine | $100+/mo + fees | Modern UX, lower cost |
| LeagueApps | 4-6% + fees | Better mobile, broadcasting |
| GotSoccer | Per-event fees | Full league management, not just tournaments |

## Growth Strategy

### Phase 1: Texas (Year 1)

- Launch with Texas Select League
- Prove the model with Texian Insurance sponsorship
- Build case studies and testimonials

### Phase 2: Regional (Year 2-3)

- Expand to other Texas cities
- Target neighboring states (OK, LA, NM)
- Recruit leagues through word-of-mouth

### Phase 3: National SaaS (Year 3+)

- Self-service league creation
- White-label options
- Enterprise sales to large organizations
- API for third-party integrations

## Key Metrics

| Metric | Target |
|--------|--------|
| Player Retention | >70% season-over-season |
| Sponsor Renewal | >80% |
| NPS (Net Promoter Score) | >50 |
| Monthly Active Users | >60% of registered |
| Revenue per User | $50+/year |

## Related Documentation

- [Sponsorship System](/docs/business/SPONSORSHIP.md)
- [League Model](/docs/business/LEAGUE_MODEL.md)

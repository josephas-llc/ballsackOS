# Texas Adult Soccer League Model

## Overview

ballsackOS is built to power an adult recreational soccer league in Texas, inspired by the KC Select League model but with key enhancements including women's divisions and integrated sponsorship.

## League Structure

```
Texas Select League (or your chosen name)
│
├── Divisions
│   ├── Men's Premier (competitive)
│   ├── Men's Open (recreational)
│   ├── Women's Premier (competitive)
│   └── Women's Open (recreational)
│
├── Clubs (10+ geographically based)
│   ├── Austin FC Rec
│   ├── Houston Dynamo Social
│   ├── Dallas United
│   ├── San Antonio FC Rec
│   ├── Fort Worth Athletic
│   └── ...more clubs
│
└── Each Club has:
    ├── Men's Team (required) → plays in Men's Premier or Open
    ├── Women's Team (required) → plays in Women's Premier or Open
    ├── Men's Second Team (optional)
    └── Women's Second Team (optional)
```

## Season Format

### Double Round-Robin

Each team plays every other team in their division twice (home and away).

| Division Size | Games per Team | Total Games per Division |
|---------------|----------------|--------------------------|
| 6 teams | 10 games | 30 games |
| 8 teams | 14 games | 56 games |
| 10 teams | 18 games | 90 games |

### Points System

| Result | Points |
|--------|--------|
| Win | 3 |
| Draw | 1 |
| Loss | 0 |

### Tiebreakers (in order)

1. Head-to-head record
2. Goal difference
3. Goals scored
4. Disciplinary points (fewer cards = better)
5. Coin flip

## Club Requirements

### Minimum Requirements

- At least 1 Men's team
- At least 1 Women's team
- Designated home venue(s)
- Club administrator
- Club colors/branding

### Recommended Structure (2-3 teams per gender)

```
Club Example: Round Rock United
├── Men's Premier (top 20-25 players)
├── Men's Open (next 20-25 players)
├── Women's Premier (top 20-25 players)
└── Women's Open (next 20-25 players)
```

### Internal Club Competition

Multiple teams per gender creates healthy internal competition:

| Benefit | Description |
|---------|-------------|
| **Promotion pressure** | Open players train harder to earn Premier spots |
| **Relegation risk** | Premier players stay sharp or lose their roster spot |
| **Development pathway** | Clear progression within the club |
| **Roster depth** | Call-ups available for injuries/absences |
| **Quality of play** | Competition for spots raises everyone's game |

### Intra-Club Promotion/Relegation

- Clubs manage their own internal player movement
- End of season evaluations determine promotions/relegations
- Mid-season moves allowed with club approval
- Players earn their spot through performance, not politics

### Team Requirements

- Minimum 11 registered players per team
- Maximum 25 players per team
- All players must sign waiver
- All players must be 18+ years old

## Player Eligibility

### Registration

- Players register with one club per season
- Player can play for multiple teams within the same club
- Guest player policy (TBD - reference KC Select handbook)

### Transfers

- Transfer window: Before week 4 of season
- Mid-season transfers require league approval
- Player can only transfer once per season

## Match Rules

### Duration

- Two 45-minute halves
- 15-minute halftime
- No extra time in regular season (draws stand)

### Substitutions

- Unlimited substitutions
- Re-entry allowed
- Substitutions only during stoppages

### Minimum Players

- 7 players minimum to start
- Forfeit if below 7 at any point
- 10-minute grace period before forfeit

## Discipline

### Yellow Cards

- 5 yellow card accumulation = 1 match suspension
- Counter resets after serving suspension
- Yellow cards don't carry between seasons

### Red Cards

- Straight red = minimum 1 match suspension
- Second yellow in match = 1 match suspension
- Violent conduct = minimum 3 match suspension + committee review

### Appeals

- Written appeal within 48 hours
- Disciplinary committee reviews
- Decision is final

## Forfeits

- Failing to field 7 players after grace period
- More than 2 red cards in a match
- Team walkoff
- Forfeit score: 3-0 to opponent

## Championship

### Regular Season Champion

- Team with most points in each division
- Trophy and recognition

### End-of-Season Tournament (Optional)

- Top 4 or 8 teams from each division
- Single elimination playoffs
- Championship final

## Differences from KC Select League

| Aspect | KC Select League | Texas League |
|--------|------------------|--------------|
| Genders | Men's only (women's planned) | Men's and Women's from day 1 |
| Divisions | Single division | Upper (Premier) and Lower (Open) |
| Location | Kansas City metro | Texas (multi-city) |
| Platform | Third-party | Custom-built (ballsackOS) |
| Sponsorship | Basic | Integrated with analytics |
| Broadcasting | None | Live streaming capability |

## Reference

The KC Select League handbook is saved at:
`docs/reference/select-league-handbook-2024.pdf`

Use this as a reference for:
- Detailed match rules
- Referee protocols
- Field requirements
- Weather policies
- Protest procedures

## Related Issues

- [#28: Texas League Rules Configuration](../../issues/28)
- [#7: Schedule Optimization Algorithm](../../issues/7)
- [#23: Disciplinary System](../../issues/23)

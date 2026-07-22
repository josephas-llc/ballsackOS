import Link from 'next/link'

// Mock data - will be replaced with database queries
const matchDays = [
  {
    id: '1',
    date: '2025-03-15',
    homeClub: 'Round Rock United',
    awayClub: 'North Austin FC',
    venue: 'Round Rock Multipurpose Complex',
    round: 1,
    status: 'SCHEDULED',
    games: [
      { id: '1a', division: "Women's Premier", time: '5:00 PM', homeTeam: "RR United Women's Premier", awayTeam: "N Austin FC Women's Premier" },
      { id: '1b', division: "Men's Premier", time: '7:00 PM', homeTeam: "RR United Men's Premier", awayTeam: "N Austin FC Men's Premier" },
    ],
  },
  {
    id: '2',
    date: '2025-03-15',
    homeClub: 'Central Austin SC',
    awayClub: 'South Austin FC',
    venue: 'Kelly Reeves Athletic Complex',
    round: 1,
    status: 'SCHEDULED',
    games: [
      { id: '2a', division: "Women's Premier", time: '5:00 PM', homeTeam: "Central Austin SC Women's Premier", awayTeam: "S Austin FC Women's Premier" },
      { id: '2b', division: "Men's Premier", time: '7:00 PM', homeTeam: "Central Austin SC Men's Premier", awayTeam: "S Austin FC Men's Premier" },
    ],
  },
  {
    id: '3',
    date: '2025-03-22',
    homeClub: 'North Austin FC',
    awayClub: 'Cedar Park Athletic',
    venue: 'Kelly Reeves Athletic Complex',
    round: 2,
    status: 'SCHEDULED',
    games: [
      { id: '3a', division: "Women's Premier", time: '5:00 PM', homeTeam: "N Austin FC Women's Premier", awayTeam: "Cedar Park Women's Premier" },
      { id: '3b', division: "Men's Premier", time: '7:00 PM', homeTeam: "N Austin FC Men's Premier", awayTeam: "Cedar Park Men's Premier" },
    ],
  },
  {
    id: '4',
    date: '2025-03-08',
    homeClub: 'Temple City FC',
    awayClub: 'Waco FC',
    venue: 'Temple Lions Stadium',
    round: 0,
    status: 'COMPLETED',
    homeClubPoints: 4,
    awayClubPoints: 2,
    games: [
      { id: '4a', division: "Women's Premier", time: '5:00 PM', homeTeam: "Temple City Women's Premier", awayTeam: "Waco FC Women's Premier", homeScore: 2, awayScore: 1 },
      { id: '4b', division: "Men's Premier", time: '7:00 PM', homeTeam: "Temple City Men's Premier", awayTeam: "Waco FC Men's Premier", homeScore: 1, awayScore: 1 },
    ],
  },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export default function SchedulePage() {
  const upcomingMatchDays = matchDays.filter((md) => md.status === 'SCHEDULED')
  const completedMatchDays = matchDays.filter((md) => md.status === 'COMPLETED')

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Schedule
          </h1>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-400">
            Combined match days for the Chisholm FC League.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/schedule/new"
            className="block rounded-md bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            Schedule Match Day
          </Link>
        </div>
      </div>

      {/* Upcoming Match Days */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Upcoming Match Days
        </h2>
        <div className="mt-4 space-y-4">
          {upcomingMatchDays.map((matchDay) => (
            <div
              key={matchDay.id}
              className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow"
            >
              <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      Round {matchDay.round}
                    </span>
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">
                      {formatDate(matchDay.date)}
                    </span>
                  </div>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {matchDay.venue}
                  </span>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-right">
                    <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {matchDay.homeClub}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Home
                    </p>
                  </div>
                  <div className="mx-8 text-center">
                    <p className="text-2xl font-bold text-zinc-400 dark:text-zinc-600">
                      vs
                    </p>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {matchDay.awayClub}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Away
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
                    GAMES
                  </p>
                  <div className="space-y-2">
                    {matchDay.games.map((game) => (
                      <div
                        key={game.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-zinc-600 dark:text-zinc-400">
                          {game.time} - {game.division}
                        </span>
                        <Link
                          href={`/admin/games/${game.id}`}
                          className="text-emerald-600 hover:text-emerald-500"
                        >
                          Details
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 flex justify-end gap-2">
                <Link
                  href={`/admin/schedule/${matchDay.id}`}
                  className="rounded-md bg-zinc-100 dark:bg-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                >
                  Edit
                </Link>
                <Link
                  href={`/admin/schedule/${matchDay.id}/referees`}
                  className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500"
                >
                  Assign Referees
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Match Days */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Recent Results
        </h2>
        <div className="mt-4 space-y-4">
          {completedMatchDays.map((matchDay) => (
            <div
              key={matchDay.id}
              className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow"
            >
              <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-700 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      Completed
                    </span>
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">
                      {formatDate(matchDay.date)}
                    </span>
                  </div>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {matchDay.venue}
                  </span>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-right">
                    <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {matchDay.homeClub}
                    </p>
                  </div>
                  <div className="mx-8 text-center">
                    <p className="text-3xl font-bold">
                      <span className={matchDay.homeClubPoints! > matchDay.awayClubPoints! ? 'text-emerald-600' : 'text-zinc-400'}>
                        {matchDay.homeClubPoints}
                      </span>
                      <span className="text-zinc-300 dark:text-zinc-600 mx-2">-</span>
                      <span className={matchDay.awayClubPoints! > matchDay.homeClubPoints! ? 'text-emerald-600' : 'text-zinc-400'}>
                        {matchDay.awayClubPoints}
                      </span>
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Club Points
                    </p>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {matchDay.awayClub}
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                  <div className="space-y-2">
                    {matchDay.games.map((game) => (
                      <div
                        key={game.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-zinc-600 dark:text-zinc-400">
                          {game.division}
                        </span>
                        <span className="font-medium text-zinc-900 dark:text-white">
                          {'homeScore' in game ? `${game.homeScore} - ${game.awayScore}` : 'TBD'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

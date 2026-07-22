import Link from 'next/link'

// Mock data - will be replaced with database queries
const teams = [
  // Round Rock United
  { id: '1', name: "Round Rock United Men's Premier", club: 'Round Rock United', clubColor: '#1e40af', division: "Men's Premier", gender: 'MENS', level: 'PREMIER', playerCount: 22 },
  { id: '2', name: "Round Rock United Men's Open", club: 'Round Rock United', clubColor: '#1e40af', division: "Men's Open", gender: 'MENS', level: 'OPEN', playerCount: 20 },
  { id: '3', name: "Round Rock United Women's Premier", club: 'Round Rock United', clubColor: '#1e40af', division: "Women's Premier", gender: 'WOMENS', level: 'PREMIER', playerCount: 21 },
  { id: '4', name: "Round Rock United Women's Open", club: 'Round Rock United', clubColor: '#1e40af', division: "Women's Open", gender: 'WOMENS', level: 'OPEN', playerCount: 22 },

  // North Austin FC
  { id: '5', name: "North Austin FC Men's Premier", club: 'North Austin FC', clubColor: '#065f46', division: "Men's Premier", gender: 'MENS', level: 'PREMIER', playerCount: 20 },
  { id: '6', name: "North Austin FC Men's Open", club: 'North Austin FC', clubColor: '#065f46', division: "Men's Open", gender: 'MENS', level: 'OPEN', playerCount: 19 },
  { id: '7', name: "North Austin FC Women's Premier", club: 'North Austin FC', clubColor: '#065f46', division: "Women's Premier", gender: 'WOMENS', level: 'PREMIER', playerCount: 20 },
  { id: '8', name: "North Austin FC Women's Open", club: 'North Austin FC', clubColor: '#065f46', division: "Women's Open", gender: 'WOMENS', level: 'OPEN', playerCount: 19 },

  // Central Austin SC
  { id: '9', name: "Central Austin SC Men's Premier", club: 'Central Austin SC', clubColor: '#7c2d12', division: "Men's Premier", gender: 'MENS', level: 'PREMIER', playerCount: 22 },
  { id: '10', name: "Central Austin SC Men's Open", club: 'Central Austin SC', clubColor: '#7c2d12', division: "Men's Open", gender: 'MENS', level: 'OPEN', playerCount: 21 },
  { id: '11', name: "Central Austin SC Men's Open II", club: 'Central Austin SC', clubColor: '#7c2d12', division: "Men's Open", gender: 'MENS', level: 'OPEN', playerCount: 18 },
  { id: '12', name: "Central Austin SC Women's Premier", club: 'Central Austin SC', clubColor: '#7c2d12', division: "Women's Premier", gender: 'WOMENS', level: 'PREMIER', playerCount: 20 },
  { id: '13', name: "Central Austin SC Women's Open", club: 'Central Austin SC', clubColor: '#7c2d12', division: "Women's Open", gender: 'WOMENS', level: 'OPEN', playerCount: 11 },
]

export default function TeamsPage() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Teams
          </h1>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-400">
            All teams across all clubs in the league.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex gap-2">
          <select className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white">
            <option value="">All Clubs</option>
            <option value="round-rock-united">Round Rock United</option>
            <option value="north-austin-fc">North Austin FC</option>
            <option value="central-austin-sc">Central Austin SC</option>
          </select>
          <select className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-white">
            <option value="">All Divisions</option>
            <option value="mens-premier">Men&apos;s Premier</option>
            <option value="mens-open">Men&apos;s Open</option>
            <option value="womens-premier">Women&apos;s Premier</option>
            <option value="womens-open">Women&apos;s Open</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-zinc-300 dark:divide-zinc-700">
                <thead className="bg-zinc-50 dark:bg-zinc-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-zinc-900 dark:text-white sm:pl-6"
                    >
                      Team
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 dark:text-white"
                    >
                      Club
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 dark:text-white"
                    >
                      Division
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 dark:text-white"
                    >
                      Players
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700 bg-white dark:bg-zinc-900">
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 dark:text-white sm:pl-6">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: team.clubColor }}
                          />
                          {team.name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                        {team.club}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            team.level === 'PREMIER'
                              ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 ring-1 ring-inset ring-amber-600/20'
                              : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ring-1 ring-inset ring-zinc-500/10'
                          }`}
                        >
                          {team.division}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                        {team.playerCount}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          href={`/admin/teams/${team.id}`}
                          className="text-emerald-600 hover:text-emerald-900 dark:hover:text-emerald-400 mr-4"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/admin/teams/${team.id}/roster`}
                          className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        >
                          Roster
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

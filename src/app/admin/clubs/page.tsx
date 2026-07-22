import Link from 'next/link'

// Mock data - will be replaced with database queries
const clubs = [
  {
    id: '1',
    name: 'Round Rock United',
    slug: 'round-rock-united',
    city: 'Round Rock',
    primaryColor: '#1e40af',
    isActive: true,
    mensTeams: 2,
    womensTeams: 2,
    totalPlayers: 85,
  },
  {
    id: '2',
    name: 'North Austin FC',
    slug: 'north-austin-fc',
    city: 'Austin',
    primaryColor: '#065f46',
    isActive: true,
    mensTeams: 2,
    womensTeams: 2,
    totalPlayers: 78,
  },
  {
    id: '3',
    name: 'Central Austin SC',
    slug: 'central-austin-sc',
    city: 'Austin',
    primaryColor: '#7c2d12',
    isActive: true,
    mensTeams: 3,
    womensTeams: 2,
    totalPlayers: 92,
  },
  {
    id: '4',
    name: 'South Austin FC',
    slug: 'south-austin-fc',
    city: 'Austin',
    primaryColor: '#4c1d95',
    isActive: true,
    mensTeams: 2,
    womensTeams: 2,
    totalPlayers: 72,
  },
  {
    id: '5',
    name: 'Cedar Park Athletic',
    slug: 'cedar-park-athletic',
    city: 'Cedar Park',
    primaryColor: '#0f766e',
    isActive: true,
    mensTeams: 2,
    womensTeams: 2,
    totalPlayers: 68,
  },
  {
    id: '6',
    name: 'Georgetown FC',
    slug: 'georgetown-fc',
    city: 'Georgetown',
    primaryColor: '#1e3a8a',
    isActive: true,
    mensTeams: 2,
    womensTeams: 1,
    totalPlayers: 55,
  },
  {
    id: '7',
    name: 'Temple City FC',
    slug: 'temple-city-fc',
    city: 'Temple',
    primaryColor: '#b91c1c',
    isActive: true,
    mensTeams: 2,
    womensTeams: 2,
    totalPlayers: 70,
  },
  {
    id: '8',
    name: 'San Marcos FC',
    slug: 'san-marcos-fc',
    city: 'San Marcos',
    primaryColor: '#a16207',
    isActive: true,
    mensTeams: 2,
    womensTeams: 2,
    totalPlayers: 65,
  },
  {
    id: '9',
    name: 'New Braunfels SC',
    slug: 'new-braunfels-sc',
    city: 'New Braunfels',
    primaryColor: '#0369a1',
    isActive: true,
    mensTeams: 2,
    womensTeams: 2,
    totalPlayers: 62,
  },
  {
    id: '10',
    name: 'North SA Athletic',
    slug: 'north-sa-athletic',
    city: 'San Antonio',
    primaryColor: '#15803d',
    isActive: true,
    mensTeams: 2,
    womensTeams: 2,
    totalPlayers: 75,
  },
  {
    id: '11',
    name: 'Waco FC',
    slug: 'waco-fc',
    city: 'Waco',
    primaryColor: '#854d0e',
    isActive: true,
    mensTeams: 2,
    womensTeams: 2,
    totalPlayers: 68,
  },
  {
    id: '12',
    name: 'Killeen United',
    slug: 'killeen-united',
    city: 'Killeen',
    primaryColor: '#374151',
    isActive: true,
    mensTeams: 2,
    womensTeams: 2,
    totalPlayers: 70,
  },
]

export default function ClubsPage() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Clubs
          </h1>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-400">
            All clubs in the Chisholm FC League along the I-35 corridor.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/clubs/new"
            className="block rounded-md bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            Add Club
          </Link>
        </div>
      </div>

      {/* Club Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Color bar */}
            <div
              className="h-2"
              style={{ backgroundColor: club.primaryColor }}
            />

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {club.name}
                </h3>
                {club.isActive ? (
                  <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Inactive
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {club.city}, TX
              </p>

              <div className="mt-4 grid grid-cols-3 gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    {club.mensTeams}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Men&apos;s Teams
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    {club.womensTeams}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Women&apos;s Teams
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    {club.totalPlayers}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Players
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  href={`/admin/clubs/${club.id}`}
                  className="flex-1 rounded-md bg-zinc-100 dark:bg-zinc-800 px-3 py-2 text-center text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  View Details
                </Link>
                <Link
                  href={`/admin/clubs/${club.id}/teams`}
                  className="flex-1 rounded-md bg-emerald-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-emerald-500"
                >
                  Manage Teams
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

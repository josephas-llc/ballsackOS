import { auth } from '@/lib/auth'
import Link from 'next/link'

const stats = [
  { name: 'Total Clubs', value: '12', href: '/admin/clubs' },
  { name: 'Active Teams', value: '48', href: '/admin/teams' },
  { name: 'Registered Players', value: '892', href: '/admin/players' },
  { name: 'Games This Week', value: '24', href: '/admin/schedule' },
]

const quickActions = [
  {
    name: 'Schedule Game',
    description: 'Create a new match day or individual game',
    href: '/admin/schedule/new',
    icon: CalendarIcon,
  },
  {
    name: 'Add Club',
    description: 'Register a new club to the league',
    href: '/admin/clubs/new',
    icon: ShieldIcon,
  },
  {
    name: 'Manage Sponsors',
    description: 'View and edit sponsor placements',
    href: '/admin/sponsors',
    icon: BriefcaseIcon,
  },
  {
    name: 'Referee Assignments',
    description: 'Assign referees to upcoming games',
    href: '/admin/referees/assignments',
    icon: WhistleIcon,
  },
]

export default async function AdminDashboard() {
  const session = await auth()

  return (
    <div>
      {/* Page header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Welcome back, {session?.user?.name || 'Admin'}. Here&apos;s what&apos;s happening with the league.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="relative overflow-hidden rounded-lg bg-white dark:bg-zinc-900 px-4 py-5 shadow sm:px-6 sm:py-6 hover:ring-2 hover:ring-emerald-500 transition-all"
            >
              <dt className="truncate text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {stat.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                {stat.value}
              </dd>
            </Link>
          ))}
        </dl>
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Quick Actions
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="relative flex items-center space-x-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-5 shadow-sm hover:border-emerald-500 hover:ring-1 hover:ring-emerald-500 transition-all"
            >
              <div className="flex-shrink-0">
                <action.icon className="h-10 w-10 text-emerald-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  {action.name}
                </p>
                <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Recent Activity
        </h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center py-8">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Connect to database to see recent activity
              </p>
              <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
                Run <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">npx prisma migrate dev</code> to set up your database
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Games */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Upcoming Match Days
          </h2>
          <Link
            href="/admin/schedule"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
          >
            View all
          </Link>
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center py-8">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No upcoming match days scheduled
              </p>
              <Link
                href="/admin/schedule/new"
                className="mt-4 inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
              >
                Schedule Match Day
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Icon components
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  )
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  )
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
    </svg>
  )
}

function WhistleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
    </svg>
  )
}

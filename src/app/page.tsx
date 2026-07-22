import Link from 'next/link'
import { auth } from '@/lib/auth'

export default async function Home() {
  const session = await auth()

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-xl font-bold text-zinc-900 dark:text-white">
                  Chisholm FC League
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/schedule"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
              >
                Schedule
              </Link>
              <Link
                href="/standings"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
              >
                Standings
              </Link>
              <Link
                href="/clubs"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
              >
                Clubs
              </Link>
              {session?.user ? (
                <Link
                  href="/dashboard"
                  className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1">
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
              <div className="mt-24 sm:mt-32 lg:mt-16">
                <span className="inline-flex items-center space-x-2 rounded-full bg-emerald-600/10 px-3 py-1 text-sm font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-600/20">
                  <span>Presented by Texian Insurance</span>
                </span>
              </div>
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
                Competitive Soccer for Serious Players
              </h1>
              <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
                The Chisholm FC League is Central Texas&apos;s premier adult soccer league.
                We&apos;re not rec soccer &mdash; we&apos;re a legitimate pathway for players who
                can&apos;t go pro but still want real competition.
              </p>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                <strong className="text-zinc-900 dark:text-white">Combined gender match days</strong> &mdash;
                men&apos;s and women&apos;s results determine club championships together.
                No other adult league does this.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="/register"
                  className="rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  Join a Club
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-semibold text-zinc-900 dark:text-white"
                >
                  Learn more <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <div className="rounded-xl bg-zinc-900/5 dark:bg-white/5 p-2 ring-1 ring-inset ring-zinc-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <div className="w-[40rem] rounded-lg bg-zinc-100 dark:bg-zinc-800 p-8">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        I-35 Corridor
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Waco to San Antonio
                      </p>
                    </div>
                    <div className="mt-6 space-y-3">
                      {[
                        'Waco FC',
                        'Temple City FC',
                        'Round Rock United',
                        'North Austin FC',
                        'Central Austin SC',
                        'South Austin FC',
                        'San Marcos FC',
                        'New Braunfels SC',
                        'North SA Athletic',
                      ].map((club) => (
                        <div
                          key={club}
                          className="flex items-center justify-between rounded-lg bg-white dark:bg-zinc-900 px-4 py-2 shadow-sm"
                        >
                          <span className="text-sm font-medium text-zinc-900 dark:text-white">
                            {club}
                          </span>
                          <span className="text-xs text-zinc-500">12 Teams</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-zinc-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold text-emerald-600">
                Why Chisholm FC
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                A league built for serious competition
              </p>
              <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
                Internal club competition keeps standards high. Play your way up from Open to Premier.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold text-zinc-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                      </svg>
                    </div>
                    Combined Gender Scoring
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base text-zinc-600 dark:text-zinc-400">
                    <p className="flex-auto">
                      Men&apos;s and women&apos;s match results combine to determine club standings.
                      Both teams matter equally in the race for the championship.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold text-zinc-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                      </svg>
                    </div>
                    Internal Promotion/Relegation
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base text-zinc-600 dark:text-zinc-400">
                    <p className="flex-auto">
                      Each club fields 2-3 teams per gender. Earn your spot on Premier through
                      performance, or risk getting moved to Open. No coasting.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold text-zinc-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </div>
                    Live Broadcasting
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base text-zinc-600 dark:text-zinc-400">
                    <p className="flex-auto">
                      Watch games live from anywhere. Professional-grade streaming with
                      stats overlays and sponsor integration.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-emerald-600">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to compete?
              <br />
              Find your club today.
            </h2>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
              <Link
                href="/clubs"
                className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-emerald-600 shadow-sm hover:bg-zinc-100"
              >
                Browse Clubs
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold text-white"
              >
                Start a Club <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="border-t border-zinc-800 pt-8">
            <p className="text-xs text-zinc-400">
              &copy; {new Date().getFullYear()} Chisholm FC League. Presented by{' '}
              <a href="https://texianinsurance.com" className="hover:text-white">
                Texian Insurance
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

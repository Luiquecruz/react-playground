import { Suspense, version } from 'react'
import { NavLink, Outlet, ScrollRestoration, useNavigation } from 'react-router'
import { Atom } from 'lucide-react'
import { CartSheet } from '@/components/layout/cart-sheet'
import { navigationItems } from '@/components/layout/navigation'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { PageSkeleton } from '@/components/layout/page-skeleton'
import { cn } from '@/lib/utils'

export function AppLayout() {
  const navigation = useNavigation()

  return (
    <div className="flex min-h-dvh">
      {navigation.state !== 'idle' && (
        <div className="fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden bg-brand-100 dark:bg-brand-700/30">
          <div className="h-full w-1/3 animate-progress bg-brand-600" />
        </div>
      )}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col gap-6 border-r border-zinc-200 bg-white p-4 lg:flex dark:border-zinc-800 dark:bg-zinc-900">
        <Brand />
        <nav className="flex flex-col gap-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              viewTransition
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
                  isActive &&
                    'bg-brand-50 text-brand-700 hover:bg-brand-50 hover:text-brand-700 dark:bg-brand-700/20 dark:text-brand-100',
                )
              }
            >
              <item.icon className="size-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <p className="mt-auto text-xs text-zinc-400">React {version} · React Compiler on</p>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-zinc-200 bg-white/80 px-4 backdrop-blur md:px-8 dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="lg:hidden">
            <Brand />
          </div>
          <nav className="flex gap-1 overflow-x-auto lg:hidden">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                viewTransition
                aria-label={item.label}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800',
                    isActive &&
                      'bg-brand-50 text-brand-700 dark:bg-brand-700/20 dark:text-brand-100',
                  )
                }
              >
                <item.icon className="size-4" />
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <CartSheet />
          </div>
        </header>
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 p-4 md:p-8">
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <ScrollRestoration />
    </div>
  )
}

function Brand() {
  return (
    <NavLink to="/" className="flex items-center gap-2 font-semibold">
      <span className="grid size-8 place-items-center rounded-lg bg-brand-600 text-white">
        <Atom className="size-5" />
      </span>
      <span className="hidden sm:inline">React Showcase</span>
    </NavLink>
  )
}

import { Suspense, use, useState, useTransition } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { AlertTriangle, Building2, Loader2, Mail, MapPin, RotateCcw } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { failingUserId, type User } from '@/lib/api'
import { cn } from '@/lib/utils'
import { getUserPromise, invalidateUserPromise } from '@/features/suspense/user-resource'

const userIds = [1, 2, 3, 4, failingUserId]

export function SuspensePage() {
  const [userId, setUserId] = useState(1)
  const [transitionUserId, setTransitionUserId] = useState(1)
  const [isPending, startTransition] = useTransition()

  return (
    <>
      <PageHeader
        title="Suspense & use"
        description="use() reads a promise during render and suspends until it resolves. Wrapping the state update in a transition keeps the previous content on screen instead of flashing the fallback."
        tags={['use(promise)', '<Suspense>', 'useTransition', 'Error Boundary']}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Urgent update</CardTitle>
            <CardDescription>
              Plain setState: the Suspense fallback replaces the content.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <UserPicker selectedUserId={userId} onSelect={setUserId} />
            <UserBoundary userId={userId} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Transition update
              {isPending && <Loader2 className="size-4 animate-spin text-brand-600" />}
            </CardTitle>
            <CardDescription>
              startTransition: the old profile stays visible while loading.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <UserPicker
              selectedUserId={transitionUserId}
              onSelect={(nextUserId) => startTransition(() => setTransitionUserId(nextUserId))}
            />
            <div className={cn('transition-opacity', isPending && 'opacity-50')}>
              <UserBoundary userId={transitionUserId} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function UserPicker({
  selectedUserId,
  onSelect,
}: {
  selectedUserId: number
  onSelect: (userId: number) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {userIds.map((userId) => (
        <Button
          key={userId}
          size="sm"
          variant={userId === selectedUserId ? 'primary' : 'outline'}
          onClick={() => onSelect(userId)}
        >
          User #{userId}
          {userId === failingUserId && <AlertTriangle />}
        </Button>
      ))}
    </div>
  )
}

function UserBoundary({ userId }: { userId: number }) {
  return (
    <ErrorBoundary
      FallbackComponent={UserErrorFallback}
      resetKeys={[userId]}
      onReset={() => invalidateUserPromise(userId)}
    >
      <Suspense fallback={<UserSkeleton />}>
        <UserProfile userPromise={getUserPromise(userId)} />
      </Suspense>
    </ErrorBoundary>
  )
}

function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise)
  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <div className="flex items-start gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 text-lg font-semibold text-white">
        {initials}
      </span>
      <div className="flex flex-col gap-1 text-sm">
        <p className="text-base font-semibold">{user.name}</p>
        <p className="text-zinc-500">{user.role}</p>
        <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
          <Mail className="size-4" />
          {user.email}
        </p>
        <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
          <Building2 className="size-4" />
          {user.company}
        </p>
        <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
          <MapPin className="size-4" />
          {user.location}
        </p>
      </div>
    </div>
  )
}

function UserSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <Skeleton className="size-14 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-36" />
      </div>
    </div>
  )
}

function UserErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
    >
      <p className="flex items-center gap-2 font-medium">
        <AlertTriangle className="size-4" />
        {error instanceof Error ? error.message : 'Unknown error'}
      </p>
      <Button size="sm" variant="outline" onClick={resetErrorBoundary}>
        <RotateCcw />
        Retry
      </Button>
    </div>
  )
}

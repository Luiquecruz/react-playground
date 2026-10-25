import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { AlertOctagon, Home } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button-variants'

export function RouteErrorPage() {
  const error = useRouteError()
  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Something went wrong'
  const message = isRouteErrorResponse(error)
    ? error.data
    : error instanceof Error
      ? error.message
      : 'An unexpected error happened.'

  return (
    <div className="grid min-h-[60vh] place-items-center">
      <title>{`${title} · React Showcase`}</title>
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300">
          <AlertOctagon className="size-7" />
        </span>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-zinc-500">{String(message)}</p>
        <Link to="/" className={buttonVariants()}>
          <Home />
          Back home
        </Link>
      </div>
    </div>
  )
}

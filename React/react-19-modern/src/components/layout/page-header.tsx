import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'

interface PageHeaderProps {
  title: string
  description: string
  tags: string[]
  actions?: ReactNode
}

export function PageHeader({ title, description, tags, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <title>{`${title} · React Showcase`}</title>
      <meta name="description" content={description} />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="max-w-2xl text-zinc-500 dark:text-zinc-400">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
      {actions}
    </header>
  )
}

import { useDeferredValue, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const adjectives = [
  'swift',
  'brave',
  'calm',
  'eager',
  'fancy',
  'gentle',
  'happy',
  'jolly',
  'lucky',
  'proud',
]
const nouns = [
  'falcon',
  'river',
  'comet',
  'maple',
  'tiger',
  'ember',
  'harbor',
  'nebula',
  'orchid',
  'summit',
]

const rows = Array.from({ length: 20_000 }, (_, index) => ({
  id: index,
  label: `${adjectives[index % adjectives.length]}-${nouns[Math.floor(index / adjectives.length) % nouns.length]}-${index}`,
}))

function blockMainThread(milliseconds: number) {
  const startedAt = performance.now()
  while (performance.now() - startedAt < milliseconds) {
    continue
  }
}

export function DeferredSearch() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const isStale = query !== deferredQuery

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try typing “brave-comet”"
          className="pl-9"
          aria-label="Search rows"
        />
      </div>
      <div className={cn('transition-opacity', isStale && 'opacity-50')}>
        <SlowResults query={deferredQuery} />
      </div>
    </div>
  )
}

function SlowResults({ query }: { query: string }) {
  blockMainThread(40)
  const matches = rows.filter((row) => row.label.includes(query.toLowerCase()))

  return (
    <div className="flex flex-col gap-2">
      <Badge variant="neutral" className="w-fit">
        {matches.length.toLocaleString()} matches
      </Badge>
      <ul className="grid max-h-72 grid-cols-2 gap-1 overflow-y-auto font-mono text-xs md:grid-cols-3">
        {matches.slice(0, 150).map((row) => (
          <li key={row.id} className="truncate rounded-md bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
            {row.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

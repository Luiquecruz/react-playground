import { startTransition, useState, ViewTransition } from 'react'
import { ArrowDownAZ, ArrowUpAZ, Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const initialItems = [
  { id: 'react', label: 'React', color: 'from-sky-400 to-cyan-500' },
  { id: 'vite', label: 'Vite', color: 'from-violet-500 to-purple-600' },
  { id: 'tailwind', label: 'Tailwind', color: 'from-teal-400 to-emerald-500' },
  { id: 'query', label: 'TanStack Query', color: 'from-rose-400 to-red-500' },
  { id: 'zustand', label: 'Zustand', color: 'from-amber-400 to-orange-500' },
  { id: 'zod', label: 'Zod', color: 'from-indigo-400 to-blue-600' },
  { id: 'motion', label: 'Motion', color: 'from-fuchsia-400 to-pink-500' },
  { id: 'vitest', label: 'Vitest', color: 'from-lime-400 to-green-500' },
]

export function ViewTransitionList() {
  const [items, setItems] = useState(initialItems)

  function reorder(nextItems: typeof initialItems) {
    startTransition(() => setItems(nextItems))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            reorder(items.toSorted((first, second) => first.label.localeCompare(second.label)))
          }
        >
          <ArrowDownAZ />A to Z
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            reorder(items.toSorted((first, second) => second.label.localeCompare(first.label)))
          }
        >
          <ArrowUpAZ />Z to A
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => reorder(items.toSorted(() => Math.random() - 0.5))}
        >
          <Shuffle />
          Shuffle
        </Button>
      </div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((item) => (
          <ViewTransition key={item.id}>
            <li
              className={`grid h-20 place-items-center rounded-xl bg-gradient-to-br ${item.color} font-semibold text-white shadow-sm`}
            >
              {item.label}
            </li>
          </ViewTransition>
        ))}
      </ul>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Minus, Plus, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ActivityCounter() {
  const [count, setCount] = useState(0)
  const [note, setNote] = useState('')
  const [secondsVisible, setSecondsVisible] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => setSecondsVisible((seconds) => seconds + 1), 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          aria-label="Decrement"
          onClick={() => setCount(count - 1)}
        >
          <Minus />
        </Button>
        <span className="w-12 text-center text-3xl font-bold tabular-nums">{count}</span>
        <Button
          variant="outline"
          size="icon"
          aria-label="Increment"
          onClick={() => setCount(count + 1)}
        >
          <Plus />
        </Button>
      </div>
      <Input
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Type a draft note..."
      />
      <p className="flex items-center gap-2 text-sm text-zinc-500">
        <Timer className="size-4" />
        Visible for {secondsVisible}s — the interval pauses while this tab is hidden.
      </p>
    </div>
  )
}

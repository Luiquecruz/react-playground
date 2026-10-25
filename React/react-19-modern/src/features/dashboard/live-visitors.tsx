import { useEffect, useEffectEvent, useState } from 'react'
import { Pause, Play, Radio } from 'lucide-react'
import { motion } from 'motion/react'
import { Line, LineChart, ResponsiveContainer, YAxis } from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/input'

interface VisitorSample {
  tick: number
  visitors: number
}

const intervalOptions = [500, 1000, 2000]

export function LiveVisitors() {
  const [samples, setSamples] = useState<VisitorSample[]>(() =>
    Array.from({ length: 20 }, (_, tick) => ({
      tick,
      visitors: 120 + Math.round(Math.random() * 40),
    })),
  )
  const [isPaused, setIsPaused] = useState(false)
  const [intervalMilliseconds, setIntervalMilliseconds] = useState(1000)

  const onTick = useEffectEvent(() => {
    if (isPaused) {
      return
    }
    setSamples((current) => {
      const last = current[current.length - 1]
      const visitors = Math.max(40, last.visitors + Math.round((Math.random() - 0.5) * 30))
      return [...current.slice(-29), { tick: last.tick + 1, visitors }]
    })
  })

  useEffect(() => {
    const intervalId = setInterval(onTick, intervalMilliseconds)
    return () => clearInterval(intervalId)
  }, [intervalMilliseconds])

  const currentVisitors = samples[samples.length - 1].visitors

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <CardTitle className="flex items-center gap-2">
            <Radio className="size-4 text-emerald-500" />
            Live visitors
          </CardTitle>
          <CardDescription>
            useEffectEvent reads the latest paused flag without restarting the interval.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select
            aria-label="Update interval"
            className="w-24"
            value={intervalMilliseconds}
            onChange={(event) => setIntervalMilliseconds(Number(event.target.value))}
          >
            {intervalOptions.map((option) => (
              <option key={option} value={option}>
                {option}ms
              </option>
            ))}
          </Select>
          <Button
            variant="outline"
            size="icon"
            aria-label={isPaused ? 'Resume' : 'Pause'}
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <Play /> : <Pause />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex items-center gap-6">
        <motion.span
          key={currentVisitors}
          initial={{ opacity: 0.4, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-24 text-4xl font-bold tabular-nums"
        >
          {currentVisitors}
        </motion.span>
        <div className="h-24 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={samples}>
              <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="var(--color-emerald-500)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

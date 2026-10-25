import { useSuspenseQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { DollarSign, Eye, ShoppingBag, TrendingUp, type LucideIcon } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { metricQueries } from '@/lib/queries'
import { compactNumberFormatter, currencyFormatter } from '@/lib/utils'
import { LiveVisitors } from '@/features/dashboard/live-visitors'

const tooltipStyle = {
  borderRadius: 12,
  border: '1px solid var(--color-zinc-200)',
  background: 'var(--color-white)',
  color: 'var(--color-zinc-900)',
}

export function DashboardPage() {
  const { data: metrics } = useSuspenseQuery(metricQueries.all())
  const current = metrics[metrics.length - 1]
  const previous = metrics[metrics.length - 2]
  const totalRevenue = metrics.reduce((total, point) => total + point.revenue, 0)
  const totalOrders = metrics.reduce((total, point) => total + point.orders, 0)
  const revenueGrowth = ((current.revenue - previous.revenue) / previous.revenue) * 100

  const kpis: { label: string; value: string; icon: LucideIcon; hint: string }[] = [
    {
      label: 'Revenue YTD',
      value: currencyFormatter.format(totalRevenue),
      icon: DollarSign,
      hint: 'Jan to Oct',
    },
    {
      label: 'Orders YTD',
      value: compactNumberFormatter.format(totalOrders),
      icon: ShoppingBag,
      hint: 'All channels',
    },
    {
      label: 'Visitors in Oct',
      value: compactNumberFormatter.format(current.visitors),
      icon: Eye,
      hint: 'Unique sessions',
    },
    {
      label: 'MoM growth',
      value: `${revenueGrowth.toFixed(1)}%`,
      icon: TrendingUp,
      hint: 'Revenue vs. Sep',
    },
  ]

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Route loaders prefetch the data with ensureQueryData, so the suspense query renders instantly. Charts come from Recharts and KPI cards animate in with Motion."
        tags={['Recharts', 'loader + ensureQueryData', 'useEffectEvent', 'motion']}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card>
              <CardContent className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-zinc-500">{kpi.label}</span>
                  <span className="text-2xl font-bold tabular-nums">{kpi.value}</span>
                  <span className="text-xs text-zinc-400">{kpi.hint}</span>
                </div>
                <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-700/20 dark:text-brand-100">
                  <kpi.icon className="size-5" />
                </span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <LiveVisitors />

      <div className="grid gap-6 xl:grid-cols-[3fr_2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Monthly revenue in USD</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics} margin={{ left: 8, right: 8 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-zinc-200)"
                  vertical={false}
                />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickFormatter={(value: number) => compactNumberFormatter.format(value)}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => currencyFormatter.format(Number(value))}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-brand-600)"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Completed orders per month</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-zinc-200)"
                  vertical={false}
                />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: 'var(--color-zinc-100)', opacity: 0.5 }}
                />
                <Bar dataKey="orders" fill="var(--color-brand-500)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

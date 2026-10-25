import { Activity, useState, type ReactNode } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { PageHeader } from '@/components/layout/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { DeferredSearch } from '@/features/transitions/deferred-search'
import { ActivityCounter } from '@/features/transitions/activity-counter'
import { ViewTransitionList } from '@/features/transitions/view-transition-list'

const tabs = [
  { value: 'deferred', label: 'useDeferredValue' },
  { value: 'view-transition', label: '<ViewTransition>' },
  { value: 'activity', label: '<Activity>' },
] as const

type TabValue = (typeof tabs)[number]['value']

export function TransitionsPage() {
  const [activeTab, setActiveTab] = useState<TabValue>('deferred')

  return (
    <>
      <PageHeader
        title="Transitions"
        description="Concurrent rendering keeps typing responsive, ViewTransition animates DOM changes triggered inside transitions, and Activity hides subtrees without losing their state."
        tags={['useDeferredValue', 'startTransition', '<ViewTransition>', '<Activity>']}
      />
      <Card>
        <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)}>
          <CardHeader>
            <Tabs.List className="flex w-fit gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
              {tabs.map((tab) => (
                <Tabs.Trigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    'rounded-lg px-3 py-1.5 font-mono text-xs font-medium text-zinc-500 transition-colors',
                    'data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm',
                    'dark:data-[state=active]:bg-zinc-950 dark:data-[state=active]:text-zinc-100',
                  )}
                >
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </CardHeader>
          <CardContent>
            <Activity mode={activeTab === 'deferred' ? 'visible' : 'hidden'}>
              <Panel
                title="Responsive search over 20,000 rows"
                description="The input updates immediately; the expensive list re-renders with a deferred value and can be interrupted."
              >
                <DeferredSearch />
              </Panel>
            </Activity>
            <Activity mode={activeTab === 'view-transition' ? 'visible' : 'hidden'}>
              <Panel
                title="Animated reordering"
                description="Each item is wrapped in <ViewTransition>; sorting inside startTransition morphs every card to its new position."
              >
                <ViewTransitionList />
              </Panel>
            </Activity>
            <Activity mode={activeTab === 'activity' ? 'visible' : 'hidden'}>
              <Panel
                title="State preserved while hidden"
                description="Increment, switch tabs and come back: hidden Activity boundaries keep state and unmount effects until visible again."
              >
                <ActivityCounter />
              </Panel>
            </Activity>
          </CardContent>
        </Tabs.Root>
      </Card>
    </>
  )
}

function Panel({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
      {children}
    </div>
  )
}

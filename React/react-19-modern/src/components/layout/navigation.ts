import {
  Activity,
  BarChart3,
  FormInput,
  Home,
  Layers,
  ShoppingBag,
  Zap,
  type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
  to: string
  label: string
  description: string
  icon: LucideIcon
}

export const navigationItems: NavigationItem[] = [
  { to: '/', label: 'Overview', description: 'Stack and feature map', icon: Home },
  {
    to: '/actions',
    label: 'Actions',
    description: 'useActionState, useOptimistic and useFormStatus',
    icon: Zap,
  },
  {
    to: '/suspense',
    label: 'Suspense & use',
    description: 'use(promise), Suspense boundaries and error boundaries',
    icon: Layers,
  },
  {
    to: '/transitions',
    label: 'Transitions',
    description: 'useTransition, useDeferredValue, Activity and ViewTransition',
    icon: Activity,
  },
  {
    to: '/forms',
    label: 'Forms',
    description: 'React Hook Form with Zod schema validation',
    icon: FormInput,
  },
  {
    to: '/catalog',
    label: 'Catalog',
    description: 'TanStack Query mutations, Zustand cart and Motion layout',
    icon: ShoppingBag,
  },
  {
    to: '/dashboard',
    label: 'Dashboard',
    description: 'Recharts visualizations and useEffectEvent live data',
    icon: BarChart3,
  },
]

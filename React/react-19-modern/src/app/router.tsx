import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/components/layout/app-layout'
import { AppHydrateFallback } from '@/components/layout/page-skeleton'
import { RouteErrorPage } from '@/features/errors/route-error-page'
import { messageQueries, metricQueries, productQueries, queryClient } from '@/lib/queries'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    HydrateFallback: AppHydrateFallback,
    children: [
      {
        ErrorBoundary: RouteErrorPage,
        children: [
          {
            index: true,
            lazy: async () => ({ Component: (await import('@/features/home/home-page')).HomePage }),
          },
          {
            path: 'actions',
            loader: () => queryClient.ensureQueryData(messageQueries.all()),
            lazy: async () => ({
              Component: (await import('@/features/actions/actions-page')).ActionsPage,
            }),
          },
          {
            path: 'suspense',
            lazy: async () => ({
              Component: (await import('@/features/suspense/suspense-page')).SuspensePage,
            }),
          },
          {
            path: 'transitions',
            lazy: async () => ({
              Component: (await import('@/features/transitions/transitions-page')).TransitionsPage,
            }),
          },
          {
            path: 'forms',
            lazy: async () => ({
              Component: (await import('@/features/forms/forms-page')).FormsPage,
            }),
          },
          {
            path: 'catalog',
            loader: () => queryClient.ensureQueryData(productQueries.all()),
            lazy: async () => ({
              Component: (await import('@/features/catalog/catalog-page')).CatalogPage,
            }),
          },
          {
            path: 'dashboard',
            loader: () => queryClient.ensureQueryData(metricQueries.all()),
            lazy: async () => ({
              Component: (await import('@/features/dashboard/dashboard-page')).DashboardPage,
            }),
          },
          {
            path: '*',
            lazy: async () => ({
              loader: (await import('@/features/errors/not-found-page')).loader,
            }),
          },
        ],
      },
    ],
  },
])

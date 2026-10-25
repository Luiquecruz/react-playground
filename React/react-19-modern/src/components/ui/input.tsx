import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const fieldClassName =
  'w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:border-brand-500 focus-visible:ring-2 focus-visible:ring-brand-500/30 focus-visible:outline-none disabled:opacity-50 aria-invalid:border-red-500 dark:border-zinc-800 dark:bg-zinc-950'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(fieldClassName, 'h-10', className)} {...props} />
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(fieldClassName, 'min-h-24 py-2', className)} {...props} />
}

export function Select({ className, ...props }: ComponentProps<'select'>) {
  return <select className={cn(fieldClassName, 'h-10', className)} {...props} />
}

export function Label({ className, ...props }: ComponentProps<'label'>) {
  return <label className={cn('text-sm font-medium', className)} {...props} />
}

export function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null
  }
  return (
    <p role="alert" className="text-xs text-red-600 dark:text-red-400">
      {message}
    </p>
  )
}

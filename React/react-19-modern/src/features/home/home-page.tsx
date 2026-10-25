import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-variants'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { navigationItems } from '@/components/layout/navigation'
import { cn } from '@/lib/utils'

const stack = [
  { name: 'React 19.3', role: 'UI runtime' },
  { name: 'React Compiler', role: 'Automatic memoization' },
  { name: 'Vite 8', role: 'Rolldown bundler' },
  { name: 'TypeScript 7', role: 'Native type checker' },
  { name: 'Tailwind CSS 4', role: 'Styling' },
  { name: 'React Router 8', role: 'Data routing' },
  { name: 'TanStack Query 5', role: 'Server state' },
  { name: 'Zustand 5', role: 'Client state' },
  { name: 'React Hook Form', role: 'Forms' },
  { name: 'Zod 4', role: 'Schema validation' },
  { name: 'Motion', role: 'Animations' },
  { name: 'Recharts 3', role: 'Charts' },
  { name: 'Radix UI', role: 'Accessible primitives' },
  { name: 'Vitest 5', role: 'Testing' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export function HomePage() {
  const features = navigationItems.filter((navigationItem) => navigationItem.to !== '/')

  return (
    <>
      <title>React Showcase</title>
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 p-8 text-white md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex max-w-2xl flex-col gap-4"
        >
          <Badge className="w-fit bg-white/15 text-white">
            <Sparkles className="size-3" />
            Modern React in one place
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">React Showcase</h1>
          <p className="text-lg text-white/80">
            A hands-on tour through the newest React APIs and the libraries the ecosystem reaches
            for most, wired together in a real application.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/actions"
              viewTransition
              className={cn(buttonVariants(), 'bg-white text-brand-700 hover:bg-white/90')}
            >
              Start the tour
              <ArrowRight />
            </Link>
            <a
              href="https://react.dev/blog"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'ghost' }), 'text-white hover:bg-white/10')}
            >
              React blog
            </a>
          </div>
        </motion.div>
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-24 -right-24 size-96 rounded-full border-[40px] border-white/10"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Feature tour</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.to} variants={item} whileHover={{ y: -4 }}>
              <Link to={feature.to} viewTransition className="block h-full">
                <Card className="h-full transition-colors hover:border-brand-500">
                  <CardHeader>
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-700/20 dark:text-brand-100">
                      <feature.icon className="size-5" />
                    </span>
                    <CardTitle className="mt-2">{feature.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Stack</h2>
        <div className="flex flex-wrap gap-2">
          {stack.map((library) => (
            <div
              key={library.name}
              className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white py-1 pr-3 pl-1 text-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <Badge variant="neutral">{library.role}</Badge>
              <span className="font-medium">{library.name}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

# React 19 Showcase

Hands-on on modern React 19 APIs.

## Stack

| Area          | Library                                                              |
| ------------- | -------------------------------------------------------------------- |
| UI runtime    | React 19.3 + React Compiler                                          |
| Bundler       | Vite 8 (Rolldown)                                                    |
| Language      | TypeScript 7                                                         |
| Styling       | Tailwind CSS 4, class-variance-authority, tailwind-merge             |
| Routing       | React Router 8 (data router, lazy routes, loaders, view transitions) |
| Server state  | TanStack Query 5                                                     |
| Client state  | Zustand 5 with persist middleware                                    |
| Forms         | React Hook Form + Zod 4                                              |
| UI primitives | Radix UI, lucide-react, sonner                                       |
| Animation     | Motion                                                               |
| Charts        | Recharts 3                                                           |
| Testing       | Vitest 5, Testing Library, jsdom                                     |
| Quality       | ESLint 10 (react-hooks compiler rules), Prettier                     |

## Pages

| Route          | Features                                                                                     |
| -------------- | -------------------------------------------------------------------------------------------- |
| `/actions`     | `useActionState`, `useOptimistic`, `useFormStatus`, form actions                             |
| `/suspense`    | `use(promise)`, `<Suspense>`, `useTransition`, error boundaries                              |
| `/transitions` | `useDeferredValue`, `<ViewTransition>`, `<Activity>`                                         |
| `/forms`       | `useForm`, `useFieldArray`, `zodResolver`, schema coercion                                   |
| `/catalog`     | `useSuspenseQuery`, optimistic `useMutation`, Zustand cart, `useSearchParams`, Motion layout |
| `/dashboard`   | Recharts, route loaders with `ensureQueryData`, `useEffectEvent`                             |

Every page also uses React 19 document metadata (`<title>` and `<meta>` rendered from components) and `ref` as a regular prop.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run test
npm run lint
npm run typecheck
npm run format
```

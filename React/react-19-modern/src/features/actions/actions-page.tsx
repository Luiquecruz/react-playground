import { useActionState, useOptimistic } from 'react'
import { useFormStatus } from 'react-dom'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { motion, AnimatePresence } from 'motion/react'
import { Loader2, Send } from 'lucide-react'
import { PageHeader } from '@/components/layout/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldError, Input, Label, Textarea } from '@/components/ui/input'
import { createMessage, type Message } from '@/lib/api'
import { messageQueries } from '@/lib/queries'
import { cn } from '@/lib/utils'
import { messageSchema, type MessageInput } from '@/features/actions/message-schema'

interface OptimisticMessage extends Message {
  pending?: boolean
}

interface GuestbookState {
  error: string | null
  values: MessageInput
}

const initialState: GuestbookState = {
  error: null,
  values: { author: '', text: '' },
}

export function ActionsPage() {
  const queryClient = useQueryClient()
  const { data: messages } = useSuspenseQuery(messageQueries.all())
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    OptimisticMessage[],
    OptimisticMessage
  >(messages, (current, pendingMessage) => [pendingMessage, ...current])

  const [state, formAction, isPending] = useActionState(
    async (_previousState: GuestbookState, formData: FormData): Promise<GuestbookState> => {
      const values = {
        author: String(formData.get('author')),
        text: String(formData.get('text')),
      }
      const result = messageSchema.safeParse(values)
      if (!result.success) {
        return { error: result.error.issues[0].message, values }
      }

      addOptimisticMessage({
        id: crypto.randomUUID(),
        ...result.data,
        createdAt: new Date().toISOString(),
        pending: true,
      })

      try {
        const message = await createMessage(result.data)
        queryClient.setQueryData(messageQueries.all().queryKey, (current = []) => [
          message,
          ...current,
        ])
        return initialState
      } catch (error) {
        return { error: (error as Error).message, values }
      }
    },
    initialState,
  )

  return (
    <>
      <PageHeader
        title="Actions"
        description="Async functions passed to forms run inside transitions. React tracks pending state, resets the form and lets the UI optimistically render the result before the server answers."
        tags={['useActionState', 'useOptimistic', 'useFormStatus', '<form action>']}
      />
      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Sign the guestbook</CardTitle>
            <CardDescription>
              Type a message containing <code className="font-mono">error</code> to see the
              optimistic entry roll back.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="author">Name</Label>
                <Input
                  id="author"
                  name="author"
                  defaultValue={state.values.author}
                  placeholder="Ada Lovelace"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="text">Message</Label>
                <Textarea
                  id="text"
                  name="text"
                  defaultValue={state.values.text}
                  placeholder="What do you think about React 19?"
                />
              </div>
              <FieldError message={state.error ?? undefined} />
              <SubmitButton />
              <p className="text-xs text-zinc-500">
                Action pending:{' '}
                <Badge variant={isPending ? 'warning' : 'neutral'}>{String(isPending)}</Badge>
              </p>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              Server state lives in TanStack Query, optimistic entries come from useOptimistic.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {optimisticMessages.map((message) => (
                  <motion.li
                    key={message.id}
                    layout
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className={cn(
                      'rounded-xl border border-zinc-200 p-4 dark:border-zinc-800',
                      message.pending && 'border-dashed opacity-60',
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{message.author}</span>
                      {message.pending ? (
                        <Badge variant="warning">
                          <Loader2 className="size-3 animate-spin" />
                          Sending
                        </Badge>
                      ) : (
                        <span className="text-xs text-zinc-500">
                          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{message.text}</p>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <Send />}
      {pending ? 'Sending...' : 'Send message'}
    </Button>
  )
}

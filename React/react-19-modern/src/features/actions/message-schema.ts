import { z } from 'zod'

export const messageSchema = z.object({
  author: z.string().trim().min(2, 'Name must have at least 2 characters'),
  text: z.string().trim().min(5, 'Message must have at least 5 characters').max(200),
})

export type MessageInput = z.infer<typeof messageSchema>

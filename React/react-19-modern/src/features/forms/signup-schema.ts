import { z } from 'zod'

export const plans = ['hobby', 'pro', 'enterprise'] as const

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must have at least 2 characters'),
    email: z.email('Enter a valid email address'),
    plan: z.enum(plans, 'Choose a plan'),
    teamSize: z.coerce
      .number<string>()
      .int()
      .min(1, 'At least one member')
      .max(500, 'Up to 500 members'),
    password: z
      .string()
      .min(8, 'Password must have at least 8 characters')
      .regex(/[A-Z]/, 'Include an uppercase letter')
      .regex(/\d/, 'Include a number'),
    confirmPassword: z.string(),
    skills: z
      .array(z.object({ value: z.string().trim().min(1, 'Skill cannot be empty') }))
      .min(1, 'Add at least one skill')
      .max(5, 'Up to 5 skills'),
    acceptTerms: z.boolean().refine((accepted) => accepted, 'You must accept the terms'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignupFormInput = z.input<typeof signupSchema>
export type SignupFormOutput = z.output<typeof signupSchema>

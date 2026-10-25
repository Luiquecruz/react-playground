import { describe, expect, it } from 'vitest'
import { signupSchema, type SignupFormInput } from '@/features/forms/signup-schema'

const validInput: SignupFormInput = {
  name: '  Grace Hopper  ',
  email: 'grace@showcase.dev',
  plan: 'pro',
  teamSize: '12',
  password: 'Compiler1952',
  confirmPassword: 'Compiler1952',
  skills: [{ value: 'COBOL' }],
  acceptTerms: true,
}

describe('signupSchema', () => {
  it('parses, trims and coerces valid input', () => {
    const result = signupSchema.parse(validInput)

    expect(result.name).toBe('Grace Hopper')
    expect(result.teamSize).toBe(12)
  })

  it('rejects mismatching passwords on the confirmation field', () => {
    const result = signupSchema.safeParse({ ...validInput, confirmPassword: 'Different1' })

    expect(result.success).toBe(false)
    expect(result.error?.issues[0].path).toEqual(['confirmPassword'])
  })

  it('requires terms acceptance', () => {
    const result = signupSchema.safeParse({ ...validInput, acceptTerms: false })

    expect(result.error?.issues[0].message).toBe('You must accept the terms')
  })
})

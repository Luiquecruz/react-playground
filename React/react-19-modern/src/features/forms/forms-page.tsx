import { useState, type ReactNode } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { FieldError, Input, Label, Select } from '@/components/ui/input'
import { wait } from '@/lib/utils'
import {
  plans,
  signupSchema,
  type SignupFormInput,
  type SignupFormOutput,
} from '@/features/forms/signup-schema'

const defaultValues: SignupFormInput = {
  name: '',
  email: '',
  plan: 'pro',
  teamSize: '5',
  password: '',
  confirmPassword: '',
  skills: [{ value: 'React' }],
  acceptTerms: false,
}

export function FormsPage() {
  const [submittedValues, setSubmittedValues] = useState<SignupFormOutput | null>(null)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<SignupFormInput, unknown, SignupFormOutput>({
    resolver: zodResolver(signupSchema),
    defaultValues,
    mode: 'onTouched',
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'skills' })

  async function onSubmit(values: SignupFormOutput) {
    await wait(1000)
    setSubmittedValues(values)
    toast.success(`Welcome aboard, ${values.name}!`)
    reset()
  }

  return (
    <>
      <PageHeader
        title="Forms"
        description="React Hook Form keeps inputs uncontrolled for minimal re-renders while a single Zod schema provides validation rules, coercion and the TypeScript types."
        tags={['react-hook-form', 'zod 4', 'useFieldArray', 'zodResolver']}
      />
      <Card>
        <CardHeader>
          <CardTitle>Create your workspace</CardTitle>
          <CardDescription>Validation runs on blur, then on every change.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 md:grid-cols-2">
            <Field label="Full name" htmlFor="name" error={errors.name?.message}>
              <Input id="name" aria-invalid={Boolean(errors.name)} {...register('name')} />
            </Field>
            <Field label="Email" htmlFor="email" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                aria-invalid={Boolean(errors.email)}
                {...register('email')}
              />
            </Field>
            <Field label="Plan" htmlFor="plan" error={errors.plan?.message}>
              <Select id="plan" {...register('plan')}>
                {plans.map((plan) => (
                  <option key={plan} value={plan} className="capitalize">
                    {plan}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Team size" htmlFor="teamSize" error={errors.teamSize?.message}>
              <Input
                id="teamSize"
                type="number"
                aria-invalid={Boolean(errors.teamSize)}
                {...register('teamSize')}
              />
            </Field>
            <Field label="Password" htmlFor="password" error={errors.password?.message}>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                {...register('password')}
              />
            </Field>
            <Field
              label="Confirm password"
              htmlFor="confirmPassword"
              error={errors.confirmPassword?.message}
            >
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirmPassword)}
                {...register('confirmPassword')}
              />
            </Field>

            <fieldset className="flex flex-col gap-2 md:col-span-2">
              <legend className="mb-1.5 text-sm font-medium">Skills</legend>
              <div className="flex flex-wrap gap-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-1">
                    <Input
                      aria-label={`Skill ${index + 1}`}
                      className="w-40"
                      aria-invalid={Boolean(errors.skills?.[index]?.value)}
                      {...register(`skills.${index}.value`)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove skill ${index + 1}`}
                      onClick={() => remove(index)}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  disabled={fields.length >= 5}
                  onClick={() => append({ value: '' })}
                >
                  <Plus />
                  Add skill
                </Button>
              </div>
              <FieldError message={errors.skills?.message ?? errors.skills?.root?.message} />
            </fieldset>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="size-4 accent-brand-600"
                  {...register('acceptTerms')}
                />
                I accept the terms of service
              </label>
              <FieldError message={errors.acceptTerms?.message} />
            </div>

            <div className="flex items-center gap-3 md:col-span-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="animate-spin" />}
                Create workspace
              </Button>
              <Button type="button" variant="ghost" disabled={!isDirty} onClick={() => reset()}>
                Reset
              </Button>
              <span className="text-xs text-zinc-500">
                dirty: {String(isDirty)} · valid: {String(isValid)}
              </span>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog
        open={submittedValues !== null}
        onOpenChange={(open) => !open && setSubmittedValues(null)}
      >
        <DialogContent>
          <DialogTitle>Parsed output</DialogTitle>
          <DialogDescription>
            Zod transformed the raw inputs: trimmed strings and a coerced numeric team size.
          </DialogDescription>
          <pre className="overflow-x-auto rounded-xl bg-zinc-950 p-4 text-xs text-emerald-300">
            {JSON.stringify(
              { ...submittedValues, password: '••••••••', confirmPassword: '••••••••' },
              null,
              2,
            )}
          </pre>
        </DialogContent>
      </Dialog>
    </>
  )
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      <FieldError message={error} />
    </div>
  )
}

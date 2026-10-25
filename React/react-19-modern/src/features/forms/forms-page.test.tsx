import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { FormsPage } from '@/features/forms/forms-page'

describe('FormsPage', () => {
  it('shows schema errors when submitting an empty form', async () => {
    const user = userEvent.setup()
    render(<FormsPage />)

    await user.click(screen.getByRole('button', { name: 'Create workspace' }))

    expect(await screen.findByText('Name must have at least 2 characters')).toBeInTheDocument()
    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument()
    expect(screen.getByText('You must accept the terms')).toBeInTheDocument()
  })

  it('adds and removes skill inputs', async () => {
    const user = userEvent.setup()
    render(<FormsPage />)

    await user.click(screen.getByRole('button', { name: 'Add skill' }))
    expect(screen.getByLabelText('Skill 2')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Remove skill 2' }))
    expect(screen.queryByLabelText('Skill 2')).not.toBeInTheDocument()
  })
})

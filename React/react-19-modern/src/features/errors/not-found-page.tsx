import { data } from 'react-router'

export function loader() {
  throw data('This page does not exist in the showcase.', { status: 404, statusText: 'Not Found' })
}

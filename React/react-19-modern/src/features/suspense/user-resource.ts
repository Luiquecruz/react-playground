import { fetchUser, type User } from '@/lib/api'

const userPromiseCache = new Map<number, Promise<User>>()

export function getUserPromise(userId: number) {
  let promise = userPromiseCache.get(userId)
  if (!promise) {
    promise = fetchUser(userId)
    userPromiseCache.set(userId, promise)
  }
  return promise
}

export function invalidateUserPromise(userId: number) {
  userPromiseCache.delete(userId)
}

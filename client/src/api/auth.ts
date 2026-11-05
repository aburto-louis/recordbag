import type { Login, User, UserContext } from "store/client"
import { client } from "./client"

export async function handleAuthMe(): Promise<UserContext> {
  const res = await client.auth.me.$get()

  if (!res.ok) {
    if (res.status >= 500) {
      throw new Error(`Server Error ${res.status}.`)
    }
    return null
  }

  const { user } = await res.json()
  return user
}

export async function handleAuthLogin(data: Login): Promise<User> {
  const res = await client.auth.login.$post({ json: data })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized")
    }
    throw new Error(`Server Error ${res.status}.`)
  }

  const { user } = await res.json()
  return user
}

export async function handleAuthLogout(): Promise<void> {
  const res = await client.auth.logout.$post()

  if (!res.ok) {
    throw new Error(`Logout Error ${res.status}.`)
  }
}

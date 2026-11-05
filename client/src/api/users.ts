import { client } from "./client"

export async function handleUserAvi(): Promise<string | null> {
  const res = await client.users.avi.$get()

  if (!res.ok) {
    throw new Error("No AVI")
  }

  const { avi } = await res.json()
  return avi
}

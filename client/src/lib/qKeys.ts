export const authQueryKey = {
  all: () => ["auth"] as const,
  me: () => [...authQueryKey.all(), "me"] as const,
} as const

export const userQueryKey = {
  all: () => ["user"] as const,
  avis: () => [...userQueryKey.all(), "avi"] as const,
  avi: (key: string) => [...userQueryKey.avis(), key] as const,
} as const

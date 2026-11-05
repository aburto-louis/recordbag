import { queryOptions } from "@tanstack/react-query"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { handleAuthMe } from "@/api/auth"
import type { RouterContext } from "@/lib/config"
import { authQueryKey } from "@/lib/qKeys"

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.query(
      queryOptions({
        queryKey: authQueryKey.me(),
        queryFn: handleAuthMe,
        staleTime: "static",
      })
    )
    return { user }
  },
  component: () => <Outlet />,
})

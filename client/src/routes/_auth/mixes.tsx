import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/mixes")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/mixes"!</div>
}

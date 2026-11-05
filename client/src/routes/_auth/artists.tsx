import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/artists")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/artists"!</div>
}

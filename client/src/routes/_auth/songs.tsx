import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth/songs")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/songs"!</div>
}

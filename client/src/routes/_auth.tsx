import { createFileRoute, redirect, Outlet } from "@tanstack/react-router"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppHeader } from "@/components/header/app-header"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: "/",
        search: { redirect: location.href },
        replace: true,
      })
    }
    return { user: context.user }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

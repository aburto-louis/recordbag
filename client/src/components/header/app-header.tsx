import { Separator } from "../ui/separator"
import { SidebarTrigger } from "../ui/sidebar"

export function AppHeader() {
  return (
    <div className="h-12 flex items-center gap-2 border-b p-2">
      <SidebarTrigger size="icon-lg" />
      <Separator orientation="vertical" />
    </div>
  )
}

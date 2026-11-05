import { AudioWaveformIcon, GitBranchIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

export function SidebarBrand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg">
                <div className="size-8 aspect-square flex items-center justify-center">
                  <AudioWaveformIcon className="size-6" />
                </div>
                <span className="text-lg">Record Bag</span>
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="cursor-pointer"
                render={
                  <a
                    href="https://github.com/aburto-louis"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitBranchIcon />
                    <span>Git</span>
                  </a>
                }
              />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

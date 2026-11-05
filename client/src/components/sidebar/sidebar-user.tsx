import { AVI_TTL } from "store/client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouteContext, useRouter } from "@tanstack/react-router"
import { handleAuthLogout } from "@/api/auth"
import { handleUserAvi } from "@/api/users"
import { authQueryKey, userQueryKey } from "@/lib/qKeys"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { toast } from "../ui/toast"
import FALLBACK from "/ico.png"

export function SidebarUser() {
  const { user } = useRouteContext({ from: "/_auth" })
  const avi = useQuery({
    queryKey: userQueryKey.avi(user.avi_key ?? ""),
    queryFn: handleUserAvi,
    enabled: user.avi_key !== null,
    staleTime: AVI_TTL,
  })
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
            <Avatar>
              <AvatarImage src={avi.data ?? FALLBACK} />
              <AvatarFallback>??</AvatarFallback>
            </Avatar>
            <span className="truncate">@{user.username}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <Logout />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function Logout() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return (
    <DropdownMenuItem
      variant="destructive"
      className="cursor-pointer"
      onClick={async () => {
        try {
          await handleAuthLogout()
          queryClient.setQueryData(authQueryKey.me(), null)
          await router.invalidate()
        } catch (err) {
          toast.add({
            type: "error",
            description: err instanceof Error ? err.message : "Logout failed",
          })
        }
      }}
    >
      Logout
    </DropdownMenuItem>
  )
}

import { useRouterState, Link } from "@tanstack/react-router"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"

import {
  Disc3Icon,
  FactoryIcon,
  HeadphonesIcon,
  Music4Icon,
  UserIcon,
  type LucideIcon,
} from "lucide-react"

const MAIN_ROUTES = [
  {
    name: "Albums",
    path: "/albums",
    Icon: Disc3Icon,
  },
  {
    name: "Artists",
    path: "/artists",
    Icon: UserIcon,
  },
  {
    name: "Labels",
    path: "/labels",
    Icon: FactoryIcon,
  },
  {
    name: "Mixes",
    path: "/mixes",
    Icon: HeadphonesIcon,
  },
  {
    name: "Songs",
    path: "/songs",
    Icon: Music4Icon,
  },
] as const

export function SidebarMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="cursor-default">Library</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {MAIN_ROUTES.map(({ name, path, Icon }) => (
            <LibraryLink key={path} name={name} path={path} icon={Icon} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function LibraryLink({
  name,
  path,
  icon: Icon,
}: {
  name: string
  path: "/albums" | "/artists" | "/labels" | "/mixes" | "/songs"
  icon: LucideIcon
}) {
  const isActive = useRouterState({
    select: (s) =>
      s.location.pathname === path ||
      s.location.pathname.startsWith(`${path}/`),
  })
  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} render={<Link to={path} />}>
        <Icon />
        <span>{name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

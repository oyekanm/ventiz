"use client"

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: any,
    label: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const path = usePathname()

  // console.log(path)

  const active = "bg-[#E6E6F380] rounded-[6px]"

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
      <SidebarMenu className="">
        {projects.map((item) => {
          return (
            <SidebarMenuItem key={item.name}>
            {
              item.name === "Dashboard" ? (
                <SidebarMenuButton asChild>
                  <Link href={item.url} className={`!h-16 px-[1.2rem] ${path === "/"  ? active : ""}`}>
                    {item.icon}
                    <span className={`sm-text !font-medium  ${path === "/" ? "!text-[#070577]" : "!text-[#344054]"}`}>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton asChild>
                  <Link href={item.url} className={`!h-16 px-[1.2rem] ${path.includes(item.url) ? active : ""} ${item.name === "Log out" ? "!bg-[#FEF3F2] !rounded-[6px]": ""}`}>
                    {item.icon}
                    <span className={`sm-text !font-medium  ${path.includes(item.url) ? "!text-[#070577]" : "!text-[#344054]"} ${item.name === "Log out" ? "!text-[#B42318]": ""}`}>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              )
            }

          </SidebarMenuItem>
          )
        })}
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  )
}

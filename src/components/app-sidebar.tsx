"use client"

import * as React from "react"


import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { useAppContext } from "@/context/appContext"

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
 const {navData} = useAppContext() 

 
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="px-[1.6rem] py-[2rem]">
        <TeamSwitcher />
      </SidebarHeader >
      <SidebarContent className="px-[1.6rem]">
        {/* <NavMain items={data.navMain} /> */}
        <div className="flex items-center gap-1">
          <span className="text-[1.2rem] leading-[1.6rem] text-[#667085] tracking-[-0.025em]">Main Navigation</span>
          <span className="h-[.1rem] w-[15.6rem] bg-[#D0D5DD]" />
        </div>
        <NavProjects projects={navData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavProjects projects={navData.footNav} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

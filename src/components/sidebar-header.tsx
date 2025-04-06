"use client"

import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { UserInfoCard } from './reuseable'
import { useAppContext } from '@/context/appContext'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'
import { BrowseAllNotifications } from '@/services/notificationService'

const links = [
  {
    label: 'Support',
    url: "/support-feedback"
  },
  {
    label: 'Settings',
    url: "/settings"
  },
  {
    label: 'Log out',
    url: "/log-out"
  },
  {
    label: "Dashboard",
    url: "/",
  },
  {
    label: "Users Management",
    url: "/users-management",
  },
  {
    label: "Events",
    url: "/events",
  },
  {
    label: "Ticket Sales",
    url: "/ticket-sales",
  },
  {
    label: "Admin Management",
    url: "/admin-management",
  },
]

export default function SidebarHeader() {
  const path = usePathname()
  const { user,initialData } = useAppContext();
  // const { data: notification = [] } = useSWR('all-notification', BrowseAllNotifications, {
  //   // refreshInterval: 5000,
  //   fallbackData:initialData.notifications
  // });

  const notification = initialData.notifications

  const getStatusStyle = () => {
    let current
    links.map(link => {
      if (path.includes(link.url)) {
        // console.log(link.url,path.includes(link.url))
        current = link.label
      }
      if (path.includes("/notifications")) {
        current = "Notifications"
      }
      if (path === "/") {
        current = "Dashboard"
      }
    })
    return current
  };

  // console.log( user.role, user)
  // console.log(notification.filter((nt:any)=> !nt.read ))
  // TODO: user role
  return (
    <header className="flex p-[2.4rem] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="hidden">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-16" />
      </div>
      <div className="flex-1 flex justify-between items-center">
        <p className="md-text">{getStatusStyle()}</p>
        <div className="flex items-center gap-[1.6rem]">
          <Link href={"/notifications"} className="relative flex items-center justify-center border-[.075rem] border-[#E4E7EC] size-[4rem] rounded-full">
            <Bell size={20} />
            <div className="absolute top-[-.3rem] -right-3 size-8 rounded-full bg-[#D92D20] text-white text-[.8rem] leading-[1rem] tracking-[0.025em] flex items-center justify-center">
              {notification.filter((nt: any) => !nt.read).length || 0}
            </div>
          </Link>
          {/* <div className="flex items-center gap-[1.6rem]">
        <div className="size-[4rem] bg-[#F2F4F7] !text-[#667085] sm-text !font-semibold flex justify-center items-center rounded-full border-[.075rem] border-[#E4E7EC]">JD</div>
        <div >
          <p className="xs-text !font-medium">Elijah Ayodele</p>
          <p className="xs-text">Super Admin</p>
        </div>
      </div> */}
          {/* <UserInfoCard name={user.fullName} other={user.role[0]} /> */}
          <div className="flex items-center gap-[1.6rem]">
            <div className="size-[4rem] uppercase bg-[#F2F4F7] !text-[#667085] sm-text !font-semibold flex justify-center items-center rounded-full border-[.075rem] border-[#E4E7EC]">
              {user?.fullName ? 
              `${user?.fullName?.split(" ")[0]?.slice(0, 1)}${user?.fullName?.split(" ")[1]?.slice(0, 1) ? user?.fullName?.split(" ")[1]?.slice(0, 1) : ""}` 
               : "JD"}
            </div>
            <div >
              <p className="xs-text !font-medium capitalize">{user?.fullName ? user?.fullName : "John Doe"}</p>
              <p className="xs-text capitalize">{user?.role?user.role[0]:"SuperAdmin"}</p>
              {/* <p className="xs-text capitalize">{"SuperAdmin"}</p> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

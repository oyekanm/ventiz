"use client"

import { BrowseAllUsers, GetSingleUser } from "@/services/adminService";
import { BrowseAllBooking, BrowseAllEvents } from "@/services/eventService";
import { BrowseAllNotifications } from "@/services/notificationService";
import { BrowseAllSupport, BrowseLatestTransactions } from "@/services/supportService";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  AudioWaveform,
  BarChart2,
  BookOpen,
  Bot,
  Calendar,
  Command,
  Frame,
  GalleryVerticalEnd,
  HelpCircle,
  LifeBuoy,
  LogOut,
  Map,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
  Ticket,
  UserPlus,
  Users,
} from "lucide-react"
import { usePathname } from "next/navigation";
import { useFetchData } from "@/hooks/useFetchData";
import useSWR from "swr";
import useToast from "@/hooks/useToast";

type AppContextType = {
  user: User,
  navData: any,
  initialData: AppData;
}
type AppData = {
  users: any[];
  events: any[];
  notifications: any[];
  bookings: any[];
  supports: any[];
  transactions: any[];
  user: any;
};

const AppContext = createContext<AppContextType>(null as any);

export default function AppProvider({ children, initialUser, initialData }: { children: React.ReactNode, initialUser?: User | null, initialData: AppData; }) {
  const path = usePathname()
  const { data: user, mutate } = useSWR("single-user", GetSingleUser, {
    fallbackData: initialData.user,
    // refreshInterval: 5000
  });
//   const [events, setEvents] = useState<EventData[]>([]);
//   const [eventLoading, setEventLoading] = useState(false)
//   const [notification, setNotification] = useState<notifications[]>([])
//   const [allBookings, setAllBookings] = useState<Bookings[]>([])
//   const [supports, setSupports] = useState<dispute[]>([])
//   const [transactions, setTransactions] = useState<Transactions[]>([])

//   useEffect(() => {
//     const fetchEvents = async () => {
//         try {
//             setEventLoading(true)
//             const data = await BrowseAllEvents();
//             const notif = await BrowseAllNotifications();
//             const bookings = await BrowseAllBooking();
//             const user:any = await BrowseAllUsers();
//             const support:any = await BrowseAllSupport();
//             const transactions:any = await BrowseLatestTransactions();
//             //   console.log(data)
//             setUsers(user)
//             setNotification(notif.reverse())
//             setAllBookings(bookings)
//             setSupports(support)
//             setEvents(data);
//             setTransactions(transactions)
//             setEventLoading(false)
//         } catch (error) {
//             console.error("Error fetching events:", error);
//         }
//     };

//     fetchEvents();
// }, []);
  // console.log(initialData.events)

  // console.log(events)
  // for the current signed in user
  // let user: any = JSON.parse(decodeURIComponent(document.cookie.split(";").find(c => c.trim().startsWith("user="))?.split("=")[1] || ""));
  const navData = {
    footNav: [
      {
        icon: <LifeBuoy className={`!size-[1.8rem] ${path.includes("support-feedback") ? "!text-[#070577]" : "!text-[#344054]"}`} />,
        label: 'Support',
        name: "Support",
        url: "/support-feedback"
      },
      {
        icon: <Settings className={`!size-[1.8rem] ${path.includes("settings") ? "!text-[#070577]" : "!text-[#344054]"}`} />,
        label: 'Settings',
        name: 'Settings',
        url: "/settings"
      },
      {
        icon: <LogOut className={`!size-[1.8rem] text-[#B42318]`} />,
        label: 'Log out',
        name: 'Log out',
        url: "/log-out"
      }
    ],
    projects: [
      {
        label: "Dashboard",
        url: "/",
        icon: <svg width="20" height="21" className={`!size-[1.8rem] ${path === "/" ? "!text-[#070577]" : "!text-[#344054]"}`} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 16H14M9.0177 1.764L2.23539 7.03912C1.78202 7.39175 1.55534 7.56806 1.39203 7.78886C1.24737 7.98444 1.1396 8.20478 1.07403 8.43905C1 8.70352 1 8.9907 1 9.56505V16.8C1 17.9201 1 18.4801 1.21799 18.908C1.40973 19.2843 1.71569 19.5903 2.09202 19.782C2.51984 20 3.07989 20 4.2 20H15.8C16.9201 20 17.4802 20 17.908 19.782C18.2843 19.5903 18.5903 19.2843 18.782 18.908C19 18.4801 19 17.9201 19 16.8V9.56505C19 8.9907 19 8.70352 18.926 8.43905C18.8604 8.20478 18.7526 7.98444 18.608 7.78886C18.4447 7.56806 18.218 7.39175 17.7646 7.03913L10.9823 1.764C10.631 1.49075 10.4553 1.35412 10.2613 1.3016C10.0902 1.25526 9.9098 1.25526 9.73865 1.3016C9.54468 1.35412 9.36902 1.49075 9.0177 1.764Z" stroke="#070577" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        name: 'Dashboard'
      },
      {
        label: "Users Management",
        url: "/users-management",
        icon: <Users
          className={`!size-[1.8rem] ${path.includes("users-management") ? "!text-[#070577]" : "!text-[#344054]"}`}
        />,
        name: 'Users Management'
      },
      {
        label: "Events",
        url: "/events",
        icon: <Calendar className={`!size-[1.8rem] ${path.includes("events") ? "!text-[#070577]" : "!text-[#344054]"}`} />,
        name: 'Events'
      },
      {
        label: "Ticket Sales",
        url: "/ticket-sales",
        icon: <svg width="22" height="18" className={`!size-[1.8rem] ${path.includes("ticket-sales") ? "!text-[#070577]" : "!text-[#344054]"}`} viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 5V4M7 9.5V8.5M7 14V13M5.8 17H16.2C17.8802 17 18.7202 17 19.362 16.673C19.9265 16.3854 20.3854 15.9265 20.673 15.362C21 14.7202 21 13.8802 21 12.2V5.8C21 4.11984 21 3.27976 20.673 2.63803C20.3854 2.07354 19.9265 1.6146 19.362 1.32698C18.7202 1 17.8802 1 16.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V12.2C1 13.8802 1 14.7202 1.32698 15.362C1.6146 15.9265 2.07354 16.3854 2.63803 16.673C3.27976 17 4.11984 17 5.8 17Z" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        name: 'Ticket Sales'
      },
      {
        label: "Admin Management",
        url: "/admin-management",
        icon: <UserPlus className={`!size-[1.8rem] ${path.includes("admin-management") ? "!text-[#070577]" : "!text-[#344054]"}`} />,
        name: 'Admin Management'
      },
    ],
  }

  return (
    <AppContext.Provider
      value={{
        user, navData, initialData
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
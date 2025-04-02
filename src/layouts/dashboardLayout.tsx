
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"
import React from 'react'

import SidebarHeader from '@/components/sidebar-header'
import AppProvider from '@/context/appContext'
import ToastProvider from "@/features/toast/components/toastProvider"
import { fetchAllData } from "@/lib/fetchAll"

// Set dynamic metadata for the page
export const dynamic = 'force-dynamic';

// Set revalidation settings to ensure data freshness
export const revalidate = 0; 

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://ventiz.vercel.app'
  : 'http://localhost:3000';

// `${baseURL}/api/admin`
// const auth = verifyAuth();
// fetchAllData
const appData = await fetchAllData();
// const data = await fetch(`${baseURL}/api/admin`).then(res => res.json())

console.log( appData)
  return (
    <ToastProvider>
        <AppProvider initialData={appData} >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <SidebarHeader />
              <div className="flex flex-1 flex-col gap-4 pt-0">
                <div className="flex items-center">
                  <span className="text-[1.2rem] leading-[1.6rem] hidden text-[#667085] tracking-[-0.025em]">#</span>
                  <span className="h-[.1rem] w-full block bg-[#D0D5DD] " />
                </div>
                <div className="p-[2.4rem]">
                  {children}
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </AppProvider>
    </ToastProvider>
  )
}

export default DashboardLayout
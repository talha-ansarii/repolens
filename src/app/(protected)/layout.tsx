import React from 'react'
import {SidebarProvider , SidebarTrigger} from  "@/components/ui/sidebar"
import { AppSidebar } from './dashboard/app-sidebar'

type Props = {
    children: React.ReactNode
}



const SideBarLayout = ({children} : Props) => {
  return (
    <SidebarProvider>
      <SidebarTrigger/>   
        <AppSidebar/>
        <main className='w-full m-2'>
          {/* main content */}
          <div className='border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-1rem)] p-4 '>
            {children}
          </div>
        </main>
    </SidebarProvider>
  )
}

export default SideBarLayout
import React from 'react'
import {SidebarProvider , SidebarTrigger} from  "@/components/ui/sidebar"
import { AppSidebar } from './dashboard/app-sidebar'

type Props = {
    children: React.ReactNode
}



const SideBarLayout = ({children} : Props) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-white">
        <AppSidebar/>
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header with sidebar trigger */}
          <header className="flex items-center gap-4 p-4 border-b border-slate-200/50 bg-white/80 backdrop-blur-sm">
            <SidebarTrigger className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg p-2 transition-colors"/>
            <div className="flex-1" />
          </header>
          
          {/* Main content area */}
          <main className='flex-1 overflow-auto'>
            <div className='h-full p-6'>
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default SideBarLayout
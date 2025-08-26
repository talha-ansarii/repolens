"use client"
import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import useProject from "@/hooks/use-project"
import { cn } from "@/lib/utils"
import { Bot, Github, LayoutDashboard, Plus, MessageSquare, Activity } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
    {
        title : 'Dashboard',
        url : '/dashboard',
        icon : LayoutDashboard,
        description: 'Project overview'
    },
    {
        title : 'Q&A',
        url : '/qa',
        icon : MessageSquare,
        description: 'Ask questions'
    },
]




export function AppSidebar(){
     const pathname = usePathname()
     const {open} = useSidebar()
     const {projects, selectedProjectId, setSelectedProjectId} = useProject()

    return (
        <Sidebar className="border-0 bg-gradient-to-b from-slate-50 to-white shadow-lg" collapsible="icon" variant="floating">
            {/* Modern Header */}
            <SidebarHeader className="border-b border-slate-200/50 pb-4 mb-2">
                <Link className="flex items-center gap-3 group" href={"/"}>
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg group-hover:scale-105 transition-transform">
                        <Github className="h-5 w-5 text-white" />
                    </div>
                    {open && (
                        <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            REPO LENS
                        </span>
                    )}
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-2">
                {/* Navigation Items */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {items.map(item => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link 
                                                href={item.url} 
                                                className={cn(
                                                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                                    isActive 
                                                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                                                        : "text-gray-700 hover:bg-slate-100 hover:text-gray-900"
                                                )}
                                            >
                                                <item.icon className={cn(
                                                    "h-4 w-4 transition-colors",
                                                    isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
                                                )} />
                                                <span className="truncate">{item.title}</span>
                                                {isActive && open && (
                                                    <div className="ml-auto">
                                                        <Activity className="h-3 w-3 text-white/70" />
                                                    </div>
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Projects Section */}
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Projects
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {projects?.map((project) => {
                                const isSelected = project?.id === selectedProjectId;
                                return (
                                    <SidebarMenuItem key={project.id}>
                                        <SidebarMenuButton asChild>
                                            <div 
                                                onClick={() => setSelectedProjectId?.(project.id)}
                                                className={cn(
                                                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-all duration-200",
                                                    isSelected 
                                                        ? "bg-blue-50 border border-blue-200 text-blue-900" 
                                                        : "text-gray-700 hover:bg-slate-100"
                                                )}
                                            >
                                                <div className={cn(
                                                    "flex items-center justify-center rounded-lg h-7 w-7 text-xs font-semibold transition-colors",
                                                    isSelected 
                                                        ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white" 
                                                        : "bg-gray-200 text-gray-600 group-hover:bg-gray-300"
                                                )}>
                                                    {project?.name[0].toUpperCase()}
                                                </div>
                                                <span className="truncate font-medium">{project.name}</span>
                                                {isSelected && (
                                                    <div className="ml-auto">
                                                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                            
                            {/* Create Project Button */}
                            <div className="pt-2">
                                <SidebarMenuItem>
                                    <Link href={"/create"} className="block">
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className={cn(
                                                "w-full justify-start gap-2 border-dashed border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors",
                                                !open && "px-2"
                                            )}
                                        >
                                            <Plus className="h-4 w-4" />
                                            {open && "Create Project"}
                                        </Button>
                                    </Link>
                                </SidebarMenuItem>
                            </div>
                        </SidebarMenu>
                    </SidebarGroupContent>   
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
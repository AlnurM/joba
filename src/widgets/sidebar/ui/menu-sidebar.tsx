"use client";

import * as React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  PenLine,
  Search,
  Settings,
  Link,
  User,
  LogOut,
} from "lucide-react";

import { ThemeToggle } from "@/widgets/theme";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { useAuth } from "@/entities/auth";

const navigationItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    url: "/main",
  },
  {
    title: "CV Generator",
    icon: FileText,
    url: "/main/cv-generator",
  },
  {
    title: "Cover Letter Customizer",
    icon: PenLine,
    url: "/main/cover-letter",
  },
  {
    title: "Job Search Query Builder",
    icon: Search,
    url: "/main/job-query",
  },
  {
    title: "Integrations",
    icon: Link,
    url: "/main/integrations",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/main/settings",
  },
];

export function MenuSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isActive = (url: string) => {
    if (url === "/main") {
      return pathname === url;
    }
    return pathname.startsWith(url);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Image
              src="/logo.png"
              alt="Joba Llama Logo"
              width={32}
              height={32}
            />
          </div>
          <div className="font-semibold text-lg">Joba Llama</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left text-sm">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">
                    Pro Plan
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem disabled>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logout();
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

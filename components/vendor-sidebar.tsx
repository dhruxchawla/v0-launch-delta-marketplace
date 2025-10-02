"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  Plus,
  BarChart3,
  DollarSign,
  Settings,
  Users,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard/vendor",
    icon: LayoutDashboard,
  },
  {
    name: "My Courses",
    href: "/dashboard/vendor/courses",
    icon: BookOpen,
  },
  {
    name: "Create Course",
    href: "/dashboard/vendor/courses/create",
    icon: Plus,
  },
  {
    name: "Analytics",
    href: "/dashboard/vendor/analytics",
    icon: BarChart3,
  },
  {
    name: "Earnings",
    href: "/dashboard/vendor/earnings",
    icon: DollarSign,
  },
  {
    name: "Students",
    href: "/dashboard/vendor/students",
    icon: Users,
  },
  {
    name: "Reviews",
    href: "/dashboard/vendor/reviews",
    icon: MessageSquare,
  },
  {
    name: "Settings",
    href: "/dashboard/vendor/settings",
    icon: Settings,
  },
]

interface VendorSidebarProps {
  className?: string
}

export function VendorSidebar({ className }: VendorSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn("flex flex-col h-full bg-card border-r", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div>
            <h2 className="text-lg font-semibold">Instructor Panel</h2>
            <Badge variant="secondary" className="text-xs">
              Vendor Dashboard
            </Badge>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    collapsed && "justify-center",
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

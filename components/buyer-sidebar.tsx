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
  ShoppingCart,
  History,
  Award,
  Heart,
  Settings,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { buyerService } from "@/lib/buyer"
import { useAuth } from "@/contexts/auth-context"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard/buyer",
    icon: LayoutDashboard,
  },
  {
    name: "My Courses",
    href: "/dashboard/buyer/courses",
    icon: BookOpen,
  },
  {
    name: "Shopping Cart",
    href: "/dashboard/buyer/cart",
    icon: ShoppingCart,
    badge: true,
  },
  {
    name: "Purchase History",
    href: "/dashboard/buyer/orders",
    icon: History,
  },
  {
    name: "Certificates",
    href: "/dashboard/buyer/certificates",
    icon: Award,
  },
  {
    name: "Wishlist",
    href: "/dashboard/buyer/wishlist",
    icon: Heart,
  },
  {
    name: "Progress",
    href: "/dashboard/buyer/progress",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/dashboard/buyer/settings",
    icon: Settings,
  },
]

interface BuyerSidebarProps {
  className?: string
}

export function BuyerSidebar({ className }: BuyerSidebarProps) {
  const pathname = usePathname()
  const { user } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const cartItems = buyerService.getCartItems(user?.id || "")

  return (
    <div className={cn("flex flex-col h-full bg-card border-r", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div>
            <h2 className="text-lg font-semibold">Learning Hub</h2>
            <Badge variant="secondary" className="text-xs">
              Student Dashboard
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
            const showBadge = item.badge && cartItems.length > 0

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors relative",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    collapsed && "justify-center",
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                  {showBadge && !collapsed && (
                    <Badge variant="destructive" className="ml-auto text-xs">
                      {cartItems.length}
                    </Badge>
                  )}
                  {showBadge && collapsed && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                      {cartItems.length}
                    </Badge>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

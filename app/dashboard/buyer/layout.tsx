"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { BuyerSidebar } from "@/components/buyer-sidebar"
import { Loader2 } from "lucide-react"

export default function BuyerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/signin")
      } else if (user.role !== "buyer") {
        router.push("/dashboard/vendor")
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user || user.role !== "buyer") {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <BuyerSidebar className="w-64 flex-shrink-0" />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

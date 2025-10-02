"use client"

import { ShoppingCartIcon, UserIcon, SettingsIcon, LogOutIcon, MenuIcon } from "@/components/simple-icons"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"

export function Header() {
  const { user, isAuthenticated, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.href = "/"
    } catch (error) {
      console.error("Sign out failed:", error)
    }
  }

  const navigationItems = [
    { href: "/courses", label: "Browse Courses" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/signup", label: "Teach & Earn" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Launch Delta" width={400} height={100} className="h-22 w-auto" />
            </Link>
            <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
              Trusted by 10K+
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-gray-700 hover:text-teal-600 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            {user?.role === "vendor" && (
              <Link
                href="/dashboard/vendor"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Instructor Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {user?.role === "buyer" && (
              <Link
                href="/dashboard/buyer/cart"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 border rounded-md hover:bg-gray-50"
              >
                <ShoppingCartIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border z-50">
                    <div className="p-4 border-b">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {user?.role === "vendor" ? "Instructor" : "Student"}
                      </span>
                    </div>
                    <div className="py-2">
                      <Link
                        href={user?.role === "vendor" ? "/dashboard/vendor" : "/dashboard/buyer"}
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <UserIcon className="h-4 w-4" />
                        <span className="ml-2">Dashboard</span>
                      </Link>
                      <Link
                        href={user?.role === "vendor" ? "/dashboard/vendor/settings" : "/dashboard/buyer/settings"}
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <SettingsIcon className="h-4 w-4" />
                        <span className="ml-2">Settings</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50 text-left"
                      >
                        <LogOutIcon className="h-4 w-4" />
                        <span className="ml-2">Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-md hover:bg-gray-50 transition-colors"
                >
                  <UserIcon className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 transition-colors py-3 px-2 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user?.role === "vendor" && (
              <Link
                href="/dashboard/vendor"
                className="block text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-gray-50 transition-colors py-3 px-2 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Instructor Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

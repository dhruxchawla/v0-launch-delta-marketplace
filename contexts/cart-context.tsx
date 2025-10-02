"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem } from "@/lib/buyer"

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (courseId: string, courseData: Omit<CartItem, "courseId" | "addedAt">) => void
  removeFromCart: (courseId: string) => void
  clearCart: () => void
  getCartCount: () => number
  getCartTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from session storage:", error)
      }
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (courseId: string, courseData: Omit<CartItem, "courseId" | "addedAt">) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.courseId === courseId)
      if (existingItem) {
        return prev // Item already in cart
      }
      return [
        ...prev,
        {
          courseId,
          ...courseData,
          addedAt: new Date().toISOString(),
        },
      ]
    })
  }

  const removeFromCart = (courseId: string) => {
    setCartItems((prev) => prev.filter((item) => item.courseId !== courseId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartCount = () => cartItems.length

  const getCartTotal = () => cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

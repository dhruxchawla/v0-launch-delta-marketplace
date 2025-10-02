"use client"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCartIcon, StarIcon, TrashIcon, CreditCardIcon } from "@/components/simple-icons"

export default function CartPage() {
  const { user } = useAuth()
  const { cartItems: items, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart()

  const handleCheckout = () => {
    alert("Purchase successful! Check your enrolled courses.")
    clearCart()
  }

  const subtotal = getCartTotal()
  const itemCount = getCartCount()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600">Review your selected courses before checkout</p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <ShoppingCartIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Your cart is empty</h3>
          <p className="text-gray-600 mb-4">Browse our courses and add them to your cart to get started</p>
          <Link
            href="/courses"
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Cart Items ({itemCount})</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <Image
                        src={item.thumbnail || "/placeholder.svg?height=80&width=120&query=course thumbnail"}
                        alt={item.title}
                        width={120}
                        height={80}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">By {item.instructor}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-700">4.8</span>
                            <span className="text-sm text-gray-500">(1,234 reviews)</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-teal-600">${item.price}</span>
                          {item.originalPrice && (
                            <>
                              <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg sticky top-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between font-semibold text-lg text-gray-900">
                      <span>Total:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                  >
                    <CreditCardIcon className="h-4 w-4" />
                    Proceed to Checkout
                  </button>
                  <Link
                    href="/courses"
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <div className="text-center text-sm text-gray-600 space-y-1">
                  <p>30-day money-back guarantee</p>
                  <p>Lifetime access to purchased courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

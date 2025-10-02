"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { pricingPlans } from "@/lib/pricing"
import { useAuth } from "@/contexts/auth-context"

export default function PricingPage() {
  const { user } = useAuth()
  const [isYearly, setIsYearly] = useState(false)

  const getDisplayPrice = (plan: (typeof pricingPlans)[0]) => {
    if (plan.interval === "lifetime") return plan.price
    if (isYearly && plan.interval === "monthly") {
      return Math.round(plan.price * 12 * 0.8) // 20% discount for yearly
    }
    return plan.price
  }

  const getDisplayInterval = (plan: (typeof pricingPlans)[0]) => {
    if (plan.interval === "lifetime") return "one-time"
    return isYearly ? "year" : "month"
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Choose Your Learning Path</h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Unlock your cybersecurity potential with our comprehensive training programs. From beginner to expert, we
            have the right plan for you.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? "font-semibold text-slate-900" : "text-slate-600"}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? "bg-teal-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? "font-semibold text-slate-900" : "text-slate-600"}`}>
              Yearly
              <span className="ml-2 bg-slate-200 text-slate-700 px-2 py-1 rounded text-xs">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {pricingPlans.map((plan) => {
            const displayPrice = getDisplayPrice(plan)
            const displayInterval = getDisplayInterval(plan)
            const savings = plan.originalPrice ? plan.originalPrice - displayPrice : 0

            return (
              <div
                key={plan.id}
                className={`relative overflow-hidden bg-white border rounded-lg p-6 ${
                  plan.popular ? "border-teal-500 shadow-lg scale-105" : "border-slate-200"
                } hover:shadow-lg transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-teal-600 text-white text-center py-2 text-sm font-medium">
                    <Icons.Star className="inline h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                )}

                <div className={`text-center ${plan.popular ? "pt-8" : "pt-2"}`}>
                  <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-slate-600 text-sm mt-2">{plan.description}</p>
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-slate-900">${displayPrice}</span>
                      <span className="text-slate-600">/{displayInterval}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-sm text-slate-500 line-through">${plan.originalPrice}</span>
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Save ${savings}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icons.Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={user ? `/checkout?plan=${plan.id}&interval=${isYearly ? "yearly" : "monthly"}` : "/signup"}
                    className={`block w-full text-center py-2 px-4 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? "bg-teal-600 text-white hover:bg-teal-700"
                        : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">Compare Features</h2>
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left p-4 font-semibold text-slate-900">Features</th>
                    {pricingPlans.map((plan) => (
                      <th key={plan.id} className="text-center p-4 font-semibold text-slate-900 min-w-32">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="p-4 text-slate-700">Course Access</td>
                    <td className="text-center p-4 text-slate-600">5 per month</td>
                    <td className="text-center p-4 text-slate-600">Unlimited</td>
                    <td className="text-center p-4 text-slate-600">Unlimited</td>
                    <td className="text-center p-4 text-slate-600">Unlimited</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-4 text-slate-700">Certificates</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-4 text-slate-700">Priority Support</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-4 text-slate-700">Live Webinars</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-slate-700">Team Management</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">❌</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Icons.Users className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">10,000+ Students</h3>
            <p className="text-slate-600">Join thousands of cybersecurity professionals advancing their careers</p>
          </div>
          <div className="text-center">
            <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Icons.Shield className="h-8 w-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">Industry Certified</h3>
            <p className="text-slate-600">Courses aligned with industry standards and certifications</p>
          </div>
          <div className="text-center">
            <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Icons.Zap className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">30-Day Guarantee</h3>
            <p className="text-slate-600">Not satisfied? Get your money back within 30 days</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Frequently Asked Questions</h2>
          <p className="text-slate-600 mb-8">
            Have questions? Check out our{" "}
            <Link href="/faq" className="text-teal-600 hover:underline">
              FAQ page
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-teal-600 hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

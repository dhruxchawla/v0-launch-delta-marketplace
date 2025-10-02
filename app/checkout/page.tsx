"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, CreditCard, Shield, Lock } from "lucide-react"
import { pricingService, paymentMethods, type CheckoutData } from "@/lib/pricing"
import { useAuth } from "@/contexts/auth-context"

export default function CheckoutPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const planId = searchParams.get("plan")
  const interval = searchParams.get("interval") || "monthly"
  const plan = planId ? pricingService.getPlan(planId) : null

  const [formData, setFormData] = useState<CheckoutData>({
    planId: planId || undefined,
    paymentMethod: "credit_card",
    billingInfo: {
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ").slice(1).join(" ") || "",
      email: user?.email || "",
      company: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
    },
    paymentInfo: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    },
  })

  useEffect(() => {
    if (!user) {
      router.push("/signin?redirect=/checkout")
    }
  }, [user, router])

  const handleInputChange = (section: keyof CheckoutData, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const calculatePrice = () => {
    if (!plan) return 0
    if (interval === "yearly" && plan.interval === "monthly") {
      return Math.round(plan.price * 12 * 0.8) // 20% discount
    }
    return plan.price
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validate required fields
      const { billingInfo, paymentInfo } = formData
      if (!billingInfo.firstName || !billingInfo.lastName || !billingInfo.email) {
        throw new Error("Please fill in all required billing information")
      }

      if (formData.paymentMethod === "credit_card") {
        if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
          throw new Error("Please fill in all required payment information")
        }
      }

      const result = await pricingService.processPayment(formData)

      if (result.success) {
        router.push(`/checkout/success?transaction=${result.transactionId}`)
      } else {
        setError(result.error || "Payment failed")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Plan Not Found</h1>
          <p className="text-muted-foreground mb-4">The selected plan could not be found.</p>
          <Button asChild>
            <a href="/pricing">View Pricing Plans</a>
          </Button>
        </div>
      </div>
    )
  }

  const finalPrice = calculatePrice()
  const savings = interval === "yearly" && plan.interval === "monthly" ? plan.price * 12 - finalPrice : 0

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
            <p className="text-muted-foreground">Secure checkout powered by industry-standard encryption</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Billing Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.billingInfo.firstName}
                          onChange={(e) => handleInputChange("billingInfo", "firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.billingInfo.lastName}
                          onChange={(e) => handleInputChange("billingInfo", "lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.billingInfo.email}
                        onChange={(e) => handleInputChange("billingInfo", "email", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        value={formData.billingInfo.company}
                        onChange={(e) => handleInputChange("billingInfo", "company", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={formData.billingInfo.address}
                        onChange={(e) => handleInputChange("billingInfo", "address", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.billingInfo.city}
                          onChange={(e) => handleInputChange("billingInfo", "city", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={formData.billingInfo.state}
                          onChange={(e) => handleInputChange("billingInfo", "state", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={formData.billingInfo.zipCode}
                          onChange={(e) => handleInputChange("billingInfo", "zipCode", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Select
                        value={formData.billingInfo.country}
                        onValueChange={(value) => handleInputChange("billingInfo", "country", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                          <SelectItem value="DE">Germany</SelectItem>
                          <SelectItem value="FR">France</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                    >
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label htmlFor={method.id} className="flex items-center gap-3 cursor-pointer flex-1">
                            <span className="text-2xl">{method.icon}</span>
                            <div>
                              <div className="font-medium">{method.name}</div>
                              <div className="text-sm text-muted-foreground">{method.description}</div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {formData.paymentMethod === "credit_card" && (
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="cardholderName">Cardholder Name *</Label>
                          <Input
                            id="cardholderName"
                            value={formData.paymentInfo.cardholderName}
                            onChange={(e) => handleInputChange("paymentInfo", "cardholderName", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.paymentInfo.cardNumber}
                            onChange={(e) => handleInputChange("paymentInfo", "cardNumber", e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={formData.paymentInfo.expiryDate}
                              onChange={(e) => handleInputChange("paymentInfo", "expiryDate", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={formData.paymentInfo.cvv}
                              onChange={(e) => handleInputChange("paymentInfo", "cvv", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <CreditCard className="mr-2 h-4 w-4" />
                  Complete Purchase - ${finalPrice}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{plan.name} Plan</div>
                        <div className="text-sm text-muted-foreground">
                          {interval === "yearly" ? "Annual" : "Monthly"} billing
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${finalPrice}</div>
                        {savings > 0 && <div className="text-sm text-green-600">Save ${savings}</div>}
                      </div>
                    </div>

                    {savings > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Monthly price:</span>
                        <span className="line-through text-muted-foreground">${plan.price * 12}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${finalPrice}</span>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Secure payment processing</span>
                    </div>
                  </div>

                  {interval === "yearly" && (
                    <Badge variant="secondary" className="w-full justify-center">
                      🎉 You're saving ${savings} with annual billing!
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

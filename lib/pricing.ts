export interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  interval: "monthly" | "yearly" | "lifetime"
  features: string[]
  popular?: boolean
  cta: string
  maxCourses?: number
  certificatesIncluded: boolean
  prioritySupport: boolean
  downloadableResources: boolean
  liveWebinars: boolean
}

export interface PaymentMethod {
  id: string
  type: "credit_card" | "paypal" | "bank_transfer"
  name: string
  icon: string
  description: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for beginners starting their cybersecurity journey",
    price: 29,
    interval: "monthly",
    features: [
      "Access to 5 courses per month",
      "Basic course materials",
      "Community forum access",
      "Email support",
      "Mobile app access",
      "Basic progress tracking",
    ],
    maxCourses: 5,
    certificatesIncluded: false,
    prioritySupport: false,
    downloadableResources: false,
    liveWebinars: false,
    cta: "Start Learning",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for professionals advancing their cybersecurity skills",
    price: 79,
    originalPrice: 99,
    interval: "monthly",
    features: [
      "Unlimited course access",
      "All course materials & resources",
      "Certificates of completion",
      "Priority email support",
      "Downloadable resources",
      "Advanced progress analytics",
      "Career guidance sessions",
      "Industry networking events",
    ],
    popular: true,
    certificatesIncluded: true,
    prioritySupport: true,
    downloadableResources: true,
    liveWebinars: false,
    cta: "Go Professional",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Complete solution for teams and organizations",
    price: 199,
    interval: "monthly",
    features: [
      "Everything in Professional",
      "Team management dashboard",
      "Custom learning paths",
      "Live webinars & workshops",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced reporting & analytics",
      "White-label options",
      "24/7 phone support",
    ],
    certificatesIncluded: true,
    prioritySupport: true,
    downloadableResources: true,
    liveWebinars: true,
    cta: "Contact Sales",
  },
  {
    id: "lifetime",
    name: "Lifetime Access",
    description: "One-time payment for lifetime access to all courses",
    price: 999,
    originalPrice: 1499,
    interval: "lifetime",
    features: [
      "Lifetime access to all courses",
      "All future course releases",
      "Premium certificates",
      "Priority support for life",
      "Exclusive member community",
      "Annual live masterclasses",
      "Career coaching sessions",
      "Industry expert mentorship",
    ],
    popular: false,
    certificatesIncluded: true,
    prioritySupport: true,
    downloadableResources: true,
    liveWebinars: true,
    cta: "Get Lifetime Access",
  },
]

export const paymentMethods: PaymentMethod[] = [
  {
    id: "credit_card",
    type: "credit_card",
    name: "Credit/Debit Card",
    icon: "💳",
    description: "Visa, Mastercard, American Express",
  },
  {
    id: "paypal",
    type: "paypal",
    name: "PayPal",
    icon: "🅿️",
    description: "Pay with your PayPal account",
  },
  {
    id: "bank_transfer",
    type: "bank_transfer",
    name: "Bank Transfer",
    icon: "🏦",
    description: "Direct bank transfer",
  },
]

export interface CheckoutData {
  planId?: string
  courseIds?: string[]
  paymentMethod: string
  billingInfo: {
    firstName: string
    lastName: string
    email: string
    company?: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentInfo: {
    cardNumber?: string
    expiryDate?: string
    cvv?: string
    cardholderName?: string
  }
}

export const pricingService = {
  getPlan(planId: string): PricingPlan | undefined {
    return pricingPlans.find((plan) => plan.id === planId)
  },

  calculateTotal(planId?: string, courseIds?: string[]): number {
    let total = 0

    if (planId) {
      const plan = this.getPlan(planId)
      if (plan) total += plan.price
    }

    if (courseIds && courseIds.length > 0) {
      // Mock course prices - in real app, would fetch from course service
      total += courseIds.length * 99.99
    }

    return total
  },

  processPayment(checkoutData: CheckoutData): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    // Simulate payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 95% success rate
        const success = Math.random() > 0.05

        if (success) {
          resolve({
            success: true,
            transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          })
        } else {
          resolve({
            success: false,
            error: "Payment failed. Please check your payment information and try again.",
          })
        }
      }, 2000) // Simulate processing time
    })
  },
}

export interface EnrolledCourse {
  id: string
  courseId: string
  title: string
  instructor: string
  thumbnail: string
  progress: number
  lastAccessed: string
  completedLessons: number
  totalLessons: number
  certificate?: {
    issued: boolean
    issuedDate?: string
    certificateUrl?: string
  }
  purchaseDate: string
  price: number
}

export interface CartItem {
  courseId: string
  title: string
  instructor: string
  thumbnail: string
  price: number
  originalPrice?: number
  addedAt: string
}

export interface Purchase {
  id: string
  courseId: string
  title: string
  instructor: string
  price: number
  purchaseDate: string
  status: "completed" | "pending" | "failed"
  paymentMethod: string
}

export interface BuyerStats {
  totalCoursesEnrolled: number
  totalCoursesCompleted: number
  totalHoursLearned: number
  certificatesEarned: number
  averageProgress: number
  currentStreak: number
  totalSpent: number
}

// Mock data
export const mockEnrolledCourses: EnrolledCourse[] = [
  {
    id: "ec-1",
    courseId: "1",
    title: "Complete Ethical Hacking Bootcamp",
    instructor: "Sarah Wilson",
    thumbnail: "/ethical-hacking-course.png",
    progress: 65,
    lastAccessed: "2024-01-25",
    completedLessons: 101,
    totalLessons: 156,
    purchaseDate: "2023-12-15",
    price: 89.99,
  },
  {
    id: "ec-2",
    courseId: "2",
    title: "Advanced Network Security & Firewall Management",
    instructor: "Michael Chen",
    thumbnail: "/network-security-firewall.png",
    progress: 30,
    lastAccessed: "2024-01-20",
    completedLessons: 37,
    totalLessons: 124,
    purchaseDate: "2024-01-10",
    price: 129.99,
  },
  {
    id: "ec-3",
    courseId: "3",
    title: "Cybersecurity Incident Response & Forensics",
    instructor: "Dr. Emily Rodriguez",
    thumbnail: "/cybersecurity-forensics.png",
    progress: 100,
    lastAccessed: "2024-01-15",
    completedLessons: 98,
    totalLessons: 98,
    certificate: {
      issued: true,
      issuedDate: "2024-01-15",
      certificateUrl: "/certificates/incident-response-cert.pdf",
    },
    purchaseDate: "2023-11-20",
    price: 149.99,
  },
]

export const mockCartItems: CartItem[] = [
  {
    courseId: "4",
    title: "Cloud Security Essentials - AWS & Azure",
    instructor: "James Thompson",
    thumbnail: "/cloud-security-aws-azure.png",
    price: 99.99,
    originalPrice: 179.99,
    addedAt: "2024-01-24",
  },
]

export const mockPurchases: Purchase[] = [
  {
    id: "p-1",
    courseId: "1",
    title: "Complete Ethical Hacking Bootcamp",
    instructor: "Sarah Wilson",
    price: 89.99,
    purchaseDate: "2023-12-15",
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "p-2",
    courseId: "2",
    title: "Advanced Network Security & Firewall Management",
    instructor: "Michael Chen",
    price: 129.99,
    purchaseDate: "2024-01-10",
    status: "completed",
    paymentMethod: "PayPal",
  },
  {
    id: "p-3",
    courseId: "3",
    title: "Cybersecurity Incident Response & Forensics",
    instructor: "Dr. Emily Rodriguez",
    price: 149.99,
    purchaseDate: "2023-11-20",
    status: "completed",
    paymentMethod: "Credit Card",
  },
]

export const buyerService = {
  getBuyerStats(buyerId: string): BuyerStats {
    const enrolledCourses = mockEnrolledCourses
    const completedCourses = enrolledCourses.filter((course) => course.progress === 100)
    const totalProgress = enrolledCourses.reduce((sum, course) => sum + course.progress, 0)

    return {
      totalCoursesEnrolled: enrolledCourses.length,
      totalCoursesCompleted: completedCourses.length,
      totalHoursLearned: 127, // Mock data
      certificatesEarned: enrolledCourses.filter((course) => course.certificate?.issued).length,
      averageProgress: enrolledCourses.length > 0 ? Math.round(totalProgress / enrolledCourses.length) : 0,
      currentStreak: 7, // Mock data
      totalSpent: mockPurchases.reduce((sum, purchase) => sum + purchase.price, 0),
    }
  },

  getEnrolledCourses(buyerId: string): EnrolledCourse[] {
    return mockEnrolledCourses
  },

  getCartItems(buyerId: string): CartItem[] {
    return mockCartItems
  },

  getPurchaseHistory(buyerId: string): Purchase[] {
    return mockPurchases
  },

  addToCart(buyerId: string, courseId: string, courseData: Omit<CartItem, "courseId" | "addedAt">): void {
    const existingItem = mockCartItems.find((item) => item.courseId === courseId)
    if (!existingItem) {
      mockCartItems.push({
        courseId,
        ...courseData,
        addedAt: new Date().toISOString(),
      })
    }
  },

  removeFromCart(buyerId: string, courseId: string): void {
    const index = mockCartItems.findIndex((item) => item.courseId === courseId)
    if (index > -1) {
      mockCartItems.splice(index, 1)
    }
  },

  clearCart(buyerId: string): void {
    mockCartItems.length = 0
  },

  purchaseCourse(buyerId: string, courseId: string, paymentMethod: string): Purchase {
    const cartItem = mockCartItems.find((item) => item.courseId === courseId)
    if (!cartItem) throw new Error("Course not found in cart")

    const purchase: Purchase = {
      id: `p-${Date.now()}`,
      courseId,
      title: cartItem.title,
      instructor: cartItem.instructor,
      price: cartItem.price,
      purchaseDate: new Date().toISOString(),
      status: "completed",
      paymentMethod,
    }

    // Add to purchases
    mockPurchases.push(purchase)

    // Add to enrolled courses
    const enrolledCourse: EnrolledCourse = {
      id: `ec-${Date.now()}`,
      courseId,
      title: cartItem.title,
      instructor: cartItem.instructor,
      thumbnail: cartItem.thumbnail,
      progress: 0,
      lastAccessed: new Date().toISOString(),
      completedLessons: 0,
      totalLessons: 100, // Mock data
      purchaseDate: new Date().toISOString(),
      price: cartItem.price,
    }

    mockEnrolledCourses.push(enrolledCourse)

    // Remove from cart
    this.removeFromCart(buyerId, courseId)

    return purchase
  },
}

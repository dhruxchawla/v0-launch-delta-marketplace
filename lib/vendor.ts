export interface VendorCourse {
  id: string
  title: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  status: "draft" | "published" | "archived"
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
  thumbnail?: string
  lessons: number
  duration: string
  studentsEnrolled: number
  totalEarnings: number
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
}

export interface VendorStats {
  totalCourses: number
  totalStudents: number
  totalEarnings: number
  averageRating: number
  coursesPublished: number
  coursesDraft: number
  monthlyEarnings: number
  monthlyStudents: number
}

// Mock vendor courses data
export const mockVendorCourses: VendorCourse[] = [
  {
    id: "vc-1",
    title: "Complete Ethical Hacking Bootcamp",
    description: "Master ethical hacking from scratch with hands-on labs and real-world scenarios.",
    shortDescription: "Comprehensive ethical hacking course with hands-on labs.",
    price: 89.99,
    originalPrice: 199.99,
    status: "published",
    category: "Ethical Hacking",
    level: "Beginner",
    tags: ["Penetration Testing", "Kali Linux", "Network Security"],
    thumbnail: "/ethical-hacking-course.png",
    lessons: 156,
    duration: "42 hours",
    studentsEnrolled: 8543,
    totalEarnings: 768369.57,
    rating: 4.8,
    reviewCount: 1247,
    createdAt: "2023-08-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "vc-2",
    title: "Advanced Web Application Security",
    description: "Deep dive into web application security testing and vulnerability assessment.",
    shortDescription: "Advanced web security testing and vulnerability assessment.",
    price: 129.99,
    status: "published",
    category: "Web Security",
    level: "Advanced",
    tags: ["OWASP", "SQL Injection", "XSS", "Security Testing"],
    thumbnail: "/web-security-course.png",
    lessons: 98,
    duration: "28 hours",
    studentsEnrolled: 3421,
    totalEarnings: 444629.79,
    rating: 4.9,
    reviewCount: 567,
    createdAt: "2023-10-20",
    updatedAt: "2024-01-10",
  },
  {
    id: "vc-3",
    title: "Mobile Security Fundamentals",
    description: "Learn mobile application security for iOS and Android platforms.",
    shortDescription: "Mobile app security for iOS and Android platforms.",
    price: 99.99,
    status: "draft",
    category: "Mobile Security",
    level: "Intermediate",
    tags: ["iOS Security", "Android Security", "Mobile Testing"],
    lessons: 67,
    duration: "18 hours",
    studentsEnrolled: 0,
    totalEarnings: 0,
    rating: 0,
    reviewCount: 0,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-25",
  },
]

export const vendorService = {
  getVendorCourses(vendorId: string): VendorCourse[] {
    // In a real app, this would filter by vendorId
    return mockVendorCourses
  },

  getVendorStats(vendorId: string): VendorStats {
    const courses = this.getVendorCourses(vendorId)
    const publishedCourses = courses.filter((c) => c.status === "published")

    return {
      totalCourses: courses.length,
      totalStudents: courses.reduce((sum, course) => sum + course.studentsEnrolled, 0),
      totalEarnings: courses.reduce((sum, course) => sum + course.totalEarnings, 0),
      averageRating:
        publishedCourses.length > 0
          ? publishedCourses.reduce((sum, course) => sum + course.rating, 0) / publishedCourses.length
          : 0,
      coursesPublished: publishedCourses.length,
      coursesDraft: courses.filter((c) => c.status === "draft").length,
      monthlyEarnings: 12450.75, // Mock monthly earnings
      monthlyStudents: 234, // Mock monthly new students
    }
  },

  createCourse(courseData: Partial<VendorCourse>): VendorCourse {
    const newCourse: VendorCourse = {
      id: `vc-${Date.now()}`,
      title: courseData.title || "Untitled Course",
      description: courseData.description || "",
      shortDescription: courseData.shortDescription || "",
      price: courseData.price || 0,
      originalPrice: courseData.originalPrice,
      status: "draft",
      category: courseData.category || "General",
      level: courseData.level || "Beginner",
      tags: courseData.tags || [],
      thumbnail: courseData.thumbnail,
      lessons: courseData.lessons || 0,
      duration: courseData.duration || "0 hours",
      studentsEnrolled: 0,
      totalEarnings: 0,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockVendorCourses.push(newCourse)
    return newCourse
  },

  updateCourse(courseId: string, updates: Partial<VendorCourse>): VendorCourse | null {
    const courseIndex = mockVendorCourses.findIndex((c) => c.id === courseId)
    if (courseIndex === -1) return null

    mockVendorCourses[courseIndex] = {
      ...mockVendorCourses[courseIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return mockVendorCourses[courseIndex]
  },

  deleteCourse(courseId: string): boolean {
    const courseIndex = mockVendorCourses.findIndex((c) => c.id === courseId)
    if (courseIndex === -1) return false

    mockVendorCourses.splice(courseIndex, 1)
    return true
  },
}

export interface Course {
  id: string
  title: string
  description: string
  shortDescription: string
  instructor: {
    id: string
    name: string
    avatar?: string
    rating: number
    studentsCount: number
  }
  price: number
  originalPrice?: number
  rating: number
  studentsCount: number
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  tags: string[]
  thumbnail: string
  videoPreview?: string
  lessons: number
  lastUpdated: string
  language: string
  certificate: boolean
  features: string[]
  curriculum: {
    section: string
    lessons: {
      title: string
      duration: string
      preview?: boolean
    }[]
  }[]
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete Ethical Hacking Bootcamp",
    description:
      "Master ethical hacking from scratch with hands-on labs, real-world scenarios, and industry-standard tools. Learn penetration testing, vulnerability assessment, and security auditing.",
    shortDescription: "Comprehensive ethical hacking course with hands-on labs and real-world scenarios.",
    instructor: {
      id: "inst-1",
      name: "Sarah Wilson",
      avatar: "/instructor-teaching.png",
      rating: 4.9,
      studentsCount: 15420,
    },
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.8,
    studentsCount: 8543,
    duration: "42 hours",
    level: "Beginner",
    category: "Ethical Hacking",
    tags: ["Penetration Testing", "Kali Linux", "Network Security", "Web Security"],
    thumbnail: "/ethical-hacking-course.png",
    lessons: 156,
    lastUpdated: "2024-01-15",
    language: "English",
    certificate: true,
    features: [
      "42 hours of video content",
      "156 hands-on lessons",
      "Real-world lab environments",
      "Certificate of completion",
      "Lifetime access",
      "30-day money-back guarantee",
    ],
    curriculum: [
      {
        section: "Introduction to Ethical Hacking",
        lessons: [
          { title: "What is Ethical Hacking?", duration: "15:30" },
          { title: "Setting up Kali Linux", duration: "22:45", preview: true },
          { title: "Legal and Ethical Considerations", duration: "18:20" },
        ],
      },
      {
        section: "Reconnaissance and Information Gathering",
        lessons: [
          { title: "Passive Information Gathering", duration: "25:10" },
          { title: "Active Information Gathering", duration: "30:45" },
          { title: "Social Engineering Basics", duration: "20:15" },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Advanced Network Security & Firewall Management",
    description:
      "Deep dive into network security architecture, firewall configuration, intrusion detection systems, and advanced threat protection mechanisms.",
    shortDescription: "Advanced network security course covering firewalls, IDS, and threat protection.",
    instructor: {
      id: "inst-2",
      name: "Michael Chen",
      avatar: "/male-instructor.png",
      rating: 4.7,
      studentsCount: 12300,
    },
    price: 129.99,
    originalPrice: 249.99,
    rating: 4.9,
    studentsCount: 5621,
    duration: "38 hours",
    level: "Advanced",
    category: "Network Security",
    tags: ["Firewalls", "IDS/IPS", "Network Architecture", "Threat Detection"],
    thumbnail: "/network-security-firewall.png",
    lessons: 124,
    lastUpdated: "2024-01-20",
    language: "English",
    certificate: true,
    features: [
      "38 hours of expert content",
      "124 practical lessons",
      "Virtual lab access",
      "Industry certification prep",
      "Expert instructor support",
      "Real-world case studies",
    ],
    curriculum: [
      {
        section: "Network Security Fundamentals",
        lessons: [
          { title: "Network Security Architecture", duration: "28:15" },
          { title: "Common Network Vulnerabilities", duration: "22:30", preview: true },
          { title: "Security Protocols Overview", duration: "25:45" },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Cybersecurity Incident Response & Forensics",
    description:
      "Learn to handle security incidents, conduct digital forensics investigations, and implement effective incident response procedures.",
    shortDescription: "Master incident response and digital forensics with practical scenarios.",
    instructor: {
      id: "inst-3",
      name: "Dr. Emily Rodriguez",
      avatar: "/female-doctor-instructor.png",
      rating: 4.8,
      studentsCount: 9800,
    },
    price: 149.99,
    rating: 4.7,
    studentsCount: 3245,
    duration: "35 hours",
    level: "Intermediate",
    category: "Incident Response",
    tags: ["Digital Forensics", "Incident Handling", "Malware Analysis", "Evidence Collection"],
    thumbnail: "/cybersecurity-forensics.png",
    lessons: 98,
    lastUpdated: "2024-01-10",
    language: "English",
    certificate: true,
    features: [
      "35 hours of specialized content",
      "98 detailed lessons",
      "Forensics tool training",
      "Real incident simulations",
      "Industry best practices",
      "Professional certification",
    ],
    curriculum: [
      {
        section: "Incident Response Fundamentals",
        lessons: [
          { title: "Incident Response Framework", duration: "20:30" },
          { title: "Building an IR Team", duration: "18:45", preview: true },
          { title: "Communication Protocols", duration: "15:20" },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Cloud Security Essentials - AWS & Azure",
    description:
      "Comprehensive guide to securing cloud environments on AWS and Azure platforms with hands-on configuration and best practices.",
    shortDescription: "Essential cloud security for AWS and Azure with practical configurations.",
    instructor: {
      id: "inst-4",
      name: "James Thompson",
      avatar: "/instructor-cloud-expert.png",
      rating: 4.6,
      studentsCount: 11200,
    },
    price: 99.99,
    originalPrice: 179.99,
    rating: 4.6,
    studentsCount: 6789,
    duration: "28 hours",
    level: "Intermediate",
    category: "Cloud Security",
    tags: ["AWS Security", "Azure Security", "Cloud Architecture", "IAM"],
    thumbnail: "/cloud-security-aws-azure.png",
    lessons: 87,
    lastUpdated: "2024-01-25",
    language: "English",
    certificate: true,
    features: [
      "28 hours of cloud content",
      "87 practical lessons",
      "AWS & Azure labs",
      "Security best practices",
      "Hands-on projects",
      "Industry recognition",
    ],
    curriculum: [
      {
        section: "Cloud Security Fundamentals",
        lessons: [
          { title: "Cloud Security Models", duration: "22:15" },
          { title: "AWS Security Overview", duration: "25:30", preview: true },
          { title: "Azure Security Basics", duration: "20:45" },
        ],
      },
    ],
  },
]

export const categories = [
  "All Categories",
  "Ethical Hacking",
  "Network Security",
  "Incident Response",
  "Cloud Security",
  "Web Security",
  "Mobile Security",
  "Cryptography",
  "Compliance & Governance",
]

export const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]

export const courseService = {
  getAllCourses(): Course[] {
    return mockCourses
  },

  getCourseById(id: string): Course | undefined {
    return mockCourses.find((course) => course.id === id)
  },

  searchCourses(query: string, category?: string, level?: string, maxPrice?: number): Course[] {
    let filtered = mockCourses

    if (query) {
      const searchTerm = query.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm) ||
          course.description.toLowerCase().includes(searchTerm) ||
          course.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          course.instructor.name.toLowerCase().includes(searchTerm),
      )
    }

    if (category && category !== "All Categories") {
      filtered = filtered.filter((course) => course.category === category)
    }

    if (level && level !== "All Levels") {
      filtered = filtered.filter((course) => course.level === level)
    }

    if (maxPrice) {
      filtered = filtered.filter((course) => course.price <= maxPrice)
    }

    return filtered
  },

  getFeaturedCourses(): Course[] {
    return mockCourses.slice(0, 3)
  },
}

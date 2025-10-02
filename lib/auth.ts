export interface User {
  id: string
  email: string
  name: string
  role: "buyer" | "vendor"
  avatar?: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Mock user database - in production this would be a real database
const mockUsers: User[] = [
  {
    id: "1",
    email: "john@example.com",
    name: "John Doe",
    role: "buyer",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "instructor@example.com",
    name: "Sarah Wilson",
    role: "vendor",
    createdAt: new Date().toISOString(),
  },
]

export const authService = {
  async signIn(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === email)
    if (!user || password !== "password123") {
      throw new Error("Invalid credentials")
    }

    return user
  },

  async signUp(email: string, password: string, name: string, role: "buyer" | "vendor"): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (mockUsers.find((u) => u.email === email)) {
      throw new Error("User already exists")
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)
    return newUser
  },

  async signOut(): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
  },

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const userData = localStorage.getItem("user")
    return userData ? JSON.parse(userData) : null
  },

  setCurrentUser(user: User | null): void {
    if (typeof window === "undefined") return
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const userIndex = mockUsers.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates }
    return mockUsers[userIndex]
  },
}

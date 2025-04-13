"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing user from localStorage:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call to authenticate
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // })
    // const data = await response.json()

    // Simulate API call for demonstration
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful login
    if (email && password) {
      const mockUser = {
        id: "user_123",
        name: "John Doe",
        email: email,
      }
      setUser(mockUser)
      return
    }

    throw new Error("Invalid credentials")
  }

  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would be an API call to register
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, password }),
    // })
    // const data = await response.json()

    // Simulate API call for demonstration
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful registration
    if (name && email && password) {
      // In a real app, we would typically log the user in after registration
      // or redirect them to login
      return
    }

    throw new Error("Registration failed")
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

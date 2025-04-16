"use client"

import type React from "react"
import { createContext, useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { generateQRCode } from "@/lib/qr-code"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/types"

type AuthContextType = {
  user: User | null
  login: () => void
  logout: () => void
  openAuthModal: () => void
  isLoading: boolean
  register: (userData: Omit<User, "id" | "ticketId">) => Promise<void>
  loginWithCredentials: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  openAuthModal: () => {},
  isLoading: false,
  register: async () => {},
  loginWithCredentials: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    rollNumber: "",
    collegeName: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem("techtonic_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("techtonic_user")
      }
    }
  }, [])

  const openAuthModal = () => {
    setIsAuthModalOpen(true)
  }

  const login = () => {
    setIsRegistering(false)
    openAuthModal()
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("techtonic_user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  const register = async (userData: Omit<User, "id" | "ticketId">) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful registration
      const ticketId = `TECH-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 10),
        ...userData,
        ticketId,
      }

      setUser(newUser)
      localStorage.setItem("techtonic_user", JSON.stringify(newUser))

      // Generate and send QR code ticket (simulated)
      const qrCodeUrl = await generateQRCode(ticketId)
      console.log("QR Code generated:", qrCodeUrl)

      // Simulate sending email
      console.log(`Email sent to ${userData.email} with ticket ID ${ticketId}`)

      toast({
        title: "Registration successful",
        description: `Welcome, ${userData.name}! Your e-ticket has been sent to your email.`,
      })

      return newUser
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithCredentials = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to validate credentials
      // For demo purposes, we'll simulate a successful login

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - in a real app this would come from the backend
      const loggedInUser: User = {
        id: Math.random().toString(36).substring(2, 10),
        name: "Demo User",
        email: email,
        phoneNumber: "1234567890",
        rollNumber: "CS12345",
        collegeName: "Demo College",
        ticketId: `TECH-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      }

      setUser(loggedInUser)
      localStorage.setItem("techtonic_user", JSON.stringify(loggedInUser))

      toast({
        title: "Login successful",
        description: `Welcome back, ${loggedInUser.name}!`,
      })

      return loggedInUser
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isRegistering) {
      // Registration validation
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.phoneNumber ||
        !formData.rollNumber ||
        !formData.collegeName
      ) {
        toast({
          title: "Error",
          description: "Please fill in all fields.",
          variant: "destructive",
        })
        return
      }

      try {
        await register({
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          rollNumber: formData.rollNumber,
          collegeName: formData.collegeName,
        })
        setIsAuthModalOpen(false)
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          rollNumber: "",
          collegeName: "",
        })
      } catch (error) {
        console.error("Registration error:", error)
      }
    } else {
      // Login validation
      if (!formData.email || !formData.password) {
        toast({
          title: "Error",
          description: "Please enter both email and password.",
          variant: "destructive",
        })
        return
      }

      try {
        await loginWithCredentials(formData.email, formData.password)
        setIsAuthModalOpen(false)
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          rollNumber: "",
          collegeName: "",
        })
      } catch (error) {
        console.error("Login error:", error)
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        openAuthModal,
        isLoading,
        register,
        loginWithCredentials,
      }}
    >
      {children}

      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="dialog-box sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-pixel text-lg text-secondary">
              {isRegistering ? "Register for TECHTONIC'25" : "Login to TECHTONIC'25"}
            </DialogTitle>
            <DialogDescription>
              {isRegistering
                ? "Create an account to register for events and get your e-ticket."
                : "Login to access event registrations and your e-ticket."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="name" className="font-pixel text-xs">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black border-white"
                  required={isRegistering}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="font-pixel text-xs">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-black border-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-pixel text-xs">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-black border-white"
                required
              />
            </div>

            {isRegistering && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="font-pixel text-xs">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="bg-black border-white"
                    required={isRegistering}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rollNumber" className="font-pixel text-xs">
                    Student Roll Number
                  </Label>
                  <Input
                    id="rollNumber"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="bg-black border-white"
                    required={isRegistering}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collegeName" className="font-pixel text-xs">
                    College Name
                  </Label>
                  <Input
                    id="collegeName"
                    value={formData.collegeName}
                    onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                    className="bg-black border-white"
                    required={isRegistering}
                  />
                </div>
              </>
            )}

            <div className="flex flex-col gap-4 pt-4">
              <Button type="submit" className="pixel-button w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : isRegistering ? "Register" : "Login"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="text-xs"
                onClick={() => setIsRegistering(!isRegistering)}
                disabled={isLoading}
              >
                {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AuthContext.Provider>
  )
}

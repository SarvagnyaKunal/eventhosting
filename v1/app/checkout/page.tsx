"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    college: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * (item.quantity || 1)
  }, 0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to process payment
      // await fetch('/api/checkout', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ items: cartItems, customer: formData }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Send confirmation email (simulated)
      // await fetch('/api/send-confirmation', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     items: cartItems,
      //     total: subtotal
      //   }),
      // })

      clearCart()
      toast({
        title: "Order Confirmed!",
        description: "Check your email for confirmation details.",
      })
      router.push("/checkout/success")
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Personal Information</h2>

              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="college">College Name</Label>
                <Input id="college" name="college" value={formData.college} onChange={handleChange} required />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Complete Payment"}
            </Button>
          </form>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.title} x {item.quantity || 1}
                  </span>
                  <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                By completing your purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

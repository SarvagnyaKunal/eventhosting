"use client"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * (item.quantity || 1)
  }, 0)

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=/checkout")
      return
    }

    router.push("/checkout")
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center py-12">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Looks like you haven't added any events to your cart yet.</p>
          <Link href="/events">
            <Button>Browse Events</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border rounded-lg p-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-md">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={item.quantity || 1}
                    onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                    className="h-9 w-16 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
            <Link href="/events">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

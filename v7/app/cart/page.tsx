"use client"
import { useCart } from "@/lib/cart-provider"
import { useAuth } from "@/lib/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const { user, openAuthModal } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-pixel mb-8 neon-text">CART</h1>
          <Card className="pixel-card border-2 border-white bg-black/60 backdrop-blur-sm">
            <CardContent className="pt-6 pb-6 flex flex-col items-center">
              <ShoppingCart className="h-16 w-16 mb-4 text-muted-foreground" />
              <p className="mb-6">Please login to view your cart</p>
              <Button className="pixel-button" onClick={openAuthModal}>
                Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-pixel mb-8 neon-text">CART</h1>
          <Card className="pixel-card border-2 border-white bg-black/60 backdrop-blur-sm">
            <CardContent className="pt-6 pb-6 flex flex-col items-center">
              <ShoppingCart className="h-16 w-16 mb-4 text-muted-foreground" />
              <p className="mb-6">Your cart is empty</p>
              <Button className="pixel-button" onClick={() => router.push("/events")}>
                Browse Events
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-pixel mb-8 text-center neon-text">YOUR CART</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="pixel-card border-2 border-white bg-black/60 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="font-pixel text-lg text-secondary">Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.event.id} className="flex items-center gap-4 border-b border-white/20 pb-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.event.image || "/placeholder.svg"}
                        alt={item.event.title}
                        fill
                        className="object-cover"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-pixel text-sm text-secondary">{item.event.title}</h3>
                      <p className="text-xs mt-1">₹{item.event.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.event.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.event.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right w-20">
                      <p className="font-pixel">₹{item.event.price * item.quantity}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeFromCart(item.event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-xs" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button className="text-xs" onClick={() => router.push("/events")}>
                Continue Shopping
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="pixel-card border-2 border-white bg-black/60 backdrop-blur-sm sticky top-24">
            <CardHeader>
              <CardTitle className="font-pixel text-lg text-secondary">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-pixel">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-pixel">₹0</span>
                </div>
                <div className="border-t border-white/20 pt-4 flex justify-between">
                  <span className="font-pixel">Total</span>
                  <span className="font-pixel text-accent">₹{totalPrice}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="pixel-button w-full" onClick={() => router.push("/checkout")}>
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

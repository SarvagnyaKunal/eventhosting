"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import type { Event } from "@/lib/types"
import { toast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  event: Event
}

export default function AddToCartButton({ event }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(event)
    toast({
      title: "Added to cart",
      description: `${event.title} has been added to your cart.`,
    })
  }

  return (
    <Button onClick={handleAddToCart}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  )
}

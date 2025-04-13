"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import type { Event } from "@/lib/types"
import { toast } from "@/hooks/use-toast"

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(event)
    toast({
      title: "Added to cart",
      description: `${event.title} has been added to your cart.`,
    })
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        <Badge className="absolute top-2 right-2">{event.category}</Badge>
      </div>
      <CardHeader>
        <Link href={`/events/${event.id}`} className="hover:underline">
          <h3 className="text-lg font-bold">{event.title}</h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">{event.description}</p>
        <p className="mt-4 font-bold">${event.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/events/${event.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        <Button onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

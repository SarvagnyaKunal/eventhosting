"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { events } from "@/lib/data"
import { useCart } from "@/lib/cart-provider"
import { useAuth } from "@/lib/use-auth"
import { useToast } from "@/hooks/use-toast"

export default function EventHighlights() {
  const { addToCart } = useCart()
  const { user, openAuthModal } = useAuth()
  const { toast } = useToast()

  // Show only 3 featured events on the homepage
  const featuredEvents = events.slice(0, 3)

  const handleAddToCart = (eventId: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to add events to your cart",
        variant: "destructive",
      })
      openAuthModal()
      return
    }

    const event = events.find((e) => e.id === eventId)
    if (event) {
      addToCart(event)
    }
  }

  return (
    <section id="events" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-pixel mb-6 text-center neon-text">EVENT HIGHLIGHTS</h2>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-center mb-6">
            Join us for TECHTONIC&apos;25, the ultimate arcade & retro video game themed technical fest happening on
            April 30th, 2025. Participate in exciting competitions, workshops, and fun activities!
          </p>

          <div className="flex justify-center mb-8">
            <Link href="/events" className="pixel-button text-sm inline-block">
              View All Events
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/techtonic-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline hover:text-primary transition-colors"
            >
              Download Event Brochure
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featuredEvents.map((event) => (
            <Card
              key={event.id}
              className="pixel-card overflow-hidden border-2 border-white bg-black/60 backdrop-blur-sm"
            >
              <div className="relative aspect-video">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="font-pixel text-base md:text-lg text-secondary">{event.title}</CardTitle>
                <CardDescription className="text-sm mt-2">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between items-center">
                  <span className="font-pixel text-accent">₹{event.price}</span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="pixel-button text-xs flex-1" onClick={() => handleAddToCart(event.id)}>
                  Add to Cart
                </Button>
                <Link href={`/events#${event.id}`} className="flex-1">
                  <Button variant="outline" className="w-full text-xs">
                    Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/events" className="pixel-button text-sm inline-block">
            Explore All Events
          </Link>
        </div>
      </div>
    </section>
  )
}

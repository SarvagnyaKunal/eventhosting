"use client"

import { useState } from "react"
import { categoryNames, getEventsByCategory } from "@/lib/data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { useCart } from "@/lib/cart-provider"
import { useAuth } from "@/lib/use-auth"
import { useToast } from "@/hooks/use-toast"
import type { Event } from "@/lib/types"

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const { addToCart } = useCart()
  const { user, openAuthModal } = useAuth()
  const { toast } = useToast()

  const filteredEvents = getEventsByCategory(activeCategory)

  const handleAddToCart = (event: Event) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to add events to your cart",
        variant: "destructive",
      })
      openAuthModal()
      return
    }

    addToCart(event)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-pixel mb-8 text-center neon-text">EVENTS</h1>

      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-center mb-6">
          Explore our exciting lineup of events for TECHTONIC&apos;25. From coding challenges to creative competitions,
          there&apos;s something for everyone!
        </p>

        <div className="flex justify-center mb-8">
          <a
            href="/techtonic-brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-button text-sm inline-block"
          >
            Download Brochure
          </a>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all" className="font-pixel text-xs">
              ALL
            </TabsTrigger>
            <TabsTrigger value="cat1" className="font-pixel text-xs">
              {categoryNames.cat1}
            </TabsTrigger>
            <TabsTrigger value="cat2" className="font-pixel text-xs">
              {categoryNames.cat2}
            </TabsTrigger>
            <TabsTrigger value="cat3" className="font-pixel text-xs">
              {categoryNames.cat3}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
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
                    <span className="text-xs bg-primary/20 px-2 py-1 rounded">
                      {categoryNames[event.category as keyof typeof categoryNames]}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="pixel-button w-full text-xs" onClick={() => handleAddToCart(event)}>
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

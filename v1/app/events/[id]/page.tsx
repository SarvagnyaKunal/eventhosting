import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import type { Metadata } from "next"
import AddToCartButton from "@/components/add-to-cart-button"

interface EventPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  // In a real app, fetch the event data from an API
  // const event = await getEvent(params.id)

  return {
    title: `Event Details - TechFest 2024`,
    description: `Learn more about this exciting event at TechFest 2024`,
  }
}

export default function EventPage({ params }: EventPageProps) {
  // In a real app, this would fetch data from an API
  // const event = await getEvent(params.id)

  // Mock data for demonstration
  const event = {
    id: params.id,
    title: "Hackathon 2024",
    description:
      "Join our 24-hour coding challenge to solve real-world problems. Work in teams of up to 4 people to build innovative solutions. Prizes include cash rewards, internship opportunities, and more!",
    longDescription: `
      <p>Join our 24-hour coding challenge to solve real-world problems. Work in teams of up to 4 people to build innovative solutions.</p>
      
      <h3>What to expect:</h3>
      <ul>
        <li>24 hours of intense coding and problem-solving</li>
        <li>Mentorship from industry experts</li>
        <li>Networking opportunities with tech companies</li>
        <li>Free food and beverages throughout the event</li>
        <li>Amazing prizes for winning teams</li>
      </ul>
      
      <h3>Requirements:</h3>
      <ul>
        <li>Laptop and charger</li>
        <li>Student ID</li>
        <li>Basic programming knowledge</li>
        <li>Team of 2-4 members (or join individually and we'll help you find a team)</li>
      </ul>
    `,
    price: 50,
    category: "Hackathon",
    image: "/placeholder.svg?height=400&width=800",
    date: "May 15-16, 2024",
    time: "10:00 AM - 10:00 AM (next day)",
    location: "Main Auditorium, University Campus",
    capacity: 200,
  }

  return (
    <div className="container py-12">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {event.category}
              </span>
            </div>
          </div>

          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Capacity: {event.capacity} participants</span>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-lg font-bold">Price: ${event.price.toFixed(2)}</p>
          </div>

          <div className="flex gap-4 mt-4">
            <AddToCartButton event={event} />
            <Button variant="outline">Add to Wishlist</Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">About This Event</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event.longDescription }} />
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Related Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* In a real app, this would show related events */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <h3 className="font-bold">Related Event {i}</h3>
              <p className="text-sm text-muted-foreground">Check out this related event</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

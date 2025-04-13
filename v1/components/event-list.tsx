"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EventCard from "@/components/event-card"
import type { Event } from "@/lib/types"
import { Search } from "lucide-react"

interface EventListProps {
  featured?: boolean
}

export default function EventList({ featured = false }: EventListProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/events')
        // const data = await response.json()

        // Mock data for demonstration
        const mockEvents: Event[] = [
          {
            id: "1",
            title: "Hackathon 2024",
            description: "24-hour coding challenge to solve real-world problems.",
            price: 50,
            category: "Hackathon",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: "2",
            title: "Web Development Workshop",
            description: "Learn the latest web development technologies and frameworks.",
            price: 30,
            category: "Workshop",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: "3",
            title: "AI & Machine Learning Symposium",
            description: "Explore the cutting-edge advancements in AI and ML.",
            price: 45,
            category: "Symposium",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: "4",
            title: "Competitive Programming Contest",
            description: "Test your algorithmic skills in this coding competition.",
            price: 25,
            category: "Competition",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: "5",
            title: "Blockchain Workshop",
            description: "Understand the fundamentals of blockchain technology.",
            price: 35,
            category: "Workshop",
            image: "/placeholder.svg?height=200&width=300",
          },
          {
            id: "6",
            title: "IoT Challenge",
            description: "Build innovative IoT solutions for smart living.",
            price: 40,
            category: "Hackathon",
            image: "/placeholder.svg?height=200&width=300",
          },
        ]

        setEvents(mockEvents)
        setFilteredEvents(featured ? mockEvents.slice(0, 3) : mockEvents)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching events:", error)
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [featured])

  useEffect(() => {
    if (featured) return

    let filtered = events

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((event) => event.category === categoryFilter)
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredEvents(filtered)
  }, [categoryFilter, searchQuery, events, featured])

  const categories = ["all", ...new Set(events.map((event) => event.category))]

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {!featured && (
        <div className="flex flex-col md:flex-row gap-4 mb-8 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No events found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

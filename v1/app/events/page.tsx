import type { Metadata } from "next"
import EventList from "@/components/event-list"

export const metadata: Metadata = {
  title: "Events - TechFest 2024",
  description: "Browse all events at TechFest 2024",
}

export default function EventsPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Events</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Browse all the exciting events at TechFest 2024.
          </p>
        </div>
      </div>
      <EventList />
    </div>
  )
}

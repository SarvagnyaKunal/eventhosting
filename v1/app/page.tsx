import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react"
import EventList from "@/components/event-list"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                  TechFest 2024
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  Join us for the biggest technical event of the year. Participate in hackathons, workshops, and more!
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/events">
                  <Button className="bg-primary hover:bg-primary/90">
                    Explore Events <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/brochures">
                  <Button variant="outline" className="text-white border-white hover:bg-white/10">
                    Download Brochure
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>May 15-20, 2024</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>University Campus</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>5000+ Participants</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="TechFest 2024"
                width={600}
                height={400}
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About TechFest</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                TechFest is an annual technical festival organized by the students of our college. It features a wide
                range of events including hackathons, coding competitions, workshops, and technical talks by industry
                experts.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Previous TechFest"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Hackathons</h3>
                      <p className="text-gray-500">24-hour coding challenges to solve real-world problems.</p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Workshops</h3>
                      <p className="text-gray-500">Hands-on sessions on cutting-edge technologies.</p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Technical Talks</h3>
                      <p className="text-gray-500">Insights from industry experts and thought leaders.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Listing Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Events</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our exciting lineup of technical events and competitions.
              </p>
            </div>
          </div>
          <EventList featured={true} />
          <div className="flex justify-center mt-8">
            <Link href="/events">
              <Button className="bg-primary hover:bg-primary/90">
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Join TechFest?</h2>
              <p className="max-w-[900px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Register now to participate in the biggest technical event of the year.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button variant="secondary" size="lg">
                  Register Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

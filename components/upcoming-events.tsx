"use client"
import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useInView } from "react-intersection-observer"
import type { Event } from "@/lib/supabase"

interface UpcomingEventsProps {
  events?: Event[]
}

export function UpcomingEvents({ events = [] }: UpcomingEventsProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div ref={ref} className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${inView ? "animate-fade-up" : "opacity-0"}`}>
            Upcoming Events
          </h2>
          <p
            className={`text-gray-600 dark:text-gray-400 max-w-2xl mx-auto ${inView ? "animate-fade-up animate-delay-100" : "opacity-0"}`}
          >
            Join us for our upcoming workshops, hackathons, and community events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.slice(0, 3).map((event, index) => (
            <Card
              key={event.id}
              className={`overflow-hidden card-hover ${inView ? `animate-fade-up animate-delay-${(index + 1) * 100}` : "opacity-0"}`}
            >
              <div className="relative h-48">
                <Image src={event.image_url || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-blue-600 hover:bg-blue-700">{event.category}</Badge>
                </div>
              </div>

              <CardHeader className="p-4">
                <h3 className="text-xl font-bold">{event.title}</h3>
              </CardHeader>

              <CardContent className="p-4 pt-0 space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(event.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                {event.max_attendees && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="mr-2">👥</span>
                    {event.current_attendees}/{event.max_attendees} registered
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button className="w-full google-btn-hover" asChild>
                  <a href={event.registration_url || "#"} target="_blank" rel="noopener noreferrer">
                    Register Now
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No upcoming events at the moment. Check back soon!</p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Button
            variant="outline"
            className={`google-btn-hover ${inView ? "animate-fade-up animate-delay-400" : "opacity-0"}`}
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import { ArrowRight, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { WorkshopCard } from "@/components/workshop-card"
import { HeroSection } from "@/components/hero-section"
import { TeamSection } from "@/components/team-section"
import { UpcomingEvents } from "@/components/upcoming-events"

// import { getWorkshops, getUpcomingEvents } from "@/lib/database"

export default async function Home() {
  // const [workshops, events] = await Promise.all([getWorkshops(), getUpcomingEvents()])
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* About Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <div className="flex items-center space-x-2 text-sm font-medium text-blue-600 mb-2">
                  <Users className="h-4 w-4" />
                  <span>ABOUT OUR COMMUNITY</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Google Developer Group at Augustana College
              </h2>
              <p className="text-gray-600 text-lg">
                We are a community of students passionate about Google technologies. Our mission is to create a space
                where developers can network, learn, and grow together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Join Our Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl transition-transform hover:scale-[1.02] duration-300">
              <Image src="/everyone.jpg" alt="GDG Community" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {/* <UpcomingEvents events={events} /> */}

      {/* Past Workshops Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Past Workshops</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our previous workshops and learning sessions. All resources and recordings are available for
              members.
            </p>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.slice(0, 3).map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                title={workshop.title}
                date={new Date(workshop.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                image={workshop.image_url}
                description={workshop.description}
                tags={workshop.tags}
                presenter={workshop.presenter}
                attendees={workshop.attendees_count}
              />
            ))}
          </div> */}

          <div className="mt-10 text-center">
            <Button variant="outline" className="group">
              View All Workshops
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community Today</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Be part of a growing community of developers, designers, and tech enthusiasts at Augustana College.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-blue-700 hover:bg-gray-100">Become a Member</Button>
            <Button variant="outline" className="text-white border-white hover:bg-blue-800">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

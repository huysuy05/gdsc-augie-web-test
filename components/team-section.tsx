"use client"
import Image from "next/image"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"

export function TeamSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Lead Organizer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Computer Science major with a passion for web development and AI.",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        email: "mailto:alex@example.com",
      },
    },
    {
      name: "Maria Rodriguez",
      role: "Technical Lead",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Experienced in Android development and Firebase. Google certified developer.",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        email: "mailto:maria@example.com",
      },
    },
    {
      name: "David Kim",
      role: "Workshop Coordinator",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Passionate about teaching and sharing knowledge in machine learning.",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        email: "mailto:david@example.com",
      },
    },
    {
      name: "Sarah Chen",
      role: "Community Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Focused on building an inclusive tech community at Augustana College.",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        email: "mailto:sarah@example.com",
      },
    },
  ]

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div ref={ref} className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${inView ? "animate-fade-up" : "opacity-0"}`}>
            Meet Our Team
          </h2>
          <p
            className={`text-gray-600 dark:text-gray-400 max-w-2xl mx-auto ${inView ? "animate-fade-up animate-delay-100" : "opacity-0"}`}
          >
            The passionate individuals behind Google Developer Group at Augustana College.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl ${
                inView ? `animate-fade-up animate-delay-${(index + 1) * 100}` : "opacity-0"
              }`}
            >
              <div className="relative h-64 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-500 text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.bio}</p>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

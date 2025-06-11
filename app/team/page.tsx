import Image from "next/image"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TeamPage() {
  const execBoard = [
    {
      name: "Alex Johnson",
      role: "President",
      image: "/placeholder-user.jpg",
      bio: "Computer Science major with a passion for web development and AI. Leading the vision and strategy for GDG Augustana.",
      year: "Senior",
      major: "Computer Science",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        email: "mailto:alex@augustana.edu",
      },
    },
    {
      name: "Maria Rodriguez",
      role: "Vice President",
      image: "/placeholder-user.jpg",
      bio: "Experienced in Android development and Firebase. Google certified developer passionate about mobile technologies.",
      year: "Junior",
      major: "Computer Science",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        email: "mailto:maria@augustana.edu",
      },
    },
    {
      name: "David Kim",
      role: "Technical Lead",
      image: "/placeholder-user.jpg",
      bio: "Passionate about teaching and sharing knowledge in machine learning and cloud technologies.",
      year: "Senior",
      major: "Data Science",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        email: "mailto:david@augustana.edu",
      },
    },
    {
      name: "Sarah Chen",
      role: "Community Manager",
      image: "/placeholder-user.jpg",
      bio: "Focused on building an inclusive tech community and organizing engaging events for all skill levels.",
      year: "Sophomore",
      major: "Computer Science",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        email: "mailto:sarah@augustana.edu",
      },
    },
  ]

  const teamMembers = [
    {
      name: "Emily Zhang",
      role: "Workshop Coordinator",
      image: "/placeholder-user.jpg",
      year: "Junior",
      major: "Computer Science",
    },
    {
      name: "Michael Brown",
      role: "Marketing Lead",
      image: "/placeholder-user.jpg",
      year: "Sophomore",
      major: "Business & Computer Science",
    },
    {
      name: "Jessica Liu",
      role: "Event Coordinator",
      image: "/placeholder-user.jpg",
      year: "Senior",
      major: "Information Systems",
    },
    {
      name: "Ryan Thompson",
      role: "Technical Mentor",
      image: "/placeholder-user.jpg",
      year: "Graduate Student",
      major: "Computer Science",
    },
    {
      name: "Priya Patel",
      role: "Design Lead",
      image: "/placeholder-user.jpg",
      year: "Junior",
      major: "Graphic Design & CS",
    },
    {
      name: "James Wilson",
      role: "Outreach Coordinator",
      image: "/placeholder-user.jpg",
      year: "Sophomore",
      major: "Computer Science",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Meet Our <span className="text-blue-600">Team</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The passionate individuals who make GDG Augustana a thriving community of learners, builders, and
            innovators.
          </p>
        </div>
      </section>

      {/* Executive Board */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Executive Board</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our leadership team is dedicated to fostering growth, innovation, and community within GDG Augustana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {execBoard.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm mb-3">
                    {member.year} • {member.major}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated team members who help organize events, mentor newcomers, and keep our community thriving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm">
                    {member.year} • {member.major}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Join Our Team?</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            We're always looking for passionate individuals to help us grow our community. Whether you're interested in
            organizing events, mentoring others, or leading technical initiatives.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-blue-700 hover:bg-gray-100">Apply to Join</Button>
            <Button variant="outline" className="text-white border-white hover:bg-blue-800">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

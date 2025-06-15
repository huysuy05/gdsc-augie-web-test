import Image from "next/image"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cta } from "../cta"

export default function TeamPage() {
  const execBoard = [
    {
      name: "Quinxie Doan",
      role: "President",
      image: "/Quinxie_Doan.jpg",
      bio: "Computer Science major with a passion for web development and AI. Leading the vision and strategy for GDG Augustana.",
      year: "Senior",
      major: "Computer Science",
      social: {
        linkedin: "https://www.linkedin.com/in/quyendoan51/",
        github: "https://github.com/Quinxie51",
        email: "mailto:quyendoan22@augustana.edu",
      },
    },
    {
      name: "Hieu Nguyen",
      role: "Vice President",
      image: "/Hieu_Nguyen.jpg",
      bio: "Experienced in Web Development, focused in Backend Development",
      year: "Junior",
      major: "Computer Science",
      social: {
        linkedin: "https://www.linkedin.com/in/the-hieu-nguyen-7681b12b1/",
        github: "https://github.com/hieunguyen2711",
        email: "mailto:hieunguyen23@augustana.edu",
      },
    },
    {
      name: "Huy Nguyen",
      role: "Secretary",
      image: "/HuyNguyen.jpg",
      bio: "Passionate about teaching and sharing knowledge in machine learning and cloud technologies.",
      year: "Junior",
      major: "Data Science",
      social: {
        linkedin: "https://www.linkedin.com/in/huy05/",
        github: "https://github.com/huysuy05",
        email: "mailto:huynguyen23@augustana.edu",
      },
    },
    {
      name: "Tram Nguyen",
      role: "Public Chair Relation",
      image: "/placeholder-user.jpg",
      bio: "Focused on building an inclusive tech community and organizing engaging events for all skill levels.",
      year: "Sophomore",
      major: "Computer Science",
      social: {
        linkedin: "https://www.linkedin.com/in/tramnguyen816/",
        github: "https://github.com/tramnguyen200681",
        email: "mailto:tramnguyen24@augustana.edu",
      },
    },
    {
      name: "Ismael Otmani",
      role: "Tech Lead",
      image: "/placeholder-user.jpg",
      bio: "Focused on building an inclusive tech community and organizing engaging events for all skill levels.",
      year: "Sophomore",
      major: "Computer Science",
      social: {
        linkedin: "https://www.linkedin.com/in/isma%C3%ABl-otmani/",
        github: "https://github.com/Shiimos",
        email: "mailto:ismaelotmani24@augustana.edu",
      },
    },
    {
      name: "Solyana Sebhatu",
      role: "Treasurer",
      image: "/placeholder-user.jpg",
      bio: "Focused on building an inclusive tech community and organizing engaging events for all skill levels.",
      year: "Sophomore",
      major: "Computer Science",
      social: {
        linkedin: "https://www.linkedin.com/in/solyana-sebhatu-37456429a/",
        github: "#",
        email: "mailto:solyanasebhatu24@augustana.edu",
      },
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
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </a>
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Button>
                    </a>
                    <a href={member.social.email}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Mail className="h-4 w-4" />
                      <span className="sr-only">Email</span>
                    </Button>
                    </a>
                    
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Join Team CTA */}
      <Cta title={"Want to Join Our Team?"} description={"We're always looking for passionate individuals to help us grow our community. Whether you're interested in events, mentoring others, or leading technical initiatives."} 
      btn1={"Apply to Join"} btn2={"Learn More"}/>

    </div>
  )
}

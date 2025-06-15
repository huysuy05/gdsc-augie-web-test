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
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl ${
                inView ? `animate-fade-up animate-delay-${(index + 1) * 100}` : "opacity-0"
              }`}
            >
              <div className="relative h-48 sm:h-56 md:h-64 w-full">
                <Image 
                  src={member.image || "/placeholder.svg"} 
                  alt={member.name} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 768px) 50vw,
                         (max-width: 1024px) 33vw,
                         25vw"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm mb-1">{member.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mb-2">
                  {member.year} • {member.major}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mb-4 line-clamp-3">{member.bio}</p>
                <div className="flex space-x-2">
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 rounded-full">
                      <Linkedin className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </a>
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 rounded-full">
                      <Github className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </a>
                  <a href={member.social.email}>
                    <Button variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 rounded-full">
                      <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

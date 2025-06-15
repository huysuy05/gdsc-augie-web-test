import Image from "next/image"
import { Users, Target, Heart, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cta } from "../cta"


export default function AboutPage() {
  const values = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Community First",
      description: "We believe in building an inclusive community where everyone can learn and grow together.",
    },
    {
      icon: <Target className="h-8 w-8 text-red-600" />,
      title: "Innovation",
      description: "We encourage creative thinking and innovative solutions to real-world problems.",
    },
    {
      icon: <Heart className="h-8 w-8 text-green-600" />,
      title: "Collaboration",
      description: "We foster an environment of collaboration, mentorship, and knowledge sharing.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-600" />,
      title: "Learning",
      description: "We are committed to continuous learning and staying updated with the latest technologies.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-blue-600">GDG Augustana</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We are a passionate community of students at Augustana College dedicated to exploring, learning, and
            building with Google technologies.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Join Our Community
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                Google Developer Group at Augustana College aims to create a vibrant ecosystem where students can
                explore cutting-edge technologies, develop practical skills, and build meaningful connections within the
                tech community.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We organize workshops, hackathons, and networking events that bridge the gap between academic learning
                and real-world application of Google technologies including Android, Firebase, TensorFlow, and Google
                Cloud Platform.
              </p>
              <p className="text-lg text-gray-600">
                Our goal is to empower the next generation of developers, designers, and tech entrepreneurs right here
                at Augustana College.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image src="/community.png" alt="GDG Mission" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape our community culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image src="/founder.png" alt="GDG History" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2023, Google Developer Group at Augustana College started as a small group of computer
                science students passionate about Google technologies. What began as informal study sessions quickly
                grew into a recognized student organization.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Today, we are proud to be part of the global GDG network, connecting our local community with developers
                worldwide. We have hosted over 20 workshops, organized 3 hackathons, and built a community of 150+
                active members.
              </p>
              <p className="text-lg text-gray-600">
                Our journey is just beginning, and we're excited to continue growing and making an impact in the
                Augustana College community and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Cta title={"Ready to Join Us?"} description={"Whether you're a beginner or an experienced developer, there's a place for you in our community."} btn1={"Become a Member"} btn2={"Contact Us"}/>
    </div>
  )
}

"use client"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"

export function HeroSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950 py-20 md:py-32">
      {/* Google-inspired colored dots */}
      <div className="absolute top-20 left-10 w-6 h-6 rounded-full bg-blue-500 opacity-70"></div>
      <div className="absolute top-40 left-20 w-4 h-4 rounded-full bg-red-500 opacity-70"></div>
      <div className="absolute top-60 left-5 w-5 h-5 rounded-full bg-yellow-500 opacity-70"></div>
      <div className="absolute top-80 left-16 w-3 h-3 rounded-full bg-green-500 opacity-70"></div>

      <div className="absolute top-20 right-10 w-5 h-5 rounded-full bg-green-500 opacity-70"></div>
      <div className="absolute top-40 right-20 w-3 h-3 rounded-full bg-yellow-500 opacity-70"></div>
      <div className="absolute top-60 right-5 w-6 h-6 rounded-full bg-red-500 opacity-70"></div>
      <div className="absolute top-80 right-16 w-4 h-4 rounded-full bg-blue-500 opacity-70"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className={`space-y-4 ${inView ? "animate-fade-up" : "opacity-0"}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Google Developer Group
                <span className="block text-blue-600">Augustana College</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-md">
                Join our community of developers, designers, and tech enthusiasts to learn, share, and grow together.
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 ${inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}
            >
              <Button size="lg" className="google-btn-hover bg-blue-600 hover:bg-blue-700">
                Join Our Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="google-btn-hover">
                Explore Workshops
              </Button>
            </div>

            <div
              className={`flex items-center space-x-4 ${inView ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
            >
              <div className="flex -space-x-2">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Member"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white dark:border-gray-900"
                />
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Member"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white dark:border-gray-900"
                />
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Member"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white dark:border-gray-900"
                />
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-900 text-xs font-medium">
                  +25
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Join 50+ members in our community</p>
            </div>
          </div>

          <div className={`relative ${inView ? "animate-fade-in animate-delay-400" : "opacity-0"}`}>
            <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-2xl">
              <Image src="/gdg-logo.png" alt="GDG Augustana" fill className="object-cover" />
            </div>

            {/* Google-inspired colored shapes */}
            <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-blue-500 opacity-80"></div>
            <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-red-500 opacity-80"></div>
            <div className="absolute top-1/2 -right-6 w-12 h-12 rounded-full bg-yellow-500 opacity-80"></div>
            <div className="absolute bottom-1/4 -left-6 w-12 h-12 rounded-full bg-green-500 opacity-80"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

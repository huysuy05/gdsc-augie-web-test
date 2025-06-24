"use client"
import Image from "next/image"

export function GallerySection() {
  const images = [
    "/gallery1.jpg",
    "/gallery1.jpg",
    "/gallery1.jpg",
    "/gallery1.jpg",
    "/gallery1.jpg",
    "/gallery1.jpg",
    "/gallery1.jpg",
    "/gallery1.jpg",
    "/gallery1.jpg",
    "/gallery1.jpg"
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Gallery</h2>
        <div className="overflow-hidden">
          <div className="flex space-x-4 animate-scroll">
            {[...images, ...images].map((src, index) => (
              <div key={index} className="flex-shrink-0 w-64 h-40 relative rounded-lg overflow-hidden shadow">
                <Image src={src} alt={`Gallery ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

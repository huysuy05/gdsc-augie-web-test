"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface WorkshopCardProps {
  title: string
  date: string
  image: string
  description: string
  tags: string[]
  presenter?: string
  attendees?: number
}

export function WorkshopCard({ title, date, image, description, tags, presenter, attendees }: WorkshopCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="overflow-hidden card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 flex items-center text-white text-sm">
          <Calendar className="h-4 w-4 mr-1" />
          {date}
        </div>
      </div>

      <CardHeader className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
        {presenter && <p className="text-sm text-blue-600 dark:text-blue-500 mb-2">Presenter: {presenter}</p>}
        {attendees && <p className="text-sm text-gray-500 mb-4">{attendees} attendees</p>}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button variant="ghost" className="p-0 h-auto text-blue-600 dark:text-blue-500 group">
          View Workshop
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}

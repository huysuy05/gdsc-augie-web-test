import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkshopCard } from "@/components/workshop-card"
import { getWorkshops } from "@/lib/database"

export default async function WorkshopsPage() {
  const workshops = await getWorkshops()

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="group mb-4">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-4">Workshops & Events</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
          Explore our past workshops and events. All resources, slides, and code samples are available for GDG members.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {workshops.map((workshop) => (
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
      </div>

      <div className="text-center">
        <Button className="google-btn-hover">Load More Workshops</Button>
      </div>
    </div>
  )
}

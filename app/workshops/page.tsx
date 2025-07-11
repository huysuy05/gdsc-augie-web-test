import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkshopCard } from "@/components/workshop-card"

//This page is using Server Side Rendering, which is rendered in the server befo
export default async function WorkshopsPage() {


  return (
    <div>
      <WorkshopCard title="Test" date="Test" image="./everyone.jpg" description="Test" tags={["test1", "test2"]} />
      <WorkshopCard title="Test" date="Test" image="Test" description="Test" tags={["test1", "test2"]} />
    </div>
  )
}


//title, date, image, description, tags, presenter, attendees 